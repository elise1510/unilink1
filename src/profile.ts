// @ts-ignore
import { getAuth, updateProfile } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase, ref, get, set, update, child, DataSnapshot } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';
//@ts-ignore
import { getStorage,  ref as storageRef, uploadBytesResumable, getDownloadURL, UploadTaskSnapshot } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

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
                console.log(data);
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
    toggleEditProfile(editMode: boolean) {
        const inputs = document.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
            '#user-profile input, #user-profile select, #user-profile textarea'
        );

        inputs.forEach(input => {
            if (input.id === 'email' || input.id === 'role') {
                input.disabled = true;
            } else if (input.id === 'name') {
                if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                    input.readOnly = !editMode;
                }
            } else {
                if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                    input.readOnly = !editMode;
                } else if (input instanceof HTMLSelectElement) {
                    input.disabled = !editMode;
                }
            }
        });

        const editButton = document.getElementById('edit-profile-btn') as HTMLButtonElement;
        const saveButton = document.getElementById('save-profile-btn') as HTMLButtonElement;

        if (editMode) {
            editButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
        } else {
            editButton.style.display = 'inline-block';
            saveButton.style.display = 'none';
        }
    }
}


const editButton = document.getElementById('edit-profile-btn') as HTMLButtonElement;
editButton.addEventListener('click', () => {
    const up = new UserProfile();
    up.toggleEditProfile(true);
});
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
        const up = new UserProfile();
        up.toggleEditProfile(false);
    }
});
function updateMajors() {
    const collegeSelect = document.getElementById('college') as HTMLSelectElement;
    const majorsSelect = document.getElementById('major') as HTMLSelectElement;

    majorsSelect.innerHTML = '';

    const selectedColleges = Array.from(collegeSelect.selectedOptions).map(opt => opt.value) as Array<keyof typeof majorsByCollege>;

    let majorsToShow: { value: string, text: string }[] = [];
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

const collegeSelect = document.getElementById('college') as HTMLSelectElement;
collegeSelect.addEventListener('change', updateMajors);
async function loadUserData(uid: string) {
    if (uid) {
        const userRef = ref(database, 'users/' + uid);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const userData = snapshot.val();
            (document.getElementById('name') as HTMLInputElement).value = userData?.name || '';
            (document.getElementById('email') as HTMLInputElement).value = userData?.email || '';
            (document.getElementById('phone') as HTMLInputElement).value = userData?.phone || '';
            (document.getElementById('role') as HTMLSelectElement).value = userData?.role || '';
            (document.getElementById('graduation-year') as HTMLInputElement).value = userData?.graduationYear || '';
            (document.getElementById('college') as HTMLSelectElement).value = userData?.college || '';
            (document.getElementById('major') as HTMLSelectElement).value = userData?.majors || '';
            (document.getElementById('about-me') as HTMLTextAreaElement).value = userData?.aboutMe || '';
        }
    }
}
// Load current user's profile when the page loads
window.onload = async () => {
    console.log("Window loaded");
    const userString = localStorage.getItem('userinfo');
    if (userString) {
        const user = JSON.parse(userString);
        console.log("Current User:", user);
        const uid = user.uid;
        await UserProfile.loadProfile(uid)
        console.log("fdasfda");
        const up = new UserProfile();
        up.toggleEditProfile(false);
        loadProfilePicture();
    }
};

const tele = document.getElementById('phone') as HTMLInputElement;
if (tele) {
    tele.addEventListener('keyup', function (e: KeyboardEvent) {
        if (e.key !== 'Backspace' && (tele.value.length === 3 || tele.value.length === 7)) {
            tele.value += '-';
        }
    });
}
const homeButton = document.getElementById("home") as HTMLInputElement;
homeButton.addEventListener('click', () => {
    window.location.href = "homepage.html";
});

document.getElementById("uploadProfileBtn")?.addEventListener("click", async () => {
    const userString = localStorage.getItem('userinfo');
    if (userString) {
        const user = JSON.parse(userString);
        const uid = user.uid;

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.click();

        fileInput.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const storage = getStorage(); // Ensure storage is initialized
                const storageRefPath = storageRef(storage, 'profile-pictures/' + uid);

                const uploadTask = uploadBytesResumable(storageRefPath, file);

                uploadTask.on('state_changed',
                    (snapshot: UploadTaskSnapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload is ${progress}% done`);
                    },
                    (error: any) => {
                        console.error("Upload failed:", error);
                    },
                    async () => {
                        try {
                            const downloadURL: string = await getDownloadURL(uploadTask.snapshot.ref);
                            console.log("File available at:", downloadURL);

                            const db = getDatabase();
                            const profileUpdates = {
                                ['profile-pictures/' + uid]: downloadURL
                            };

                            await update(ref(db), profileUpdates);
                            console.log("Profile picture URL updated in Realtime Database.");

                            // Load the profile picture after updating the URL
                            loadProfilePicture();
                        } catch (error) {
                            console.error("Error getting download URL or updating database:", error);
                        }
                    }
                );
            }
        };
    } else {
        console.error("User not found in localStorage");
    }
});

async function loadProfilePicture() {
    const userString = localStorage.getItem('userinfo');
    if (userString) {
        const user = JSON.parse(userString);
        const uid: string = user.uid;

        const storage = getStorage();
        const db = getDatabase();

        const profilePicRef = storageRef(storage, `profile-pictures/${uid}`);

        try {
            const downloadURL: string = await getDownloadURL(profilePicRef);
            const profileImage: HTMLImageElement | null = document.getElementById('profileImage') as HTMLImageElement;
            console.log(profileImage);
            if (profileImage) {
                profileImage.src = downloadURL;
            }
        } catch (error: any) {
            console.error("Error fetching profile picture:", error);
        }
    }
}
document.getElementById("uploadResBtn")?.addEventListener("click", async () => {
    const userString = localStorage.getItem('userinfo');
    if (userString) {
        const user = JSON.parse(userString);
        const uid = user.uid;

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.doc,.docx,.pdf'
        fileInput.click();

        fileInput.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const storage = getStorage();
                const storageRefPath = storageRef(storage, 'resume/' + uid);
                console.log("Starting file upload...");
                const uploadTask = uploadBytesResumable(storageRefPath, file);

                uploadTask.on('state_changed',
                    (snapshot: UploadTaskSnapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                       // console.log('Upload is ' + progress + '% done');
                    },
                    (error: any) => {
                        console.error("Upload failed:", error);
                    },
                    async () => {
                        try {
                            const downloadURL: string = await getDownloadURL(uploadTask.snapshot.ref);
                            console.log("File uploaded successfully. Download URL:", downloadURL);

                            const db = getDatabase();
                            const profileUpdates = {
                                ['resume/' + uid]: downloadURL 
                            };

                            await update(ref(db), profileUpdates);
                            console.log("Resume URL updated successfully in Realtime Database.");

                           
                        } catch (error) {
                            console.error("Error handling file upload or updating database:", error);
                        }
                    }
                );
            } else {
                console.error("No file selected.");
            }
        };
    } else {
        console.error("User not found in localStorage");
    }
});
