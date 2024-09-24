var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); // Realtime Database initialization
class UserRegistration {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    getUserRole() {
        const studentPattern = /^[a-z]{3}\d{4}@mavs\.uta\.edu$/i; // xxx####@mavs.uta.edu
        const staffPattern = /^[a-z]+\.[a-z]+@uta\.edu$/i; // name.name@uta.edu
        if (studentPattern.test(this.email)) {
            return 'student';
        }
        else if (staffPattern.test(this.email)) {
            return 'staff';
        }
        return null;
    }
    updateMessage(message, color) {
        const messageDiv = document.getElementById('message');
        messageDiv.style.color = color;
        messageDiv.innerText = message;
    }
    // Save user role in Realtime Database
    saveUserRole(uid, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield set(ref(database, 'users/' + uid), {
                    username: this.username,
                    email: this.email,
                    role: role
                });
                console.log('User role saved to Realtime Database successfully.');
            }
            catch (error) {
                console.error('Error saving user role:', error);
                this.updateMessage('Error saving user data. Please try again.', 'red');
            }
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = this.getUserRole();
                if (!role) {
                    this.updateMessage('Invalid email pattern. Must be xxx####@mavs.uta.edu or name.name@uta.edu.', 'red');
                    return;
                }
                const userCredential = yield createUserWithEmailAndPassword(auth, this.email, this.password);
                const user = userCredential.user;
                yield updateProfile(user, { displayName: this.username });
                yield this.saveUserRole(user.uid, role); // Save user role in Realtime Database
                this.updateMessage(`User registered successfully as a ${role}.`, 'green');
            }
            catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    this.updateMessage('Email is already taken.', 'red');
                }
                else {
                    this.updateMessage('Registration failed: ' + error.message, 'red');
                }
            }
        });
    }
    static validateForm(username, email, password) {
        if (username.length < 3) {
            const messageDiv = document.getElementById('message');
            messageDiv.style.color = 'red';
            messageDiv.innerText = 'Username must be at least 3 characters long';
            return false;
        }
        if (!email.includes('@')) {
            const messageDiv = document.getElementById('message');
            messageDiv.style.color = 'red';
            messageDiv.innerText = 'Invalid email address';
            return false;
        }
        if (password.length < 6) {
            const messageDiv = document.getElementById('message');
            messageDiv.style.color = 'red';
            messageDiv.innerText = 'Password must be at least 6 characters long';
            return false;
        }
        return true;
    }
}
// Handling form submission
const form = document.getElementById('registrationForm');
form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (UserRegistration.validateForm(username, email, password)) {
        const userRegistration = new UserRegistration(username, email, password);
        yield userRegistration.register();
    }
}));
//# sourceMappingURL=registration.js.map