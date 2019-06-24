
import React, { Component } from 'react'
import * as THREE from 'three'

import Line from './Three/line.jsx'
import Index from './Three/入门.jsx'

import './index.less'
import './test.css'
import '../../src/styles/global.less'
export default class THREEDemo1 extends Component {
    render() {
        return <div  >Hello,APP
            <Line></Line>
            <Index></Index>
        </div>;
    }

}