export function saveState(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getSavedState(key) {
    const savedState = localStorage.getItem(key);

    return savedState ? JSON.parse(savedState) : null;
}

