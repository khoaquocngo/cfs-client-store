import { addDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

import { ChristmasForm } from './emtity';

function formatNameLength(fisrtName = '', lastName = '') {
  if (lastName.length > 7) {
    return lastName.slice(0, 7);
  }

  if (fisrtName.length > 7) {
    return lastName;
  }

  return !fisrtName ? `${lastName}` : `${fisrtName}_${lastName}`;
}

function getFisrtUuid(name) {
  if (!name.replaceAll(' ', '')) return '';
  const listName = name.trim().split(' ');

  return formatNameLength(listName.at(-2), listName.at(-1));
}

function getUuid(name, date) {
  const firstUUid = getFisrtUuid(name);
  const lastUuid = `${+date}`.slice(-5);
  const uuid = firstUUid ? `${firstUUid}_${lastUuid}` : lastUuid;

  return uuid
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export const createChristmasForm = async function (input = {}) {
  try {
    const { displayName, contact, dream, message, sex } = input;
    const now = new Date();
    const uuid = getUuid(displayName, now);

    const createData = {
      displayName,
      contact,
      dream,
      message,
      sex,
      uuid,
      createdAt: now,
      refcode: '',
    };

    const christmasFormId = await (await addDoc(ChristmasForm, createData)).id;

    if (!christmasFormId) {
      throw Error('Create Christmas Form failure');
    }

    return { uuid };
  } catch (error) {
    throw Error(error.message);
  }
};

const getDataFromSnapShot = async function (formQuery) {
  const docByQuery = await getDocs(formQuery);

  return {
    doc: docByQuery,
    data: !docByQuery.size ? [] : docByQuery.docs.map(value => value.data()),
  };
};

const formDetailByUui = async function (uuid) {
  const formQuery = await query(ChristmasForm, where('uuid', '==', uuid));
  const { data, doc } = await getDataFromSnapShot(formQuery);

  return { data: data[0], doc };
};

const getListFormByRefSex = async function (sex) {
  const sexQuery = {
    Male: 'Female',
    Female: 'Male',
    Other: 'Other',
  }[sex];

  const formQuery = await query(ChristmasForm, where('sex', '==', sexQuery));
  const { data } = await getDataFromSnapShot(formQuery);

  return data;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getListformByRefcode = function (data = [], isRefcode = false) {
  return data.filter(x => !!x.refcode === isRefcode);
};

function getPairedObject(data) {
  const pairedObjectList = getListformByRefcode(data);

  const pairedObjects = pairedObjectList.length
    ? pairedObjectList
    : getListformByRefcode(data, true);

  return pairedObjects[getRandomInt(0, pairedObjects.length - 1)];
}

export const getInfoByUuid = async function (uuid) {
  const { data: form, doc } = await formDetailByUui(uuid);

  if (!form) {
    return {
      isSuccess: false,
      message: 'uuid not found!',
      data: {},
    };
  }

  let pairedObject;
  if (form.refcode) {
    pairedObject = (await formDetailByUui(form.refcode)).data;
  } else {
    const listFormByRefSex = await getListFormByRefSex(form.sex);
    pairedObject = getPairedObject(listFormByRefSex);

    // Update refcode to form
    doc.docs.forEach(x => updateDoc(x.ref, { refcode: pairedObject.uuid }));
  }

  const { contact, displayName, dream, message, sex } = pairedObject;
  return {
    isSuccess: true,
    data: {
      contact,
      displayName,
      dream,
      message,
      sex,
    },
  };
};
