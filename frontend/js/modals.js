import { CLIENT_API } from "./APIurls.js";
import { setClientId } from "./clientConfig/clientGlobal.js";

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

export const productModals = {}

export const sellerModals = {}

export const receiptModals = {}
