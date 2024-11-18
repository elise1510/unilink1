// @ts-ignore
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase, ref, onValue, DataSnapshot, get, set, child } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';
//@ts-ignore
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, UploadTaskSnapshot } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

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


class JobViewer {
    public jobId: string | null;

    constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        this.jobId = urlParams.get('id');
    }

    async getData() {
        if (!this.jobId) return;

        const jobRef = ref(database, 'jobs/' + this.jobId);
        const snapshot = await get(jobRef);
        if (snapshot) {
            const jobData = snapshot.val();
            console.log("jobData:", jobData);
            this.displayJobData(jobData);
        }
    }

    private displayJobData(jobData: any) {
        /*About*/
        this.displayJobLogo();
        this.setElementTextContent("about", jobData?.about, "not set");
        /*Title*/
        this.setElementTextContent("title", jobData?.title, "not set");

        //#region Colleges and Majors
        let jdColleges = jobData?.college ?? "Not set";
        let jdMajors = jobData?.majors ?? "Not set";

        if (jdMajors !== "Not set") {
            jdMajors = this.mapMajors(jdMajors);
            this.setElementTextContent("majors", jdMajors.join(', '), "Not set");
        }
        else {
            this.setElementTextContent("majors", jdMajors, "Not set");
        }
        if (jdColleges !== "Not set") {
            jdColleges = this.mapColleges(jdColleges);
            this.setElementTextContent("college", jdColleges.join(', '), "Not set");
        }
        else {
            this.setElementTextContent("college", jdColleges.join(', '), "Not set");
        }

        //const formMajors = document.getElementById("majors");
        // formMajors?.replaceChildren();
        //formMajors!.textContent = jdMajors.join(', ');

        //const formColleges = document.getElementById("college");
        //formColleges?.replaceChildren();
        // formColleges!.textContent = jdColleges.join(', ');

        //#endregion

        //Key Responsibilities
        this.setElementTextContent("respons", jobData?.repons, "Not Set");
        //Type
        this.capitalizeAndSetContent("type", jobData?.type, "Not Set");
        //Experience
        this.capitalizeAndSetContent("experience", jobData?.expirence, "Not Set");
        //Time
        this.capitalizeAndSetContent("time", jobData?.time, "Not Set");
        //Workload
        this.capitalizeAndSetContent("workload", jobData?.workload, "Not Set");
        //Year
        let jdGLs = jobData?.gradeLevels ?? "Not set";
        if (jdGLs !== "Not set") {
            jdGLs = this.mapGradeLevels(jdGLs);
            this.setElementTextContent("grade-level", jdGLs.join(', '), "Not set");
        }
        else {
            this.setElementTextContent("grade-level", jdGLs, "Not set");
        }
        //rate
        this.setHourlyRate(jobData?.hourlyRateMin, jobData?.hourlyRateMax);


    }

    private setElementTextContent(elementId: string, content: string, fallback: string) {
        const element = document.getElementById(elementId);
        element?.replaceChildren();
        element!.textContent = content || fallback;
    }

    private capitalizeAndSetContent(elementId: string, content: string, fallback: string) {
        const capitalizedContent = content ? content.charAt(0).toUpperCase() + content.slice(1) : fallback;
        this.setElementTextContent(elementId, capitalizedContent, fallback);
    }

    private mapMajors(majors: string[]): string[] {
        const fullMajors: string[] = [];
        Object.values(majorsByCollege).forEach(collegeMajors => {
            collegeMajors.forEach(major => {
                if (majors.includes(major.value)) {
                    fullMajors.push(major.text);
                }
            });
        });
        console.log(fullMajors);
        return fullMajors;
    }

    private mapColleges(collegeValues: string[]): string[] {
        const collegesByValue: { [key: string]: string } = {
            CAPPA: 'College of Architecture, Planning and Public Affairs',
            CB: 'College of Business',
            CE: 'College of Education',
            CEng: 'College of Engineering',
            CLA: 'College of Liberal Arts',
            CNHI: 'College of Nursing and Health Innovation',
            CS: 'College of Science',
            SSW: 'School of Social Work'
        };

        return collegeValues.map(value => collegesByValue[value] || 'Unknown College');
    }

    private mapGradeLevels(gradeValues: string[]): string[] {
        const gradesByValue: { [key: string]: string } = {
            fresh: 'Freshmen',
            soph: 'Sophomore',
            jun: 'Junior',
            sen: 'Senior'
        };

        return gradeValues.map(value => gradesByValue[value] || 'Unknown');
    }
    private setHourlyRate(minRate: number | null, maxRate: number | null) {
        const hourlyRateMin = document.getElementById("hourly-rate-min");
        const hourlyRateMax = document.getElementById("hourly-rate-max");

        const rateText = minRate !== null && maxRate !== null
            ? `$${minRate.toFixed(2)} - $${maxRate.toFixed(2)}`
            : "Not Set";

        hourlyRateMin!.textContent = rateText;
        hourlyRateMax!.textContent = "";
    }
    private async displayJobLogo() {
        const jobRef = ref(database, 'jobs/' + this.jobId);

        try {
            const snapshot: DataSnapshot = await get(jobRef);

            if (snapshot.exists()) {
                const jobData = snapshot.val();
                const logoUrl = jobData.logo;

                const logoImage = document.getElementById('logo-image') as HTMLImageElement;
                if (logoUrl) {
                    logoImage.src = logoUrl;
                } else {
                    console.log('No logo URL found for this job.');
                }
            } else {
                console.log('No job data found for the provided job ID.');
            }
        } catch (error) {
            console.error('Error fetching job logo:', error);
        }
    }
}

