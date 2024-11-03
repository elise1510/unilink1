// @ts-ignore
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Class for Event creation
class CreateEvent {
    about: string;
    title: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    type: string;
    targetAudience: string[];
    maxAttendees: number;
    expirationDate: Date;
    banner: string | null;

    constructor() {
        this.about = (document.getElementById('about') as HTMLInputElement).value;
        this.title = (document.getElementById('title') as HTMLInputElement).value;
        this.date = (document.getElementById('date') as HTMLInputElement).value;
        this.time = (document.getElementById('time') as HTMLInputElement).value;
        this.location = (document.getElementById('location') as HTMLInputElement).value;
        this.organizer = (document.getElementById('organizer') as HTMLInputElement).value;
        this.type = (document.getElementById('type') as HTMLSelectElement).value;
        this.targetAudience = Array.from((document.getElementById('targetAudience') as HTMLSelectElement).selectedOptions).map(opt => opt.value);
        this.maxAttendees = parseInt((document.getElementById('max-attendees') as HTMLInputElement).value);
        this.expirationDate = new Date((document.getElementById('expirationDate') as HTMLInputElement).value);

        const bannerFile = (document.getElementById('logo') as HTMLInputElement).files?.[0];
        this.banner = bannerFile ? URL.createObjectURL(bannerFile) : null; // Mock for storing file path. You'll likely use Firebase Storage for real images.
    }

    async saveEvent(uid: string) {
        try {
            await set(ref(database, 'events/' + uid), {
                uid: uid,
                about: this.about,
                title: this.title,
                date: this.date,
                time: this.time,
                location: this.location,
                organizer: this.organizer,
                type: this.type,
                targetAudience: this.targetAudience,
                maxAttendees: this.maxAttendees,
                expirationDate: this.expirationDate,
                banner: this.banner
            });
            console.log('Event saved to Realtime Database successfully.');
        } catch (error) {
            console.error('Error saving event:', error);
        }
    }
}

const form = document.getElementById('create-event') as HTMLFormElement;
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    let uid = user ? user.uid : null;
    if (uid) {
        const createEvent = new CreateEvent();
        await createEvent.saveEvent(uid);
    }
});
