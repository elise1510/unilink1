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

// Majors by college
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
        this.department = (document.getElementById('college') as HTMLSelectElement).value;
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
            this.toggleEditProfile(false);
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
                (document.getElementById('college') as HTMLSelectElement).value = data.department;
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

    // Toggle the edit profile view
    toggleEditProfile(edit: boolean) {
        const editProfileElements = document.querySelectorAll('.editable');
        editProfileElements.forEach(element => {
            element.toggleAttribute('disabled', !edit);
        });
    }
}

// Event listeners
window.onload = () => {
    const user = auth.currentUser;
    if (user) {
        UserProfile.loadProfile(user.uid);
    }

    document.getElementById('save-button')?.addEventListener('click', async () => {
        const userProfile = new UserProfile();
        const user = auth.currentUser;
        if (user) {
            await userProfile.saveProfile(user.uid);
            await userProfile.updateAuthProfile(user.uid);
        }
    });

    document.getElementById('edit-button')?.addEventListener('click', () => {
        const userProfile = new UserProfile();
        userProfile.toggleEditProfile(true);
    });
};

// Populate major select options based on the selected college
document.getElementById('college')?.addEventListener('change', function () {
    const majorSelect = document.getElementById('major') as HTMLSelectElement;
    majorSelect.innerHTML = ''; // Clear existing options

    const selectedCollege = this.value;
    if (majorsByCollege[selectedCollege]) {
        majorsByCollege[selectedCollege].forEach((major) => {
            const option = document.createElement('option');
            option.value = major.value;
            option.text = major.text;
            majorSelect.appendChild(option);
        });
    }
});
