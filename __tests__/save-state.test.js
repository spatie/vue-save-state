import Vue from 'vue';
import {assert} from 'chai';
import SaveState from '../src/save-state';
import LocalStorageMock from '../__tests__/Helpers/LocalStorageMock';

let vm;
let localStorage;

beforeEach(() => {
    localStorage = new LocalStorageMock();

    vm = createTestComponent();
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

    vm = createTestComponent();

    await Vue.nextTick(() => {});

    assert.equal(vm.string, 'restored from state');
});

test('it uses the cacheKey from the given options as the key to store the options in local storage', async() => {
    vm = createTestComponent({'configuration': {'cacheKey': 'customKey'}});

    vm.string = 'updated string';

    await Vue.nextTick(() => {});

    assert.equal(JSON.parse(localStorage.getItem('customKey')).string, 'updated string');
});

test('by default it stores the state for all attributes', async () => {
    const componentConfiguration = {
        'data': {
            'string': '',
            'anotherString': '',
        },
    }

    vm = createTestComponent(componentConfiguration)

    vm.string = 'updated';
    vm.anotherString = 'updated anotherString';

    await Vue.nextTick(() => {});

    assert.equal(getLocalStorageContent().string, 'updated');
    assert.equal(getLocalStorageContent().anotherString, 'updated anotherString');
});

test('it only saves the state for the given attributes in the configuration', async() => {
    const componentConfiguration = {
        'data': {
            'string': 'initial',
            'anotherString': 'initial anotherString',
        },
        'configuration': {
            'cacheKey': 'testComponent',
            'saveProperties': ['anotherString'],
        },
    }

    vm = createTestComponent(componentConfiguration)

    vm.string = 'updated';
    vm.anotherString = 'updated anotherString';

    await Vue.nextTick(() => {});

    assert.isUndefined(getLocalStorageContent().string);
    assert.equal(getLocalStorageContent().anotherString, 'updated anotherString');
});


test('it will not save any state when the attributes configuration option is empty', async() => {
    const componentConfiguration = {
        'configuration': {
            'cacheKey': 'testComponent',
            'saveProperties': ['anotherString']
        },
    }

    vm = createTestComponent(componentConfiguration)

    vm.string = 'updated';

    await Vue.nextTick(() => {});

    assert.isUndefined(getLocalStorageContent().string);
});

function getLocalStorageContent() {
    return JSON.parse(localStorage.getItem('testComponent'))
}

function createTestComponent({data = null, configuration = null} = {}) {
    const componentConstructor = Vue.extend({
        render() {

        },

        mixins: [SaveState],

        data() {
            return data || {
                string: 'initial string',
            }
        },

        methods: {

            getSaveStateConfig() {
                return configuration || {
                    'cacheKey': 'testComponent'
                };
            },
        },
    });

    return new componentConstructor().$mount();
}
