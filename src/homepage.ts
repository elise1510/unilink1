// @ts-ignore
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase, ref, onValue, DataSnapshot } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';

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
class Homepage {
    private pepDisp: HTMLElement | null;
    private eveDisp: HTMLElement | null;
    private posDisp: HTMLElement | null;
    private pepLabel: HTMLElement | null;
    private eveLabel: HTMLElement | null;
    private posLabel: HTMLElement | null;

    constructor() {
        this.pepDisp = document.querySelector('.pep-disp');
        this.eveDisp = document.querySelector('.eve-disp');
        this.posDisp = document.querySelector('.pos-disp');
        this.pepLabel = document.getElementById('pep-label');
        this.eveLabel = document.getElementById('eve-label');
        this.posLabel = document.getElementById('pos-label');
        this.initTabListeners();
        this.initLabelListeners();
    }

    initTabListeners() {
        document.querySelectorAll('input[name="tab"]').forEach((radio) => {
            const inputRadio = radio as HTMLInputElement;

            inputRadio.addEventListener('change', () => {
                if (inputRadio.value === 'pep' && this.pepDisp && this.eveDisp && this.posDisp) {
                    this.pepDisp.classList.add('active');
                    this.pepDisp.style.display = 'block';
                    this.eveDisp.classList.remove('active');
                    this.eveDisp.style.display = 'none';
                    this.posDisp.classList.remove('active');
                    this.posDisp.style.display = 'none';
                    this.displayUsersData();
                } else if (inputRadio.value === 'eve' && this.pepDisp && this.eveDisp && this.posDisp) {
                    this.pepDisp.classList.remove('active');
                    this.pepDisp.style.display = 'none';
                    this.eveDisp.classList.add('active');
                    this.eveDisp.style.display = 'block';
                    this.posDisp.classList.remove('active');
                    this.posDisp.style.display = 'none';
                } else if (inputRadio.value === 'pos' && this.pepDisp && this.eveDisp && this.posDisp) {
                    this.pepDisp.classList.remove('active');
                    this.pepDisp.style.display = 'none';
                    this.eveDisp.classList.remove('active');
                    this.eveDisp.style.display = 'none';
                    this.posDisp.classList.add('active');
                    this.posDisp.style.display = 'block';
                    this.displayJobsData();
                }
            });
        });
    }

    initLabelListeners() {
        if (this.pepLabel && this.posLabel && this.eveLabel) {
            this.pepLabel.addEventListener('click', () => {
                this.pepLabel!.classList.add('active');
                this.eveLabel!.classList.remove('active');
                this.posLabel!.classList.remove('active');
            });
            this.eveLabel.addEventListener('click', () => {
                this.pepLabel!.classList.remove('active');
                this.eveLabel!.classList.add('active');
                this.posLabel!.classList.remove('active');
            });
            this.posLabel.addEventListener('click', () => {
                this.pepLabel!.classList.remove('active');
                this.eveLabel!.classList.remove('active');
                this.posLabel!.classList.add('active');
            });
        }
    }

    displayUsersData() {
        const usersRef = ref(database, 'users');
        if (this.pepDisp) {
            onValue(usersRef, (snapshot: DataSnapshot) => {
                this.pepDisp!.innerHTML = '';
                snapshot.forEach((childSnapshot: DataSnapshot) => {
                    const userData = childSnapshot.val();
                    const fullName = userData?.fullName ?? "Not set yet";
                    const major = userData?.major ?? "Not set yet";
                    const userDiv = document.createElement('div');
                    userDiv.classList.add('user-entry');
                    userDiv.style.marginBottom = '10px';
                    let fullMajor = major != "Not set yet" ? this.mapMajors(major) : "Not set yet";

                    userDiv.innerHTML = `
                        <strong>Name:</strong> ${fullName} <br>
                        <strong>Major:</strong> ${fullMajor}
                    `;
                    //the following is for pfp
                    // const squareDiv = document.createElement('div');
                    //squareDiv.classList.add('grey-square');
                    //pepDisp.prepend(squareDiv);
                    userDiv.classList.add('entry');
                    userDiv.style.marginBottom = '10px';
                    this.pepDisp!.appendChild(userDiv);
                });
            });
        }
    }

    displayJobsData() {
        const positionsRef = ref(database, 'jobs');
        if (this.posDisp) {
            onValue(positionsRef, (snapshot: DataSnapshot) => {
                this.posDisp!.innerHTML = '';
                snapshot.forEach((levelSnapshot: DataSnapshot) => {
                    const Refkey = levelSnapshot.key;
                    const positionData = levelSnapshot.val();
                    const { title, hourlyRateMin, hourlyRateMax, majors } = positionData;
                    const fullMajors = this.mapMajors(majors);
                    const positionDiv = document.createElement('div');
                    positionDiv.classList.add('entry');
                    positionDiv.style.marginBottom = '10px';
                    positionDiv.innerHTML = `
                        <strong>Title:</strong> ${title || "No Title"} <br>
                        <strong>Hourly Rate Min:</strong> $${hourlyRateMin} <br>
                        <strong>Hourly Rate Max:</strong> $${hourlyRateMax} <br>
                        <strong>Majors:</strong> ${fullMajors.join(', ') || "No Majors"}
                    `;
                    positionDiv.addEventListener('click', () => {
                        window.location.href = "viewJob.html?id=" + Refkey;

                    });
                    // the following is for pfp
                    //const squareDiv = document.createElement('div');
                    //squareDiv.classList.add('grey-square');
                    ///positionDiv.prepend(squareDiv);
                    this.posDisp!.appendChild(positionDiv);
                });
            });
        }
    }

    mapMajors(majors: string[]): string[] {
        const fullMajors: string[] = [];
        Object.values(majorsByCollege).forEach(collegeMajors => {
            collegeMajors.forEach(major => {
                if (majors.includes(major.value)) {
                    fullMajors.push(major.text);
                }
            });
        });
        return fullMajors;
    }
}

window.onload = () => {
    const homepage = new Homepage();
    const pepRadioButton = document.getElementById('pep') as HTMLInputElement;
    if (pepRadioButton.checked) {
        homepage.displayUsersData();
    }
};
