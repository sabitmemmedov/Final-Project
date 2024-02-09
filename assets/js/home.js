// section 2 slider 
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousell");
const firstCardWidth = carousel.querySelector(".sec-two-card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  }
  else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
///////////////////////////////////// section 2 
// section 2 Filterlerin renginin deyismesi



function changeFilter(selectedItem, value) {
  const filterItems = document.querySelectorAll('.filter-item');
  filterItems.forEach(item => item.classList.remove('active'));
  selectedItem.classList.add('active');

  filtering(value)
}
///slider 2 axios get 


window.onload = () => {
  changeFilter(document.getElementById("defaultFilter"), 'All')
  changedFilter(document.getElementById("filterDefault"), 'All')
  filtering("All", document.getElementById("custom-sec-two-cards"))
  getData()
  checkUser();
  getUsers()

}
async function filtering(ctg, secTwoCards = document.getElementById("sec-two-cards")) {
  secTwoCards.innerHTML = ""
  var data
  let filter
  await axios.get(`http://localhost:3000/games`).then(res => data = res.data)

  if (secTwoCards.id === "sec-two-cards") {
    filter = data.filter(item => ctg.includes("All") && item.hot ? item : item.platform === ctg && item.hot)
  } else if (secTwoCards.id === "resent-cards") {
    let dateFilter = (item) => new Date(item.date) >= new Date(new Date().setDate(new Date().getDate() - 30)) && new Date(item.date) <= new Date()
    filter = data.filter(item => ctg.includes("All") && dateFilter(item) ? item : item.platform === ctg && dateFilter(item))
  } else {
    filter = data.filter(item => ctg.includes("All") && item.discount !== "")
  }


  filter.forEach(item => {
    let starIcons = "";
    const yellowStars = Math.min(5, item.rank);
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= yellowStars ? "fa-solid fa-star active" : "fa-solid fa-star";
      starIcons += `<i class="${starClass}"></i>`;
    }
    if (secTwoCards.id === "sec-two-cards" || secTwoCards.id === "resent-cards") {
      secTwoCards.innerHTML += `
      <li class="sec-two-card">
      <div class="imgBox">
          <img src=${item.url} alt="">
      </div>
      <div class="textBox">
          <h4>
              ${item.name}
          </h4>
          <div>
          ${item.discount === "" ? `<span>$${item.price.toFixed(2)} </span> ` : `<span>$${(item.price * (1 - Number(item.discount) / 100)).toFixed(2)} </span><span style='color:gray !important;text-decoration: line-through;'>$${item.price.toFixed(2)} </span> `} 
          </div>
      </div>
      <div class="iconsBox">
        ${starIcons}
      </div>
      <div class="btnsBox">
          <div class="row">
              <div class="col-6">
                  <button onclick="addBasket(${item.id})" style="border-bottom-left-radius: 8px;"><i
                          class="fa-solid fa-cart-arrow-down"></i></button>
              </div>
              <div class="col-6">
                  <button onclick="addWish(${item.id})" style="border-bottom-right-radius: 8px;"><i
                          class="fa-regular fa-heart"></i></button>
              </div>
          </div>
      </div>
  
      <div  class="topBtnsBoxx" style="${item.discount === "" ? 'justify-content:end;' : 'justify-content: space-between;'}">
      ${item.discount === "" ? "" : `<div class="disDiv"> <span class="discountSpan">-${item.discount}%</span> </div> `}
      ${item.hot ? "<div class='hotSpanDiv'> <span class='hotSpan'>HOT</span> </div>" : ""}
    </div>
    </li>
  
      `
    } else {
      secTwoCards.innerHTML += `
      
      <li class="custom-sec-two-card">
      <div class="imgBox">
          <img src=${item.url} alt="">
          <div class="imgBoxIcons" style="${item.discount === "" ? 'justify-content:end;' : 'justify-content: space-between;'}">
             ${item.discount === "" ? "" : `<span>-${item.discount}%</span> `}
             ${item.hot ? `<span>HOT</span>` : ""}
          </div>
      </div>
      <div class="textDiv">
          <h4>
             ${item.name}
          </h4>
          <div class="iconsBox">
              ${starIcons}
          </div>
          <div class="priceDiv">
              ${item.discount === "" ? `<span>$${item.price.toFixed(2)} </span> ` : `<span>$${(item.price * (1 - Number(item.discount) / 100)).toFixed(2)} </span><span style='color:gray !important;text-decoration: line-through;'>$${item.price.toFixed(2)} </span> `}
          </div>
          <p class="description">${item.description}</p>
          <div class="btnsDiv">
              <button class="addBasket"><i class="fa-solid fa-cart-arrow-down"></i> Add to
                  card</button>
              <button class="addWish"><i class="fa-regular fa-heart"></i></button>
          </div>
      </div>
  </li>
      
      
      `
    }

  })
}
////////////////////////////////////////////////////////////////

