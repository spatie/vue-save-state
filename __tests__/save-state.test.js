import Vue from 'vue';
import {assert} from 'chai';
import SaveState from '../src/save-state';
import LocalStorageMock from '../__test-helpers__/LocalStorageMock';

let vm;
let localStorage;

beforeEach(() => {
    localStorage = new LocalStorageMock();

    vm = createTestComponent()
});

test('it has a created function', () => {
    assert.typeOf(vm.$options.created[0], 'function');
});


test('it stores state in local storage when a change occurs', async () => {
    vm.string = 'updated string';

    await Vue.nextTick(() => {});

    assert.equal(getLocalStorageContent().string, 'updated string');
});

test('it restores the state from local storage', async () => {
    localStorage.setItem('testComponent', JSON.stringify({'string': 'restored from state'}))

    vm = await createTestComponent()

    assert.equal(getLocalStorageContent().string, 'restored from state');
});

function getLocalStorageContent() {
    return JSON.parse(localStorage.getItem('testComponent'))
}

function createTestComponent() {
    const componentConstructor = Vue.extend({
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
                    'cacheKey': 'testComponent',
                };
            },
        },


    });

    return new componentConstructor().$mount();
}
