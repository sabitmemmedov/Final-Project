

// section 2 slider 

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousell");
const firstCardWidth = carousel.querySelector(".sec-two-card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
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
  getData(filtering, value)
}
///slider 2 axios get 

function getData(func, ctg) {
  axios.get(`http://localhost:3000/games`)
    .then(res => {
      func(res.data, ctg)
    })
}
window.onload = () => {
  changeFilter(document.getElementById("defaultFilter"), 'All')
}
function filtering(data, ctg, secTwoCards = document.getElementById("sec-two-cards")) {
  let filter
  secTwoCards.innerHTML = ""
  filter = data.filter(item => ctg.includes("All") ? item : item.platform === ctg)

  filter.forEach(item => {
    secTwoCards.innerHTML += `
    <li class="sec-two-card">
    <div class="imgBox">
        <img src=${item.url} alt="">
    </div>
    <div class="textBox">
        <h4>
            ${item.name}
        </h4>
        <span>$${item.price}.00 </span>
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
  </li>

    `
  })
}
////////////////////////////////////////////////////////////////




