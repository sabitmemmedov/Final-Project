let user;
let userId;

window.onload = () => {
  checkUser();
  getCart();
}

let nouser = document.getElementById("nouser");
let yesuser = document.getElementById("yesuser");
let showCardCount = document.getElementById("showCardCount");

function checkUser() {
  user = JSON.parse(localStorage.getItem("user")) || [];
  if (user.length > 0) {
    document.getElementById("usermail").innerHTML = user[0].email;
    nouser.style.display = "none";
    yesuser.style.display = 'inline-block';
    document.querySelector(".section-main-content").style.display = "block";
  } else {
    nouser.style.display = "inline-block";
    yesuser.style.display = 'none';
    document.querySelector(".section-main-content").style.display = "none";
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
        checkPrice(res.data);
        noItem(res.data);
      })
      .catch(error => {
        console.error("Error fetching cart:", error);
      });
  }
}

let cardsBox = document.getElementById("cardsBox");

function displayCart(data) {
  cardsBox.innerHTML = "";
  showCardCount.innerHTML = data.length;
  if (data.length > 0) {
    document.querySelector(".section-main-content").style.display = "block"; // Eğer ürünler varsa ana içerik bölümünü göster
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
                  <button onclick="remove(${item.id})" class="removeBtn">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    });
  } else {
    noItem(data);
  }
}

async function remove(id) {
  await axios.delete(`http://localhost:3000/cart/${id}`);
  getCart();
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

async function deleteCartItemsByUserId(userId) {
  try {
    const response = await axios.get(`http://localhost:3000/cart?userId=${userId}`);
    const cartItems = response.data;

    for (const item of cartItems) {
      await axios.delete(`http://localhost:3000/cart/${item.id}`);
      console.log(`Cart item with id ${item.id} deleted.`);
    }

    console.log("All cart items deleted successfully.");
  } catch (error) {
    console.error("Error deleting cart items:", error);
  }
}

function showOrderModal() {
  var checkOutButton = document.getElementById("checkOut");
  checkOutButton.addEventListener("click", async function (event) {
    var userId = JSON.parse(localStorage.getItem("user"))[0].id;

    var orderModal = document.querySelector(".orderModal");
    var gifBox = document.querySelector(".gifBoxxx");
    var textBox = document.querySelector(".textBoxxx");

    orderModal.style.display = "block";
    gifBox.style.display = "flex";
    textBox.style.display = "none";

    setTimeout(async function () {
      gifBox.style.display = "none"; // GifBox gizlenir
      textBox.style.display = "flex"; // TextBox görünür hale gelir

      // 3 saniye sonra silme işlemi gerçekleştirilir
      setTimeout(async function () {
        // Modal kapanmadan önce bekle
        await deleteCartItemsByUserId(userId);

        setTimeout(function () {
          orderModal.style.display = "none";
        }, 2000); // 2 saniye sonra
      }, 3000); 
    }, 3000); // GifBox 3 saniye boyunca görünür, TextBox gizlidir
  });
}
function noItem(data) {
  let noItemDiv = document.querySelector(".noItem");
  if (data.length == 0) {
    noItemDiv.style.display = "flex";
    document.querySelector(".section-main-content").style.display = "none";
  } else {
    noItemDiv.style.display = "none";
    document.querySelector(".section-main-content").style.display = "block";
  }
}

showOrderModal();

