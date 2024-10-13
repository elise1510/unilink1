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
//majors
const majorsByCollege = {
    CAPPA: [
        { value: 'arch', text: 'Architecture' },
        { value: 'intDes', text: 'Interior Design' },
        { value: 'sustUD', text: 'Sustainable Urban Design' }
    ],
    CB: [
        { value: 'acct', text: 'Accounting' },
        { value: 'busAna', text: 'Business Analytics' },
        { value: 'econ', text: 'Economics' },
        { value: 'fin', text: 'Finance' },
        { value: 'infoSys', text: 'Information Systems' },
        { value: 'intBus', text: 'International Business-Foreign Language' },
        { value: 'mgt', text: 'Management' },
        { value: 'mkt', text: 'Marketing' },
        { value: 'osc', text: 'Operations and Supply Chain Management' },
        { value: 'realEst', text: 'Real Estate' }
    ],
    CE: [
        { value: 'edu', text: 'Education' }
    ],
    CEng: [
        { value: 'aeroEng', text: 'Aerospace Engineering' },
        { value: 'archEng', text: 'Architectural Engineering' },
        { value: 'bioEng', text: 'Biomedical Engineering' },
        { value: 'civilEng', text: 'Civil Engineering' },
        { value: 'compEng', text: 'Computer Engineering' },
        { value: 'cs', text: 'Computer Science' },
        { value: 'constMgt', text: 'Construction Management' },
        { value: 'elecEng', text: 'Electrical Engineering' },
        { value: 'indEng', text: 'Industrial Engineering' },
        { value: 'mechEng', text: 'Mechanical Engineering' },
        { value: 'resEng', text: 'Resource and Energy Engineering' },
        { value: 'softEng', text: 'Software Engineering' }
    ],
    CLA: [
        { value: 'anthro', text: 'Anthropology' },
        { value: 'apSoc', text: 'Applied Sociology' },
        { value: 'art', text: 'Art' },
        { value: 'artHist', text: 'Art History' },
        { value: 'comm', text: 'Communication' },
        { value: 'ccj', text: 'Criminology and Criminal Justice' },
        { value: 'clis', text: 'Critical Languages and International Studies' },
        { value: 'eng', text: 'English' },
        { value: 'french', text: 'French' },
        { value: 'hist', text: 'History' },
        { value: 'ling', text: 'Linguistics' },
        { value: 'music', text: 'Music' },
        { value: 'musicInd', text: 'Music Industry Studies' },
        { value: 'musicPerf', text: 'Music Performance' },
        { value: 'philant', text: 'Philanthropy' },
        { value: 'phil', text: 'Philosophy' },
        { value: 'polSci', text: 'Political Science' },
        { value: 'soc', text: 'Sociology' },
        { value: 'spanGC', text: 'Spanish for Global Competence' },
        { value: 'spanTI', text: 'Spanish Translation and Interpreting' },
        { value: 'theaArts', text: 'Theatre Arts' }
    ],
    CNHI: [
        { value: 'exSci', text: 'Exercise Science' },
        { value: 'kin', text: 'Kinesiology' },
        { value: 'nurs', text: 'Nursing' },
        { value: 'pubHealth', text: 'Public Health' }
    ],
    CS: [
        { value: 'biochem', text: 'Biochemistry' },
        { value: 'bioChem', text: 'Biological Chemistry' },
        { value: 'bio', text: 'Biology' },
        { value: 'chem', text: 'Chemistry' },
        { value: 'dataSci', text: 'Data Science' },
        { value: 'ees', text: 'Environmental and Earth Sciences' },
        { value: 'geol', text: 'Geology' },
        { value: 'math', text: 'Mathematics' },
        { value: 'medTech', text: 'Medication Technology' },
        { value: 'microbio', text: 'Microbiology' },
        { value: 'phys', text: 'Physics' },
        { value: 'psych', text: 'Psychology' }
    ],
    SSW: [
        { value: 'sw', text: 'Social Work' },
        { value: 'subUse', text: 'Substance Use and Treatment' }
    ]
};
// Class for handling user profile
class UserProfile {
    constructor() {
        this.fullName = document.getElementById('name').value;
        this.email = document.getElementById('email').value;
        this.phone = document.getElementById('phone').value;
        this.role = document.getElementById('role').value;
        this.department = document.getElementById('college').value;
        this.graduationYear = document.getElementById('graduation-year').value;
        this.major = document.getElementById('major').value;
        this.aboutMe = document.getElementById('about-me').value;
    }
    // Save user profile to Firebase Realtime Database
    saveProfile(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield set(ref(database, 'users/' + uid), {
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
                this.toggleEditProfile(false);
            }
            catch (error) {
                console.error('Error saving profile:', error);
            }
        });
    }
    // Load user profile from Firebase Realtime Database
    static loadProfile(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbRef = ref(database);
                const snapshot = yield get(child(dbRef, `users/${uid}`));
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    document.getElementById('name').value = data.fullName;
                    document.getElementById('email').value = data.email;
                    document.getElementById('phone').value = data.phone;
                    document.getElementById('role').value = data.role;
                    document.getElementById('college').value = data.department;
                    document.getElementById('graduation-year').value = data.graduationYear;
                    document.getElementById('major').value = data.major;
                    document.getElementById('about-me').value = data.aboutMe;
                    console.log('Profile loaded successfully.');
                }
                else {
                    console.log('No profile data found.');
                }
            }
            catch (error) {
                console.error('Error loading profile:', error);
            }
        });
    }
    // Update Firebase auth profile if needed
    updateAuthProfile(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = auth.currentUser;
            if (user && user.uid === uid) {
                try {
                    yield updateProfile(user, {
                        displayName: this.fullName,
                        phoneNumber: this.phone
                    });
                    console.log('Auth profile updated successfully.');
                }
                catch (error) {
                    console.error('Error updating auth profile:', error);
                }
            }
        });
    }
    toggleEditProfile(editMode) {
        const inputs = document.querySelectorAll('#user-profile input, #user-profile select, #user-profile textarea');
        inputs.forEach(input => {
            if (input.id === 'email' || input.id === 'role') {
                input.disabled = true;
            }
            else if (input.id === 'name') {
                if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                    input.readOnly = !editMode;
                }
            }
            else {
                if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                    input.readOnly = !editMode;
                }
                else if (input instanceof HTMLSelectElement) {
                    input.disabled = !editMode;
                }
            }
        });
        const editButton = document.getElementById('edit-profile-btn');
        const saveButton = document.getElementById('save-profile-btn');
        if (editMode) {
            editButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
        }
        else {
            editButton.style.display = 'inline-block';
            saveButton.style.display = 'none';
        }
    }
}
const editButton = document.getElementById('edit-profile-btn');
editButton.addEventListener('click', () => {
    const up = new UserProfile();
    up.toggleEditProfile(true);
});
// Event listener for profile form submission
const form = document.getElementById('user-profile');
form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        const profile = new UserProfile();
        yield profile.saveProfile(uid);
        yield profile.updateAuthProfile(uid);
        const up = new UserProfile();
        up.toggleEditProfile(false);
    }
}));
function updateMajors() {
    const collegeSelect = document.getElementById('college');
    const majorsSelect = document.getElementById('major');
    majorsSelect.innerHTML = '';
    const selectedColleges = Array.from(collegeSelect.selectedOptions).map(opt => opt.value);
    let majorsToShow = [];
    selectedColleges.forEach(college => {
        majorsToShow = majorsToShow.concat(majorsByCollege[college] || []);
    });
    majorsToShow.forEach(major => {
        const option = document.createElement('option');
        option.value = major.value;
        option.textContent = major.text;
        majorsSelect.appendChild(option);
    });
}
const collegeSelect = document.getElementById('college');
collegeSelect.addEventListener('change', updateMajors);
function loadUserData(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        if (uid) {
            const userRef = ref(database, 'users/' + uid);
            const snapshot = yield get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                document.getElementById('name').value = (userData === null || userData === void 0 ? void 0 : userData.name) || '';
                document.getElementById('email').value = (userData === null || userData === void 0 ? void 0 : userData.email) || '';
                document.getElementById('phone').value = (userData === null || userData === void 0 ? void 0 : userData.phone) || '';
                document.getElementById('role').value = (userData === null || userData === void 0 ? void 0 : userData.role) || '';
                document.getElementById('graduation-year').value = (userData === null || userData === void 0 ? void 0 : userData.graduationYear) || '';
                document.getElementById('college').value = (userData === null || userData === void 0 ? void 0 : userData.college) || '';
                document.getElementById('major').value = (userData === null || userData === void 0 ? void 0 : userData.majors) || '';
                document.getElementById('about-me').value = (userData === null || userData === void 0 ? void 0 : userData.aboutMe) || '';
            }
        }
    });
}
// Load current user's profile when the page loads
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Window loaded");
    const userString = localStorage.getItem('userinfo');
    if (userString) {
        const user = JSON.parse(userString);
        yield loadUserData(user.uid);
        // Now you can safely access user.uid
        console.log('User ID:', user.uid);
        console.log("user:", user);
        console.log("Current User:", user);
        const uid = user.uid;
        yield UserProfile.loadProfile(uid);
        console.log("fdasfda");
        const up = new UserProfile();
        up.toggleEditProfile(false);
    }
});
const tele = document.getElementById('phone');
if (tele) {
    tele.addEventListener('keyup', function (e) {
        if (e.key !== 'Backspace' && (tele.value.length === 3 || tele.value.length === 7)) {
            tele.value += '-';
        }
    });
}
//# sourceMappingURL=profile.js.map