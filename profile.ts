// @ts-ignore
import { getAuth, updateProfile } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase, ref, get, set, child } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';

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

// Class for handling user profile
class UserProfile {
    fullName: string;
    email: string;
    phone: string;
    role: string;
    department: string;
    graduationYear: string;
    major: string;
    aboutMe: string;

    constructor() {
        this.fullName = (document.getElementById('name') as HTMLInputElement).value;
        this.email = (document.getElementById('email') as HTMLInputElement).value;
        this.phone = (document.getElementById('phone') as HTMLInputElement).value;
        this.role = (document.getElementById('role') as HTMLSelectElement).value;
        this.department = (document.getElementById('department') as HTMLSelectElement).value;
        this.graduationYear = (document.getElementById('graduation-year') as HTMLInputElement).value;
        this.major = (document.getElementById('major') as HTMLSelectElement).value;
        this.aboutMe = (document.getElementById('about-me') as HTMLInputElement).value;
    }

    // Save user profile to Firebase Realtime Database
    async saveProfile(uid: string) {
        try {
            await set(ref(database, 'users/' + uid), {
                fullName: this.fullName,
                email: this.email,
                phone: this.phone,
                role: this.role,
                department: this.department,
                graduationYear: this.graduationYear,
                major: this.major,
                aboutMe: this.aboutMe
            });
            console.log('Profile saved successfully.');
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    }

    // Load user profile from Firebase Realtime Database
    static async loadProfile(uid: string) {
        try {
            const dbRef = ref(database);
            const snapshot = await get(child(dbRef, `users/${uid}`));
            if (snapshot.exists()) {
                const data = snapshot.val();
                (document.getElementById('name') as HTMLInputElement).value = data.fullName;
                (document.getElementById('email') as HTMLInputElement).value = data.email;
                (document.getElementById('phone') as HTMLInputElement).value = data.phone;
                (document.getElementById('role') as HTMLSelectElement).value = data.role;
                (document.getElementById('department') as HTMLSelectElement).value = data.department;
                (document.getElementById('graduation-year') as HTMLInputElement).value = data.graduationYear;
                (document.getElementById('major') as HTMLSelectElement).value = data.major;
                (document.getElementById('about-me') as HTMLTextAreaElement).value = data.aboutMe;
                console.log('Profile loaded successfully.');
            } else {
                console.log('No profile data found.');
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    }

    // Update Firebase auth profile if needed
    async updateAuthProfile(uid: string) {
        const user = auth.currentUser;
        if (user && user.uid === uid) {
            try {
                await updateProfile(user, {
                    displayName: this.fullName,
                    phoneNumber: this.phone
                });
                console.log('Auth profile updated successfully.');
            } catch (error) {
                console.error('Error updating auth profile:', error);
            }
        }
    }
}

// Event listener for profile form submission
const form = document.getElementById('user-profile') as HTMLFormElement;
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        const profile = new UserProfile();
        await profile.saveProfile(uid);
        await profile.updateAuthProfile(uid);
    }
});

// Load the current user's profile when the page loads
window.onload = async () => {
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        await UserProfile.loadProfile(uid);
    }
};
