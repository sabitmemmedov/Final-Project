
let minumum = document.getElementById("input-minil")
let maximum = document.getElementById("input-maxil")
let minqiymet = document.getElementById("input-minqiymet")
let maxqiymet = document.getElementById("input-maxqiymet")
let markainput = document.getElementById("inputmarka")
let datal = document.getElementById("marka")
let allCars = document.getElementById("cars-img")
let demo = document.getElementById("demo")
let datalreng = document.getElementById("reng")
let inputreng = document.getElementById("inputreng")
let datalseher = document.getElementById("seher")
let inputseher = document.getElementById("inputseher")
let masincardyazi = document.getElementById("masin-card-yazi")
let masincardimg = document.getElementById("masin-card-img")
let inputModel = document.getElementById("inputmodel")
let model = document.getElementById("model")
let btnbarter = document.getElementById("btnbarter")
let findObj = cars.filter(
    (item, index, array) => index === array.findIndex((a) => a.brand === item.brand)
)
let colors = cars.filter(
    (item, index, array) => index === array.findIndex((a) => a.reng === item.reng)
)
let cities = cars.filter(
    (item, index, array) => index === array.findIndex((a) => a.city === item.city)
)
for (let i in findObj) {
    datal.innerHTML += `
    <option>${findObj[i].brand}</option>
    `
}
for (let i in colors) {
    datalreng.innerHTML += `
    <option>${colors[i].reng}</option>
    `
}
for (let i in cities) {
    datalseher.innerHTML += `
    <option>${cities[i].city}</option>
    `
}

//disable model
markainput.onchange = (e) => {
    if (e.target.value !== "") {
        inputModel.removeAttribute("disabled")
    }
    else {
        inputModel.value = ""
        inputModel.setAttribute("disabled", "")
    }

    if (model.hasChildNodes()) {
        model.innerHTML = ""
    }
    if (model.children[0] === undefined) {
        let modelList = new Set()
        cars.forEach(item => { if (e.target.value === item.brand) modelList.add(item.model) })
        for (let i of modelList) {
            model.innerHTML += `
            <option>${i}</option>
            `
        }
    }
}
//disable model

