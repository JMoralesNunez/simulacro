let currentClientId = null

export function setClientId(data) {
    currentClientId = data;
}

export function getClientId() {
    return currentClientId    
}