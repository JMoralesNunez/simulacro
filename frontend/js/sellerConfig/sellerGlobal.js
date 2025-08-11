let currentSellerId = null

export function setSellerId(data) {
    currentSellerId = data;
}

export function getSellerId() {
    return currentSellerId    
}