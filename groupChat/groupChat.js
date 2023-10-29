// Get references to the user form and user list
const userForm = document.getElementById('user-form');
const chatForm = document.getElementById('chat-form');
const chatMessageInput = document.getElementById("chat-message");
const chatMessages = document.getElementById("chat-messages");
const userNameInput = document.getElementById('user-name');
const userList = document.getElementById('user');
// Add an event listener for the user form submission 
userForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const token = localStorage.getItem('token');
  const groupId = localStorage.getItem('groupId')
  let userName = userNameInput.value;
  const response = await axios.post("http://localhost:3000/usergroup/adduser", { userName, groupId }, { headers: { 'Authentication': token } });
  //console.log(response);
  userNameInput.value = '';
});
async function getuser() {
  const token = localStorage.getItem('token');
  const groupId = localStorage.getItem('groupId');
  try {
    const response = await axios.get(`http://localhost:3000/usergroup/getgroupuser?groupId=${groupId}`, {
      headers: { 'Authentication': token }
    });

    const userList = response.data.userofgroup;
    // console.log(response.data.userofgroup);
    const userUl = document.getElementById('user');
    userUl.innerHTML = ''; // Clear previous user list   
    for (let i = 0; i < userList.length; i++) {
      const userLi = document.createElement('li');
      userLi.textContent += userList[i];
      userUl.appendChild(userLi);
    }

  } catch (error) {
    console.error("Error fetching users:", error);
  }
}
window.addEventListener('load', getuser);
chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = chatMessageInput.value;
  const groupId=localStorage.getItem('groupId')
  const token = localStorage.getItem('token');
 try {
    const response = await axios.post("http://localhost:3000/groupuser/userchat", { message,groupId }, {
      headers: {'Authentication': token }
    });
   
    if (response.data.success) {
      displayMessage(response.data.usergroupchat.userName, message);
    } else {
      console.error("Message not sent:", response.data.error);
    }
  } catch (error) {
    console.log(error) 
  }
  chatMessageInput.value = "";
});
function displayMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatMessages.appendChild(messageElement);
}
// Function to retrieve chat messages
async function getMessages() {
  const groupId = localStorage.getItem('groupId');
  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.get(`http://localhost:3000/groupuser/getuserchat?groupId=${groupId}`, {
      headers: { 'Authentication': token }
    });
    if (response.data.success) {
      const messages = response.data.usergroup;     
      messages.forEach((message) => {
        displayMessage(message.userName, message.message);
      });
    } else {
      console.log("Failed to retrieve messages:", response.data.error);
    }
  } catch (error) {
    console.log("Error while retrieving messages:", error);
  }
}
getMessages();
