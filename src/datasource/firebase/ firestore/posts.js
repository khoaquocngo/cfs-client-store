import { addDoc, getDocs } from 'firebase/firestore';

import { Posts } from './emtity';

export const getCFS = async function () {
  try {
    const postDocs = await getDocs(Posts);

    const posts = postDocs.docs.map(value => {
      const data = value.data();
      return {
        ...data,
        createdAt: data.createdAt.toDate(),
      };
    });

    return posts;
  } catch (error) {
    return [];
  }
};

export const createPost = async function (input = {}) {
  try {
    const { describe, type } = input;
    const createData = {
      describe,
      type,
      status: 'Pending',
      createdAt: new Date(),
    };

    const postId = await (await addDoc(Posts, createData)).id;

    if (!postId) {
      throw Error('Create Posts failure');
    }

    return { id: postId };
  } catch (error) {
    throw Error(error.message);
  }
};
