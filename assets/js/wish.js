
let user;
let userId;

window.onload = () => {
  checkUser();
  getCart();

}

let nouser = document.getElementById("nouser");
let yesuser = document.getElementById("yesuser");
let showCardCount = document.getElementById("showWishCount")
function checkUser() {
  user = JSON.parse(localStorage.getItem("user")) || [];
  if (user.length > 0) {
    document.getElementById("usermail").innerHTML = user[0].email
    
    nouser.style.display = "none";
    yesuser.style.display = 'inline-block';
  } else {
    document.querySelector(".noItem").style.display = "flex"
    nouser.style.display = "inline-block";
    yesuser.style.display = 'none';
  }
}

function logout() {
  localStorage.removeItem('user');
  checkUser();
  window.location.reload();

}

function getCart() {
  user = JSON.parse(localStorage.getItem("user")) || [];
  if (user.length > 0) {
    userId = user[0].id;
    axios.get(`http://localhost:3000/wishlist?userId=${userId}`)
      .then(res => {
        displayCart(res.data);
      })
  }
}

let cardsBox = document.getElementById("cardsBox");

function displayCart(data) {
  if (data.length == 0) {
    document.querySelector(".noItem").style.display = "flex"
  } else {
    document.querySelector(".noItem").style.display = "none"
    cardsBox.innerHTML = "";
    showCardCount.innerHTML = data.length
    data.forEach(item => {
      cardsBox.innerHTML += `
        <div class="cardBox">
          <div class="row">
            <div class="col-4 col-sm-2 col-xl-2">
              <div class="imgBox"><img src=${item.url} alt=""></div>
            </div>
            <div class="col-xl-4 col-sm-4  col-8">
              <div class="textBox">
                <h4>${item.name}</h4>
                <p>${item.platform}</p>
              </div>
            </div>
            <div class="col-xl-6 col-sm-6 col-12">
              <div class="btnsBox">
                <div class="prices">
                ${item.discount === "" ? `<span class='last-price'>$${item.price.toFixed(2)}</span>` : `    <span class="discount-rate">-${item.discount}%</span>
                <span class="first-price">$${item.price.toFixed(2)}</span>
                <span class="last-price">$${(item.price * (1 - Number(item.discount) / 100)).toFixed(2)}</span> `}
              
                </div>
                <div class="btnsDiv">
                  <button onclick="remove(${item.id})" class="removeBtn">Remove</button> <button onclick="addBasket(${item.id})" class="addBtn">ADD TO CART</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    });
  }

}

async function remove(id) {
  axios.delete(`http://localhost:3000/wishlist/${id}`)
}

//////////////////// ad basket


let findData
async function getData() {
  let user = JSON.parse(localStorage.getItem("user")) || []
  userId = user[0].id
  await axios.get(`http://localhost:3000/wishlist?userId=${userId}`)
    .then(res => {
      findData = res.data
    })
}

let findUser
async function getUsers() {
  await axios.get(`http://localhost:3000/users`)
    .then(res => {
      findUser = res.data
    })
}



async function addBasket(id) {
  await getData();
  await getUsers();
  var filterLocale;
  let user = JSON.parse(localStorage.getItem("user")) || [];
  if (user.length > 0) {
    let check = findUser.find((value) => user.find((setValue) => filterLocale = value.id === setValue.id));
    if (check) {
      let cardData;
      await axios.get(`http://localhost:3000/cart?userId=${check.id}`)
        .then(res => {
          cardData = res.data;
        });
      let postData = findData.find(item => item.id == id);

      let checkCard = cardData.find(item => item.name == postData.name);
      if (checkCard) {
        alert("bu mehsuldan artiq elave olunub");
      } else {
        postData.userId = check.id;

        let uniqueId = getRandomInteger(1, 10000);
        postData.id = uniqueId.toString();
        try {
          const response = await axios.post(`http://localhost:3000/cart`, postData);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }

    }
  }
  else {
    alert("Giriş edin");
  }
}




function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

