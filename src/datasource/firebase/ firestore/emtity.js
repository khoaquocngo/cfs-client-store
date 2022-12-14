import { collection } from 'firebase/firestore';

import { db } from '../firebase.config';

export const Posts = collection(db, 'posts');
export const ChristmasForm = collection(db, 'christmasform');
