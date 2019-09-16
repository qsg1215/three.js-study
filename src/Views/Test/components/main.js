import { mixins } from './mixins.js'


const Foo = {
    foo: function () {
        console.log('foo ===>');
    }
}


let ss = new mixins(Foo)({ name: 'chen' })
ss.foo()


