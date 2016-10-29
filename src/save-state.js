import { forEach } from 'lodash';

export default {
    watch: {
        '$data': {
            handler() {
                console.log('observed changed data');
                this.saveState();
            },
            deep: true,
        },
    },

    created() {
        console.log('created method of mixin called');
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
            saveState(this.getSavedStateParameters().cacheKey, this.$data)
        },
        getSavedState() {
            return getSavedState(this.getSavedStateParameters().cacheKey);
        },
    },
};

function saveState(key, data)
{
    console.log('savingState', key, data);
    localStorage.setItem(key, JSON.stringify(data));
}

function getSavedState(key)
{
    const savedState = localStorage.getItem(key);

    return savedState ? JSON.parse(savedState) : null;
}
