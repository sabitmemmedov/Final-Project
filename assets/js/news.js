window.onload = () => {
    checkUser()
    getData()
}

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


function getData() {
    let newsBox = document.getElementById("newsBox")
    newsBox.innerHTML = ""
    axios.get(`http://localhost:3000/news`)
        .then(res => {
            let data = res.data
            data.forEach(item => {
                newsBox.innerHTML += `

                <div class="newsItem">
                <div class="row">
                    <div class="col-12 col-xl-4 col-sm-4 col-lg-4 pb-3">
                        <div class="imgBox">
                            <img src=${item.url} alt="">
                        </div>
                    </div>
                    <div class="col-12 col-xl-8 col-sm-8 col-lg-8 accordion">
                        <div class="textBox">
                            <h3 class="news-title">
                               ${item.title}
                            </h3>
                            <span>By <strong>admin</strong></span>
                            <p class="news-description">${item.description}</p>
                            <button onclick="showDetailsPage(${item.id})">Read More</button>
                        </div>
                    </div>
                </div>
            </div>
            
            `
            });
        })
}

function showDetailsPage(id){
    window.location.href = `news-detailpage.html?id=${id}`;
  }   