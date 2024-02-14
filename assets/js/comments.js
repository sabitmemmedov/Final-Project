function getData() {
    let commentsBox = document.getElementById("commentsBox")
    commentsBox.innerHTML = ""
    axios.get(`http://localhost:3000/contact`)
    .then(res=>{
        let data   = res.data 
        data.forEach(item => {
            commentsBox.innerHTML +=`
            
            <div class="commentBox">
            <p>email: ${item.email}</p>
            <p>name:${item.name}</p>
            <p>surname:${item.surname}</p>
            
            <p>id:${item.id}</p>
            <p>message:${item.message}</p>
            <button onclick="deleteItem(${item.id})">REMOVE</button>
            </div>

            `
        });
    })
}



async function deleteItem(id){
    await axios.delete(`http://localhost:3000/contact/${id}`)
    getData()
}

window.onload = () =>{
    getData()
}