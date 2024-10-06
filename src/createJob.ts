// @ts-ignore
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3Eau1V4XxcHMrV02FxIuXprFpb2NR510",
    authDomain: "unilink-e97ac.firebaseapp.com",
    projectId: "unilink-e97ac",
    storageBucket: "unilink-e97ac.appspot.com",
    messagingSenderId: "273956700882",
    appId: "1:273956700882:web:c14a46a0074d9c8fed230b",
    measurementId: "G-NGJJN6W8ZC"
};

//  Firebase Import Blockk
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);








class jobs{
    about: string;
    title: string;
    repons: string;







    constructor(){
        this.about = (document.getElementById('about') as HTMLInputElement).value;
        this.title = (document.getElementById('title') as HTMLInputElement).value;
        this.repons = (document.getElementById('respons') as HTMLInputElement).value;
        

    }
}