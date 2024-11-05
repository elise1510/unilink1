// @ts-ignore
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase, ref, set, DataSnapshot, onValue, get, set } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';
//@ts-ignore
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, UploadTaskSnapshot } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

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
const storage = getStorage();
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
    bannerFile: File | null;

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
        this.bannerFile = (document.getElementById('logo') as HTMLInputElement).files?.[0] || null;
        //const bannerFile = (document.getElementById('logo') as HTMLInputElement).files?.[0];
        // this.banner = bannerFile ? URL.createObjectURL(bannerFile) : null; // Mock for storing file path. You'll likely use Firebase Storage for real images.
    }

    async saveEvent(uid: string) {
        let now: Date = new Date();
        const userRef = ref(database, 'users/' + uid);
        const snapshot: DataSnapshot = await get(userRef);
        let poster = "Name Not Set";
        if (snapshot.exists()) {
            const userData = snapshot.val();
            poster = userData?.name;
        }
        if (poster === undefined) {
            poster = "Name Not Set";
        }
        let uniqueKey = uid + this.title;
        let i = 0;
        let check = await this.checkForMatch(uniqueKey);
        let change = false;
        console.log("check:", check);
        while (check === false) {
            i++;
            console.log("match outside of loop");
            check = await this.checkForMatch(uniqueKey + i);
            change = true;
        }
        if (check === true && change === true) {
            uniqueKey = uniqueKey + i;
        }
        let logoUrl = '';
        if (this.bannerFile) {
            const sref = storageRef(storage, 'eventBanners/' + uniqueKey);
            await uploadBytesResumable(sref, this.bannerFile);
            logoUrl = await getDownloadURL(sref);
        }
        try {
            if (this.bannerFile) {
                await set(ref(database, 'events/' + uniqueKey), {
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
                    banner: logoUrl,
                    DatePosted: now,
                    postedBy: poster
                });
            }
            else {
                await set(ref(database, 'events/' + uniqueKey), {
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
                    banner: logoUrl,
                    DatePosted: now,
                    postedBy: poster
                });
            }
            console.log('Event saved to Realtime Database successfully.');
        } catch (error) {
            console.error('Error saving event:', error);
        }
    }


    async checkForMatch(uniqueKey: string): Promise<boolean> {
        const eventRef = ref(database, 'events');
        const snapshot = await get(eventRef);

        let match = true;

        snapshot.forEach((levelSnapshot: DataSnapshot) => {
            const compKey = levelSnapshot.key;
            if (compKey === uniqueKey) {
                match = false;
            }
        });

        return match;
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
