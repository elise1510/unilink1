// @ts-ignore
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase, get, ref, onValue, DataSnapshot, update } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';
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
class Homepage {
    private accDisp: HTMLElement | null;
    private newDisp: HTMLElement | null;
    private rejDisp: HTMLElement | null;
    private accLabel: HTMLElement | null;
    private newLabel: HTMLElement | null;
    private rejLabel: HTMLElement | null;
    private jobId: string | null;
    constructor() {
        this.accDisp = document.querySelector('.acc-disp');
        this.newDisp = document.querySelector('.new-disp');
        this.rejDisp = document.querySelector('.rej-disp');
        this.accLabel = document.getElementById('acc-label');
        this.newLabel = document.getElementById('new-label');
        this.rejLabel = document.getElementById('rej-label');
        const urlParams = new URLSearchParams(window.location.search);
        this.jobId = urlParams.get('id');
        this.initTabListeners();
        this.initLabelListeners();
    }
    initTabListeners() {
        document.querySelectorAll('input[name="tab"]').forEach((radio) => {
            const inputRadio = radio as HTMLInputElement;

            inputRadio.addEventListener('change', () => {
                if (inputRadio.value === 'acc' && this.accDisp && this.newDisp && this.rejDisp) {
                    this.accDisp.classList.add('active');
                    this.accDisp.style.display = 'block';
                    this.newDisp.classList.remove('active');
                    this.newDisp.style.display = 'none';
                    this.rejDisp.classList.remove('active');
                    this.rejDisp.style.display = 'none';
                    this.displayAcc();
                } else if (inputRadio.value === 'new' && this.accDisp && this.newDisp && this.rejDisp) {
                    this.accDisp.classList.remove('active');
                    this.accDisp.style.display = 'none';
                    this.newDisp.classList.add('active');
                    this.newDisp.style.display = 'block';
                    this.rejDisp.classList.remove('active');
                    this.rejDisp.style.display = 'none';
                    this.displayNew();
                } else if (inputRadio.value === 'rej' && this.accDisp && this.newDisp && this.rejDisp) {
                    this.accDisp.classList.remove('active');
                    this.accDisp.style.display = 'none';
                    this.newDisp.classList.remove('active');
                    this.newDisp.style.display = 'none';
                    this.rejDisp.classList.add('active');
                    this.rejDisp.style.display = 'block';
                    //this.displayJobsData();
                }
            });
        });
    }

    initLabelListeners() {
        if (this.accLabel && this.rejLabel && this.newLabel) {
            this.accLabel.addEventListener('click', () => {
                this.accLabel!.classList.add('active');
                this.newLabel!.classList.remove('active');
                this.rejLabel!.classList.remove('active');
            });
            this.newLabel.addEventListener('click', () => {
                this.accLabel!.classList.remove('active');
                this.newLabel!.classList.add('active');
                this.rejLabel!.classList.remove('active');
            });
            this.rejLabel.addEventListener('click', () => {
                this.accLabel!.classList.remove('active');
                this.newLabel!.classList.remove('active');
                this.rejLabel!.classList.add('active');
            });
        }
    }

