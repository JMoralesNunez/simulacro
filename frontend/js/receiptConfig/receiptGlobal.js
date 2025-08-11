let currentReceiptId = null

export function setReceiptId(data) {
    currentReceiptId = data;
}

export function getReceiptId() {
    return currentReceiptId    
}