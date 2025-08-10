import { SELLER_API } from "../APIurls.js"
import { sellerModals } from "../modals.js";


export async function loadSellers() {
    const table = document.getElementById('sellerTable');
    const res = await fetch(SELLER_API)
    const sellers = await res.json();
    sellers.forEach(seller => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${seller.idseller}</td>
            <td>${seller.seller_name}</td>
            <td></td>
        `;
        const actionsCell = row.querySelector("td:last-child");
        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-sm btn-warning me-1";
        editBtn.textContent = "Editar";
        editBtn.addEventListener("click", () => {
            sellerModals.open(seller.idseller); 
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-sm btn-danger";
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click", () => {
            erase(seller.idseller);
        });
        actionsCell.append(editBtn, deleteBtn);
        table.appendChild(row);
    });
}