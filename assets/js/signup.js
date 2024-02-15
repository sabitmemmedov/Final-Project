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
    
    let randomId = generateRandomId();

    let data  = {
        id: randomId,
        email: setEmail.value ,
        name: setName.value ,
        surname: setSurname.value,
        password: setPassword.value
    }
    if (findData.find(item => item.email === email.value)) {
        alert("bu emaille artiq qeydiyyatdan kecilib");
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

function generateRandomId() {
  var chars = '123456789';
  var idLength = 8; 
  var id = '';
  for (var i = 0; i < idLength; i++) {
    var randomIndex = Math.floor(Math.random() * chars.length);
    if (i === 0 && randomIndex === 0) {
      randomIndex = 1;
    }
    id += chars[randomIndex];
  }
  return id;
}


