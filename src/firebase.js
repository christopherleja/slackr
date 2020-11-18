import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyA1FEcv00Q3QOeZPk4DDkW8MQKUcbmWMNM",
  authDomain: "slackr-33d38.firebaseapp.com",
  databaseURL: "https://slackr-33d38.firebaseio.com",
  projectId: "slackr-33d38",
  storageBucket: "slackr-33d38.appspot.com",
  messagingSenderId: "1031800845333",
  appId: "1:1031800845333:web:ded3562a56da612f3a4a1c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;