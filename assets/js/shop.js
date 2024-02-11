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
  displayGames()
}


///////////// games get

let gamesData
async function getData() {
  await axios.get(`http://localhost:3000/games`)
    .then(res => {
      gamesData = res.data
      console.log(gamesData);
    })
}

let productsCart = document.getElementById("products-cards")
function displayGames() {
  gamesData.forEach(item => {
    productsCart.innerHTML += `
    
    <li class="product-card">
    <div class="imgBox">
        <img src=${item.url} alt="">
    </div>
    <div class="textBox">
        <h4>
            Gears of War 5
        </h4>
        <span>$79.00</span>
    </div>
    <div class="iconsBox">
        <i class="fa-solid fa-star active"></i><i class="fa-solid fa-star"></i><i
            class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
            class="fa-solid fa-star"></i>
    </div>
    <div class="btnsBox">
        <div class="row">
            <div class="col-6">
                <button style="border-bottom-left-radius: 8px;"><i
                        class="fa-solid fa-cart-arrow-down"></i></button>
            </div>
            <div class="col-6">
                <button style="border-bottom-right-radius: 8px;"><i
                        class="fa-regular fa-heart"></i></button>
            </div>
        </div>
    </div>
    <div class="topBtnsBoxx">
        <div class="disDiv"> <span>-20%</span> </div>
        <div class="hotSpanDiv"> <span>HOT</span> </div>
    </div>
</li>
    
    `
  });
}
getData()