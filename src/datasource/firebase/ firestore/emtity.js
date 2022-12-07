import { collection } from 'firebase/firestore';

import { db } from '../firebase.config';

export const Posts = collection(db, 'posts');
