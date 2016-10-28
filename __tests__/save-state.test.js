import Vue from 'vue';
import { assert } from 'chai';
import TestComponent from '../TestDummies/TestComponent'

let vm;

beforeEach(() => {

    const componentConstructor = Vue.extend(TestComponent);

    vm = new componentConstructor({}).$mount();
});


test('it has a created function', () => {

    assert.typeOf(vm.$options.created[0], 'function');
});
