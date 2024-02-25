import { initializeApp, AppOptions, cert } from 'firebase-admin/app';
import { getStorage, getDownloadURL } from 'firebase-admin/storage';

import config from 'config';
import { File } from '@koa/multer';

const firebaseConfig: AppOptions = {
  credential: cert(JSON.parse(config.FIREBASE_CREDENTIALS)),
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const storage = getStorage();

const upload = async (fileName: string, file: File) => {
  const storageFile = storage.bucket().file(fileName);
  await storageFile.save(file.buffer);

  return getDownloadURL(storageFile);
};

export default { upload };