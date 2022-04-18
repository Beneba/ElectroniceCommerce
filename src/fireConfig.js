import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBYrXiI8ENuVrtnF9_fBMkqoEutS0YK72A",
  authDomain: "electronicecommerce-759e9.firebaseapp.com",
  projectId: "electronicecommerce-759e9",
  storageBucket: "electronicecommerce-759e9.appspot.com",
  messagingSenderId: "85966963261",
  appId: "1:85966963261:web:c690455198e9703e16a054",
  measurementId: "G-VWN0YLJ3D3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)

export default fireDB;