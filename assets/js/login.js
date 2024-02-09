let email = document.getElementById("email")
let password = document.getElementById("password")
let form  = document.getElementById("form")
let findData

async function getData() {
    await axios.get(`http://localhost:3000/users`)
        .then(res => {
            findData = res.data
        })
}

async function checkUser(e) {
    e.preventDefault()

    await getData()

    let checkEmail = findData.find(item => item.email === email.value)
    let checkPassword = findData.find(item => item.password === password.value)

    if (checkEmail && checkPassword) {
        let user = JSON.parse(localStorage.getItem("user")) || []
        user.push(checkEmail)
        localStorage.setItem("user", JSON.stringify(user))
        console.log("Hoş geldiniz!", checkEmail.name)
        window.location.href = "./home.html"
    } else {
        console.log("Parola veya email yanlış!")
    }
}

form.addEventListener("submit", checkUser)

