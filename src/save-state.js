import { forEach } from 'lodash';

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
                if (this.$data[key] === '' || this.$data[key] === []) {
                this.$data[key] = value;
            }
        });
        },
        saveState() {
            localStorage.setItem(this.getSavedStateParameters().cacheKey, JSON.stringify(this.$data));
        },
        getSavedState() {
            const savedState = localStorage.getItem(this.getSavedStateParameters().cacheKey);

            return savedState ? JSON.parse(savedState) : null;
        },
    },
};
