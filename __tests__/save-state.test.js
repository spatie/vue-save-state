import Vue from 'vue';
import { assert } from 'chai';

let vm;

beforeEach(() => {
     const componentClass = Vue.component('test-component', {});

    vm = new componentClass;
});


test('it has a created function', () => {
    assert.typeOf(vm.created, 'function');
});
