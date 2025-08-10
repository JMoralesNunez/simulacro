import { PRODUCT_API } from "../APIurls.js";
import { productModals } from "../modals.js";


export async function loadProducts() {
    const table = document.getElementById('productTable');
    const res = await fetch(PRODUCT_API)
    const products = await res.json();
    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.idproduct}</td>
            <td>${product.product_name}</td>
            <td></td>
        `;
        const actionsCell = row.querySelector("td:last-child");
        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-sm btn-warning me-1";
        editBtn.textContent = "Editar";
        editBtn.addEventListener("click", () => {
            productModals.open(product.idproduct); // Aun no funciona
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-sm btn-danger";
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click", () => {
            erase(product.idproduct);
        });
        actionsCell.append(editBtn, deleteBtn);
        table.appendChild(row);
    });
}