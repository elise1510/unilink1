// @ts-ignore
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
// @ts-ignore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
// @ts-ignore
import { getDatabase, ref, onValue, DataSnapshot, update, set, get } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js';

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

//let oU: string;
class Messager {
    private roomId: string | null;
    private otherMember: string | null = null;
    private otherMemberFullName: string | null = null;
    constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        this.roomId = urlParams.get('id');
        console.log(this.roomId);
        this.init(); 
    }

    private async init() {
        const user = await this.getOtherUser(); 

        this.otherMember =  user?.email!
        this.otherMemberFullName = user?.fullName!;
    
        const head = document.getElementById("header") as HTMLElement;
    
        head!.textContent = this.otherMemberFullName; 

        const sendButton = document.getElementById("send-btn") as HTMLButtonElement;
        const messageInput = document.getElementById("message-input") as HTMLInputElement;

        sendButton.addEventListener("click", () => {
            const content = messageInput.value;
            const userString = localStorage.getItem('userinfo');
            if (userString && content.trim()) {
                const user = JSON.parse(userString);
                console.log(user);
                if(this.otherMember)
               { this.giveData(content, this.otherMember, user.email);}
                messageInput.value = ''; 
            }
            
        });

        messageInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                sendButton.click();
            }
        });
    }


    async getData() {
        const msgRef = ref(database, `messages/${this.roomId}`);
        
       
        const snapshot = await get(msgRef);
    
        if (snapshot.exists()) {
            const messages = snapshot.val();
            const messageContainer = document.getElementById("msg");
            messageContainer!.innerText = '';
            const userString = localStorage.getItem('userinfo');
            const user = userString ? JSON.parse(userString) : null;
    
     
    
            console.log(messages);
            Object.keys(messages).forEach((key) => {
                const message = messages[key];
                const messageDiv = document.createElement('div');

                if (message.sender === user.email) {
                    // This is the current user's message (Gray on the right)
                    messageDiv.style.backgroundColor = '#D3D3D3'; // Light gray
                    messageDiv.style.color = '#000'; // Black text
                    messageDiv.style.textAlign = 'right'; // Align text to the left
                    messageDiv.style.marginRight = 'auto';
                  // Push message to the right
                } else {
                    // This is the other user's message (Blue on the left)
                    messageDiv.style.backgroundColor = '#ADD8E6'; // Light blue
                    messageDiv.style.color = '#000'; // Black text
                       messageDiv.style.textAlign = 'right'; // Align text to the right
                    messageDiv.style.marginLeft = 'auto';
                }
    
                messageDiv.style.padding = '10px';
                messageDiv.style.margin = '5px';
                messageDiv.style.borderRadius = '10px';
                messageDiv.style.maxWidth = '60%'; // Limit the message width
    
                // Set the message content
                messageDiv.textContent = message.content;
    
                // Append the message to the container
                messageContainer!.appendChild(messageDiv);
            });
        } else {
            console.log("No messages found.");
        }
    }
    
    async giveData(content: string, receiver: string, sender: string) {
        console.log("rm",this.roomId);
        if (!this.roomId) return;

        const messageRef = ref(database, `messages/${this.roomId}`);

        console.log("ms:",messageRef);
        const snapshot = await get(messageRef);
        const currentMessages = snapshot.val() || {};

       
        const nextKey = Object.keys(currentMessages).length + 1;

        const messageData = {
            content: content,
            receiver: receiver,
            sender: sender
        };

       
        await set(ref(database, `messages/${this.roomId}/${nextKey}`), messageData);
        await this.getData();
    }


async getOtherUser(): Promise<{ email: string; fullName: string } | null> {
    const userString = localStorage.getItem('userinfo');
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
        return null;
    }

    const chatRequestRef = ref(database, `chatRequests/${this.roomId}`);
    const snapshot = await get(chatRequestRef);

    if (snapshot.exists()) {
        const chatRequestData = snapshot.val();
        const currentUserEmail = user.email;

      
        const otherUserEmail = chatRequestData.receiver === currentUserEmail ? chatRequestData.sender : chatRequestData.receiver;

        const usersRef = ref(database, 'users'); 
        const usersSnapshot = await get(usersRef);

        if (usersSnapshot.exists()) {
            let foundUser = null;
   
            usersSnapshot.forEach((childSnapshot: DataSnapshot) => {
                const usersData = childSnapshot.val();
                if (usersData.email === otherUserEmail) {
                    foundUser = { email: otherUserEmail, fullName: usersData.fullName || "Not Set Yet" };
                }
            });
            return foundUser;
        }
    }

    return null; 
}


}














window.onload = () => {
    const room = new Messager();
    room.getData();
};
