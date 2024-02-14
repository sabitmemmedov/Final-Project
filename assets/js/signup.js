// let form = document.getElementById("form")
// let setEmail = document.getElementById("email")
// let setName = document.getElementById("name")
// let setSurname = document.getElementById("surname")
// let setPassword = document.getElementById("password")


// async function getData() {
//     await axios.get(`http://localhost:3000/users`)
//         .then(res => {
//             findData = res.data
//         })
// }

// function postUser(e) {
//     e.preventDefault()
//     let data  = {
//         email:setEmail.value ,
//         name:setName.value ,
//         surname: setSurname.value,
//         password: setPassword.value
//     }
//     if (findData.find(item => item.email === email.value)) {
//         console.log("bu emaille artiq qeydiyyatdan kecilib");
//         form.reset()
//     }else{
//         axios.post(`http://localhost:3000/users/`,data)
//         window.location.href = "./login.html"
//         form.reset()
//     }
// }


// form.addEventListener("submit", postUser)

// window.onload = () => {
//     getData()

// }


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
    
    // Random bir ID oluştur
    let randomId = generateRandomId();

    let data  = {
        id: randomId, // Random ID atanıyor
        email: setEmail.value ,
        name: setName.value ,
        surname: setSurname.value,
        password: setPassword.value
    }
    if (findData.find(item => item.email === email.value)) {
        console.log("bu emaille artiq qeydiyyatdan kecilib");
        form.reset()
    }else{
        axios.post(`http://localhost:3000/users/`,data)
        window.location.href = "./login.html"
        form.reset()
    }
}

form.addEventListener("submit", postUser)

window.onload = () => {
    getData()
}

// Rastgele bir ID üretme fonksiyonu
function generateRandomId() {
  var chars = '123456789'; // ID rakamlardan oluşmalı ve 0 ile başlamamalı
  var idLength = 8; // ID uzunluğu
  var id = '';
  for (var i = 0; i < idLength; i++) {
    var randomIndex = Math.floor(Math.random() * chars.length);
    // İlk karakter 0 olmamalı
    if (i === 0 && randomIndex === 0) {
      randomIndex = 1;
    }
    id += chars[randomIndex];
  }
  return id;
}


