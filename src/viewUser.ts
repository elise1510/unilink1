// @ts-ignore
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase, ref, onValue, DataSnapshot, get, child,set } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';

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

const homeButton = document.getElementById("home") as HTMLInputElement;
homeButton.addEventListener('click', () => {
    window.location.href = "homepage.html";
});

const friendRequestButton = document.getElementById("req") as HTMLInputElement;
const modal = document.getElementById("messageModal") as HTMLElement;
const closeModalButton = document.querySelector(".close") as HTMLElement;
const sendMessageButton = document.getElementById("sendMessageButton") as HTMLButtonElement;

friendRequestButton.addEventListener('click', async () => {
    modal.style.display = "block";
});

closeModalButton.addEventListener('click', () => {
    modal.style.display = "none"; 
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none"; 
    }
});

sendMessageButton.addEventListener('click', async () => {
    const messageInput = (document.getElementById("messageInput") as HTMLTextAreaElement).value;
 
    if (messageInput) {
        const urlParams = new URLSearchParams(window.location.search);
        let friendId = urlParams.get('id');
        let friendEmail, email, abvEmail, abvFriendEmail;

        const friendRef = ref(database, 'users/' + friendId);
        const friendSnapshot = await get(friendRef);
  
        if (friendSnapshot.exists()) {
            const userData = friendSnapshot.val();
            friendEmail = userData?.email;
            abvFriendEmail = friendEmail.split('@')[0];
        }

        const userString = localStorage.getItem('userinfo');
        
        if (userString) { 
            const user = JSON.parse(userString);
            const userRef = ref(database, 'users/' + user.uid);
            const snapshot = await get(userRef);
            
            if (snapshot.exists()) {
                const userData = snapshot.val();
                console.log(userData);
                email = userData?.email;
                abvEmail = email!.split('@')[0];
            }

    
            set(ref(database, 'chatRequests/' + abvEmail + abvFriendEmail), {
                accepted: false,
                rejected: false,
                sender: email,
                receiver: friendEmail,
                msgPreview: messageInput
            });


            modal.style.display = "none";
        }
    }
});
class UserViewer {
    private userId: string | null;

    constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        this.userId = urlParams.get('id');
        console.log(this.userId);
    }
    async getData() {
        if (!this.userId) return;

        const userRef = ref(database, 'users/' + this.userId);
        const snapshot = await get(userRef);
        if (snapshot) {
            const userData = snapshot.val();
            console.log("userData:", userData);
            this.displayUserData(userData);
        }
    }
    private displayUserData(userData: any) {
        /*About*/
        this.setElementTextContent("name", userData?.fullName, "not set");
        /*Title*/
       // this.setElementTextContent("title", userData?.title, "not set");

        //#region Colleges and Majors
        let udColleges = userData?.department ?? "Not set";
        let udMajors = userData?.major ?? "Not set";

        if (udMajors !== "Not set") {
            udMajors = this.mapMajor(udMajors);
            this.setElementTextContent("major", udMajors, "Not set");
        }
        else{
            this.setElementTextContent("major", udMajors, "Not set"); 
        }
        if (udColleges !== "Not set") {
            udColleges = this.mapCollege(udColleges);
            this.setElementTextContent("college", udColleges, "Not set");
        }
        else{
            this.setElementTextContent("college", udColleges, "Not set");
        }

       //const formMajors = document.getElementById("majors");
       // formMajors?.replaceChildren();
        //formMajors!.textContent = udMajors.join(', ');

       //const formColleges = document.getElementById("college");
        //formColleges?.replaceChildren();
       // formColleges!.textContent = udColleges.join(', ');
       
        //#endregion

        //Key Responsibilities
        this.setElementTextContent("email", userData?.email, "Not Set");
        //Type
        this.setElementTextContent("phone", userData?.phone, "Not Set");
        //Experience
        this.setElementTextContent("graduation-year", userData?.graduationYear, "Not Set");
        //Time
        this.capitalizeAndSetContent("about-me", userData?.aboutMe, "Not Set");
        


    }  
    private setElementTextContent(elementId: string, content: string | number, fallback: string) {
        const element = document.getElementById(elementId);
        element?.replaceChildren();
        element!.textContent = content !== undefined && content !== null ? content.toString() : fallback;
    }

    private capitalizeAndSetContent(elementId: string, content: string, fallback: string) {
        const capitalizedContent = content ? content.charAt(0).toUpperCase() + content.slice(1) : fallback;
        this.setElementTextContent(elementId, capitalizedContent, fallback);
    }
    private mapMajor(major: string): string {
        let mappedMajor = "Unknown Major";
        Object.values(majorsByCollege).forEach(collegeMajors => {
            collegeMajors.forEach(majorObj => {
                if (major === majorObj.value) {
                    mappedMajor = majorObj.text;
                }
            });
        });
        return mappedMajor;
    }
    
    private mapCollege(collegeValue: string): string {
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
    
        return collegesByValue[collegeValue] || 'Unknown College';
    }

}
window.onload = () => {
    const viewer = new UserViewer();
    viewer.getData();
};
