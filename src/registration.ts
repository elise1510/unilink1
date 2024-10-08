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

//  Firebase Import Block
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

class UserRegistration {
    private username: string;
    private email: string;
    private password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    private getUserRole(): string | null {
        const studentPattern = /^[a-z]{3}\d{4}@mavs\.uta\.edu$/i; // xxx####@mavs.uta.edu
        const staffPattern = /^[a-z]+\.[a-z]+@uta\.edu$/i; // name.name@uta.edu

        if (studentPattern.test(this.email)) {
            return 'student';
        } else if (staffPattern.test(this.email)) {
            return 'staff';
        }
        return null;
    }

    private updateMessage(message: string, color: string) {
        const messageDiv = document.getElementById('message') as HTMLElement;
        messageDiv.style.color = color;
        messageDiv.innerText = message;
    }


    private async saveUserRole(uid: string, role: string) {
        try {
            await set(ref(database, 'users/' + uid), {
                uid: uid,
                username: this.username,
                email: this.email,
                role: role
            });
            console.log('User role saved to Realtime Database successfully.');
        } catch (error) {
            console.error('Error saving user role:', error);
            this.updateMessage('Error saving user data. Please try again.', 'red');
        }
    }

    async register(): Promise<void> {
        try {
            const role = this.getUserRole();

            if (!role) {
                this.updateMessage('Invalid email pattern. Must be xxx####@mavs.uta.edu or name.name@uta.edu.', 'red');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: this.username });
            await this.saveUserRole(user.uid, role);

            this.updateMessage(`User registered successfully as a ${role}.`, 'green');
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                this.updateMessage('Email is already taken.', 'red');
            } else {
                this.updateMessage('Registration failed: ' + error.message, 'red');
            }
        }
    }

    static validateForm(username: string, email: string, password: string): boolean {
        if (username.length < 3) {
            const messageDiv = document.getElementById('message') as HTMLElement;
            messageDiv.style.color = 'red';
            messageDiv.innerText = 'Username must be at least 3 characters long';
            return false;
        }
        if (!email.includes('@')) {
            const messageDiv = document.getElementById('message') as HTMLElement;
            messageDiv.style.color = 'red';
            messageDiv.innerText = 'Invalid email address';
            return false;
        }
        if (password.length < 6) {
            const messageDiv = document.getElementById('message') as HTMLElement;
            messageDiv.style.color = 'red';
            messageDiv.innerText = 'Password must be at least 6 characters long';
            return false;
        }
        return true;
    }
}


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

document.getElementById('login')?.addEventListener('click', () => {window.location.href = 'login.html';});

//export {firebaseConfig};