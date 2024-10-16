// @ts-ignore
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase, ref, set, DataSnapshot, onValue, get, set } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';
import { doc } from 'firebase/firestore/lite';

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

//  Firebase Import Blockk
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



class CreateJob {
    about: string;
    title: string;
    repons: string;
    gradeLevels: string [];
    expirence: string;
    time: string;
    workload: string;
    type: string;
    hourlyRateMin: number;
    hourlyRateMax: number;
    expirationDate: Date;
    college: string[];
    majors: string[];
    maxApplicants: number;
    // TODO: Logo

    constructor() {
        this.about = (document.getElementById('about') as HTMLInputElement).value;
        this.title = (document.getElementById('title') as HTMLInputElement).value;
        this.repons = (document.getElementById('respons') as HTMLInputElement).value;
        this.gradeLevels = Array.from((document.getElementById('grade-level') as HTMLSelectElement).selectedOptions).map(opt => opt.value);
        this.expirence = (document.getElementById('expirence') as HTMLInputElement).value;
        this.time = (document.getElementById('time') as HTMLInputElement).value;
        this.type = (document.getElementById('type') as HTMLInputElement).value;
        this.workload = (document.getElementById('workload') as HTMLInputElement).value;
        this.hourlyRateMin = parseFloat((document.getElementById('hourly-rate-min') as HTMLInputElement).value);
        this.hourlyRateMax = parseFloat((document.getElementById('hourly-rate-max') as HTMLInputElement).value);
        this.expirationDate = new Date((document.getElementById('expirationDate') as HTMLInputElement).value);
        this.college = Array.from((document.getElementById('college') as HTMLSelectElement).selectedOptions).map(opt => opt.value);
        this.majors = Array.from((document.getElementById('majors') as HTMLSelectElement).selectedOptions).map(opt => opt.value);
        this.maxApplicants = parseInt((document.getElementById('max-applications') as HTMLInputElement).value);
    }
     async saveJob(uid: string) {
        let now: Date =  new Date();
        const userRef = ref(database, 'users/' + uid);
        const snapshot: DataSnapshot = await get(userRef);
        let poster =  "Name Not Set";
        if (snapshot.exists()) {
            const userData = snapshot.val();
            poster = userData?.name;
        }
        if(poster === undefined)
        {
            poster =  "Name Not Set";
        }
        let uniqueKey = uid + this.title;
        let i = 0;
        let check= await checkForMatch(uniqueKey);
        let change = false;
        console.log("check:",check);
        while(check === false){
            i++;
            console.log("match outside of loop");
            check = await checkForMatch(uniqueKey+i);
            change = true;
        }
        if(check === true && change === true){
            uniqueKey = uniqueKey + i;
        }

        try {
            await set(ref(database, 'jobs/' + uniqueKey), {
                uid: uid,
                about: this.about,
                title: this.title,
                repons: this.repons,
                gradeLevels: this.gradeLevels,
                expirence: this.expirence,
                time: this.time,
                workload: this.workload,
                type: this.type,
                hourlyRateMin: this.hourlyRateMin,
                hourlyRateMax: this.hourlyRateMax,
                expirationDate: this.expirationDate,
                college: this.college,
                majors: this.majors,
                maxApplicants: this.maxApplicants,
                DatePosted: now,
                postedBy: poster
            });
            console.log('User role saved to Realtime Database successfully.');
        } catch (error) {
            console.error('Error saving user role:', error);
        }
    }
}
const form = document.getElementById('create-job') as HTMLFormElement;
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    let uid = user ? user.uid : null;
    if (uid) {
        const createJob = new CreateJob();
        await createJob.saveJob(uid);
    }
});

function updateMajors() {
    const collegeSelect = document.getElementById('college') as HTMLSelectElement;
    const majorsSelect = document.getElementById('majors') as HTMLSelectElement;

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





async function checkForMatch(uniqueKey: string): Promise<boolean> {
    const jobRef = ref(database, 'jobs');
    const snapshot = await get(jobRef);

    let match = true;

    snapshot.forEach((levelSnapshot: DataSnapshot) => {
        const compKey = levelSnapshot.key;
        if (compKey === uniqueKey) {
            match = false;
        }
    });

    return match;
}
