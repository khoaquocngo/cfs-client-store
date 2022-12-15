import { addDoc } from 'firebase/firestore';

import { ChristmasForm } from './emtity';

function getUuid(name, date) {
  const firstUUid = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replaceAll(' ', '_');
  const lastUuid = `${+date}`.slice(-5);

  return `${firstUUid}_${lastUuid}`;
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

    const a = await (await addDoc(ChristmasForm, createData)).id;
    console.log("===createData===", createData);
    console.log('aaaa', a);

    if (!a) {
      throw Error('Create Christmas Form failure');
    }

    return { uuid };
  } catch (error) {
    throw Error(error.message);
  }
};
