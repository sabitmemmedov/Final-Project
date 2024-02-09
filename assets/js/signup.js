let form = document.getElementById("form")
let setEmail = document.getElementById("email")
let setName = document.getElementById("name")
let setSurname = document.getElementById("surname")
let setPassword = document.getElementById("password")


async function getData() {
    await axios.get(`http://localhost:3000/users`)
        .then(res => {
            findData = res.data
        })
}

function postUser(e) {
    e.preventDefault()
    let data  = {
        email:setEmail.value ,
        name:setName.value ,
        surname: setSurname.value,
        password: setPassword.value
    }
    if (findData.find(item => item.email === email.value)) {
        console.log("bu emaille artiq qeydiyyatdan kecilib");
        form.reset()
    }else{
        axios.post(`http://localhost:3000/users/`,data)
        window.location.href = "./login.html"
        console.log("qeydiyyatdan kecdizniz");
        form.reset()
    }
}


form.addEventListener("submit", postUser)

window.onload = () => {
    getData()

}

