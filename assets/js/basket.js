
let user;
let userId;

window.onload = () => {
  checkUser();
  getCart();

}

let nouser = document.getElementById("nouser");
let yesuser = document.getElementById("yesuser");

function checkUser() {
  user = JSON.parse(localStorage.getItem("user")) || [];
  if (user.length > 0) {
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

function getCart() {
  user = JSON.parse(localStorage.getItem("user")) || [];
  if (user.length > 0) {
    userId = user[0].id;
    axios.get(`http://localhost:3000/cart?userId=${userId}`)
      .then(res => {
        displayCart(res.data);
        checkPrice(res.data)
      })
  }
}

let cardsBox = document.getElementById("cardsBox");

function displayCart(data) {
  cardsBox.innerHTML = "";
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
                <span class="discount-rate">-${item.discount}%</span>
                <span class="first-price">$${item.price.toFixed(2)}</span>
                <span class="last-price">$${(item.price * (1 - Number(item.discount) / 100)).toFixed(2)}</span>
              </div>
              <div class="btnsDiv">
                <button onclick="remove(${item.id})" class="removeBtn">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  });
}

async function remove(id) {
  axios.delete(`http://localhost:3000/cart/${id}`)
}




let checkPricee = document.getElementById("chechPrice");
let salePrice = document.getElementById("salePrice");
let subtotalPrice = document.getElementById("subtotalPrice");

function checkPrice(data) {
  let totalPrice = 0;
  let totalSalePrice = 0;
  
  data.forEach(item => {
    totalPrice += item.price;
    if (item.discount !== "") {
      let discountedPrice = item.price - (item.price * Number(item.discount) / 100);
      totalSalePrice += discountedPrice;
    } else {
      totalSalePrice += item.price;
    }
  });

  let totalSalePricee = totalPrice - totalSalePrice;

  checkPricee.textContent = `$${totalPrice.toFixed(2)}`;
  salePrice.textContent = `$${totalSalePricee.toFixed(2)}`;
  subtotalPrice.textContent = `$${totalSalePrice.toFixed(2)}`;
}
