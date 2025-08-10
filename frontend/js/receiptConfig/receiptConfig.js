import { RECEIPT_API } from "../APIurls.js"
import { receiptModals } from "../modals.js";


export async function loadReceipts() {
    const table = document.getElementById('receiptTable');
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
            erase(receipt.idreceipt);
        });
        actionsCell.append(editBtn, deleteBtn);
        table.appendChild(row);
    });
}
