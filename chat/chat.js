// chat.js

const chatForm = document.getElementById('chat-form');
const chatMessageInput = document.getElementById('chat-message');
const userList = document.getElementById('user-list');
const chatMessages = document.getElementById('chat-messages');
const createGroupForm = document.getElementById('create-group-form');

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const token = localStorage.getItem('token');
  let message = { text: chatMessageInput.value };
  const response = await axios.post("http://51.20.140.212:3000/users/chat", message, { headers: { 'Authentication': token } });
  console.log(response);
  chatMessageInput.value = '';
});

createGroupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  
  const groupNameInput = document.getElementById('group-name');
  let groupName = groupNameInput.value;
  // Capture the user's ID from wherever you store it
  const response = await axios.post("http://51.20.140.212:3000/group/create", { groupName }, { headers: { 'Authentication': token } });
  //console.log(response.data.group.id);
  // window.localStorage.setItem('groupjkjd',response.data.group.id)
  groupNameInput.value = '';
  
});

async function getGroups() {
  const token = localStorage.getItem('token');
  const response = await axios.get("http://51.20.140.212:3000/group/groups", { headers: { 'Authentication': token } });
  const groupList = response.data.groups;
  
  const groupsUl = document.getElementById('groups');
  groupsUl.innerHTML = ''; // Clear previous group list
  groupList.forEach((group) => {
      const groupLi = document.createElement('li');
      groupLi.textContent = group.groupName;
      

      groupLi.addEventListener('click', () => {
        // Handle the click event, e.g., navigate to the group chat or perform an action
        // You can use group.groupId or other data to identify the clicked group
        console.log(`Clicked group: ${group.groupName}`);
        console.log(`Clicked group: ${group.id}`);
        window.localStorage.setItem('groupId',group.id)
        window.location.href = "../groupChat/groupChat.html";
      });
      groupsUl.appendChild(groupLi);
  });
}

// Call the getGroups function to initially populate the group list
getGroups();
async function getusers() {
  const response = await axios.get("http://51.20.140.212:3000/user/signup");
  const userlist = response.data.users;
  userList.innerHTML = ''; // Clear previous user list
  userlist.forEach((user) => {
    const userElement = document.createElement('div');
    userElement.textContent = user.name + " joined";
    userList.appendChild(userElement);
  });
}

async function getmessages() {
  const response = await axios.get("http://51.20.140.212:3000/users/chat");
  let chatHistory = response.data.message;
  chatMessages.innerHTML = ''; // Clear previous chat messages
  chatHistory.forEach((chat) => {
    const chatMessageElement = document.createElement('div');
    chatMessageElement.textContent = `${chat.userName}: ${chat.message}`;
    chatMessages.appendChild(chatMessageElement);
  });
}

let intervalId;

function startUpdatingMessages() {
  // Clear any previous interval
  clearInterval(intervalId);

  // Set a new interval to call the function every 1 second
  intervalId = setInterval(getmessages, 1000);
}

startUpdatingMessages();
window.addEventListener('load', () => {
  getusers();
  getmessages();
  getGroups();
})