import { clientControl } from "./clientConfig/clientConfig.js"
import { showTable } from "./DOM.js"
import { clientModals, productModals, sellerModals, receiptModals } from "./modals.js"
import { productControl } from "./productConfig/productConfig.js"
import { loadReceipts } from "./receiptConfig/receiptConfig.js"
import { sellerControl } from "./sellerConfig/sellerConfig.js"

const userName = document.getElementById("userName")
const userInfo = localStorage.getItem("userInfo")

document.addEventListener('DOMContentLoaded', () => {
    const name = JSON.parse(userInfo).name
    userName.textContent = name

    clientControl.load()
    productControl.load()
    sellerControl.load()
    loadReceipts()
})

//DOM de tablas
document.getElementById('clientSection').addEventListener('click', ()=>{showTable.client()})
document.getElementById('productSection').addEventListener('click', ()=>{showTable.product()})
document.getElementById('sellerSection').addEventListener('click', ()=>{showTable.seller()})
document.getElementById('receiptSection').addEventListener('click', ()=>{showTable.receipt()})

//Modal de tabla clientes
document.getElementById('addClientBtn').addEventListener('click', (e)=>{
    e.preventDefault()
    clientModals.open()
})
document.getElementById('closeClientDialog').addEventListener('click', ()=>{
    clientModals.close()
})
document.getElementById('saveClientChanges').addEventListener('click', ()=>{
    clientControl.save()
})

//Modal de tabla productos
document.getElementById('addProductBtn').addEventListener('click', (e)=>{
    e.preventDefault()
    productModals.open()
})
document.getElementById('closeProductDialog').addEventListener('click', ()=>{
    productModals.close()
})
document.getElementById('saveProductChanges').addEventListener('click', ()=>{
    productControl.save()
})

//Modal de tabla vendedores
document.getElementById('addSellerBtn').addEventListener('click', (e)=>{
    e.preventDefault()
    sellerModals.open()
})
document.getElementById('closeSellerDialog').addEventListener('click', ()=>{
    sellerModals.close()
})
document.getElementById('saveSellerChanges').addEventListener('click', ()=>{
    sellerControl.save()
})


//Modal tabla facturas
document.getElementById('addReceiptBtn').addEventListener('click', (e)=>{
    e.preventDefault()
    receiptModals.open()
})
document.getElementById('closeReceiptDialog').addEventListener('click', ()=>{
    receiptModals.close()
})






