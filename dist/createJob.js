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
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
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
    // TODO: Logo
    constructor() {
        this.about = document.getElementById('about').value;
        this.title = document.getElementById('title').value;
        this.repons = document.getElementById('respons').value;
        this.gradeLevels = Array.from(document.getElementById('grade-level').selectedOptions).map(opt => opt.value);
        this.expirence = document.getElementById('expirence').value;
        this.time = document.getElementById('time').value;
        this.type = document.getElementById('type').value;
        this.workload = document.getElementById('workload').value;
        this.hourlyRateMin = parseFloat(document.getElementById('hourly-rate-min').value);
        this.hourlyRateMax = parseFloat(document.getElementById('hourly-rate-max').value);
        this.expirationDate = new Date(document.getElementById('expirationDate').value);
        this.college = Array.from(document.getElementById('college').selectedOptions).map(opt => opt.value);
        this.majors = Array.from(document.getElementById('majors').selectedOptions).map(opt => opt.value);
        this.maxApplicants = parseInt(document.getElementById('max-applications').value);
    }
    saveJob(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield set(ref(database, 'jobs/' + uid), {
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
                    maxApplicants: this.maxApplicants
                });
                console.log('User role saved to Realtime Database successfully.');
            }
            catch (error) {
                console.error('Error saving user role:', error);
            }
        });
    }
}
const form = document.getElementById('create-job');
form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const user = auth.currentUser;
    let uid = user ? user.uid : null;
    if (uid) {
        const createJob = new CreateJob();
        yield createJob.saveJob(uid);
    }
}));
function updateMajors() {
    const collegeSelect = document.getElementById('college');
    const majorsSelect = document.getElementById('majors');
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
//# sourceMappingURL=createJob.js.map