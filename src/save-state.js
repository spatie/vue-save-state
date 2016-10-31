import {forEach, pickBy, find} from 'lodash';

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

                if (this.attributeIsManagedBySaveState(key)) {
                    this.$data[key] = value;
                }
            });
        },
        saveState() {
            let data = pickBy(this.$data, (value, attribute) => {
                return this.attributeIsManagedBySaveState(attribute)
            });

            saveState(this.getSaveStateConfig().cacheKey, data)
        },
        getSavedState() {
            return getSavedState(this.getSaveStateConfig().cacheKey);
        },

        attributeIsManagedBySaveState(attribute) {

            if (! this.getSaveStateConfig().attributes) {
                return true;
            }

            return this.getSaveStateConfig().attributes.indexOf(attribute) !== -1
        }
    },
};

function saveState(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getSavedState(key) {
    const savedState = localStorage.getItem(key);

    return savedState ? JSON.parse(savedState) : null;
}
