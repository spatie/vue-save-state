export function saveState(key, data, cacheType) {
    if (cacheType === 'localStorage' || cacheType === undefined) {
        localStorage.setItem(key, JSON.stringify(data));
    } else if (cacheType === 'sessionStorage') {
        sessionStorage.setItem(key, JSON.stringify(data));
    }
}

export function getSavedState(key, cacheType) {
    let savedState = null;
    if (cacheType === 'localStorage' || cacheType === undefined) {
        savedState = localStorage.getItem(key);
    } else if (cacheType === 'sessionStorage') {
        savedState = sessionStorage.getItem(key);
    }

    return savedState ? JSON.parse(savedState) : null;
}

export function clearSavedState(key, cacheType) {
    if (cacheType === 'localStorage' || cacheType === undefined) {
        localStorage.removeItem(key);
    } else if (cacheType === 'sessionStorage') {
        sessionStorage.removeItem(key);
    }
}
