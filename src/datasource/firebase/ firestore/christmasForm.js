import { addDoc } from 'firebase/firestore';

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

  return firstUUid ? `${firstUUid}_${lastUuid}` : lastUuid;
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
