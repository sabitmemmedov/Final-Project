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
        console.log("Hoş geldiniz!", checkEmail.name);
        window.location.href = "./home.html";
    } else {
        emailInput.style.borderColor = "red"; // Kırmızı renkde border ekleniyor
        passwordInput.style.borderColor = "red"; // Kırmızı renkde border ekleniyor
        emailInput.placeholder = "Wrong email"; // Yanlış email placeholder'ı
        passwordInput.placeholder = "Wrong password"; // Yanlış parola placeholder'ı
    }
    form.reset();
}

// Form submit olayı dinleniyor
form.addEventListener("submit", checkUser);
