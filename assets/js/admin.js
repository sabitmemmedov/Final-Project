document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Formdaki değerleri al
    var gameName = document.getElementById("gameName").value;
    var description = document.getElementById("description").value;
    var url = document.getElementById("url").value;
    var price = parseInt(document.getElementById("price").value);
    var discount = document.getElementById("discount").value; // discount değerini string olarak al
    var rank = parseInt(document.getElementById("rank").value);
    var platform = document.getElementById("platform").value;
    var featured = document.getElementById("featured").value;

    // Rastgele bir ID oluştur
    var id = generateRandomId();

    // Tarih oluştur
    var currentDate = new Date();
    var dateString = currentDate.toISOString();

    // JSON objesini oluştur
    var data = {
      id: id,
      name: gameName,
      description: description,
      url: url,
      price: price,
      discount: discount, // discount değeri string olarak atanıyor
      rank: rank,
      platform: platform,
      featured: (featured === "true") ? true : false,
      date: dateString
    };
  
    // Axios kullanarak POST isteği yap
    axios.post('http://localhost:3000/games', data)
      .then(function (response) {
        console.log("POST isteği başarıyla tamamlandı:", response);
        // İsteğin başarılı olduğu bir işlem yapabilirsiniz
      })
      .catch(function (error) {
        console.error("POST isteği başarısız oldu:", error);
        // İsteğin başarısız olduğu bir işlem yapabilirsiniz
      });
  });

// Rastgele bir ID üretme fonksiyonu
function generateRandomId() {
  var chars = '123456789'; // ID rakamlardan oluşmalı ve 0 ile başlamamalı
  var idLength = 8; // ID uzunluğu
  var id = '';
  for (var i = 0; i < idLength; i++) {
    var randomIndex = Math.floor(Math.random() * chars.length);
    id += chars[randomIndex];
  }
  return id;
}


async function getData() {
    let gamesBox = document.getElementById("gamesBox");
    gamesBox.innerHTML = "";

    axios.get(`http://localhost:3000/games`)
        .then(res => {
            let data = res.data;
            // Verileri tarihe göre sırala
            data.sort((a, b) => new Date(a.date) - new Date(b.date));
            // Sıralanmış verileri tersten ekrana yazdır
            data.reverse().forEach(item => {
                gamesBox.innerHTML += `
                <div class="gameBox">
                    <div class="imgBox">
                        <img src=${item.url} alt="">
                    </div>
                    <div class="textBox">
                        <p>name : ${item.name}</p>
                        <p>price :${item.price}$</p>
                       ${item.discount == ""? ` <p>discount : 0%</p>`: ` <p>discount : ${item.discount}%</p>`}
                        <p>rank : ${item.rank}</p>
                        <p>date : ${item.date}</p>
                        <p>hot : ${item.hot}</p>
                        <p>id : ${item.id}</p>
                        <p>platform : ${item.platform}</p>
                        <p>description : ${item.description}</p>
                        <button onclick="deleteItem(${item.id})">REMOVE</button>
                    </div>
                </div>`;
            });
        })
        .catch(error => {
            console.error("Veri alınamadı:", error);
        });
}

window.onload = () =>{
    getData()
}


async function deleteItem(id){
    await axios.delete(`http://localhost:3000/games/${id}`)
    getData()
}