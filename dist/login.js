var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
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
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userCredential = yield signInWithEmailAndPassword(auth, this.email, this.password);
                const user = userCredential.user;
                console.log(user);
                this.updateMessage(`Login successful. Welcome, ${user.email}!`, 'green');
                console.log('Login successful:', user);
                localStorage.setItem('userinfo', JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    credentials: userCredential,
                    user: userCredential.user
                }));
                window.location.href = 'profile.html';
            }
            catch (error) {
                if (error.code === 'auth/user-not-found') {
                    this.updateMessage('No user found with this email.', 'red');
                }
                else if (error.code === 'auth/wrong-password') {
                    this.updateMessage('Incorrect password.', 'red');
                }
                else {
                    this.updateMessage(`Login failed: ${error.message}`, 'red');
                }
            }
        });
    }
    updateMessage(message, color) {
        const messageDiv = document.getElementById('message');
        messageDiv.style.color = color;
        messageDiv.innerText = message;
    }
    static validateForm(email, password) {
        const messageDiv = document.getElementById('message');
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
}
const form = document.getElementById('loginForm');
form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (UserLogin.validateForm(email, password)) {
        const userLogin = new UserLogin(email, password);
        yield userLogin.login();
    }
}));
(_a = document.getElementById('register')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    console.log('reg');
    window.location.href = 'registration.html';
});
//# sourceMappingURL=login.js.map