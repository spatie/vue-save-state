import Vue from 'vue';
import {assert} from 'chai';
import TestComponent from '../__test-helpers__/TestComponent'
import LocalStorageMock from '../__test-helpers__/LocalStorageMock';

let vm;
let localStorage;

beforeEach(() => {
    localStorage = new LocalStorageMock();

    const componentConstructor = Vue.extend(TestComponent);
    vm = new componentConstructor({}).$mount();
});

test('it has a created function', () => {
    assert.typeOf(vm.$options.created[0], 'function');
});

test('it stores state in local storage when a change occurs', async () => {
    vm.string = 'updated string';

    await Vue.nextTick(() => {});

    assert.equal(getLocalStorageContent().string, 'updated string');
});

function getLocalStorageContent() {
    return JSON.parse(localStorage.getItem('projectsComponent'))
}
