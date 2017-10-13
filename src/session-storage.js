function saveState(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
}

function getSavedState(key) {
    const savedState = sessionStorage.getItem(key);

    return savedState ? JSON.parse(savedState) : null;
}

function clearSavedState(key) {
    sessionStorage.removeItem(key);
}

export default {saveState, getSavedState, clearSavedState};
