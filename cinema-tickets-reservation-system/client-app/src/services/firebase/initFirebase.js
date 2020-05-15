import firebase from 'firebase/app';
// import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCl2MLz0HbSOBCRpXeh9g8aggU4xGyVJJ8',
  authDomain: 'cinema-ticket-resevation.firebaseapp.com',
  databaseURL: 'https://cinema-ticket-resevation.firebaseio.com',
  projectId: 'cinema-ticket-resevation',
  storageBucket: 'cinema-ticket-resevation.appspot.com',
  messagingSenderId: '360729741330',
};

firebase.initializeApp(config);
firebase.firestore();
export default firebase;
