import { saveState, getSavedState, clearSavedState } from './local-storage';

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
            const savedState = getSavedState(this.getSaveStateConfig().cacheKey);

            if (!savedState) {
                return;
            }

            for (let key in savedState) {
                if (this.attributeIsManagedBySaveState(key)) {
                    let value = savedState[key];

                    if (this.getSaveStateConfig().onLoad) {
                        value = this.getSaveStateConfig().onLoad(key, value);
                    }

                    this.$data[key] = value;
                }
            }
        },

        saveState() {
            const data = Object.keys(this.$data)
                .filter((key) => this.attributeIsManagedBySaveState(key))
                .reduce((obj, key) => {
                    obj[key] = this.$data[key];

                    return obj;
                }, {});

            saveState(this.getSaveStateConfig().cacheKey, data);
        },

        attributeIsManagedBySaveState(attribute) {
            if (this.getSaveStateConfig().ignoreProperties &&
                this.getSaveStateConfig().ignoreProperties.indexOf(attribute) !== -1) {

                return false;
            }

            if (! this.getSaveStateConfig().saveProperties) {
                return true;
            }

            return this.getSaveStateConfig().saveProperties.indexOf(attribute) !== -1;
        },

        clearSavedState() {
            clearSavedState(this.getSaveStateConfig().cacheKey);
        },
    },
};
