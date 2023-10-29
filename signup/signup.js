async function signup(e) {
    try {
        e.preventDefault();
        const signupDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            phonenumber: e.target.phonenumber.value,
            password: e.target.password.value
        };

        const response = await axios.post('http://localhost:3000/user/signup', signupDetails);

        if (response.status === 201) {
            alert('User created successfully');
            window.location.href = "../Login/login.html";
        } 
         else {
            throw new Error('Failed to sign up');
        }
    } catch (err) {
            alert('user already exist'); 
            window.location.href = "../Login/login.html";
        document.body.innerHTML += `<div style="color:red">${err}</div>`;
    }
}