window.onload = () => {
    const viewer = new JobViewer();
    viewer.getData();



    const ResButton = document.getElementById("res") as HTMLInputElement;

    ResButton?.addEventListener("click", async () => {
        const userString = localStorage.getItem('userinfo');

        if (userString) {
            const user = JSON.parse(userString);
            const uid = user.uid;
            const jobId = viewer.jobId;

            if (jobId) {
                const db = getDatabase();
                const jobRef = ref(db, `jobs/${jobId}`);
                const applicantsRef = ref(db, `jobs/${jobId}/applicants`);


                let messageElement = document.getElementById("message");
                if (!messageElement) {
                    messageElement = document.createElement("div");
                    messageElement.id = "message";
                    document.body.appendChild(messageElement);
                }

                try {

                    const jobSnapshot = await get(jobRef);
                    if (jobSnapshot.exists()) {
                        const jobData = jobSnapshot.val();
                        const maxApplicants = jobData.maxApplicants;
                        const applicants = jobData.applicants ? jobData.applicants : {};
                        const currentApplicants = Object.keys(applicants).length;
                    
                        if (applicants[uid]) {
                            messageElement.textContent = "You have already applied for this job.";
                        } else if (currentApplicants < maxApplicants) {
                           
                            applicants[uid] = {
                                uid: uid,
                                accepted: false,
                                rejected: false
                            };
                    
                            
                            await set(jobRef, {
                                ...jobData,
                                applicants: applicants
                            });
                    
                            messageElement.textContent = "You have successfully applied for the job.";
                        } else {
                            messageElement.textContent = "This job is full.";
                        }
                    } else {
                        messageElement.textContent = "Job not found.";
                    }
                } catch (error) {
                    console.error("Error fetching job details:", error);
                    messageElement.textContent = "Error applying for the job.";
                }
            } else {
                console.error("Job ID not available.");
            }
        } else {
            console.error("User not found in localStorage");
        }
    });

};

const homeButton = document.getElementById("home") as HTMLInputElement;
homeButton.addEventListener('click', () => {
    window.location.href = "homepage.html";
});

