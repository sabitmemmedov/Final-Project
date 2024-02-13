// let content = document.getElementById("content");

// function getId() {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get('id');
// }

// function getGameDetails() {
//     const itemId = getId();
//     if (!itemId) {
//         return;
//     }

//     axios.get(`http://localhost:3000/games/${itemId}`)
//         .then(response => {
//             const game = response.data;
//             const releaseDate = new Date(game.date);
//             const formattedDate = new Intl.DateTimeFormat('en-US').format(releaseDate);

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
//                         ${'<i class="fa-solid fa-star active"></i>'.repeat(game.rank)}
//                         ${'<i class="fa-solid fa-star"></i>'.repeat(5 - game.rank)}
//                     </div>
//                     <p>${game.description}</p>
//                     <div class="pricesDiv">
//                         ${game.discount ? `<span class="discount-rate">-${game.discount}%</span> <span class="first-price">$${game.price}</span><span class="last-price">$${(game.price * (100 - game.discount) / 100).toFixed(2)}</span>` : `<span class="last-price">$${game.price}</span>`}
//                     </div>
//                     <p>Release Date :  ${formattedDate}</p>
//                     <div class="btnsBox">
//                         <button onclick="addBasket('${game.id}')">ADD TO CART</button>
//                         <button class="addWish" onclick="addWish('${game.id}')>ADD TO WISHLIST</button>
//                     </div>
//                 </div>
//             </div>`;
//         })
//         .catch(error => {
//             console.error("Xeta:", error);
//         });
// }

// async function addBasket(id) {
//     try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user || user.length === 0) {
//             alert("Giris edin");
//             return;
//         }

//         const userId = user[0].id;
//         const response = await axios.get(`http://localhost:3000/cart?userId=${userId}`);
//         const cartData = response.data;
//         const postData = await axios.get(`http://localhost:3000/games/${id}`);
//         const checkCard = cartData.find(item => item.name === postData.data.name);

//         if (checkCard) {
//             alert("Bu mehsul artiq sebetde var!");
//         } else {
//             postData.data.userId = userId;
//             const uniqueId = getRandomInteger(1, 10000);
//             postData.data.id = uniqueId.toString();
//             await axios.post(`http://localhost:3000/cart`, postData.data);
//             console.log(postData.data);
//         }
//     } catch (error) {
//         console.error("Xeta:", error);
//     }
// }

// async function addWish(id) {
//     try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user || user.length === 0) {
//             alert("Giriş yapınız");
//             return;
//         }

//         const userId = user[0].id;
//         const postData = await axios.get(`http://localhost:3000/games/${id}`);
//         postData.data.userId = userId;
//         const uniqueId = getRandomInteger(1, 10000);
//         postData.data.id = uniqueId.toString();
//         await axios.post(`http://localhost:3000/wish`, postData.data);
//         console.log(postData.data);
//         alert("Ürün dilek listenize eklendi!");
//     } catch (error) {
//         console.error("Hata:", error);
//     }
// }


// function getRandomInteger(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// window.onload = () => {
//     getGameDetails();
// };
let content = document.getElementById("content");

function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function getGameDetails() {
    const itemId = getId();
    if (!itemId) {
        return;
    }

    axios.get(`http://localhost:3000/games/${itemId}`)
        .then(response => {
            const game = response.data;
            const releaseDate = new Date(game.date);
            const formattedDate = new Intl.DateTimeFormat('en-US').format(releaseDate);

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
                    <p>Release Date :  ${formattedDate}</p>
                    <div class="btnsBox">
                        <button class="addCart" onclick="addBasket('${game.id}')">ADD TO CART</button>
                        <button class="addWish" onclick="addWish('${game.id}')">ADD TO WISHLIST</button>
                    </div>
                </div>
            </div>`;
        })
        .catch(error => {
            console.error("Xeta:", error);
        });
}

async function addBasket(id) {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.length === 0) {
            alert("Giriş yapınız");
            return;
        }

        const userId = user[0].id;
        const response = await axios.get(`http://localhost:3000/cart?userId=${userId}`);
        const cartData = response.data;
        const postData = await axios.get(`http://localhost:3000/games/${id}`);
        const checkCard = cartData.find(item => item.name === postData.data.name);

        if (checkCard) {
            alert("Bu mehsul artiq sebetde var!");
        } else {
            postData.data.userId = userId;
            const uniqueId = getRandomInteger(1, 10000);
            postData.data.id = uniqueId.toString();
            await axios.post(`http://localhost:3000/cart`, postData.data);
            console.log(postData.data);
        }
    } catch (error) {
        console.error("Xeta:", error);
    }
}

async function addWish(id) {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.length === 0) {
            alert("Giriş yapınız");
            return;
        }

        const userId = user[0].id;
        const response = await axios.get(`http://localhost:3000/wishlist?userId=${userId}`);
        const wishData = response.data;
        const postData = await axios.get(`http://localhost:3000/games/${id}`);
        const checkWish = wishData.find(item => item.name === postData.data.name);

        if (checkWish) {
            alert("Bu ürün zaten dilek listenizde!");
        } else {
            postData.data.userId = userId;
            const uniqueId = getRandomInteger(1, 10000);
            postData.data.id = uniqueId.toString();
            await axios.post(`http://localhost:3000/wishlist`, postData.data);
            console.log(postData.data);
            alert("Ürün dilek listenize eklendi!");
        }
    } catch (error) {
        console.error("Hata:", error);
    }
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onload = () => {
    getGameDetails();
};
