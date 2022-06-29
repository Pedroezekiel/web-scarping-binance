const { getEventListeners } = require("ws");

async function get_order_book_data(){
    const response = await fetch("http://localhost:4000/buy-data")
    const data = await response.json()
    console.log(data);
    console.log(data[1]);
    for(let i = 0; i < data.length; i++) {
         if (i == 0) {
         document.querySelector("#app").innerHTML = ""
        }
        document.querySelector("#app")
        .insertAdjacentHTML("afterbegin", data)
        let childNode = data.removeChild(data);
        // document.querySelector("#app")
        // .insertAdjacentHTML("afterbegin", data[i])
     }
}
async function get_order_book_sell_data(){
    const response = await fetch("http://localhost:4000/sell-data")
    const sellData = await response.json()
    console.log(sellData);
    console.log(sellData[1]);
    for(let i = 0; i < sellData.length; i++) {
         if (i == 0) {
         document.querySelector("#zpy").innerHTML = ""
        }
        document.querySelector("#zpy")
        .insertAdjacentHTML("afterbegin", sellData)
        let childNode = sellData.removeChild(childNode);
        // document.querySelector("#app")
        // .insertAdjacentHTML("afterbegin", data[i])
     }
}
setInterval(() => get_order_book_data(), 2000)
setInterval(() => get_order_book_sell_data(), 2000);