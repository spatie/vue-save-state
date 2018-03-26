import pickBy from 'lodash/pickBy';
import forEach from 'lodash/forEach';
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
            if (!this.getSaveStateConfig) return;
            const savedState = getSavedState(this.getSaveStateConfig().cacheKey);

            if (!savedState) {
                return;
            }

            forEach(savedState, (value, key) => {

                if (this.attributeIsManagedBySaveState(key)) {
                    if (this.getSaveStateConfig().onLoad) {
                        value = this.getSaveStateConfig().onLoad(key, value);
                    }

                    this.$data[key] = value;
                }
            });
        },

        saveState() {
            if (!this.getSaveStateConfig) return;
            const data = pickBy(this.$data, (value, attribute) => {
                return this.attributeIsManagedBySaveState(attribute);
            });

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