///////  section 3  carusel 


// Custom Carousellllllllllllll
const customWrapper = document.querySelector(".custom-wrapper");
const customCarousel = document.querySelector(".custom-carousell");
const customFirstCardWidth = customCarousel.querySelector(".custom-sec-two-card").offsetWidth;
const customArrowBtns = document.querySelectorAll(".custom-wrapper i");
const customCarouselChildrens = [...customCarousel.children];

let customIsDragging = false, customStartX, customStartScrollLeft, customTimeoutId;

let customCardPerView = Math.round(customCarousel.offsetWidth / customFirstCardWidth);

customCarouselChildrens.slice(-customCardPerView).reverse().forEach(card => {
  customCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

customCarouselChildrens.slice(0, customCardPerView).forEach(card => {
  customCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

customCarousel.classList.add("no-transition");
customCarousel.scrollLeft = customCarousel.offsetWidth;
customCarousel.classList.remove("no-transition");

customArrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    customCarousel.scrollLeft += btn.id == "custom-left" ? -customFirstCardWidth : customFirstCardWidth;
  });
});

const customDragStart = (e) => {
  customIsDragging = true;
  customWrapper.classList.add("dragging");
  customStartX = e.pageX;
  customStartScrollLeft = customCarousel.scrollLeft;
}

const customDragging = (e) => {
  if (!customIsDragging) return;
  customCarousel.scrollLeft = customStartScrollLeft - (e.pageX - customStartX);
}

const customDragStop = () => {
  customIsDragging = false;
  customWrapper.classList.remove("dragging");
}

const customInfiniteScroll = () => {
  if (customCarousel.scrollLeft === 0) {
    customCarousel.classList.add("no-transition");
    customCarousel.scrollLeft = customCarousel.scrollWidth - (2 * customCarousel.offsetWidth);
    customCarousel.classList.remove("no-transition");
  }
  else if (Math.ceil(customCarousel.scrollLeft) === customCarousel.scrollWidth - customCarousel.offsetWidth) {
    customCarousel.classList.add("no-transition");
    customCarousel.scrollLeft = customCarousel.offsetWidth;
    customCarousel.classList.remove("no-transition");
  }

  clearTimeout(customTimeoutId);
  if (!customWrapper.matches(":hover")) customAutoPlay();
}

const customAutoPlay = () => {
  customTimeoutId = setTimeout(() => customCarousel.scrollLeft += customFirstCardWidth, 4000);
}
customAutoPlay();

customCarousel.addEventListener("mousedown", customDragStart);
customCarousel.addEventListener("mousemove", customDragging);
document.addEventListener("mouseup", customDragStop);
customCarousel.addEventListener("scroll", customInfiniteScroll);
customWrapper.addEventListener("mouseenter", () => clearTimeout(customTimeoutId));
customWrapper.addEventListener("mouseleave", customAutoPlay);




/////////// section resent 

function changedFilter(selectedItem, value) {
  const filterItems = document.querySelectorAll('.item-filter');
  filterItems.forEach(item => item.classList.remove('active'));
  selectedItem.classList.add('active');
  filtering(value, document.getElementById("resent-cards"))
}




////// ad basket
let findData
async function getData() {
  await axios.get(`http://localhost:3000/games`)
    .then(res => {
      findData = res.data
      // console.log(findData);
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
  var filterLocale
  let user = JSON.parse(localStorage.getItem("user")) || []
  if (user.length > 0) {
    let check = findUser.find((value) => user.find((setValue) => filterLocale = value.id === setValue.id))
    if (check) {
      // console.log(check.id);
      let data = []
      data.push(findData.find(item => item.id === id.toString()))
      // data.push(findData.find(item => item.id == id))
      // console.log(data);
      await axios.get(`http://localhost:3000/users/${check.id}/`)
        .then(res => {
          console.log(res.data);
        })
      // axios.post(`http://localhost:3000/users/${check.id}/cart`, { game:"gta"})
    }
    // axios.post()
  } else {
    window.location.href = "./login.html"
  }
}

// async function addBasket(id) {
//   let user = JSON.parse(localStorage.getItem("user")) || [];
//   if (user.length > 0) {
//     let check = findUser.find((value) => user.find((setValue) => value.id === setValue.id));
//     if (check) {
//       try {
//         console.log(check.id);
//         let data = [findData.find(item => item.id == id)];
//         await axios.post(`http://localhost:3000/users/${check.id}/cart`, data);
//         console.log("Item added to cart successfully.");
//       } catch (error) {
//         console.error("Error adding item to cart:", error);
//       }
//     }
//   } else {
//     window.location.href = "./login.html";
//   }
// }




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


