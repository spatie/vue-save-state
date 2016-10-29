const localStorageMock = (function () {
    let store = {};

    return {
        getItem(key) {
            return store[key];
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        clear() {
            store = {};
        }
    };
});

Object.defineProperty(window, 'localStorage', { value: new localStorageMock });

export default localStorageMock;



