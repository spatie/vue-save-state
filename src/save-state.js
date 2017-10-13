import pickBy from 'lodash/pickBy';
import forEach from 'lodash/forEach';
import localStorage from './local-storage';
import sessionStorage from './session-storage';

const localSaveState = {
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

    $_saveState: localStorage,

    methods: {
        loadState() {

            const savedState = this.$options.$_saveState.getSavedState(this.getSaveStateConfig().cacheKey);

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

            this.$options.$_saveState.saveState(this.getSaveStateConfig().cacheKey, data);
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
            this.$options.$_saveState.clearSavedState(this.getSaveStateConfig().cacheKey);
        },
    },
};

const sessionSaveState = {
    mixins: [localSaveState],

    $_saveState: sessionStorage,
};

export {localSaveState, sessionSaveState};
export default localSaveState;
