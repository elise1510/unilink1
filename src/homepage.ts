// @ts-ignore
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase, ref, onValue, DataSnapshot, get } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';
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
    private pepDisp: HTMLElement | null;
    private eveDisp: HTMLElement | null;
    private posDisp: HTMLElement | null;
    private pepLabel: HTMLElement | null;
    private eveLabel: HTMLElement | null;
    private posLabel: HTMLElement | null;
    // private searchInput: HTMLInputElement | null;
    //private searchButton: HTMLButtonElement | null;

    constructor() {
        this.pepDisp = document.querySelector('.pep-disp');
        this.eveDisp = document.querySelector('.eve-disp');
        this.posDisp = document.querySelector('.pos-disp');
        this.pepLabel = document.getElementById('pep-label');
        this.eveLabel = document.getElementById('eve-label');
        this.posLabel = document.getElementById('pos-label');
        //this.searchInput = document.getElementById('search-input') as HTMLInputElement;
        // this.searchButton = document.getElementById('search-button') as HTMLButtonElement;

        this.initTabListeners();
        // this.initSearchListener();
        this.initLabelListeners();
    }

    filterUsersData(searchTerm: string) {
        const usersRef = ref(database, 'users');
        onValue(usersRef, (snapshot: DataSnapshot) => {
            this.pepDisp!.innerHTML = '';
            snapshot.forEach((childSnapshot: DataSnapshot) => {
                const userData = childSnapshot.val();
                const fullName = userData?.fullName ?? "Not set yet";
                const major = userData?.major ?? "Not set yet";
                const userDiv = document.createElement('div');
                userDiv.classList.add('user-entry');
                userDiv.style.marginBottom = '10px';

                if (fullName.toLowerCase().includes(searchTerm) || major.toLowerCase().includes(searchTerm)) {
                    userDiv.innerHTML = `
                        <strong>Name:</strong> ${fullName} <br>
                        <strong>Major:</strong> ${this.mapMajors(major).join(', ') || "Not set yet"}
                    `;
                    this.pepDisp!.appendChild(userDiv);
                }
            });
        });
    }

    filterJobsData(searchTerm: string) {
        const positionsRef = ref(database, 'jobs');
        onValue(positionsRef, (snapshot: DataSnapshot) => {
            this.posDisp!.innerHTML = '';
            snapshot.forEach((levelSnapshot: DataSnapshot) => {
                const positionData = levelSnapshot.val();
                const title = positionData.title || "No Title";
                const fullMajors = this.mapMajors(positionData.majors).join(', ');
                const positionDiv = document.createElement('div');
                positionDiv.classList.add('entry');
                positionDiv.style.marginBottom = '10px';

                if (title.toLowerCase().includes(searchTerm) || fullMajors.toLowerCase().includes(searchTerm)) {
                    positionDiv.innerHTML = `
                        <strong>Title:</strong> ${title} <br>
                        <strong>Hourly Rate Min:</strong> $${positionData.hourlyRateMin} <br>
                        <strong>Hourly Rate Max:</strong> $${positionData.hourlyRateMax} <br>
                        <strong>Majors:</strong> ${fullMajors || "No Majors"}
                    `;
                    this.posDisp!.appendChild(positionDiv);
                }
            });
        });
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
                    this.displayEventsData();
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
    /*
    
        initSearchListener() {
            if (this.searchButton) {
                this.searchButton.addEventListener('click', () => {
                    const searchTerm = this.searchInput?.value.toLowerCase().trim(); // Added trim to remove whitespace
                    if (!searchTerm) {
                        alert("Please enter a search term."); 
                        return; // Exit if no search term is provided
                    }
                    this.filterJobsData(searchTerm);
                });
            }
        }*/
    displayUsersData() {
        const usersRef = ref(database, 'users');
        if (this.pepDisp) {
            // Create the search input and button
            const searchInput = document.createElement("input");
            searchInput.type = "text";
            searchInput.placeholder = "Search by name...";
            searchInput.style.marginBottom = '10px';

            const searchButton = document.createElement("button");
            searchButton.textContent = "Search";
            searchButton.style.marginLeft = '5px';

            // Create the See Chat Requests button
            const button = document.createElement("button");
            button.textContent = "See Chat Requests";
            button.addEventListener("click", async () => {
                const userString = localStorage.getItem('userinfo');
                if (userString) {
                    const user = JSON.parse(userString);
                    const uid = user.uid;
                    window.location.href = "chat.html?id=" + uid;
                }
            });
            const seeProfileButton = document.createElement("button");
            seeProfileButton.textContent = "See Profile";
            seeProfileButton.addEventListener("click", () => {
                window.location.href = "profile.html";
            });

            const logoutButton = document.createElement("button");
            logoutButton.textContent = "Logout";
            logoutButton.addEventListener("click", () => {
                 localStorage.clear();
                const userString = localStorage.getItem('userinfo');
                if(!userString){
                    window.location.href = 'login.html'
                }
                
            });

            // Append search input and button to the display
            this.pepDisp.appendChild(searchInput);
            this.pepDisp.appendChild(searchButton);
            this.pepDisp.appendChild(button);

            // Set up the event listener for the search button
            searchButton.addEventListener("click", () => {
                const searchTerm = searchInput.value.toLowerCase();
                this.searchUsers(searchTerm);
            });

            onValue(usersRef, (snapshot: DataSnapshot) => {
                this.pepDisp!.innerHTML = '';
                this.pepDisp!.appendChild(searchInput);
                this.pepDisp!.appendChild(searchButton);
                this.pepDisp!.appendChild(button);
                this.pepDisp!.appendChild(seeProfileButton);
                this.pepDisp!.appendChild(logoutButton);


                snapshot.forEach((childSnapshot: DataSnapshot) => {
                    const refKey = childSnapshot.key;
                    const userData = childSnapshot.val();
                    const fullName = userData?.fullName ?? "Not set yet";
                    const major = userData?.major ?? "Not set yet";
                    const userDiv = document.createElement('div');
                    userDiv.classList.add('user-entry');
                    userDiv.style.marginBottom = '10px';
                    let fullMajor = major !== "Not set yet" ? this.mapMajors(major) : "Not set yet";

                    userDiv.innerHTML = `
                            <strong>Name:</strong> ${fullName} <br>
                            <strong>Major:</strong> ${fullMajor}
                        `;
                    //the following is for pfp
                    const squareDiv = document.createElement('div');
                    const storage = getStorage();
                    const profilePicRef = storageRef(storage, `profile-pictures/${refKey}`);
                    if (profilePicRef) {

                        getDownloadURL(profilePicRef)
                            .then((downloadURL: string) => {

                                squareDiv.classList.add('grey-square');

                                // Ensure pepDisp exists before prepending
                                if (userDiv) {
                                    userDiv.prepend(squareDiv);

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
                    const profileImage = document.createElement('img');
                    profileImage.id = 'profileImage';
                    profileImage.src = '';
                    squareDiv.appendChild(profileImage);
                    userDiv.classList.add('entry');
                    userDiv.style.marginBottom = '10px';
                    userDiv.addEventListener('click', () => {
                        window.location.href = "viewUser.html?id=" + refKey;
                    });

                    this.pepDisp!.appendChild(userDiv);
                });
            });
        }
    }


    searchUsers(searchTerm: string) {
        const usersRef = ref(database, 'users');
        get(usersRef).then((snapshot: DataSnapshot) => {
            this.pepDisp!.innerHTML = ''; // Clear previous entries
            const searchInput = document.createElement("input");
            searchInput.type = "text";
            searchInput.placeholder = "Search by name...";
            searchInput.style.marginBottom = '10px';

            const searchButton = document.createElement("button");
            searchButton.textContent = "Search";
            searchButton.style.marginLeft = '5px';

            // Create the See Chat Requests button
            const button = document.createElement("button");
            button.textContent = "See Chat Requests";
            button.addEventListener("click", async () => {
                const userString = localStorage.getItem('userinfo');
                if (userString) {
                    const user = JSON.parse(userString);
                    const uid = user.uid;
                    window.location.href = "chat.html?id=" + uid;
                }
            });

            // Append search input and button to the display
            this.pepDisp!.appendChild(searchInput);
            this.pepDisp!.appendChild(searchButton);
            this.pepDisp!.appendChild(button);

            // Set up the event listener for the search button
            searchButton.addEventListener("click", () => {
                const searchTerm = searchInput.value.toLowerCase();
                this.searchUsers(searchTerm);
            });

            snapshot.forEach((childSnapshot: DataSnapshot) => {
                const refKey = childSnapshot.key;
                const userData = childSnapshot.val();
                const fullName = userData?.fullName ?? "Not set yet";

                // Check if the user's name matches the search term
                if (fullName.toLowerCase().includes(searchTerm)) {
                    const major = userData?.major ?? "Not set yet";
                    const userDiv = document.createElement('div');
                    userDiv.classList.add('user-entry');
                    userDiv.style.marginBottom = '10px';
                    let fullMajor = major !== "Not set yet" ? this.mapMajors(major) : "Not set yet";

                    userDiv.innerHTML = `
                            <strong>Name:</strong> ${fullName} <br>
                            <strong>Major:</strong> ${fullMajor}
                        `;
                    userDiv.classList.add('entry');
                    userDiv.style.marginBottom = '10px';
                    userDiv.addEventListener('click', () => {
                        window.location.href = "viewUser.html?id=" + refKey;
                    });

                    this.pepDisp!.appendChild(userDiv);
                }
            });
        }).catch((error: any) => {
            console.error("Error fetching users for search:", error);
        });
    }

    displayJobsData() {
        const positionsRef = ref(database, 'jobs');
        if (this.posDisp) {
            this.posDisp.innerHTML = ''; 


            const parentContainer = document.createElement('div');
            parentContainer.style.display = 'flex';
            parentContainer.style.alignItems = 'flex-start';
            parentContainer.style.height = '100vh';
            parentContainer.style.overflow = 'hidden';

            // Filter containtainer styling that's functional in nature, pins it to the top left and doesn't let it scroll + shortens it a bit
            const filtersContainer = document.createElement('div');
            filtersContainer.id = 'filtersContainer';
            filtersContainer.style.width = '150px';
            filtersContainer.style.position = 'sticky';
            filtersContainer.style.top = '0';
            filtersContainer.style.height = '100%';
            filtersContainer.style.padding = '10px';
            filtersContainer.style.boxSizing = 'border-box';
            filtersContainer.style.backgroundColor = '#f7e9cf';
            filtersContainer.style.borderRight = '1px solid #ccc';
            filtersContainer.style.overflowY = 'auto';


            const typeSelect = document.createElement('select');
            typeSelect.id = 'type';
            typeSelect.innerHTML = `
                <option value="">Select Type</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="on-site">On-Site</option>
            `;
            filtersContainer.appendChild(typeSelect);
            typeSelect.classList.add('filterSelect');

            const experienceSelect = document.createElement('select');
            experienceSelect.id = 'expirence';
            experienceSelect.innerHTML = `
                <option value="">Select Experience</option>
                <option value="entry-level">Entry Level</option>
                <option value="mid-level">Mid Level</option>
                <option value="senior-level">Senior Level</option>
            `;
            filtersContainer.appendChild(experienceSelect);
            experienceSelect.classList.add('filterSelect');

            const timeSelect = document.createElement('select');
            timeSelect.id = 'time';
            timeSelect.innerHTML = `
                <option value="">Select Time</option>
                <option value="part-time">Part-Time</option>
                <option value="full-time">Full-Time</option>
            `;
            filtersContainer.appendChild(timeSelect);
            timeSelect.classList.add('filterSelect');

            const workloadSelect = document.createElement('select');
            workloadSelect.id = 'workload';
            workloadSelect.innerHTML = `
                <option value="">Select Workload</option>
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="heavy">Heavy</option>
            `;
            filtersContainer.appendChild(workloadSelect);
            workloadSelect.classList.add('filterSelect');

            const gradeLevelSelect = document.createElement('select');
            gradeLevelSelect.id = 'gradeLevels';
            gradeLevelSelect.innerHTML = `
                <option value="">Select Grade Level</option>
                <option value="fresh">Freshmen</option>
                <option value="soph">Sophmore</option>
                <option value="jun">Junior</option>
                <option value="sen">Senior</option>
            `;
            filtersContainer.appendChild(gradeLevelSelect);
            gradeLevelSelect.classList.add('filterSelect');
            // Select all the filter select elements



            /*
                    // Style the select elements
                    [typeSelect, gradeLevelSelect, experienceSelect, timeSelect, workloadSelect].forEach(select => {
                        select.style.display = 'block';
                        select.style.marginBottom = '10px';
                        select.style.width = '100%';
                    });*/

            // Append the filters container to the parent container
            parentContainer.appendChild(filtersContainer);

            // Create a container for job entries
            const entriesContainer = document.createElement('div');
            entriesContainer.style.flex = '1'; // Take remaining space
            entriesContainer.style.height = '100%';
            entriesContainer.style.overflowY = 'auto';
            entriesContainer.style.padding = '10px';
            entriesContainer.style.boxSizing = 'border-box';
            entriesContainer.id = 'ec';

            parentContainer.appendChild(entriesContainer);

            // Append the parent container to the display
            this.posDisp.appendChild(parentContainer);

            // Create the "Create Job" button
            const button = document.createElement("button");
            button.textContent = "Create Job";
            button.addEventListener("click", () => {
                window.location.href = "createJob.html";
            });

            const vButton = document.createElement("button");
            vButton.textContent = "View Posts";
            vButton.addEventListener("click",() =>{
                window.location.href = "viewPosts.html";
            });


            entriesContainer.appendChild(button);

            // Load and display job entries
            onValue(positionsRef, (snapshot: DataSnapshot) => {
                entriesContainer.innerHTML = ''; 
                entriesContainer.appendChild(button); 
                entriesContainer.appendChild(vButton); 
                snapshot.forEach((levelSnapshot: DataSnapshot) => {
                    const Refkey = levelSnapshot.key;
                    const positionData = levelSnapshot.val();
                    const { title, hourlyRateMin, hourlyRateMax, majors } = positionData;
                    const fullMajors = this.mapMajors(majors);
                    const positionDiv = document.createElement('div');
                    positionDiv.classList.add('entry');
                    positionDiv.setAttribute('job-key', Refkey!);
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
 
                                 // Ensure pepDisp exists before prepending
                                 if (positionDiv) {
                                     positionDiv.prepend(squareDiv);
 
                                     const profileImage = document.createElement('img');
                                     profileImage.id = 'profileImage';
                                     profileImage.src = downloadURL; 
                                     profileImage.alt = 'Profile Picture';
                                     profileImage.style.width = '100%'; 
                                     profileImage.style.height = '100%'; 
                                     profileImage.style.objectFit = 'cover'; 
 
                                     squareDiv.appendChild(profileImage);
                                 }
                             })
                             .catch((error: any) => {
                                 console.error("Error fetching profile picture:", error);
                             });
                    }
                    entriesContainer.appendChild(positionDiv);
                    const filterSelects = document.querySelectorAll('.filterSelect');
       
                    let currentFilters: { [key: string]: string } = {
                        type: "",
                        expirence: "",
                        time: "",
                        workload: "",
                        gradeLevels: ""
                    };
                    filterSelects.forEach(select => {
                        select.addEventListener('change', (event) => {
                            const target = event.target as HTMLSelectElement | null;
                    
                            if (target) {
                                const selectedValue = target.value;
                                const selectId = target.id;
                    
                                // Update the current filter state
                                currentFilters[selectId] = selectedValue.trim() === "" ? "" : selectedValue;
                    
                                // Update the entries based on all active filters
                                this.updateEntries(currentFilters);
                            }
                        });
                    });
                });
            });
        }
    }
    updateEntries(currentFilters: { [key: string]: string })  {
        const posRef = ref(database, 'jobs');
        const ec = document.getElementById('ec');
        const entries = this.posDisp!.querySelectorAll('.entry');
    
        onValue(posRef, (snapshot: DataSnapshot) => {
            snapshot.forEach((levelSnapshot: DataSnapshot) => {
                const posData = levelSnapshot.val();
                const refKey = levelSnapshot.key;
    
                // Check if the job entry matches all active filters
                let shouldDisplay = true;
                for (const [filterId, filterValue] of Object.entries(currentFilters)) {
                    if (filterValue && posData[filterId] !== filterValue) {
                        shouldDisplay = false;
                        break;
                    }
                }
    
                const entry = Array.from(entries).find((entry) => entry.getAttribute('job-key') === refKey);
                
                if (entry) {
                    const entryElement = entry as HTMLElement;
    
                    // Show the entry if it matches the filters, hide it otherwise
                    if (shouldDisplay) {
                        entryElement.style.display = 'block';
                    } else {
                        entryElement.style.display = 'none';
                    }
                }
            });
        });
    }
    displayEventsData() {
        const eveRef = ref(database, 'events');
        if (this.eveDisp) {
            const button = document.createElement("button");
            button.textContent = "Create Event";
            button.addEventListener("click", () => {
                window.location.href = "createEvent.html";
            });
            this.eveDisp!.appendChild(button);
            
            onValue(eveRef, (snapshot: DataSnapshot) => {
                this.eveDisp!.innerHTML = '';
                this.eveDisp!.appendChild(button);
                snapshot.forEach((levelSnapshot: DataSnapshot) => {
                    const Refkey = levelSnapshot.key;
                    const positionData = levelSnapshot.val();
                    const { title, location, date, organizer } = positionData;
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('entry');
                    eventDiv.style.marginBottom = '10px';
                    eventDiv.innerHTML = `
                        <strong>Title:</strong> ${title || "No Title"} <br>
                        <strong>Location:</strong> ${location} <br>
                        <strong>Date:</strong> $${date} <br>
                        <strong>Organizer:</strong> ${organizer}
                    `;
                    eventDiv.addEventListener('click', () => {
                        //TODO:ZOBIA
                        window.location.href = "viewEvents.html?id=" + Refkey;

                    });
                    // the following is for pfp
                    const squareDiv = document.createElement('div');
                    const storage = getStorage();
                    const profilePicRef = storageRef(storage, `eventBanners/${Refkey}`);
                    if (profilePicRef) {

                        getDownloadURL(profilePicRef)
                            .then((downloadURL: string) => {

                                squareDiv.classList.add('grey-square');

                                // Ensure pepDisp exists before prepending
                                if (eventDiv) {
                                    eventDiv.prepend(squareDiv);

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
                    this.eveDisp!.appendChild(eventDiv);
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