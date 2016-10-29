import Vue from 'vue';
import {assert} from 'chai';
import TestComponent from '../TestDummies/TestComponent'
import LocalStorageMock from '../TestDummies/LocalStorageMock';

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

test('it stores state in local storage when a change occurs', () => {
    vm.$options.methods.changeString();

    assert.equal(localStorage.getItem('projectsComponent'), 'updated string');
})
