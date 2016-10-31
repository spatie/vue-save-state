import SaveState from '../src/save-state';

export default {
    render() {

    },

    mixins: [SaveState],

    data() {
        return {
            string: 'initial string'
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

