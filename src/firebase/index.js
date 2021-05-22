import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBMC9VHhhdRNKWP2sG3Nd_qVc6h_Pczthk",
    authDomain: "humanstore-a6807.firebaseapp.com",
    databaseURL: "https://humanstore-a6807-default-rtdb.firebaseio.com",
    projectId: "humanstore-a6807",
    storageBucket: "humanstore-a6807.appspot.com",
    messagingSenderId: "872804914059",
    appId: "1:872804914059:web:2063d6e7d478d1e777158e",
    measurementId: "G-GKGS0L1V61"
}

  // Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const database = firebase.database()

export default firebase