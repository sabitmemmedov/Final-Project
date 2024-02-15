window.onload = function() {
    var form = document.querySelector("form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        var email = document.getElementById("email").value;
        var name = document.getElementById("name").value;
        var surname = document.getElementById("surname").value;
        var message = document.getElementById("msg").value;

        if (email.trim() === "" || name.trim() === "" || surname.trim() === "" || message.trim() === "") {
            alert("Butun inputlari doldurun");
            return;
        }

        var randomId = generateRandomId();

        var postData = {
            id: randomId, 
            email: email,
            name: name,
            surname: surname,
            message: message
        };

        try {
            var response = await axios.post("http://localhost:3000/contact", postData);

            if (response.status === 200) {
                form.reset();
            } else {
                throw new Error("Xeta");
            }
        } catch (error) {
            console.error( error);
        }
    });

    checkUser(); 
};

function checkUser() {
    var user = JSON.parse(localStorage.getItem("user")) || [];
    var nouser = document.getElementById("nouser");
    var yesuser = document.getElementById("yesuser");

    if (user.length > 0) {
        document.getElementById("usermail").innerHTML = user[0].email;
        nouser.style.display = "none";
        yesuser.style.display = 'inline-block';
    } else {
        nouser.style.display = "inline-block";
        yesuser.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('user');
    checkUser();
    window.location.reload();
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
