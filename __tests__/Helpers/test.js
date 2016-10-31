export default {

    mixins: [SaveState],

    methods: {

        getSaveStateConfig() {
            return {
                'cacheKey': 'testComponent'
            };
        },
    },
}
