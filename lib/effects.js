let camera, scene, renderer, cloudParticles = [], composer, textureEffect, movingLight;

function init() {
    const canvas = document.querySelector('.bgScene');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;
    camera.position.x = 1.16;
    camera.position.y = -012;
    camera.rotation.z = 0.27;
    camera.rotation.y = 0.0;
    camera.rotation.x = 0;

    let ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0xff8c19);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    let orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
    orangeLight.position.set(200, 300, 100);
    scene.add(orangeLight);
    let redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
    redLight.position.set(100, 300, 100);
    scene.add(redLight);
    let blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7);
    blueLight.position.set(300, 300, 200);
    scene.add(blueLight);

    movingLight = new THREE.PointLight(0xF41525, 50, 500, 1);
    movingLight.position.set(300, 300, 200);
    scene.add(movingLight);

    renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        premultipliedAlpha: false
    });


    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.fog = new THREE.FogExp2(0x03544e, 0.001);
    renderer.setClearColor(scene.fog.color);
    let bgScene = renderer.domElement;

    document.body.appendChild(bgScene);

    let loader = new THREE.TextureLoader();
    loader.load("/img/smoke-1.png", function (texture) {
        console.log('texture loaded');
        cloudGeo = new THREE.PlaneBufferGeometry(200, 200);
        cloudMaterial = new THREE.MeshLambertMaterial({
            color: 'white',
            map: texture,
            // alphaTest: 0.5,
            opacity : 0.5,
            transparent: true,
            side: THREE.DoubleSide,
        });

        for (let p = 0; p < 50; p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.setX(Math.random() * 300 - 150);
            cloud.position.setY(Math.random() * 300 - 150);
            cloud.position.setZ(Math.random() * 400 - 150);
            cloud.rotation.x = 0;
            cloud.rotation.y = 0;
            cloud.rotation.z = Math.random() * 6.28;
            cloud.material.opacity = 0.6;
            cloudParticles.push(cloud);
            scene.add(cloud);
        }
    });

    loader.load("/img/nebula-background-effect-threejs-5.jpg", function (texture) {
        textureEffect = new POSTPROCESSING.TextureEffect({
            blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
            texture: texture
        });
        textureEffect.blendMode.opacity.value = 0.6;

        const bloomEffect = new POSTPROCESSING.BloomEffect({
            blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
            kernelSize: POSTPROCESSING.KernelSize.SMALL,
            useLuminanceFilter: true,
            luminanceThreshold: 0.7,
            luminanceSmoothing: 0.3
        });
        bloomEffect.blendMode.opacity.value = 1.5;
        let effectPass = new POSTPROCESSING.EffectPass(
            camera,
            bloomEffect,
            textureEffect,
        );

        effectPass.renderToScreen = true;
        composer = new POSTPROCESSING.EffectComposer(renderer);
        composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
        composer.addPass(effectPass);

        window.addEventListener("resize", onWindowResize, false);
        render();
    });
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    cloudParticles.forEach(p => {
        p.rotation.z -= 0.002;
        // p.rotation.x -= 0.01;
    });

    // movingLight.power = Math.random() * 4 * 3.14;

    composer.render(0.1);
    requestAnimationFrame(render);
}

init();