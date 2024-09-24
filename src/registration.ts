// @ts-ignore
import { createUserWithEmailAndPassword,updateProfile,getAuth} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
//import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js'
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

class UserRegistration {
    private username: string;
    private email: string;
    private password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    async register(): Promise<void> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: this.username });

            console.log('User registered successfully:', user);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    static validateForm(username: string, email: string, password: string): boolean {
        if (username.length < 3) {
            console.error('Username must be at least 3 characters long');
            return false;
        }
        if (!email.includes('@')) {
            console.error('Invalid email address');
            return false;
        }
        if (password.length < 6) {
            console.error('Password must be at least 6 characters long');
            return false;
        }
        return true;
    }
}

// Handling form submission
const form = document.getElementById('registrationForm') as HTMLFormElement;
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (UserRegistration.validateForm(username, email, password)) {
        const userRegistration = new UserRegistration(username, email, password);
        await userRegistration.register();
    }
});