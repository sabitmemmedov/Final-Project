let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let form = document.getElementById("form");
let findData;

async function getData() {
    await axios.get(`http://localhost:3000/users`)
        .then(res => {
            findData = res.data;
        });
}

async function checkUser(e) {
    e.preventDefault();

    await getData();

    let checkEmail = findData.find(item => item.password === passwordInput.value && item.email === emailInput.value);

    if (checkEmail) {
        let user = JSON.parse(localStorage.getItem("user")) || [];
        user.push(checkEmail);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "./home.html";
    } else {
        emailInput.style.borderColor = "red"; 
        passwordInput.style.borderColor = "red"; 
        emailInput.placeholder = "Wrong email";
        passwordInput.placeholder = "Wrong password"; 
    }
    form.reset();
}

form.addEventListener("submit", checkUser);
