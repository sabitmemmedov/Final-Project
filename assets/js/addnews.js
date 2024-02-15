document.getElementById("btn").addEventListener("click", function () {
    const newsTitle = document.getElementById("newsTitle").value;
    const description = document.getElementById("description").value;
    const url = document.getElementById("url").value;

    const randomId = generateRandomId(10); 

    const date = new Date().toISOString();

    const data = {
        id: randomId,
        title: newsTitle,
        description: description,
        url: url,
        date: date
    };

    axios.post("http://localhost:3000/news", data)
});

function generateRandomId(length) {
    let result = '';
    const characters = '123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



function getData() {
    let newsBox = document.getElementById("newsBox")
    newsBox.innerHTML = ""
    axios.get(`http://localhost:3000/news`)
        .then(res => {
            let data = res.data
            data.forEach(item => {
                newsBox.innerHTML += `

                <div class="newsItem">
                <div class="row">
                    <div class="col-12 col-xl-4 col-sm-4 col-lg-4 pb-3">
                        <div class="imgBox">
                            <img src=${item.url} alt="">
                        </div>
                    </div>
                    <div class="col-12 col-xl-8 col-sm-8 col-lg-8 accordion">
                        <div class="textBox">
                            <h3 class="news-title">
                               ${item.title}
                            </h3>
                            <span>By <strong>admin</strong></span>   <span>${item.date}</span>  id:${item.id}</span>
                            <p class="news-description">${item.description}</p>
                            <button onclick="removeItem(${item.id})">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
            
            `
            });
        })
}



window.onload = () => {
    getData()
}


function removeItem(id) {
    axios.delete(`http://localhost:3000/news/${id}`)
}