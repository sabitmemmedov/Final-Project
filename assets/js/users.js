function getData() {
    let usersBox = document.getElementById("usersBox")
    usersBox.innerHTML = ""
    axios.get(`http://localhost:3000/users`)
    .then(res=>{
        let data   = res.data 
        data.forEach(item => {
            usersBox.innerHTML +=`
            
            <div class="userBox">
            <p>email: ${item.email}</p>
            <p>name:${item.name}</p>
            <p>surname:${item.surname}</p>
            <p>password:${item.password}</p>
            <p>id:${item.id}</p>
            <button onclick="deleteItem(${item.id})">REMOVE</button>
            </div>

            `
        });
    })
}



async function deleteItem(id){
    await axios.delete(`http://localhost:3000/users/${id}`)
    getData()
}

window.onload = () =>{
    getData()
}