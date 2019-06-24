import React, {
    Component
} from 'react'
import * as THREE from 'three'


export default class Index extends Component {
    render() {
        return <div id='demo' > </div>;
    }
    componentDidMount() {
        let rootDom = document.querySelector('#demo')
        var scene = new THREE.Scene();

        //相机
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        //渲染器
        var renderer = new THREE.WebGLRenderer();
        //渲染尺寸
        renderer.setSize(window.innerWidth, window.innerHeight);
        //添加到dom树里面
        rootDom.appendChild(renderer.domElement);

        //坐标

        var geometry = new THREE.BoxGeometry(1, 1, 1);

        //纹理
        var material = new THREE.MeshBasicMaterial({
            color: 'blue'
        });

        //对象
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        // 相机位置
        camera.position.z = 5;

        //动画
        var animate = function () {
            requestAnimationFrame(animate);
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            cube.rotation.z += 0.01;
            renderer.render(scene, camera);
        };

        animate();
    }
}