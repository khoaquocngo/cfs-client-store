import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { storage } from './firebase.config';

const getImageUrl = function (ref) {
  return getDownloadURL(ref);
};

const uploadImage = function (image) {
  const storegeRef = ref(storage, `files/${Date.now()}_${image.name}`);

  const uploadTask = uploadBytesResumable(storegeRef, image);

  return uploadTask;
};

export const store = {
  getImageUrl,
  uploadImage,
};
