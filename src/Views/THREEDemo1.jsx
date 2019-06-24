import React, { Component } from 'react';
import * as THREE from 'three';

import Line from './Three/line.jsx';

export default class THREEDemo1 extends Component {
  render() {
    return (
      <div>
        <Line />
        <div>测试</div>
      </div>
    );
  }
}
