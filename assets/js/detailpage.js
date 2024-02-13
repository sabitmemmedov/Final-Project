// let content = document.getElementById("content");

// function getId() {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get('id');
// }

// function getGameDetails() {
//     const itemId = getId();
//     if (!itemId) {
//         console.error("ID parametresi eksik.");
//         return;
//     }

//     axios.get(`http://localhost:3000/games/${itemId}`)
//         .then(response => {
//             const game = response.data;
//             content.innerHTML = `
//             <a class="backHome" href="./home.html"><i class="fa-regular fa-circle-xmark"></i></a>
//             <div class="itemBox">
//                 <div class="imgBox">
//                     <img src="${game.url}" alt="${game.name}">
//                 </div>
//                 <div class="textBox">
//                     <h4>${game.name}</h4>
//                     <p>${game.platform}</p>
//                     <div class="rankDiv">
//                         ${'<i class=" active fa-solid fa-star"></i>'.repeat(game.rank)}
//                     </div>
//                     <p>${game.description}</p>
//                     <div class="pricesDiv">
//                         ${game.discount ? `<span class="discount-rate">-${game.discount}%</span>  <span class="first-price">$${game.price}</span><span class="last-price">$${(game.price * (100 - game.discount) / 100).toFixed(2)}</span>` : ` <span class="last-price">$${game.price}</span>`}                       
//                     </div>
//                     <p>Release Date : ${game.date}</p>
//                     <div class="btnsBox">
//                         <button class="addCart">ADD TO CART</button>
//                         <button class="addWish">ADD TO WISHLIST</button>
//                     </div>
//                 </div>
//             </div>`;
//         })
//         .catch(error => {
//             console.error("Oyun detayları alınamadı:", error);
//         });
// }

// getGameDetails();


let content = document.getElementById("content");

function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function getGameDetails() {
    const itemId = getId();
    if (!itemId) {
        console.error("ID parametresi eksik.");
        return;
    }

    axios.get(`http://localhost:3000/games/${itemId}`)
        .then(response => {
            const game = response.data;
            content.innerHTML = `
            <a class="backHome" href="./home.html"><i class="fa-regular fa-circle-xmark"></i></a>
            <div class="itemBox">
                <div class="imgBox">
                    <img src="${game.url}" alt="${game.name}">
                </div>
                <div class="textBox">
                    <h4>${game.name}</h4>
                    <p>${game.platform}</p>
                    <div class="rankDiv">
                        ${'<i class="fa-solid fa-star active"></i>'.repeat(game.rank)}
                        ${'<i class="fa-solid fa-star"></i>'.repeat(5 - game.rank)}
                    </div>
                    <p>${game.description}</p>
                    <div class="pricesDiv">
                        ${game.discount ? `<span class="discount-rate">-${game.discount}%</span> <span class="first-price">$${game.price}</span><span class="last-price">$${(game.price * (100 - game.discount) / 100).toFixed(2)}</span>` : `<span class="last-price">$${game.price}</span>`}
                    </div>
                    <p>Release Date : ${game.date}</p>
                    <div class="btnsBox">
                        <button class="addCart">ADD TO CART</button>
                        <button class="addWish">ADD TO WISHLIST</button>
                    </div>
                </div>
            </div>`;
        })
        .catch(error => {
            console.error("Oyun detayları alınamadı:", error);
        });
}

getGameDetails();
