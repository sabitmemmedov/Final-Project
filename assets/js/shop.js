let nouser = document.getElementById("notuser");
let yesuser = document.getElementById("yesuser");

function checkUser() {
  let user = JSON.parse(localStorage.getItem("user")) || [];
  if (user.length > 0) {
    document.getElementById("usermail").innerHTML = user[0].email;
    nouser.style.display = "none";
    yesuser.style.display = "inline-block";
  } else {
    nouser.style.display = "inline-block";
    yesuser.style.display = "none";
  }
}

function logout() {
  localStorage.removeItem('user');
  checkUser();
}

let productsCart = document.getElementById("products-cards");

let gamesData;

async function getData() {
  await axios.get(`http://localhost:3000/games`)
    .then(res => {
      gamesData = res.data;
      filterGames();
    })
}

function displayGames(filteredGames = gamesData) {
  productsCart.innerHTML = '';
  filteredGames.forEach(item => {
    productsCart.innerHTML += `
      <li class="product-card">
        <div onclick="showDetails(${item.id})" class="imgBox">
          <img src=${item.url} alt="">
        </div>
        <div class="textBox">
          <h4>${item.name}</h4>
          <div class="priceDiv">
            ${item.discount==""? `<span class="last-price">$${item.price}</span>`:`<span class="last-price">$${(item.price * (1 - Number(item.discount) / 100)).toFixed(2)}</span><span class="first-price">$${item.price.toFixed(2)}</span>`}
          </div>
        </div>
        <div class="iconsBox">
          <i class="fa-solid fa-star active"></i><i class="fa-solid fa-star"></i><i
            class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
            class="fa-solid fa-star"></i>
        </div>
        <div class="btnsBox">
          <div class="row">
            <div class="col-6">
              <button style="border-bottom-left-radius: 8px;"><i class="fa-solid fa-cart-arrow-down"></i></button>
            </div>
            <div class="col-6">
              <button style="border-bottom-right-radius: 8px;"><i class="fa-regular fa-heart"></i></button>
            </div>
          </div>
        </div>
        <div  class="topBtnsBoxx" style="${item.discount === "" ? 'justify-content:end;' : 'justify-content: space-between;'}">
          ${item.discount === "" ? "" : `<div class="disDiv"> <span class="discountSpan">-${item.discount}%</span> </div> `}
          ${item.hot ? "<div class='hotSpanDiv'> <span class='hotSpan'>HOT</span> </div>" : ""}
        </div>
      </li>`;
  });
}

function filterGames() {
  const platform = document.getElementById('platformSelect').value;
  const priceOrder = document.getElementById('priceSelect').value;

  let filteredGames = gamesData;

  if (platform !== 'All') {
    filteredGames = filteredGames.filter(game => game.platform === platform);
  }

  if (priceOrder === 'ascending') {
    filteredGames.sort((a, b) => a.price - b.price);
  } else if (priceOrder === 'descending') {
    filteredGames.sort((a, b) => b.price - a.price);
  }

  displayGames(filteredGames);
}

document.getElementById('platformSelect').addEventListener('change', filterGames);
document.getElementById('priceSelect').addEventListener('change', filterGames);

window.onload = () => {
  getData();
  checkUser();
}


function showDetails(id){
  window.location.href = `detailpage.html?id=${id}`;
}   

const searchInp = document.getElementById('searchInp');
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
  const searchTerm = searchInp.value.trim().toLowerCase();
  if (searchTerm === "") {
    displayGames(gamesData);
  } else {
    const filteredGames = gamesData.filter(game => game.name.toLowerCase().includes(searchTerm));
    displayGames(filteredGames);
  }
});