import React, {
    Component
} from 'react'
import * as THREE from 'three'

import './line.css'

export default class Line extends Component {
    constructor(props) {
        super(props);
        this.state = {
            camera: {}, //相机
            renderer: {}, //渲染器
            scene: {}, //场景
            light: {} //光源
        };
    }

    render() {
        return <div id="canvas-frame"  ></div>;
    }


    componentDidMount() {

        //dom
        let rootDom = document.querySelector('#canvas-frame')
        let {
            clientWidth, clientHeight
        } = rootDom


        //场景
        var scene = new THREE.Scene();
        scene.background = new THREE.Color('#fff');

        //相机
        var camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 1, 10000);
        //渲染器
        var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        //渲染尺寸
        renderer.setSize(clientWidth, clientHeight);
        //添加到dom树里面
        rootDom.appendChild(renderer.domElement);

        var camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 1, 500);
        camera.position.set(0, 0, 100);
        camera.lookAt(0, 0, 0);



        var material = new THREE.LineBasicMaterial({ color: 0x0000ff });

        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
        geometry.vertices.push(new THREE.Vector3(0, 10, 0));
        geometry.vertices.push(new THREE.Vector3(10, 0, 0));

        var line = new THREE.Line(geometry, material);
        scene.add(line);

        //renderer.clear();
        renderer.render(scene, camera);

        // //坐标
        // var geometry = new THREE.BoxGeometry();
        // var material = new THREE.LineBasicMaterial({ vertexColors: true });
        // var color1 = new THREE.Color(0x444444), color2 = new THREE.Color(0xFF0000);

        // // 线的材质可以由2点的颜色决定
        // var p1 = new THREE.Vector3(-100, 0, 100);
        // var p2 = new THREE.Vector3(100, 0, -100);
        // geometry.vertices.push(p1);
        // geometry.vertices.push(p2);
        // geometry.colors.push(color1, color2);

        // var line = new THREE.Line(geometry, material, THREE.LineSegments);
        // scene.add(line);


        // renderer.clear();
        // renderer.render(scene, camera);



    }

}