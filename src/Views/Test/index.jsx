import React, { Component } from 'react';
import * as m from './components/even.js'
import './components/main.js'

export default class Test extends Component {

    componentDidMount() {
        m.even(10)
        //  m.even(20)
        console.log(`属性===>${m.counter}`)
    }

    render() {
        return <div>测试页面</div>
    }
}