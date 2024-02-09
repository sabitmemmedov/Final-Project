let nouser = document.getElementById("notuser")
let yesuser = document.getElementById("yesuser")
function checkUser() {
    let user = JSON.parse(localStorage.getItem("user")) || []
    if (user.length > 0) {
        nouser.style.display = "none";
        yesuser.style.display = 'inline-block'
    } else {
        nouser.style.display = "inline-block";
        yesuser.style.display = 'none'
    }
}

function logout() {
    localStorage.removeItem('user');
    checkUser()
}


window.onload = () => {
    checkUser()
}