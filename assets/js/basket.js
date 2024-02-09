// function getData() {
//     let basket = JSON.parse(localStorage.getItem("basket")) || []
//     console.log(basket);
// }
// getData()

window.onload = () => {
    checkUser()
}

let nouser = document.getElementById("nouser")
let yesuser = document.getElementById("yesuser")
function checkUser() {
    console.log("skAKNDOOJDOAD");
  let user = JSON.parse(localStorage.getItem("user")) || []
  if (user.length > 0) {
    nouser.style.display = "none"; 
    yesuser.style.display = 'inline-block'
  }else{
    nouser.style.display = "inline-block"; 
    yesuser.style.display = 'none'
  }
}

function logout() {
  localStorage.removeItem('user');
  checkUser()
}

