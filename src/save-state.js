import {forEach} from 'lodash';

export default {
    watch: {
        '$data': {
            handler() {
                this.saveState();
            },
            deep: true,
        },
    },

    created() {
        this.loadState();
    },

    methods: {
        loadState() {
            const savedState = this.getSavedState();

            if (!savedState) {
                return;
            }


            forEach(savedState, (value, key) => {
                this.$data[key] = value;

            });
        },
        saveState() {
            saveState(this.getSaveStateConfig().cacheKey, this.$data)
        },
        getSavedState() {
            return getSavedState(this.getSaveStateConfig().cacheKey);
        },
    },
};

function saveState(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getSavedState(key) {
    const savedState = localStorage.getItem(key);

    return savedState ? JSON.parse(savedState) : null;
}
