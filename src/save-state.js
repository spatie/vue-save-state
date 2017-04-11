import { forEach, pickBy } from 'lodash';
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
            const data = pickBy(this.$data, (value, attribute) => {
                return this.attributeIsManagedBySaveState(attribute);
            });

            saveState(this.getSaveStateConfig().cacheKey, data);
        },

        attributeIsManagedBySaveState(attribute) {
            if (! this.getSaveStateConfig().saveProperties) {
                return true;
            }

            return this.getSaveStateConfig().saveProperties.indexOf(attribute) !== -1;
        },

        clearSavedState() {
            clearSavedState(this.getSaveStateConfig().cacheKey);
        }
    },
};
