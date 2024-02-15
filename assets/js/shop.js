const notUserElement = document.getElementById("notuser");
const yesUserElement = document.getElementById("yesuser");
const userMailElement = document.getElementById("usermail");
const productsCartElement = document.getElementById("products-cards");
const platformSelectElement = document.getElementById('platformSelect');
const priceSelectElement = document.getElementById('priceSelect');
const searchInpElement = document.getElementById('searchInp');
const searchBtnElement = document.getElementById('searchBtn');

function checkUser() {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  if (user.length > 0) {
    userMailElement.innerHTML = user[0].email;
    notUserElement.style.display = "none";
    yesUserElement.style.display = "inline-block";
  } else {
    notUserElement.style.display = "inline-block";
    yesUserElement.style.display = "none";
  }
}

function logout() {
  localStorage.removeItem('user');
  checkUser();
}

async function getData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getUsers(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function filterAndDisplayGames() {
  let filteredGames = gamesData.slice(); 
  const platform = platformSelectElement.value;
  const priceOrder = priceSelectElement.value;

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

function displayGames(filteredGames) {
  productsCartElement.innerHTML = filteredGames.map(item => `
    <li class="product-card">
      <div onclick="showDetails(${item.id})" class="imgBox">
        <img src=${item.url} alt="">
      </div>
      <div class="textBox">
        <h4>${item.name}</h4>
        <div class="priceDiv">
          ${item.discount === "" ? `<span class="last-price">$${item.price}</span>` : `<span class="last-price">$${(item.price * (1 - Number(item.discount) / 100)).toFixed(2)}</span><span class="first-price">$${item.price.toFixed(2)}</span>`}
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
            <button style="border-bottom-left-radius: 8px;" onclick="addToCart(${item.id})"><i class="fa-solid fa-cart-arrow-down"></i></button>
          </div>
          <div class="col-6">
            <button style="border-bottom-right-radius: 8px;" onclick="addToWishlist(${item.id})"><i class="fa-regular fa-heart"></i></button>
          </div>
        </div>
      </div>
      <div  class="topBtnsBoxx" style="${item.discount === "" ? 'justify-content:end;' : 'justify-content: space-between;'}">
        ${item.discount === "" ? "" : `<div class="disDiv"> <span class="discountSpan">-${item.discount}%</span> </div> `}
        ${item.hot ? "<div class='hotSpanDiv'> <span class='hotSpan'>HOT</span> </div>" : ""}
      </div>
    </li>`).join('');
}

function handleSearch() {
  const searchTerm = searchInpElement.value.trim().toLowerCase();
  if (searchTerm === "") {
    displayGames(gamesData);
  } else {
    const filteredGames = gamesData.filter(game => game.name.toLowerCase().includes(searchTerm));
    displayGames(filteredGames);
  }
}

window.onload = async () => {
  gamesData = await getData(`http://localhost:3000/games`);
  findUser = await getUsers(`http://localhost:3000/users`);
  filterAndDisplayGames();
  checkUser()
  platformSelectElement.addEventListener('change', filterAndDisplayGames);
  priceSelectElement.addEventListener('change', filterAndDisplayGames);
  searchBtnElement.addEventListener('click', handleSearch);
}

function showDetails(id) {
  window.location.href = `detailpage.html?id=${id}`;
}

async function addToCart(id) {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  if (user.length > 0) {
    const check = findUser.find(value => user.find(setValue => value.id === setValue.id));
    if (check) {
      let cardData;
      await axios.get(`http://localhost:3000/cart?userId=${check.id}`)
        .then(res => {
          cardData = res.data;
        })
      const postData = gamesData.find(item => item.id == id);
      const checkCard = cardData.find(item => item.name == postData.name);
      if (checkCard) {
        alert("Bu mehsul onceden elave olunub");
      } else {
        postData.userId = check.id;
        const uniqueId = getRandomInteger(1, 10000);
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
}


async function addToWishlist(id) {
  const user = JSON.parse(localStorage.getItem("user")) || [];
  if (user.length > 0) {
    const check = findUser.find(value => user.find(setValue => value.id === setValue.id));
    if (check) {
      let wishlistData;
      await axios.get(`http://localhost:3000/wishlist?userId=${check.id}`)
        .then(res => {
          wishlistData = res.data;
        })
      const postData = gamesData.find(item => item.id == id);
      const checkItem = wishlistData.find(item => item.name == postData.name);
      if (checkItem) {
        alert("Bu mehsul onceden elave edilib");
      } else {
        postData.userId = check.id;
        const uniqueId = getRandomInteger(1, 10000);
        postData.id = uniqueId.toString();
        try {
          const response = await axios.post(`http://localhost:3000/wishlist`, postData);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
}


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }