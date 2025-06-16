import { useEffect } from "react";
// https://github.com/puxiao/threejs-tutorial/blob/main/02%20%E5%88%9D%E5%A7%8B%E5%8C%96Three.js%E9%A1%B9%E7%9B%AE.md
// https://threejs.org/manual/#en/creating-a-scene
import * as THREE from "three";
const App = () => {
  /** 三大件：scene 场景 + camera 摄像机 + renderer 渲染器 */
  // 场景
  const scene = new THREE.Scene();
  // 相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  // 渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setAnimationLoop(animate);

  // 几何
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 材质
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // 立方体
  const cube = new THREE.Mesh(geometry, material);
  // 场景里添加这个立方体
  scene.add(cube);
  // 摄像机机位
  camera.position.z = 5;

  function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  useEffect(() => {
    document.body.appendChild(renderer.domElement);

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);
  return <div id="three"></div>;
};

export default App;
