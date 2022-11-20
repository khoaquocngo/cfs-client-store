import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { storage } from './firebase.config';

export const getImageUrl = function (ref) {
  return getDownloadURL(ref);
};

export const uploadImage = function (image) {
  const storegeRef = ref(storage, `files/${Date.now()}_${image.name}`);

  const uploadTask = uploadBytesResumable(storegeRef, image);

  return uploadTask;
};
