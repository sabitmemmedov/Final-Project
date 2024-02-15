document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    var gameName = document.getElementById("gameName").value;
    var description = document.getElementById("description").value;
    var url = document.getElementById("url").value;
    var price = parseInt(document.getElementById("price").value);
    var discount = document.getElementById("discount").value; 
    var rank = parseInt(document.getElementById("rank").value);
    var platform = document.getElementById("platform").value;
    var featured = document.getElementById("featured").value;

    var id = generateRandomId();

    var currentDate = new Date();
    var dateString = currentDate.toISOString();

    var data = {
      id: id,
      name: gameName,
      description: description,
      url: url,
      price: price,
      discount: discount,
      rank: rank,
      platform: platform,
      featured: (featured === "true") ? true : false,
      date: dateString
    };
  
    axios.post('http://localhost:3000/games', data)
      .then(function (response) {
        console.log("POST sorgusu edildi:", response);
      })
      .catch(function (error) {
        console.error("POST sorgusunda xeta:", error);
      
      });
  });

function generateRandomId() {
  var chars = '123456789'; 
  var idLength = 8;
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
            data.sort((a, b) => new Date(a.date) - new Date(b.date));
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
            console.error( error);
        });
}

window.onload = () =>{
    getData()
}


async function deleteItem(id){
    await axios.delete(`http://localhost:3000/games/${id}`)
    getData()
}