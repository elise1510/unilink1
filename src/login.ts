// @ts-ignore
import { signInWithEmailAndPassword, getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';

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

// Firebase Import Block
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

class UserLogin {
    private email: string;
    private password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    async login(): Promise<void> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
            const user = userCredential.user;

            console.log(user)
            this.updateMessage(`Login successful. Welcome, ${user.email}!`, 'green');
            console.log('Login successful:', user);
            localStorage.setItem('userinfo', JSON.stringify({
                uid: user.uid,
                email: user.email,
                credentials: userCredential,
                user: userCredential.user
            }));


            window.location.href = 'profile.html';

        } catch (error: any) {
            if (error.code === 'auth/user-not-found') {
                this.updateMessage('No user found with this email.', 'red');
            } else if (error.code === 'auth/wrong-password') {
                this.updateMessage('Incorrect password.', 'red');
            } else {
                this.updateMessage(`Login failed: ${error.message}`, 'red');
            }
        }
    }

    private updateMessage(message: string, color: string): void {
        const messageDiv = document.getElementById('message') as HTMLElement;
        messageDiv.style.color = color;
        messageDiv.innerText = message;
    }

    static validateForm(email: string, password: string): boolean {
        const messageDiv = document.getElementById('message') as HTMLElement;
        if (!email.includes('@')) {
            messageDiv.style.color = 'red';
            messageDiv.innerText = 'Invalid email address';
            return false;
        }
        if (password.length < 6) {
            messageDiv.style.color = 'red';
            messageDiv.innerText = 'Password must be at least 6 characters long';
            return false;
        }
        return true;
    }
    static async autoLogin(): Promise<void> {
        const savedUser = localStorage.getItem('userinfo');
        if (savedUser) {
            const { email, password } = JSON.parse(savedUser);
            if (email && password) {
                const userLogin = new UserLogin(email, password);
                await userLogin.login();
            }
        }
    }
}



const form = document.getElementById('loginForm') as HTMLFormElement;
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (UserLogin.validateForm(email, password)) {
        const userLogin = new UserLogin(email, password);
        await userLogin.login();


    }
});


document.getElementById('register')?.addEventListener('click', () => {
    console.log('reg');
    window.location.href = 'registration.html';
});

window.onload = async () => {
    await UserLogin.autoLogin(); // Attempt autologin if credentials are saved
};