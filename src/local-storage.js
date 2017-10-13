function saveState(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getSavedState(key) {
    const savedState = localStorage.getItem(key);

    return savedState ? JSON.parse(savedState) : null;
}

function clearSavedState(key) {
    localStorage.removeItem(key);
}

export default {saveState, getSavedState, clearSavedState};
