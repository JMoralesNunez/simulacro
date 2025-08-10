import { loadClients } from "./clientConfig/clientConfig.js"
import { clientModals } from "./modals.js"
import { loadProducts } from "./productConfig/productConfig.js"
import { loadReceipts } from "./receiptConfig/receiptConfig.js"
import { loadSellers } from "./sellerConfig/sellerConfig.js"




const userName = document.getElementById("userName")
const userInfo = localStorage.getItem("userInfo")

document.addEventListener('DOMContentLoaded', () => {
    const name = JSON.parse(userInfo).name
    userName.textContent = name

    loadClients()
    loadProducts()
    loadSellers()
    loadReceipts()
})

document.getElementById('addClientBtn').addEventListener('click', (e)=>{
    e.preventDefault()
    clientModals.open()
})








