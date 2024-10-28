// @ts-ignore
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase, ref, onValue, DataSnapshot, update } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';

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

const homeButton = document.getElementById("home") as HTMLInputElement;
homeButton.addEventListener('click', () => {
    window.location.href = "homepage.html";
});
class chatViewer {
    private reqDisp: HTMLElement | null;
    private msgDisp: HTMLElement | null;
    private reqLabel: HTMLElement | null;
    private msgLabel: HTMLElement | null;
    private uid: string | null;
    constructor() {
        this.reqDisp = document.querySelector('.req-disp');
        this.msgDisp = document.querySelector('.msg-disp');
        this.reqLabel = document.getElementById('req-label');
        this.msgLabel = document.getElementById('msg-label');
        this.initTabListeners();
        this.initLabelListeners();
        const urlParams = new URLSearchParams(window.location.search);
        this.uid = urlParams.get('id');
    }

    initTabListeners() {
        document.querySelectorAll('input[name="tab"]').forEach((radio) => {
            const inputRadio = radio as HTMLInputElement;

            inputRadio.addEventListener('change', () => {
                if (inputRadio.value === 'req' && this.reqDisp && this.msgDisp) {
                    this.reqDisp.classList.add('active');
                    this.reqDisp.style.display = 'block';
                    this.msgDisp.classList.remove('active');
                    this.msgDisp.style.display = 'none';
                    this.displayReqData();
                } else if (inputRadio.value === 'msg' && this.reqDisp && this.msgDisp) {
                    this.reqDisp.classList.remove('active');
                    this.reqDisp.style.display = 'none';
                    this.msgDisp.classList.add('active');
                    this.msgDisp.style.display = 'block';
                    this.displayMsgData();
                }
            });
        });
    }

    initLabelListeners() {
        if (this.reqLabel && this.msgLabel) {
            this.reqLabel.addEventListener('click', () => {
                this.reqLabel!.classList.add('active');
                this.msgLabel!.classList.remove('active');
            });
            this.msgLabel.addEventListener('click', () => {
                this.reqLabel!.classList.remove('active');
                this.msgLabel!.classList.add('active');
            });
        }
    }
    displayReqData() {
        const reqRef = ref(database, 'chatRequests/');
        if (this.reqDisp) {
            const userString = localStorage.getItem('userinfo');
            if (userString) {
                const user = JSON.parse(userString);
                const userEmail = user.email;
    
                onValue(reqRef, (snapshot: DataSnapshot) => {
                    this.reqDisp!.innerHTML = '';
                    snapshot.forEach((childSnapshot: DataSnapshot) => {
                        const requestData = childSnapshot.val();
                        const receiverEmail = requestData?.receiver;
    
                        // Check if the receiver's email matches the user's email
                        if ((receiverEmail === userEmail) && (requestData.accepted == false) && (requestData.rejected == false)) {
                            const refKey = childSnapshot.key;
    
                            const msgPreview = requestData?.msgPreview ?? "No message preview available";
                            const sender = requestData?.sender ?? "Unknown sender";
                            const requestDiv = document.createElement('div');
                            requestDiv.classList.add('request-entry');
                            requestDiv.style.marginBottom = '10px';
    
                            requestDiv.innerHTML = `
                                <strong>Sender:</strong> ${sender} <br>
                                <strong>Message Preview:</strong> ${msgPreview}
                            `;
    
                            // Create Accept button
                            const acceptButton = document.createElement('button');
                            acceptButton.textContent = "Accept";
                            acceptButton.style.backgroundColor = 'green';
                            acceptButton.style.color = 'white';
                            acceptButton.style.margin = '8px';
                            acceptButton.style.padding = '8px';
                            acceptButton.style.border = '3px';
                            acceptButton.style.borderRadius = '4px';
    
                            // Create Reject button
                            const rejectButton = document.createElement('button');
                            rejectButton.textContent = "Reject";
                            rejectButton.style.backgroundColor = 'red';
                            rejectButton.style.color = 'white';
                            rejectButton.style.margin = '8px';
                            rejectButton.style.padding = '8px';
                            rejectButton.style.border = '3px';
                            rejectButton.style.borderRadius = '4px';
    
                            // Append buttons to the requestDiv
                            requestDiv.appendChild(acceptButton);
                            requestDiv.appendChild(rejectButton);
                            requestDiv.classList.add('entry');
    
                            // Accept button click event
                            acceptButton!.addEventListener('click', async () => {
                                if (refKey) {
                                    const updates: { [key: string]: any } = {};
                                    updates[`/chatRequests/${refKey}/accepted`] = true;
    
                                    await update(ref(database), updates)
                                        .then(() => {
                                            console.log('Chat request marked as accepted.');
                                        })
                                        .catch(() => {
                                            console.error('Error updating accepted status:');
                                        });
                                } else {
                                    console.error('Invalid refKey');
                                }
                            });
    
                            // Reject button click event
                            rejectButton!.addEventListener('click', async () => {
                                if (refKey) {
                                    const updates: { [key: string]: any } = {};
                                    updates[`/chatRequests/${refKey}/rejected`] = true;
    
                                    await update(ref(database), updates)
                                        .then(() => {
                                            console.log('Chat request marked as rejected.');
                                        })
                                        .catch(() => {
                                            console.error('Error updating rejected status:');
                                        });
                                } else {
                                    console.error('Invalid refKey');
                                }
                            });
    
                            this.reqDisp!.appendChild(requestDiv);
                        }
                    });
                });
            }
        }
    }
    
    displayMsgData() {
        const reqRef = ref(database, 'chatRequests/');
        if (this.msgDisp) {
            const userString = localStorage.getItem('userinfo');
            if (userString) {
                const user = JSON.parse(userString);
                const userEmail: string = user.email;
    
                onValue(reqRef, (snapshot: DataSnapshot) => {
                    this.msgDisp!.innerHTML = ''; 
                    snapshot.forEach((childSnapshot: DataSnapshot) => {
                        const requestData = childSnapshot.val();
                        const senderEmail = requestData?.sender;
                        const receiverEmail = requestData?.receiver;
                        const accepted = requestData?.accepted ?? false;
                        const rejected = requestData?.rejected ?? true;
    
                        if (accepted === true && rejected === false) {
                            let otherParty: string;
    
                         
                            if (userEmail === senderEmail) {
                                otherParty = receiverEmail; 
                            } else if (userEmail === receiverEmail) {
                                otherParty = senderEmail; 
                            } else {
                                return;
                            }
    
                            const msgPreview = requestData?.msgPreview ?? "No message preview available";
                            const refKey = childSnapshot.key;
    
            
                            const requestDiv = document.createElement('div');
                            requestDiv.classList.add('request-entry');
                            requestDiv.style.marginBottom = '10px';
    
                            requestDiv.innerHTML = `
                                <!--<div class='grey-square'></div> -->  <!-- For pfp -->
                                <strong>Chat with:</strong> ${otherParty} <br>
                                <strong>Message Preview:</strong> ${msgPreview}
                            `;
                            
    
                            requestDiv.classList.add('entry');
                           //console.log(refKey);
                            requestDiv.addEventListener('click', () => {
                                
                                window.location.href = `messager.html?id=${refKey}`;
                            });
    
                            this.msgDisp!.appendChild(requestDiv); 
                        }
                    });
                });
            }
        }
    }
    



}


window.onload = () => {
    const chats = new chatViewer();
    const msgRadioButton = document.getElementById('msg') as HTMLInputElement;
    if (msgRadioButton.checked) {
        chats.displayMsgData();
    }
};
