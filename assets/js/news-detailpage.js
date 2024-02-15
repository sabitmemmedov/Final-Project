
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

    axios.get(`http://localhost:3000/news/${itemId}`)
        .then(response => {
            const news = response.data;
            const releaseDate = new Date(news.date);
            const formattedDate = new Intl.DateTimeFormat('en-US').format(releaseDate);

            content.innerHTML = `
            <a class="back" href="./news.html"><i class="fa-regular fa-circle-xmark"></i></a>
            <div class="itemBox">
            <div class="titleDiv">
            <h4>${news.title}</h4>
            <span>By <strong>admin</strong></span>
            </div>
        
                <div class="imgBox">
                    <img src="${news.url}" alt="${news.name}">
                </div>
                <div class="textBox">
                   

            
                    <p>${news.description}</p>
                  
                    <p>Release Date :  ${formattedDate}</p>
                </div>
            </div>`;
        })
        .catch(error => {
            console.error("Xeta:", error);
        });
}





window.onload = () => {
    getGameDetails();
};
