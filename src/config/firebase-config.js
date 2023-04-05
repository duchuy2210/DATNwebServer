// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAYcpnPX8oBhmgDxZTjYydc04qqcSciw4E',
  authDomain: 'datn-db.firebaseapp.com',
  databaseURL:
    'https://datn-db-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'datn-db',
  storageBucket: 'datn-db.appspot.com',
  messagingSenderId: '308537547381',
  appId: '1:308537547381:web:ef3388b22713307d02363c',
  measurementId: 'G-NP34HJG56S',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const realTimeDb = getDatabase(app);
