import { useEffect } from "react";
import * as THREE from "three";
import { BoxGeometry, ColorRepresentation } from "three";

export default () => {
  useEffect(() => {
    // 1. 获取画布
    const canvas = document.querySelector("#c")!;

    // 2. 创建场景，antialias 抗锯齿
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    // 3. 创建（透视）相机
    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // 4. 设置相机位置
    camera.position.z = 2;

    // 5. 创建场景
    const scene = new THREE.Scene();

    {
      const color = 0xffffff;
      const intensity = 3;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

    // 6. 创建几何体
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // 7. 创建材质
    // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 }); // greenish blue

    // 8. 创建网格模型：几何体+材质
    // const cube = new THREE.Mesh(geometry, material);

    // 9. 添加到场景中
    // scene.add(cube);

    const cubes = [makeInstance(geometry, 0x44aa88, 0), makeInstance(geometry, 0x8844aa, -2), makeInstance(geometry, 0xaa8844, 2)];
    function makeInstance(geometry: BoxGeometry, color: ColorRepresentation, x: number) {
      const material = new THREE.MeshPhongMaterial({ color });

      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      cube.position.x = x;

      return cube;
    }

    // 10. 渲染：场景+相机
    renderer.render(scene, camera);

    function render(time: any) {
      time *= 0.001; // convert time to seconds

      //   cube.rotation.x = time;
      //   cube.rotation.y = time;

      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * 0.1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }, []);
  return <canvas id="c"></canvas>;
};
