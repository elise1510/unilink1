// @ts-ignore
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';
import { doc } from 'firebase/firestore/lite';

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



class CreateJob {
    about: string;
    title: string;
    repons: string;
    gradeLevel: string;
    expirence: string;
    time: string;
    workload: string;
    type: string;
    hourlyRateMin: number;
    hourlyRateMax: number;
    expirationDate: Date;
    college: string[];
    majors: string[];
    maxApplicants: number;
    // TODO: Logo

    constructor() {
        this.about = (document.getElementById('about') as HTMLInputElement).value;
        this.title = (document.getElementById('title') as HTMLInputElement).value;
        this.repons = (document.getElementById('respons') as HTMLInputElement).value;
        this.gradeLevel = (document.getElementById('grade-level') as HTMLInputElement).value;
        this.expirence = (document.getElementById('expirence') as HTMLInputElement).value;
        this.time = (document.getElementById('time') as HTMLInputElement).value;
        this.type = (document.getElementById('type') as HTMLInputElement).value;
        this.workload = (document.getElementById('workload') as HTMLInputElement).value;
        this.hourlyRateMin = parseFloat((document.getElementById('hourly-rate-min') as HTMLInputElement).value);
        this.hourlyRateMax = parseFloat((document.getElementById('hourly-rate-max') as HTMLInputElement).value);
        this.expirationDate = new Date((document.getElementById('expirationDate') as HTMLInputElement).value);
        this.college = Array.from((document.getElementById('college') as HTMLSelectElement).selectedOptions).map(opt => opt.value);
        this.majors = Array.from((document.getElementById('majors') as HTMLSelectElement).selectedOptions).map(opt => opt.value);
        this.maxApplicants = parseInt((document.getElementById('max-applications') as HTMLInputElement).value);
    }
     async saveJob(uid: string) {
        try {
            await set(ref(database, 'jobs/' + uid), {
                uid: uid,
                about: this.about,
                title: this.title,
                repons: this.repons,
                gradeLevel: this.gradeLevel,
                expirence: this.expirence,
                time: this.time,
                workload: this.workload,
                type: this.type,
                hourlyRateMin: this.hourlyRateMin,
                hourlyRateMax: this.hourlyRateMax,
                expirationDate: this.expirationDate,
                college: this.college,
                majors: this.majors,
                maxApplicants: this.maxApplicants
            });
            console.log('User role saved to Realtime Database successfully.');
        } catch (error) {
            console.error('Error saving user role:', error);
        }
    }
}
const form = document.getElementById('create-job') as HTMLFormElement;
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    let uid = user ? user.uid : null;
    if (uid) {
        const createJob = new CreateJob();
        await createJob.saveJob(uid);
    }
});







