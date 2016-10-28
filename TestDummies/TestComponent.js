import SaveState from '../src/save-state';

export default {
    render() {

    },

    mixins: [SaveState],

    data() {
        return {
            string: 'this is the data'
        }
    },

    methods: {

        getSavedStateParameters() {
            return {
                'cacheKey': 'projectsComponent',
            };
        },
    },


}