    async displayAcc() {
        const jobRef = ref(database, `jobs/${this.jobId}`);
        const jobSnapshot = await get(jobRef);

        if (!jobSnapshot.exists()) {
            console.log("Job not found");
            return;
        }

        const jobData = jobSnapshot.val();
        const applicationType = jobData.applicationType;
        const applicantsRef = ref(database, `jobs/${this.jobId}/applicants`);
        this.accDisp!.innerHTML = ''; // Clear previous entries

        onValue(applicantsRef, (snapshot: DataSnapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot: DataSnapshot) => {
                    const applicantData = childSnapshot.val();
                    const uid = childSnapshot.key;

                    if (applicantData.accepted) {
                        // Retrieve applicant's profile details
                        const applicantRef = ref(database, `users/${uid}`);
                        get(applicantRef).then((applicantSnapshot: DataSnapshot) => {
                            const applicantInfo = applicantSnapshot.val();
                            const name = applicantInfo?.fullName || "Name Not Available";
                            const email = applicantInfo?.email || "Email Not Available";

                            // Create a container for each applicant's details
                            const applicantDiv = document.createElement('div');
                            applicantDiv.classList.add('entry');

                            // Profile picture setup
                            const storage = getStorage();
                            const profilePicRef = storageRef(storage, `profile-pictures/${uid}`);
                            if (profilePicRef) {
                                getDownloadURL(profilePicRef)
                                    .then((profilePicURL: string) => {
                                        const applicantContainer = document.createElement('div');
                                        applicantContainer.style.display = 'flex';
                                        applicantContainer.style.alignItems = 'center';
                                        applicantContainer.style.marginBottom = '10px';

                                        const profilePicImg = document.createElement('img');
                                        profilePicImg.src = profilePicURL;
                                        profilePicImg.alt = `${name}'s Profile Picture`;
                                        profilePicImg.style.width = '50px';
                                        profilePicImg.style.height = '50px';
                                        profilePicImg.style.borderRadius = '50%';
                                        profilePicImg.style.marginRight = '15px';

                                        const applicantInfoDiv = document.createElement('div');
                                        applicantInfoDiv.innerHTML = `
                                        <strong>Name:</strong> ${name} <br>
                                        <strong>Email:</strong> ${email} <br>`;

                                        applicantContainer.appendChild(profilePicImg);
                                        applicantContainer.appendChild(applicantInfoDiv);
                                        applicantDiv.appendChild(applicantContainer);
                                    })
                                    .catch(() => {
                                        console.log(`No profile picture found for applicant UID: ${uid}`);

                                    });
                            }
                            else {
                                applicantDiv.innerHTML = `
                                    <strong>Name:</strong> ${name}<br>
                                    <strong>Email:</strong> ${email}<br>
                                `;
                            }

                            // Iframe to view documents
                            const documentViewer = document.createElement('iframe');
                            documentViewer.style.display = 'none';
                            documentViewer.style.width = '100%';
                            documentViewer.style.height = '750px';
                            documentViewer.style.border = '1px solid #ccc';

                            const closeBtn = document.createElement('button');
                            closeBtn.textContent = "Close Viewer";
                            closeBtn.style.display = 'none';
                            closeBtn.style.marginTop = '10px';
                            closeBtn.addEventListener('click', () => {
                                documentViewer.style.display = 'none';
                                closeBtn.style.display = 'none';
                            });

                            applicantDiv.appendChild(documentViewer);
                            applicantDiv.appendChild(closeBtn);

                            // View Resume and Cover Letter setup
                            if (applicationType.includes("res")) {
                                const resumeRef = storageRef(storage, `resume/${uid}`);
                                getDownloadURL(resumeRef)
                                    .then((resumeURL: string) => {
                                        const viewResumeBtn = document.createElement('button');
                                        viewResumeBtn.textContent = "View Resume";
                                        viewResumeBtn.addEventListener('click', () => {
                                            documentViewer.src = resumeURL;
                                            documentViewer.style.display = 'block';
                                            closeBtn.style.display = 'block';
                                        });
                                        applicantDiv.appendChild(viewResumeBtn);
                                    })
                                    .catch(() => {
                                        console.log(`No resume found for applicant UID: ${uid}`);
                                    });
                            }

                            if (applicationType.includes("cv")) {
                                const cvRef = storageRef(storage, `coverLetter/${uid}`);
                                getDownloadURL(cvRef)
                                    .then((cvURL: string) => {
                                        const viewCVBtn = document.createElement('button');
                                        viewCVBtn.textContent = "View Cover Letter";
                                        viewCVBtn.addEventListener('click', () => {
                                            documentViewer.src = cvURL;
                                            documentViewer.style.display = 'block';
                                            closeBtn.style.display = 'block';
                                        });
                                        applicantDiv.appendChild(viewCVBtn);
                                    })
                                    .catch(() => {
                                        console.log(`No cover letter found for applicant UID: ${uid}`);
                                    });
                            }

                            // Append applicant info to display
                            this.accDisp!.appendChild(applicantDiv);
                        }).catch((error: any) => {
                            console.error(`Error fetching applicant details for UID: ${uid}`, error);
                        });
                    }
                });
            } else {
                console.log("No applicants found for this job.");
            }
        });
    }
    async displayNew() {
        const jobRef = ref(database, `jobs/${this.jobId}`);
        const jobSnapshot = await get(jobRef);

        if (!jobSnapshot.exists()) {
            console.log("Job not found");
            return;
        }

        const jobData = jobSnapshot.val();
        const applicationType = jobData.applicationType;
        const applicantsRef = ref(database, `jobs/${this.jobId}/applicants`);
        this.newDisp!.innerHTML = ''; // Clear previous entries

        onValue(applicantsRef, (snapshot: DataSnapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot: DataSnapshot) => {
                    const applicantData = childSnapshot.val();
                    const uid = childSnapshot.key;

                    if (!applicantData.accepted && !applicantData.rejected) {
                        // Retrieve applicant's profile details
                        const applicantRef = ref(database, `users/${uid}`);
                        get(applicantRef).then((applicantSnapshot: DataSnapshot) => {
                            const applicantInfo = applicantSnapshot.val();
                            const name = applicantInfo?.fullName || "Name Not Available";
                            const email = applicantInfo?.email || "Email Not Available";

                            // Create a container for each applicant's details
                            const applicantDiv = document.createElement('div');
                            applicantDiv.classList.add('entry');

                            // Profile picture setup
                            const storage = getStorage();
                            const profilePicRef = storageRef(storage, `profile-pictures/${uid}`);

                            getDownloadURL(profilePicRef)
                                .then((profilePicURL: string) => {
                                    const applicantContainer = document.createElement('div');
                                    applicantContainer.style.display = 'flex';
                                    applicantContainer.style.alignItems = 'center';
                                    applicantContainer.style.marginBottom = '10px';

                                    const profilePicImg = document.createElement('img');
                                    profilePicImg.src = profilePicURL;
                                    profilePicImg.alt = `${name}'s Profile Picture`;
                                    profilePicImg.style.width = '50px';
                                    profilePicImg.style.height = '50px';
                                    profilePicImg.style.borderRadius = '50%';
                                    profilePicImg.style.marginRight = '15px';

                                    const applicantInfoDiv = document.createElement('div');
                                    applicantInfoDiv.innerHTML = `
                                        <strong>Name:</strong> ${name} <br>
                                        <strong>Email:</strong> ${email} <br>`;

                                    applicantContainer.appendChild(profilePicImg);
                                    applicantContainer.appendChild(applicantInfoDiv);
                                    applicantDiv.appendChild(applicantContainer);
                                })
                                .catch(() => {
                                    console.log(`No profile picture found for applicant UID: ${uid}`);
                                    applicantDiv.innerHTML = `
                                        <strong>Name:</strong> ${name}<br>
                                        <strong>Email:</strong> ${email}<br>
                                    `;
                                });



                            // View Resume and Cover Letter setup
                            if (applicationType.includes("res")) {
                                // Iframe to view documents
                                const documentViewer = document.createElement('iframe');
                                documentViewer.style.display = 'none';
                                documentViewer.style.width = '100%';
                                documentViewer.style.height = '750px';
                                documentViewer.style.border = '1px solid #ccc';

                                const closeBtn = document.createElement('button');
                                closeBtn.textContent = "Close Viewer";
                                closeBtn.style.display = 'none';
                                closeBtn.style.marginTop = '10px';
                                closeBtn.addEventListener('click', () => {
                                    documentViewer.style.display = 'none';
                                    closeBtn.style.display = 'none';
                                });

                                applicantDiv.appendChild(documentViewer);
                                applicantDiv.appendChild(closeBtn);
                                const resumeRef = storageRef(storage, `resume/${uid}`);
                                getDownloadURL(resumeRef)
                                    .then((resumeURL: string) => {
                                        const viewResumeBtn = document.createElement('button');
                                        viewResumeBtn.textContent = "View Resume";
                                        viewResumeBtn.addEventListener('click', () => {
                                            documentViewer.src = resumeURL; // Directly using resumeURL
                                            documentViewer.style.display = 'block';
                                            closeBtn.style.display = 'block';
                                        });
                                        applicantDiv.appendChild(viewResumeBtn);
                                    })
                                    .catch(() => {
                                        console.log(`No resume found for applicant UID: ${uid}`);
                                    });
                            }

                            if (applicationType.includes("cv")) {
                                // Iframe to view documents
                                const documentViewer = document.createElement('iframe');
                                documentViewer.style.display = 'none';
                                documentViewer.style.width = '100%';
                                documentViewer.style.height = '750px';
                                documentViewer.style.border = '1px solid #ccc';

                                const closeBtn = document.createElement('button');
                                closeBtn.textContent = "Close Viewer";
                                closeBtn.style.display = 'none';
                                closeBtn.style.marginTop = '10px';
                                closeBtn.addEventListener('click', () => {
                                    documentViewer.style.display = 'none';
                                    closeBtn.style.display = 'none';
                                });

                                applicantDiv.appendChild(documentViewer);
                                applicantDiv.appendChild(closeBtn);
                                const cvRef = storageRef(storage, `coverLetter/${uid}`);
                                getDownloadURL(cvRef)
                                    .then((cvURL: string) => {
                                        const viewCVBtn = document.createElement('button');
                                        viewCVBtn.textContent = "View Cover Letter";
                                        viewCVBtn.addEventListener('click', () => {
                                            documentViewer.src = cvURL; // Directly using cvURL
                                            documentViewer.style.display = 'block';
                                            closeBtn.style.display = 'block';
                                        });
                                        applicantDiv.appendChild(viewCVBtn);
                                    })
                                    .catch(() => {
                                        console.log(`No cover letter found for applicant UID: ${uid}`);
                                    });
                            }

                            // Accept and Reject buttons
                            const acceptBtn = document.createElement('button');
                            acceptBtn.textContent = "Accept";
                            acceptBtn.style.backgroundColor = 'green';
                            acceptBtn.style.color = 'white';
                            acceptBtn.style.marginRight = '10px';
                     
                            const rejectBtn = document.createElement('button');
                            rejectBtn.textContent = "Reject";
                            rejectBtn.style.backgroundColor = 'red';
                            rejectBtn.style.color = 'white';

                            applicantDiv.appendChild(acceptBtn);
                            applicantDiv.appendChild(rejectBtn);
                            rejectBtn.addEventListener('click', () => {
                                const applicantStatusRef = ref(database, `jobs/${this.jobId}/applicants/${uid}`);
                                update(applicantStatusRef, { accepted: false, rejected: true }).then(() => {
                                    console.log(`Applicant ${uid} rejected.`);
                                    acceptBtn.style.display = 'none';
                                    rejectBtn.style.display = 'none';
                                });
                            });
                            acceptBtn.addEventListener('click', () => {
                                const applicantStatusRef = ref(database, `jobs/${this.jobId}/applicants/${uid}`);
                                update(applicantStatusRef, { accepted: true, rejected: false }).then(() => {
                                    console.log(`Applicant ${uid} accepted.`);
                                    acceptBtn.style.display = 'none';
                                    rejectBtn.style.display = 'none';
                                });
                            });



                            // Append applicant info to display
                            this.newDisp!.appendChild(applicantDiv);
                        }).catch((error: any) => {
                            console.error(`Error fetching applicant details for UID: ${uid}`, error);
                        });
                    }
                });
            } else {
                console.log("No applicants found for this job.");
            }
        });
    }

    async displayRej() {
        const jobRef = ref(database, `jobs/${this.jobId}`);
        const jobSnapshot = await get(jobRef);

        if (!jobSnapshot.exists()) {
            console.log("Job not found");
            return;
        }

        const jobData = jobSnapshot.val();
        const applicationType = jobData.applicationType;
        const applicantsRef = ref(database, `jobs/${this.jobId}/applicants`);
        this.rejDisp!.innerHTML = ''; // Clear previous entries

        onValue(applicantsRef, (snapshot: DataSnapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot: DataSnapshot) => {
                    const applicantData = childSnapshot.val();
                    const uid = childSnapshot.key;

                    if (applicantData.rejepted) {
                        // Retrieve applicant's profile details
                        const applicantRef = ref(database, `users/${uid}`);
                        get(applicantRef).then((applicantSnapshot: DataSnapshot) => {
                            const applicantInfo = applicantSnapshot.val();
                            const name = applicantInfo?.fullName || "Name Not Available";
                            const email = applicantInfo?.email || "Email Not Available";

                            // Create a container for each applicant's details
                            const applicantDiv = document.createElement('div');
                            applicantDiv.classList.add('entry');

                            // Profile picture setup
                            const storage = getStorage();
                            const profilePicRef = storageRef(storage, `profile-pictures/${uid}`);
                            if (profilePicRef) {
                                getDownloadURL(profilePicRef)
                                    .then((profilePicURL: string) => {
                                        const applicantContainer = document.createElement('div');
                                        applicantContainer.style.display = 'flex';
                                        applicantContainer.style.alignItems = 'center';
                                        applicantContainer.style.marginBottom = '10px';

                                        const profilePicImg = document.createElement('img');
                                        profilePicImg.src = profilePicURL;
                                        profilePicImg.alt = `${name}'s Profile Picture`;
                                        profilePicImg.style.width = '50px';
                                        profilePicImg.style.height = '50px';
                                        profilePicImg.style.borderRadius = '50%';
                                        profilePicImg.style.marginRight = '15px';

                                        const applicantInfoDiv = document.createElement('div');
                                        applicantInfoDiv.innerHTML = `
                                        <strong>Name:</strong> ${name} <br>
                                        <strong>Email:</strong> ${email} <br>`;

                                        applicantContainer.appendChild(profilePicImg);
                                        applicantContainer.appendChild(applicantInfoDiv);
                                        applicantDiv.appendChild(applicantContainer);
                                    })
                                    .catch(() => {
                                        console.log(`No profile picture found for applicant UID: ${uid}`);

                                    });
                            }
                            else {
                                applicantDiv.innerHTML = `
                                    <strong>Name:</strong> ${name}<br>
                                    <strong>Email:</strong> ${email}<br>
                                `;
                            }

                            // Iframe to view documents
                            const documentViewer = document.createElement('iframe');
                            documentViewer.style.display = 'none';
                            documentViewer.style.width = '100%';
                            documentViewer.style.height = '750px';
                            documentViewer.style.border = '1px solid #ccc';

                            const closeBtn = document.createElement('button');
                            closeBtn.textContent = "Close Viewer";
                            closeBtn.style.display = 'none';
                            closeBtn.style.marginTop = '10px';
                            closeBtn.addEventListener('click', () => {
                                documentViewer.style.display = 'none';
                                closeBtn.style.display = 'none';
                            });

                            applicantDiv.appendChild(documentViewer);
                            applicantDiv.appendChild(closeBtn);

                            // View Resume and Cover Letter setup
                            if (applicationType.includes("res")) {
                                const resumeRef = storageRef(storage, `resume/${uid}`);
                                getDownloadURL(resumeRef)
                                    .then((resumeURL: string) => {
                                        const viewResumeBtn = document.createElement('button');
                                        viewResumeBtn.textContent = "View Resume";
                                        viewResumeBtn.addEventListener('click', () => {
                                            documentViewer.src = resumeURL;
                                            documentViewer.style.display = 'block';
                                            closeBtn.style.display = 'block';
                                        });
                                        applicantDiv.appendChild(viewResumeBtn);
                                    })
                                    .catch(() => {
                                        console.log(`No resume found for applicant UID: ${uid}`);
                                    });
                            }

                            if (applicationType.includes("cv")) {
                                const cvRef = storageRef(storage, `coverLetter/${uid}`);
                                getDownloadURL(cvRef)
                                    .then((cvURL: string) => {
                                        const viewCVBtn = document.createElement('button');
                                        viewCVBtn.textContent = "View Cover Letter";
                                        viewCVBtn.addEventListener('click', () => {
                                            documentViewer.src = cvURL;
                                            documentViewer.style.display = 'block';
                                            closeBtn.style.display = 'block';
                                        });
                                        applicantDiv.appendChild(viewCVBtn);
                                    })
                                    .catch(() => {
                                        console.log(`No cover letter found for applicant UID: ${uid}`);
                                    });
                            }

                            // Append applicant info to display
                            this.rejDisp!.appendChild(applicantDiv);
                        }).catch((error: any) => {
                            console.error(`Error fetching applicant details for UID: ${uid}`, error);
                        });
                    }
                });
            } else {
                console.log("No applicants found for this job.");
            }
        });
    }



    /*
        displayJobsData() {
            const positionsRef = ref(database, 'jobs');
            if (this.rejDisp) {
                const button = document.createElement("button");
                button.textContent = "Create Job";
                button.addEventListener("click", () => {
                    window.location.href = "createJob.html";
                });
                const vButton = document.createElement("button");
                vButton.textContent = "View Posts";
                vButton.addEventListener("click", () => {
                    window.location.href = "viewPosts.html";
                });
    
                //this.rejDisp!.appendChild(button);
                onValue(positionsRef, (snapshot: DataSnapshot) => {
                    this.rejDisp!.innerHTML = '';
                    this.rejDisp!.appendChild(button);
                    this.rejDisp!.appendChild(vButton);
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
                        const squareDiv = document.createElement('div');
                        const storage = getStorage();
                        const profilePicRef = storageRef(storage, `jobLogos/${Refkey}`);
                        if (profilePicRef) {
    
                            getDownloadURL(profilePicRef)
                                .then((downloadURL: string) => {
    
                                    squareDiv.classList.add('grey-square');
    
                                    // Ensure accDisp exists before prepending
                                    if (positionDiv) {
                                        positionDiv.prepend(squareDiv);
    
                                        const profileImage = document.createElement('img');
                                        profileImage.id = 'profileImage';
                                        profileImage.src = downloadURL; // Set the profile image source to the download URL
                                        profileImage.alt = 'Profile Picture';
                                        profileImage.style.width = '100%'; // Adjust as necessary
                                        profileImage.style.height = '100%'; // Adjust as necessary
                                        profileImage.style.objectFit = 'cover'; // Ensure the image fits nicely
    
                                        squareDiv.appendChild(profileImage);
                                    }
                                })
                                .catch((error: any) => {
                                    console.error("Error fetching profile picture:", error);
                                });
                        }
                        this.rejDisp!.appendChild(positionDiv);
                    });
                });
    
            }
        }*/

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
    const accRadioButton = document.getElementById('acc') as HTMLInputElement;
    if (accRadioButton.checked) {
        homepage.displayAcc();
    }
};
const homeButton = document.getElementById("home") as HTMLInputElement;
homeButton.addEventListener('click', () => {
    window.location.href = "homepage.html";
});