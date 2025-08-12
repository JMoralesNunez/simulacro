import { RECEIPT_API, SELLER_API, CLIENT_API } from "../APIurls.js"
import { receiptModals } from "../modals.js";
import { getReceiptId, setReceiptId } from "./receiptGlobal.js";


export const receiptControl = {
    async save() {
        const date = document.getElementById("receiptDate").value;
        const total = document.getElementById("receiptTotal").value;
        const sellerid = document.getElementById("receiptSeller").value;
        const clientid = document.getElementById("receiptClient").value;
        if (getReceiptId()) {
            //Edit mode
            try {
                const res = await fetch(`${RECEIPT_API}${getReceiptId()}`, {
                    "method": 'PUT',
                    "headers": {
                        'Content-Type': 'application/json'
                    },
                    "body": JSON.stringify({
                        "date": date,
                        "total": total,
                        "idseller": sellerid,
                        "idclient": clientid
                    })
                });
                const data = await res.json();
            } catch (error) {
                console.error('Error en PUT:', error);
            }
        } else {
            //Create mode
            setReceiptId(null)
            try {
                const res = await fetch(RECEIPT_API, {
                    "method": 'POST',
                    "headers": {
                        'Content-Type': 'application/json'
                    },
                    "body": JSON.stringify({
                        "date": date,
                        "total": total,
                        "idseller": sellerid,
                        "idclient": clientid
                    })
                });
                const data = await res.json();
            } catch (error) {
                console.error('Error en POST:', error);
            }
        }
        this.load();
        receiptModals.close()
        setReceiptId(null)
    },
    async load() {
        const table = document.getElementById('receiptTable');
        table.innerHTML = ""
        const res = await fetch(RECEIPT_API)
        const receipts = await res.json();
        receipts.forEach(receipt => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${receipt.idreceipt}</td>
            <td>${receipt.date}</td>
            <td>$${receipt.total}</td>
            <td>${receipt.seller_name}</td>
            <td>${receipt.client_name}</td>
            <td></td>
        `;
            const actionsCell = row.querySelector("td:last-child");
            const editBtn = document.createElement("button");
            editBtn.className = "btn btn-sm btn-warning me-1";
            editBtn.textContent = "Editar";
            editBtn.addEventListener("click", () => {
                receiptModals.open(receipt.idreceipt);
            });
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn btn-sm btn-danger";
            deleteBtn.textContent = "Eliminar";
            deleteBtn.addEventListener("click", () => {
                this.erase(receipt.idreceipt);
            });
            actionsCell.append(editBtn, deleteBtn);
            table.appendChild(row);
        });
    },
    async loadSellerOptions() {
        const select = document.getElementById("receiptSeller");
        select.innerHTML = "";
        try {
            const res = await fetch(SELLER_API);
            const sellers = await res.json();
            sellers.forEach(seller => {
                const option = document.createElement("option");
                option.value = seller.idseller;
                option.textContent = seller.seller_name;
                select.appendChild(option);
            });
        } catch (error) {
            console.error("Error cargando vendedores:", error);
        }
    },
    async loadClientOptions() {
        const select = document.getElementById("receiptClient");
        select.innerHTML = "";
        try {
            const res = await fetch(CLIENT_API);
            const clients = await res.json();
            clients.forEach(client => {
                const option = document.createElement("option");
                option.value = client.idclient;
                option.textContent = client.client_name;
                select.appendChild(option);
            });
        } catch (error) {
            console.error("Error cargando clientes:", error);
        }
    },
    async erase(id) {
        try {
            const res = await fetch(`${RECEIPT_API}${id}`, {
                "method": 'DELETE'
            });
            if (res.ok) {
                console.log('DELETE: Recurso eliminado');
            } else {
                console.error('DELETE falló');
            }
        } catch (error) {
            console.error('Error en DELETE:', error);
        }
        this.load();
    }
}

