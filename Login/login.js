async function login(e) {
    try {
        e.preventDefault();
        const obj = {
            email: e.target.email.value,
            password: e.target.password.value
        };
        
        const response = await axios.post('http://localhost:3000/user/login', obj);

        if (response.status === 201 && response.data.success) {
            console.log(response.data);
            alert("User Successfully logged in");
            localStorage.setItem('token', response.data.token);
          
           
            window.location.href = "../chat/chat.html";
            
        } else {
            throw new Error('Failed to log in'); 
        }
    } catch (err) {
        
        document.body.innerHTML += `<div style="color:red">${err}</div>`;
    }
}