for (let i in cars) {
    masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${cars[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${cars[i].price}
                ${cars[i].currency}</p>
                <p class = "marka">${cars[i].brand}
                ${cars[i].model}
                </p>
                <p class = "tarix">${cars[i].date},
                    ${cars[i].engine} L,
                    ${cars[i].milestone} km
                </p>
                <p class = "seher">${cars[i].city}
                </p>
            </div>
        </div>
                `
    masincardimg.style.display = "flex"
    masincardimg.style.flexWrap = "wrap"
    masincardimg.style.justifyContent = "space-between"
}
function barter() {
    if (open) {
        btnbarter.style.color = "#212c3a"
        btnbarter.style.backgroundColor = "#ffe6e5"
        btnbarter.style.border = "1px solid #ca1016"
    }
    else {
        btnbarter.style.color = "#212c3a"
        btnbarter.style.backgroundColor = "#fff"
        btnbarter.style.border = "1px solid #dfe3e9"
    }
    open = !open;
}
let btnkredit = document.getElementById("btnkredit")
let aciq = true;
function kredit() {
    if (aciq) {
        btnkredit.style.color = "#212c3a"
        btnkredit.style.backgroundColor = "#ffe6e5"
        btnkredit.style.border = "1px solid #ca1016"
    }
    else {
        btnkredit.style.color = "#212c3a"
        btnkredit.style.backgroundColor = "#fff"
        btnkredit.style.border = "1px solid #dfe3e9"
    }
    aciq = !aciq;
}

//// new variables
let isActiveSurulmus = false
let isActiveHamisi = true
let isActiveYeni = false

let btnhamisi = document.getElementById("btnhamisi")
let open1 = true;
function hamisi() {
    if (open1 && !isActiveHamisi) {
        btnhamisi.style.color = "#fff"
        btnhamisi.style.backgroundColor = "#ca1016"
        btnhamisi.style.border = "1px solid #ca1016"
        btnyeni.style.color = "#8d94ad"
        btnyeni.style.backgroundColor = "#fff"
        btnyeni.style.border = "1px solid #dfe3e9"
        btnsurulmus.style.color = "#8d94ad"
        btnsurulmus.style.backgroundColor = "#fff"
        btnsurulmus.style.border = "1px solid #dfe3e9"
        isActiveHamisi = true // isActive
        isActiveSurulmus = false
        isActiveYeni = false
    }
    open1 = !open1;
}
let btnyeni = document.getElementById("btnyeni")
let open2 = true;
function yeni() {
    if (open2 && !isActiveYeni) {
        btnhamisi.style.color = "#8d94ad"
        btnhamisi.style.backgroundColor = "#fff"
        btnhamisi.style.border = "1px solid #dfe3e9"
        btnsurulmus.style.color = "#8d94ad"
        btnsurulmus.style.backgroundColor = "#fff"
        btnsurulmus.style.border = "1px solid #dfe3e9"
        btnyeni.style.color = "#fff"
        btnyeni.style.backgroundColor = "#ca1016"
        btnyeni.style.border = "1px solid #ca1016"
        isActiveYeni = true // isActive
        isActiveHamisi = false
        isActiveSurulmus = false
    }
    open2 = !open2;
}
let btnsurulmus = document.getElementById("btnsurulmus")
let open3 = true;
function surulmus() {
    if (open3 && !isActiveSurulmus) {
        btnyeni.style.color = "#8d94ad"
        btnyeni.style.backgroundColor = "#fff"
        btnyeni.style.border = "1px solid #dfe3e9"
        btnhamisi.style.color = "#8d94ad"
        btnhamisi.style.backgroundColor = "#fff"
        btnhamisi.style.border = "1px solid #dfe3e9"
        btnsurulmus.style.color = "#fff"
        btnsurulmus.style.backgroundColor = "#ca1016"
        btnsurulmus.style.border = "1px solid #ca1016"
        isActiveSurulmus = true // isActive
        isActiveHamisi = false
        isActiveYeni = false
    }
    open3 = !open3;
}
function tap() {
    masincardimg.innerHTML = ""

    let btnHamisi, btnYeni, btnSurulmus

    if (isActiveHamisi) btnHamisi = document.getElementById("btnhamisi").textContent
    else if (isActiveYeni) btnYeni = document.getElementById("btnyeni").textContent
    else if (isActiveSurulmus) btnSurulmus = document.getElementById("btnsurulmus").textContent

    if (btnYeni !== undefined && btnYeni === "Yeni") btnYeni = true
    else if (btnSurulmus !== undefined && btnSurulmus === "Sürülmüş") btnSurulmus = false
    if (btnHamisi !== undefined && btnHamisi == "Hamisi") btnHamisi == true

    let carYeni = cars.filter((item) => {
        return item.yeni === btnYeni
    })
    let carSurulmus = cars.filter((item) => {
        return item.yeni === btnSurulmus
    })

    let carHamisi = cars

    // let bartercar = cars.filter((item) => {
    //     return item.barter == true && item.credit == false
    // })
    // let creditcar = cars.filter((item) => {
    //     return item.credit == true && item.barter == false
    // })
    // let bartercreditcar = cars.filter((item) => {
    //     return item.barter == true && item.barter == true
    // })
    let optval = document.getElementById("optval")
    let dollar = cars.filter((item) => {
        return item.currency == "$"
    })
    let azn = cars.filter((item) => {
        return item.currency == "AZN"
    })
    let euro = cars.filter((item) => {
        return item.currency == "EUR"
    })
    console.log(euro);
    // tekfilterler 
    let filteredCar = cars.filter((item) => {
        return item.brand == markainput.value
    })
    let filteredModelCar = filteredCar.filter((item) => {
        return item.model == inputModel.value
    })
    let carcolors = cars.filter((item) => item.reng == inputreng.value)
    let carcities = cars.filter((item) => item.city == inputseher.value)
    let cardates = cars.filter((item) => item.date >= minumum.value && item.date <= maximum.value)
    let carprices = cars.filter((item) => item.price >= minqiymet.value && item.price <= maxqiymet.value)
    // let currencycars = cars.filter((item) => item.currency ==)

    //2liler
    let colorinput = filteredCar.filter((item) => {
        return item.reng == inputreng.value && item.brand == markainput.value
    })
    let seherinput = filteredCar.filter((item) => {
        return item.city == inputseher.value && item.brand == markainput.value
    })
    let qiymetinput = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let ilinput = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.date >= minumum.value && item.date <= maximum.value
    })
    let ilseher = cardates.filter((item) => {
        return item.city == inputseher.value && item.date >= minumum.value && item.date <= maximum.value
    })
    let rengseher = carcolors.filter((item) => {
        return item.city == inputseher.value && item.reng == inputreng.value
    })
    let qiymetseher = carprices.filter((item) => {
        return item.price >= minqiymet.value && item.price <= maxqiymet.value && item.city == inputseher.value
    })
    let ilreng = cardates.filter((item) => {
        return item.reng == inputreng.value && item.date >= minumum.value && item.date <= maximum.value
    })
    let ilqiymet = cardates.filter((item) => {
        return item.price >= minqiymet.value && item.price <= maxqiymet.value && item.date >= minumum.value && item.date <= maximum.value
    })
    let rengqiymet = carcolors.filter((item) => {
        return item.reng == inputreng.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let markamodelseher = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.city == inputseher.value
    })
    let markamodelil = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.date >= minumum.value && item.date <= maximum.value
    })
    let markamodelreng = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.reng == inputreng.value
    })
    let markamodelqiymet = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })

    //3luler
    let markarengseher = seherinput.filter((item) => {
        return item.reng == inputreng.value && item.city == inputseher.value && item.brand == markainput.value
    })
    let markarengil = filteredCar.filter((item) => {
        return item.reng == inputreng.value && item.date >= minumum.value && item.date <= maximum.value && item.brand == markainput.value
    })
    let markarengqiymet = filteredCar.filter((item) => {
        return item.reng == inputreng.value && markainput.value == item.brand && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let markaseheril = filteredCar.filter((item) => {
        return item.city == inputseher.value && markainput.value == item.brand && item.date >= minumum.value && item.date <= maximum.value
    })
    let markaseherqiymet = filteredCar.filter((item) => {
        return item.city == inputseher.value && markainput.value == item.brand && item.date >= minqiymet.value && item.date <= maxqiymet.value
    })
    let markailqiymet = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.date >= minumum.value && item.date <= maximum.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let seherilreng = rengseher.filter((item) => {
        return item.city == inputseher.value && item.date >= minumum.value && item.date <= maximum.value && item.reng == inputreng.value
    })
    let seherilqiymet = ilseher.filter((item) => {
        return item.city == inputseher.value && item.date >= minumum.value && item.date <= maximum.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let seherrengqiymet = rengseher.filter((item) => {
        return item.city == inputseher.value && item.reng == inputreng.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let ilrengqiymet = ilreng.filter((item) => {
        return item.date >= minumum.value && item.date <= maximum.value && item.reng == inputreng.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })


    //4luler
    let markaseherilreng = filteredCar.filter((item) => {
        return item.city == inputseher.value && markainput.value == item.brand && item.date >= minumum.value && item.date <= maximum.value && item.reng == inputreng.value
    })
    let markaseherilqiymet = filteredCar.filter((item) => {
        return markainput.value == item.brand && item.city == inputseher.value && item.date >= minumum.value && item.date <= maximum.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let markailrengqiymet = filteredCar.filter((item) => {
        return item.date >= minumum.value && item.date <= maximum.value && item.reng == inputreng.value && markainput.value == item.brand && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let markaseherrengqiymet = rengseher.filter((item) => {
        return markainput.value == item.brand && item.city == inputseher.value && item.reng == inputreng.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let markamodelseheril = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.city == inputseher.value && item.date >= minumum.value && item.date <= maximum.value
    })
    let markamodelilreng = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.date >= minumum.value && item.date <= maximum.value && item.reng == inputreng.value
    })
    let markamodelseherreng = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.reng == inputreng.value && item.city == inputseher.value
    })
    let markamodelseherqiymet = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.price >= minqiymet.value && item.price <= maxqiymet.value && item.city == inputseher.value
    })
    let markamodelilqiymet = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.date >= minumum.value && item.date <= maximum.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let markamodelrengqiymet = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.reng == inputreng.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let seherilrengqiymet = rengseher.filter((item) => {
        return item.city == inputseher.value && item.date >= minumum.value && item.date <= maximum.value && item.reng == inputreng.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })


    //5liler
    let markaseherilrengqiymet = rengseher.filter((item) => {
        return item.brand == markainput.value && item.city == inputseher.value && item.date >= minumum.value && item.date <= maximum.value && item.reng == inputreng.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let markamodelseherilreng = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.city == inputseher.value && item.date >= minumum.value && item.date <= maximum.value && item.reng == inputreng.value
    })
    let markamodelseherrengqiymet = rengseher.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.reng == inputreng.value && item.city == inputseher.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let markamodelilrengqiymet = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.date >= minumum.value && item.date <= maximum.value && item.reng == inputreng.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    let markamodelseherilqiymet = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.city == inputseher.value && item.date >= minumum.value && item.date <= maximum.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })

    //6lilar
    let markamodelseherilrengqiymet = filteredCar.filter((item) => {
        return item.brand == markainput.value && item.model == inputModel.value && item.city == inputseher.value && item.date >= minumum.value && item.date <= maximum.value && item.reng == inputreng.value && item.price >= minqiymet.value && item.price <= maxqiymet.value
    })
    //tekler
    for (let i = 0; i < dollar.length; i++) {
        if (dollar.length > 0 && carYeni.length == 0 && carSurulmus.length == 0 && carHamisi.length == 0 && markainput.value.length == 0 && inputModel.value.length == 0 && inputreng.value.length == 0 && inputseher.value.length == 0 && minumum.value.length == 0 && maximum.value.length == 0 && minqiymet.value.length == 0 && maxqiymet.value.length == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${dollar[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${dollar[i].price}
                ${dollar[i].currency}</p>
                <p class = "marka">${dollar[i].brand}
                ${dollar[i].model}
                </p>
                <p class = "tarix">${dollar[i].date},
                    ${dollar[i].engine} L,
                    ${dollar[i].milestone} km
                </p>
                <p class = "seher">${dollar[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < carYeni.length; i++) {
        if (carYeni.length > 0 && carSurulmus.length == 0 && markainput.value.length == 0 && inputModel.value.length == 0 && inputreng.value.length == 0 && inputseher.value.length == 0 && minumum.value.length == 0 && maximum.value.length == 0 && minqiymet.value.length == 0 && maxqiymet.value.length == 0) {
            console.log(carYeni);
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${carYeni[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${carYeni[i].price}
                ${carYeni[i].currency}</p>
                <p class = "marka">${carYeni[i].brand}
                ${carYeni[i].model}
                </p>
                <p class = "tarix">${carYeni[i].date},
                    ${carYeni[i].engine} L,
                    ${carYeni[i].milestone} km
                </p>
                <p class = "seher">${carYeni[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < carSurulmus.length; i++) {
        if (carSurulmus.length > 0 && carYeni.length == 0 && markainput.value.length == 0 && inputModel.value.length == 0 && inputreng.value.length == 0 && inputseher.value.length == 0 && minumum.value.length == 0 && maximum.value.length == 0 && minqiymet.value.length == 0 && maxqiymet.value.length == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${carSurulmus[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${carSurulmus[i].price}
                ${carSurulmus[i].currency}</p>
                <p class = "marka">${carSurulmus[i].brand}
                ${carSurulmus[i].model}
                </p>
                <p class = "tarix">${carSurulmus[i].date},
                    ${carSurulmus[i].engine} L,
                    ${carSurulmus[i].milestone} km
                </p>
                <p class = "seher">${carSurulmus[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < carHamisi.length; i++) {
        if (carSurulmus.length == 0 && carHamisi.length > 0 && carYeni.length == 0 && markainput.value.length == 0 && inputModel.value.length == 0 && inputreng.value.length == 0 && inputseher.value.length == 0 && minumum.value.length == 0 && maximum.value.length == 0 && minqiymet.value.length == 0 && maxqiymet.value.length == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${carHamisi[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${carHamisi[i].price}
                ${carHamisi[i].currency}</p>
                <p class = "marka">${carHamisi[i].brand}
                ${carHamisi[i].model}
                </p>
                <p class = "tarix">${carHamisi[i].date},
                    ${carHamisi[i].engine} L,
                    ${carHamisi[i].milestone} km
                </p>
                <p class = "seher">${carHamisi[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < filteredCar.length; i++) {
        if (markainput.value.length > 0 && inputModel.value.length == 0 && inputreng.value.length == 0 && inputseher.value.length == 0 && minumum.value.length == 0 && maximum.value.length == 0 && minqiymet.value.length == 0 && maxqiymet.value.length == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${filteredCar[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${filteredCar[i].price}
                ${filteredCar[i].currency}</p>
                <p class = "marka">${filteredCar[i].brand}
                ${filteredCar[i].model}
                </p>
                <p class = "tarix">${filteredCar[i].date},
                    ${filteredCar[i].engine} L,
                    ${filteredCar[i].milestone} km
                </p>
                <p class = "seher">${filteredCar[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < filteredModelCar.length; i++) {
        if (markainput.value.length > 0 && inputModel.value.length > 0 && inputreng.value.length == 0 && inputseher.value.length == 0 && minumum.value.length == 0 && maximum.value.length == 0 && minqiymet.value.length == 0 && maxqiymet.value.length == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${filteredModelCar[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${filteredModelCar[i].price}
                ${filteredModelCar[i].currency}</p>
                <p class = "marka">${filteredModelCar[i].brand}
                ${filteredModelCar[i].model}
                </p>
                <p class = "tarix">${filteredModelCar[i].date},
                    ${filteredModelCar[i].engine} L,
                    ${filteredModelCar[i].milestone} km
                </p>
                <p class = "seher">${filteredModelCar[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in carcolors) {
        if (inputreng.value.length > 0 && inputModel.value.length == 0 && markainput.value.length == 0 && inputseher.value.length == 0 && minumum.value.length == 0 && maximum.value.length == 0 && minqiymet.value.length == 0 && maxqiymet.value.length == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${carcolors[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${carcolors[i].price}
                ${carcolors[i].currency}</p>
                <p class = "marka">${carcolors[i].brand}
                ${carcolors[i].model}
                </p>
                <p class = "tarix">${carcolors[i].date},
                    ${carcolors[i].engine} L,
                    ${carcolors[i].milestone} km
                </p>
                <p class = "seher">${carcolors[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in carcities) {
        if (inputseher.value.length > 0 && inputModel.value.length == 0 && markainput.value.length == 0 && inputreng.value.length == 0 && minumum.value.length == 0 && maximum.value.length == 0 && minqiymet.value.length == 0 && maxqiymet.value.length == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${carcities[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${carcities[i].price}
                ${carcities[i].currency}</p>
                <p class = "marka">${carcities[i].brand}
                ${carcities[i].model}
                </p>
                <p class = "tarix">${carcities[i].date},
                    ${carcities[i].engine} L,
                    ${carcities[i].milestone} km
                </p>
                <p class = "seher">${carcities[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in cardates) {
        if (inputseher.value.length == 0 && inputModel.value.length == 0 && markainput.value.length == 0 && inputreng.value.length == 0 && minumum.value.length > 0 && maximum.value.length > 0 && minqiymet.value.length == 0 && maxqiymet.value.length == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${cardates[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${cardates[i].price}
                ${cardates[i].currency}</p>
                <p class = "marka">${cardates[i].brand}
                ${cardates[i].model}
                </p>
                <p class = "tarix">${cardates[i].date},
                    ${cardates[i].engine} L,
                    ${cardates[i].milestone} km
                </p>
                <p class = "seher">${cardates[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in carprices) {
        if (inputseher.value.length == 0 && inputModel.value.length == 0 && markainput.value.length == 0 && inputreng.value.length == 0 && minumum.value.length == 0 && maximum.value.length == 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${carprices[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${carprices[i].price}
                ${carprices[i].currency}</p>
                <p class = "marka">${carprices[i].brand}
                ${carprices[i].model}
                </p>
                <p class = "tarix">${carprices[i].date},
                    ${carprices[i].engine} L,
                    ${carprices[i].milestone} km
                </p>
                <p class = "seher">${carprices[i].city}
                </p>
            </div>
        </div>
                `
        }
    }


    //2 ve daha cox olan filterlerin funksiyasi
    for (let i in colorinput) {
        if (markainput.value.length > 0 && inputreng.value.length > 0 && inputModel.value.length == 0 && markaseherrengqiymet == 0 && markailrengqiymet == 0 && markaseherilreng == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${colorinput[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${colorinput[i].price}
                ${colorinput[i].currency}</p>
                <p class = "marka">${colorinput[i].brand}
                ${colorinput[i].model}
                </p>
                <p class = "tarix">${colorinput[i].date},
                    ${colorinput[i].engine} L,
                    ${colorinput[i].milestone} km
                </p>
                <p class = "seher">${colorinput[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelseher) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && inputseher.value.length > 0 && markamodelseheril == 0 && markamodelseherreng == 0 && markamodelseherqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${markamodelseher[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markamodelseher[i].price}
                ${markamodelseher[i].currency}</p>
                <p class = "marka">${markamodelseher[i].brand}
                ${markamodelseher[i].model}
                </p>
                <p class = "tarix">${markamodelseher[i].date},
                    ${markamodelseher[i].engine} L,
                    ${markamodelseher[i].milestone} km
                </p>
                <p class = "seher">${markamodelseher[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelil) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && markamodelseheril == 0 && markamodelilreng == 0 && markamodelilqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${markamodelil[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markamodelil[i].price}
                ${markamodelil[i].currency}</p>
                <p class = "marka">${markamodelil[i].brand}
                ${markamodelil[i].model}
                </p>
                <p class = "tarix">${markamodelil[i].date},
                    ${markamodelil[i].engine} L,
                    ${markamodelil[i].milestone} km
                </p>
                <p class = "seher">${markamodelil[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelreng) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && inputreng.value.length > 0 && markamodelilreng == 0 && markamodelseherreng == 0 && markamodelrengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${markamodelreng[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markamodelreng[i].price}
                ${markamodelreng[i].currency}</p>
                <p class = "marka">${markamodelreng[i].brand}
                ${markamodelreng[i].model}
                </p>
                <p class = "tarix">${markamodelreng[i].date},
                    ${markamodelreng[i].engine} L,
                    ${markamodelreng[i].milestone} km
                </p>
                <p class = "seher">${markamodelreng[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelqiymet) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0 && markamodelseherqiymet == 0 && markamodelilqiymet == 0 && markamodelrengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markamodelqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet">${markamodelqiymet[i].price}
                ${markamodelqiymet[i].currency}</p>
                <p class = "marka">${markamodelqiymet[i].brand}
                ${markamodelqiymet[i].model}
                </p>
                <p class = "tarix">${markamodelqiymet[i].date},
                    ${markamodelqiymet[i].engine} L,
                    ${markamodelqiymet[i].milestone} km
                </p>
                <p class = "seher">${markamodelqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < seherinput.length; i++) {
        if (markainput.value.length > 0 && inputseher.value.length > 0 && markarengseher == 0 && inputModel.value.length == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${seherinput[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${seherinput[i].price}
                ${seherinput[i].currency}</p>
                <p class = "marka">${seherinput[i].brand}
                ${seherinput[i].model}
                </p>
                <p class = "tarix">${seherinput[i].date},
                    ${seherinput[i].engine} L,
                    ${seherinput[i].milestone} km
                </p>
                <p class = "seher">${seherinput[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < qiymetinput.length; i++) {
        if (maxqiymet.value.length > 0 && markainput.value.length > 0 && minqiymet.value.length > 0 && inputModel.value.length == 0 && markarengqiymet == 0 && markaseherqiymet == 0 && markailqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${qiymetinput[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${qiymetinput[i].price}
                ${qiymetinput[i].currency}</p>
                <p class = "marka">${qiymetinput[i].brand}
                ${qiymetinput[i].model}sehe
                </p>
                <p class = "tarix">${qiymetinput[i].date},
                    ${qiymetinput[i].engine} L,
                    ${qiymetinput[i].milestone} km
                </p> 
                <p class = "seher">${qiymetinput[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < ilinput.length; i++) {
        if (maximum.value.length > 0 && markainput.value.length > 0 && minumum.value.length > 0 && inputModel.value.length == 0 && markarengil == 0 && markaseheril == 0 && markailqiymet == 0 && markaseherilqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${ilinput[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${ilinput[i].price}
                ${ilinput[i].currency}</p>
                <p class = "marka">${ilinput[i].brand}
                ${ilinput[i].model}
                </p>
                <p class = "tarix">${ilinput[i].date},
                    ${ilinput[i].engine} L,
                    ${ilinput[i].milestone} km
                </p>
                <p class = "seher">${ilinput[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < ilseher.length; i++) {
        if (maximum.value.length > 0 && inputseher.value.length > 0 && minumum.value.length > 0 && markaseheril == 0 && seherilreng == 0 && seherilqiymet == 0 && markaseherilqiymet == 0 && markamodelseheril == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${ilseher[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${ilseher[i].price}
                ${ilseher[i].currency}</p>
                <p class = "marka">${ilseher[i].brand}
                ${ilseher[i].model}
                </p>
                <p class = "tarix">${ilseher[i].date},
                    ${ilseher[i].engine} L,
                    ${ilseher[i].milestone} km
                </p>
                <p class = "seher">${ilseher[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < rengseher.length; i++) {
        if (inputreng.value.length > 0 && inputseher.value.length > 0 && markarengseher == 0 && seherilreng == 0 && seherrengqiymet == 0 && markamodelseherreng == 0 && markamodelseherreng == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${rengseher[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${rengseher[i].price}
                ${rengseher[i].currency}</p>
                <p class = "marka">${rengseher[i].brand}
                ${rengseher[i].model}
                </p>
                <p class = "tarix">${rengseher[i].date},
                    ${rengseher[i].engine} L,
                    ${rengseher[i].milestone} km
                </p>
                <p class = "seher">${rengseher[i].city}
                </p>
            </div>
        </div>
                `
        }
    }

    for (let i = 0; i < qiymetseher.length; i++) {
        if (maxqiymet.value.length > 0 && inputseher.value.length > 0 && minqiymet.value.length > 0 && markaseherqiymet == 0 && seherrengqiymet == 0 && seherilqiymet == 0 && markaseherilqiymet == 0 && markamodelseherqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${qiymetseher[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${qiymetseher[i].price}
                ${qiymetseher[i].currency}</p>
                <p class = "marka">${qiymetseher[i].brand}
                ${qiymetseher[i].model}
                </p>
                <p class = "tarix">${qiymetseher[i].date},
                    ${qiymetseher[i].engine} L,
                    ${qiymetseher[i].milestone} km
                </p>
                <p class = "seher">${qiymetseher[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < ilreng.length; i++) {
        if (maximum.value.length > 0 && inputreng.value.length > 0 && minumum.value.length > 0 && ilrengqiymet == 0 && markamodelilreng == 0 && markaseherilreng == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${ilreng[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${ilreng[i].price}
                ${ilreng[i].currency}</p>
                <p class = "marka">${ilreng[i].brand}
                ${ilreng[i].model}
                </p>
                <p class = "tarix">${ilreng[i].date},
                    ${ilreng[i].engine} L,
                    ${ilreng[i].milestone} km
                </p>
                <p class = "seher">${ilreng[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < ilqiymet.length; i++) {
        if (maximum.value.length > 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0 && minumum.value.length > 0 && markailqiymet == 0 && seherilqiymet == 0 && ilrengqiymet == 0 && markamodelilqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${ilqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${ilqiymet[i].price}
                ${ilqiymet[i].currency}</p>
                <p class = "marka">${ilqiymet[i].brand}
                ${ilqiymet[i].model}
                </p>
                <p class = "tarix">${ilqiymet[i].date},
                    ${ilqiymet[i].engine} L,
                    ${ilqiymet[i].milestone} km
                </p>
                <p class = "seher">${ilqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < rengqiymet.length; i++) {
        if (maxqiymet.value.length > 0 && inputreng.value.length > 0 && minqiymet.value.length > 0 && markarengqiymet == 0 && seherrengqiymet == 0 && ilrengqiymet == 0 && markamodelrengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${rengqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${rengqiymet[i].price}
                ${rengqiymet[i].currency}</p>
                <p class = "marka">${rengqiymet[i].brand}
                ${rengqiymet[i].model}
                </p>
                <p class = "tarix">${rengqiymet[i].date},
                    ${rengqiymet[i].engine} L,
                    ${rengqiymet[i].milestone} km
                </p>
                <p class = "seher">${rengqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < markarengseher.length; i++) {
        if (inputseher.value.length > 0 && inputreng.value.length > 0 && markainput.value.length > 0 && rengseher == 0 && colorinput == 0 && seherinput == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markarengseher[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markarengseher[i].price}
                ${markarengseher[i].currency}</p>
                <p class = "marka">${markarengseher[i].brand}
                ${markarengseher[i].model}
                </p>
                <p class = "tarix">${markarengseher[i].date},
                    ${markarengseher[i].engine} L,
                    ${markarengseher[i].milestone} km
                </p>
                <p class = "seher">${markarengseher[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < markarengil.length; i++) {
        if (minumum.value.length > 0 && maximum.value.length > 0 && inputreng.value.length > 0 && markainput.value.length > 0 && colorinput == 0 && ilreng == 0 && ilinput == 0 && markamodelilreng == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markarengil[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markarengil[i].price}
                ${markarengil[i].currency}</p>
                <p class = "marka">${markarengil[i].brand}
                ${markarengil[i].model}
                </p>
                <p class = "tarix">${markarengil[i].date},
                    ${markarengil[i].engine} L,
                    ${markarengil[i].milestone} km
                </p>
                <p class = "seher">${markarengil[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < markarengqiymet.length; i++) {
        if (minqiymet.value.length > 0 && maxqiymet.value.length > 0 && inputreng.value.length > 0 && markainput.value.length > 0 && colorinput == 0 && qiymetinput == 0 && rengqiymet == 0 && markamodelrengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markarengqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markarengqiymet[i].price}
                ${markarengqiymet[i].currency}</p>
                <p class = "marka">${markarengqiymet[i].brand}
                ${markarengqiymet[i].model}
                </p>
                <p class = "tarix">${markarengqiymet[i].date},
                    ${markarengqiymet[i].engine} L,
                    ${markarengqiymet[i].milestone} km
                </p>
                <p class = "seher">${markarengqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < markaseheril.length; i++) {
        if (minumum.value.length > 0 && maximum.value.length > 0 && inputseher.value.length > 0 && markainput.value.length > 0 && inputseher == 0 && ilinput == 0 && ilseher == 0 && markaseherilqiymet == 0 && markamodelseheril == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markaseheril[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markaseheril[i].price}
                ${markaseheril[i].currency}</p>
                <p class = "marka">${markaseheril[i].brand}
                ${markaseheril[i].model}
                </p>
                <p class = "tarix">${markaseheril[i].date},
                    ${markaseheril[i].engine} L,
                    ${markaseheril[i].milestone} km
                </p>
                <p class = "seher">${markaseheril[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < markaseherqiymet.length; i++) {
        if (minqiymet.value.length > 0 && maxqiymet.value.length > 0 && inputseher.value.length > 0 && markainput.value.length > 0 && inputseher == 0 && qiymetinput == 0 && qiymetseher == 0 && markaseherilqiymet == 0 && markamodelseherqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markaseherqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markaseherqiymet[i].price}
                ${markaseherqiymet[i].currency}</p>
                <p class = "marka">${markaseherqiymet[i].brand}
                ${markaseherqiymet[i].model}
                </p>
                <p class = "tarix">${markaseherqiymet[i].date},
                    ${markaseherqiymet[i].engine} L,
                    ${markaseherqiymet[i].milestone} km
                </p>
                <p class = "seher">${markaseherqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < markailqiymet.length; i++) {
        if (minqiymet.value.length > 0 && maxqiymet.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && markainput.value.length > 0 && markaseherilqiymet == 0 && markamodelilqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markailqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markailqiymet[i].price}
                ${markailqiymet[i].currency}</p>
                <p class = "marka">${markailqiymet[i].brand}
                ${markailqiymet[i].model}
                </p>
                <p class = "tarix">${markailqiymet[i].date},
                    ${markailqiymet[i].engine} L,
                    ${markailqiymet[i].milestone} km
                </p>
                <p class = "seher">${markailqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < seherilreng.length; i++) {
        if (inputseher.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && inputreng.value.length > 0 && ilreng == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${seherilreng[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${seherilreng[i].price}
                ${seherilreng[i].currency}</p>
                <p class = "marka">${seherilreng[i].brand}
                ${seherilreng[i].model}
                </p>
                <p class = "tarix">${seherilreng[i].date},
                    ${seherilreng[i].engine} L,
                    ${seherilreng[i].milestone} km
                </p>
                <p class = "seher">${seherilreng[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < seherilqiymet.length; i++) {
        if (inputseher.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0 && markaseherilqiymet == 0 && seherilrengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${seherilqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${seherilqiymet[i].price}
                ${seherilqiymet[i].currency}</p>
                <p class = "marka">${seherilqiymet[i].brand}
                ${seherilqiymet[i].model}
                </p>
                <p class = "tarix">${seherilqiymet[i].date},
                    ${seherilqiymet[i].engine} L,
                    ${seherilqiymet[i].milestone} km
                </p>
                <p class = "seher">${seherilqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < seherrengqiymet.length; i++) {
        if (minqiymet.value.length > 0 && maxqiymet.value.length > 0 && inputseher.value.length > 0 && inputreng.value.length > 0 && markamodelseherrengqiymet == 0 && seherilrengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${seherrengqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${seherrengqiymet[i].price}
                ${seherrengqiymet[i].currency}</p>
                <p class = "marka">${seherrengqiymet[i].brand}
                ${seherrengqiymet[i].model}
                </p>
                <p class = "tarix">${seherrengqiymet[i].date},
                    ${seherrengqiymet[i].engine} L,
                    ${seherrengqiymet[i].milestone} km
                </p>
                <p class = "seher">${seherrengqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < ilrengqiymet.length; i++) {
        if (minqiymet.value.length > 0 && maxqiymet.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && inputreng.value.length > 0 && markailrengqiymet == 0 && seherilrengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${ilrengqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${ilrengqiymet[i].price}
                ${ilrengqiymet[i].currency}</p>
                <p class = "marka">${ilrengqiymet[i].brand}
                ${ilrengqiymet[i].model}
                </p>
                <p class = "tarix">${ilrengqiymet[i].date},
                    ${ilrengqiymet[i].engine} L,
                    ${ilrengqiymet[i].milestone} km
                </p>
                <p class = "seher">${ilrengqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    //4lu
    for (let i = 0; i < markaseherilreng.length; i++) {
        if (minumum.value.length > 0 && maximum.value.length > 0 && inputseher.value.length > 0 && markainput.value.length > 0 && inputreng.value.length > 0 && markaseherilrengqiymet == 0 && markamodelseherilreng == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markaseherilreng[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markaseherilreng[i].price}
                ${markaseherilreng[i].currency}</p>
                <p class = "marka">${markaseherilreng[i].brand}
                ${markaseherilreng[i].model}
                </p>
                <p class = "tarix">${markaseherilreng[i].date},
                    ${markaseherilreng[i].engine} L,
                    ${markaseherilreng[i].milestone} km
                </p>
                <p class = "seher">${markaseherilreng[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < markaseherilqiymet.length; i++) {
        if (minumum.value.length > 0 && maximum.value.length > 0 && inputseher.value.length > 0 && markainput.value.length > 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0 && qiymetseher == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markaseherilqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markaseherilqiymet[i].price}
                ${markaseherilqiymet[i].currency}</p>
                <p class = "marka">${markaseherilqiymet[i].brand}
                ${markaseherilqiymet[i].model}
                </p>
                <p class = "tarix">${markaseherilqiymet[i].date},
                    ${markaseherilqiymet[i].engine} L,
                    ${markaseherilqiymet[i].milestone} km
                </p>
                <p class = "seher">${markaseherilqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < markailrengqiymet.length; i++) {
        if (minqiymet.value.length > 0 && maxqiymet.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && inputreng.value.length > 0 && markainput.value.length > 0 && colorinput == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markailrengqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markailrengqiymet[i].price}
                ${markailrengqiymet[i].currency}</p>
                <p class = "marka">${markailrengqiymet[i].brand}
                ${markailrengqiymet[i].model}
                </p>
                <p class = "tarix">${markailrengqiymet[i].date},
                    ${markailrengqiymet[i].engine} L,
                    ${markailrengqiymet[i].milestone} km
                </p>
                <p class = "seher">${markailrengqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < markaseherrengqiymet.length; i++) {
        if (minqiymet.value.length > 0 && maxqiymet.value.length > 0 && markainput.value.length > 0 && inputseher.value.length > 0 && inputreng.value.length > 0 && markamodelseherrengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markaseherrengqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markaseherrengqiymet[i].price}
                ${markaseherrengqiymet[i].currency}</p>
                <p class = "marka">${markaseherrengqiymet[i].brand}
                ${markaseherrengqiymet[i].model}
                </p>
                <p class = "tarix">${markaseherrengqiymet[i].date},
                    ${markaseherrengqiymet[i].engine} L,
                    ${markaseherrengqiymet[i].milestone} km
                </p>
                <p class = "seher">${markaseherrengqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelseheril) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && inputseher.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && markamodelseherilqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${markamodelseheril[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markamodelseheril[i].price}
                ${markamodelseheril[i].currency}</p>
                <p class = "marka">${markamodelseheril[i].brand}
                ${markamodelseheril[i].model}
                </p>
                <p class = "tarix">${markamodelseheril[i].date},
                    ${markamodelseheril[i].engine} L,
                    ${markamodelseheril[i].milestone} km
                </p>
                <p class = "seher">${markamodelseheril[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelilreng) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && inputreng.value.length > 0 && markamodelseherilreng == 0 && markamodelilrengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${markamodelilreng[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markamodelilreng[i].price}
                ${markamodelilreng[i].currency}</p>
                <p class = "marka">${markamodelilreng[i].brand}
                ${markamodelilreng[i].model}
                </p>
                <p class = "tarix">${markamodelilreng[i].date},
                    ${markamodelilreng[i].engine} L,
                    ${markamodelilreng[i].milestone} km
                </p>
                <p class = "seher">${markamodelilreng[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelseherreng) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && inputreng.value.length > 0 && inputseher.value.length > 0 && markamodelseherilreng == 0 && markamodelseherrengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${markamodelseherreng[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markamodelseherreng[i].price}
                ${markamodelseherreng[i].currency}</p>
                <p class = "marka">${markamodelseherreng[i].brand}
                ${markamodelseherreng[i].model}
                </p>
                <p class = "tarix">${markamodelseherreng[i].date},
                    ${markamodelseherreng[i].engine} L,
                    ${markamodelseherreng[i].milestone} km
                </p>
                <p class = "seher">${markamodelseherreng[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelseherqiymet) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0 && inputseher.value.length > 0 && markamodelseherrengqiymet == 0 && markamodelseherilqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markamodelseherqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet">${markamodelseherqiymet[i].price}
                ${markamodelseherqiymet[i].currency}</p>
                <p class = "marka">${markamodelseherqiymet[i].brand}
                ${markamodelseherqiymet[i].model}
                </p>
                <p class = "tarix">${markamodelseherqiymet[i].date},
                    ${markamodelseherqiymet[i].engine} L,
                    ${markamodelseherqiymet[i].milestone} km
                </p>
                <p class = "seher">${markamodelseherqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelilqiymet) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && markamodelilrengqiymet == 0 && markamodelseherilqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markamodelilqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet">${markamodelilqiymet[i].price}
                ${markamodelilqiymet[i].currency}</p>
                <p class = "marka">${markamodelilqiymet[i].brand}
                ${markamodelilqiymet[i].model}
                </p>
                <p class = "tarix">${markamodelilqiymet[i].date},
                    ${markamodelilqiymet[i].engine} L,
                    ${markamodelilqiymet[i].milestone} km
                </p>
                <p class = "seher">${markamodelilqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelrengqiymet) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0 && inputreng.value.length > 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markamodelrengqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet">${markamodelrengqiymet[i].price}
                ${markamodelrengqiymet[i].currency}</p>
                <p class = "marka">${markamodelrengqiymet[i].brand}
                ${markamodelrengqiymet[i].model}
                </p>
                <p class = "tarix">${markamodelrengqiymet[i].date},
                    ${markamodelrengqiymet[i].engine} L,
                    ${markamodelrengqiymet[i].milestone} km
                </p>
                <p class = "seher">${markamodelrengqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i = 0; i < seherilrengqiymet.length; i++) {
        if (inputseher.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && inputreng.value.length > 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${seherilrengqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${seherilrengqiymet[i].price}
                ${seherilrengqiymet[i].currency}</p>
                <p class = "marka">${seherilrengqiymet[i].brand}
                ${seherilrengqiymet[i].model}
                </p>
                <p class = "tarix">${seherilrengqiymet[i].date},
                    ${seherilrengqiymet[i].engine} L,
                    ${seherilrengqiymet[i].milestone} km
                </p>
                <p class = "seher">${seherilrengqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    //5liler
    for (let i = 0; i < markaseherilrengqiymet.length; i++) {
        if (markainput.value.length > 0 && inputseher.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && inputreng.value.length > 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0 && seherilreng == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img  src=${markaseherilrengqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markaseherilrengqiymet[i].price}
                ${markaseherilrengqiymet[i].currency}</p>
                <p class = "marka">${markaseherilrengqiymet[i].brand}
                ${markaseherilrengqiymet[i].model}
                </p>
                <p class = "tarix">${markaseherilrengqiymet[i].date},
                    ${markaseherilrengqiymet[i].engine} L,
                    ${markaseherilrengqiymet[i].milestone} km
                </p>
                <p class = "seher">${markaseherilrengqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelseherilreng) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && inputseher.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && inputreng.value.length > 0 && ilreng == 0 && markamodelseherilrengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${markamodelseherilreng[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markamodelseherilreng[i].price}
                ${markamodelseherilreng[i].currency}</p>
                <p class = "marka">${markamodelseherilreng[i].brand}
                ${markamodelseherilreng[i].model}
                </p>
                <p class = "tarix">${markamodelseherilreng[i].date},
                    ${markamodelseherilreng[i].engine} L,
                    ${markamodelseherilreng[i].milestone} km
                </p>
                <p class = "seher">${markamodelseherilreng[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelseherrengqiymet) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && inputreng.value.length > 0 && inputseher.value.length > 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0 && rengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${markamodelseherrengqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markamodelseherrengqiymet[i].price}
                ${markamodelseherrengqiymet[i].currency}</p>
                <p class = "marka">${markamodelseherrengqiymet[i].brand}
                ${markamodelseherrengqiymet[i].model}
                </p>
                <p class = "tarix">${markamodelseherrengqiymet[i].date},
                    ${markamodelseherrengqiymet[i].engine} L,
                    ${markamodelseherrengqiymet[i].milestone} km
                </p>
                <p class = "seher">${markamodelseherrengqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelilrengqiymet) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && inputreng.value.length > 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0 && rengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${markamodelilrengqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markamodelilrengqiymet[i].price}
                ${markamodelilrengqiymet[i].currency}</p>
                <p class = "marka">${markamodelilrengqiymet[i].brand}
                ${markamodelilrengqiymet[i].model}
                </p>
                <p class = "tarix">${markamodelilrengqiymet[i].date},
                    ${markamodelilrengqiymet[i].engine} L,
                    ${markamodelilrengqiymet[i].milestone} km
                </p>
                <p class = "seher">${markamodelilrengqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    for (let i in markamodelseherilqiymet) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && inputseher.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0 && markamodelseherilrengqiymet == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${markamodelseherilqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markamodelseherilqiymet[i].price}
                ${markamodelseherilqiymet[i].currency}</p>
                <p class = "marka">${markamodelseherilqiymet[i].brand}
                ${markamodelseherilqiymet[i].model}
                </p>
                <p class = "tarix">${markamodelseherilqiymet[i].date},
                    ${markamodelseherilqiymet[i].engine} L,
                    ${markamodelseherilqiymet[i].milestone} km
                </p>
                <p class = "seher">${markamodelseherilqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    //6lilar
    for (let i in markamodelseherilrengqiymet) {
        if (inputModel.value.length > 0 && markainput.value.length > 0 && inputseher.value.length > 0 && minumum.value.length > 0 && maximum.value.length > 0 && inputreng.value.length > 0 && minqiymet.value.length > 0 && maxqiymet.value.length > 0 && colorinput == 0) {
            masincardimg.innerHTML += `
            <div id = "umumi">
            <div id="sekil">
                <img src=${markamodelseherilrengqiymet[i].url}>
            </div>
            <div id="yazi">
                <p class="qiymet" >${markamodelseherilrengqiymet[i].price}
                ${markamodelseherilrengqiymet[i].currency}</p>
                <p class = "marka">${markamodelseherilrengqiymet[i].brand}
                ${markamodelseherilrengqiymet[i].model}
                </p>
                <p class = "tarix">${markamodelseherilrengqiymet[i].date},
                    ${markamodelseherilrengqiymet[i].engine} L,
                    ${markamodelseherilrengqiymet[i].milestone} km
                </p>
                <p class = "seher">${markamodelseherilrengqiymet[i].city}
                </p>
            </div>
        </div>
                `
        }
    }
    // for (let i in bartercar) {
    //     if (bartercar[i].barter == true && creditcar[i].credit == false) {
    //         console.log(bartercar)
    //         masincardimg.innerHTML += `
    //             <div id = "umumi">
    //             <div id="sekil">
    //                 <img  src=${bartercar[i].url}>
    //             </div>
    //             <div id="yazi">
    //                 <p class="qiymet" >${bartercar[i].price}
    //                 ${bartercar[i].currency}</p>
    //                 <p class = "marka">${bartercar[i].brand}
    //                 ${bartercar[i].model}
    //                 </p>
    //                 <p class = "tarix">${bartercar[i].date},
    //                     ${bartercar[i].engine} L,
    //                     ${bartercar[i].milestone} km
    //                 </p>
    //                 <p class = "seher">${bartercar[i].city}
    //                 </p>
    //             </div>
    //         </div>
    //                 `
    //     }
    // }
    // for (let i in creditcar) {
    //     if (creditcar[i].credit == true && bartercar[i].barter == false) {
    //         masincardimg.innerHTML += `
    //             <div id = "umumi">
    //             <div id="sekil">
    //                 <img  src=${creditcar[i].url}>
    //             </div>
    //             <div id="yazi">
    //                 <p class="qiymet" >${creditcar[i].price}
    //                 ${creditcar[i].currency}</p>
    //                 <p class = "marka">${creditcar[i].brand}
    //                 ${creditcar[i].model}   
    //                 </p>
    //                 <p class = "tarix">${creditcar[i].date},
    //                     ${creditcar[i].engine} L,
    //                     ${creditcar[i].milestone} km
    //                 </p>
    //                 <p class = "seher">${creditcar[i].city}
    //                 </p>
    //             </div>
    //         </div>
    //                 `
    //     }
    // }
    // for (let i in bartercreditcar) {
    //     if (bartercreditcar[i].credit == true && bartercreditcar[i].barter == true) {
    //         // console.log(bartercreditcar);
    //         masincardimg.innerHTML += `
    //             <div id = "umumi">
    //             <div id="sekil">
    //                 <img  src=${bartercreditcar[i].url}>
    //             </div>
    //             <div id="yazi">
    //                 <p class="qiymet" >${bartercreditcar[i].price}
    //                 ${bartercreditcar[i].currency}</p>
    //                 <p class = "marka">${bartercreditcar[i].brand}
    //                 ${bartercreditcar[i].model}
    //                 </p>
    //                 <p class = "tarix">${bartercreditcar[i].date},
    //                     ${bartercreditcar[i].engine} L,
    //                     ${bartercreditcar[i].milestone} km
    //                 </p>
    //                 <p class = "seher">${bartercreditcar[i].city}
    //                 </p>
    //             </div>
    //         </div>
    //                 `
    //     }
    // }
}
function sifirla() {
    for (let i in cars) {
        masincardimg.innerHTML += `
                <div id = "umumi">
                <div id="sekil">
                    <img src=${cars[i].url}>
                </div>
                <div id="yazi">
                    <p class="qiymet" >${cars[i].price}
                    ${cars[i].currency}</p>
                    <p class = "marka">${cars[i].brand}
                    ${cars[i].model}
                    </p>
                    <p class = "tarix">${cars[i].date},
                        ${cars[i].engine} L,
                        ${cars[i].milestone} km
                    </p>
                    <p class = "seher">${cars[i].city}
                    </p>
                </div>
            </div>
                    `
    }
    markainput.value = ""
    inputseher.value = ""
    inputreng.value = ""
    minumum.value = ""
    maximum.value = ""
    minqiymet.value = ""
    maxqiymet.value = ""
    inputModel.value = ""

}
