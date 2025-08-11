import { CLIENT_API, PRODUCT_API, SELLER_API, RECEIPT_API } from "./APIurls.js";
import { getClientId, setClientId } from "./clientConfig/clientGlobal.js";
import { getProductId, setProductId } from "./productConfig/productGlobal.js";
import { receiptControl } from "./receiptConfig/receiptConfig.js";
import { getReceiptId, setReceiptId } from "./receiptConfig/receiptGlobal.js";
import { getSellerId, setSellerId } from "./sellerConfig/sellerGlobal.js";




export const clientModals = {
    async open(id = null) {
        const name = document.getElementById("clientName");
        const school = document.getElementById("clientSchool");
        const phone = document.getElementById("clientPhone");
        if (id) {
            //Edit mode
            try {
                const res = await fetch(CLIENT_API + id)
                const [client] = await res.json()
                setClientId(id)
                const clientID = getClientId()
                console.log(clientID);
                document.getElementById("clientTitle").textContent = "Editar cliente"
                name.value = client.client_name;
                school.value = client.school;
                phone.value = client.phone;
            } catch (error) {
                console.log(error);
            }
        } else {
            //Add mode
            setClientId(null)
            const clientID = getClientId()
            console.log(clientID);
            document.getElementById("clientTitle").textContent = "Añadir cliente"
            name.value = ""
            school.value = ""
            phone.value = ""
        }
        const clientModal = document.getElementById("clientModal");
        clientModal.showModal()
    },
    close() {
        const clientModal = document.getElementById("clientModal");
        clientModal.close()
    }
}

export const productModals = {
    async open(id = null) {
        const name = document.getElementById("productName");
        if (id) {
            //Edit mode
            try {
                const res = await fetch(PRODUCT_API + id)
                const [product] = await res.json()
                setProductId(id)
                const productId = getProductId()
                console.log(productId);
                document.getElementById("productTitle").textContent = "Editar producto"
                name.value = product.product_name;
            } catch (error) {
                console.log(error);
            }
        } else {
            //Add mode
            setProductId(null)
            const productId = getProductId()
            console.log(productId);
            document.getElementById("productTitle").textContent = "Añadir producto"
            name.value = ""
        }
        const productModal = document.getElementById("productModal");
        productModal.showModal()
    },
    close() {
        const productModal = document.getElementById("productModal");
        productModal.close()
    }
}

export const sellerModals = {
    async open(id = null) {
        const name = document.getElementById("sellerName");
        if (id) {
            //Edit mode
            try {
                const res = await fetch(SELLER_API + id)
                const [seller] = await res.json()
                setSellerId(id)
                const sellerId = getSellerId()
                console.log(sellerId);
                document.getElementById("sellerTitle").textContent = "Editar vendedor"
                name.value = seller.seller_name;
            } catch (error) {
                console.log(error);
            }
        } else {
            //Add mode
            setSellerId(null)
            const sellerId = getSellerId()
            console.log(sellerId);
            document.getElementById("sellerTitle").textContent = "Añadir vendedor"
            name.value = ""
        }
        const sellerModal = document.getElementById("sellerModal");
        sellerModal.showModal()
    },
    close() {
        const sellerModal = document.getElementById("sellerModal");
        sellerModal.close()
    }
}

export const receiptModals = {
    async open(id = null) {
        const date = document.getElementById("receiptDate");
        const total = document.getElementById("receiptTotal");
        const sellerid = document.getElementById("receiptSeller");
        const clientid = document.getElementById("receiptClient");

        await receiptControl.loadSellerOptions();
        await receiptControl.loadClientOptions();
        if (id) {
            //Edit mode
            try {
                const res = await fetch(RECEIPT_API + id)
                const [receipt] = await res.json()
                setReceiptId(id)
                const receiptid = getReceiptId()
                console.log(receiptid);
                document.getElementById("receiptTitle").textContent = "Editar factura"
                date.value = receipt.date;
                total.value = receipt.total;
                sellerid.value = receipt.idseller;
                clientid.value = receipt.idclient;
            } catch (error) {
                console.log(error);
            }
        } else {
            //Add mode
            setReceiptId(null)
            const receiptid = getReceiptId()
            console.log(receiptid);
            document.getElementById("receiptTitle").textContent = "Añadir factura"
            date.value = ""
            total.value = ""
            sellerid.value = ""
            clientid.value = ""
        }
        const receiptModal = document.getElementById("receiptModal");
        receiptModal.showModal()
    },
    close() {
        const receiptModal = document.getElementById("receiptModal");
        receiptModal.close()
    }
}
