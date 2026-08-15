/* =====================================================
   FORGIVE ME ❤️
   Romantic 3D Experience
===================================================== */


/* =====================================================
   CHECK THREE.JS
===================================================== */

if (typeof THREE === "undefined") {

    console.error(
        "Three.js بارگذاری نشده است!"
    );

    alert(
        "خطا در بارگذاری Three.js ❌"
    );

} else {

    console.log(
        "Three.js با موفقیت بارگذاری شد ❤️"
    );

    console.log(
        "Version:",
        THREE.REVISION
    );
}


/* =====================================================
   VARIABLES
===================================================== */

let scene;
let camera;
let renderer;

let heart;
let stars;
let particles;

let heartGlow;

let clock =
    new THREE.Clock();

let mouseX = 0;
let mouseY = 0;

let targetCameraX = 0;
let targetCameraY = 0;


/* =====================================================
   DOM
===================================================== */

const container =
    document.getElementById(
        "scene-container"
    );

const loading =
    document.getElementById(
        "loading"
    );

const intro =
    document.getElementById(
        "intro"
    );

const message =
    document.getElementById(
        "message"
    );

const question =
    document.getElementById(
        "question"
    );

const finalMessage =
    document.getElementById(
        "finalMessage"
    );

const sadMessage =
    document.getElementById(
        "sadMessage"
    );


const startButton =
    document.getElementById(
        "startButton"
    );

const heartButton =
    document.getElementById(
        "heartButton"
    );

const yesButton =
    document.getElementById(
        "yesButton"
    );

const notYetButton =
    document.getElementById(
        "notYetButton"
    );

const backButton =
    document.getElementById(
        "backButton"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );


/* =====================================================
   INIT
===================================================== */

function init() {

    createScene();

    createCamera();

    createRenderer();

    createLights();

    createHeart();

    createStars();

    createParticles();

    createNebula();

    addEvents();

    animate();

    setTimeout(() => {

        loading.classList.add(
            "hide"
        );

    }, 1200);
}


/* =====================================================
   SCENE
===================================================== */

function createScene() {

    scene =
        new THREE.Scene();

    scene.background =
        new THREE.Color(
            0x030006
        );

    scene.fog =
        new THREE.FogExp2(
            0x09000f,
            0.018
        );
}


/* =====================================================
   CAMERA
===================================================== */

function createCamera() {

    camera =
        new THREE.PerspectiveCamera(
            60,
            window.innerWidth /
            window.innerHeight,
            0.1,
            2000
        );

    camera.position.set(
        0,
        0,
        11
    );
}


/* =====================================================
   RENDERER
===================================================== */

function createRenderer() {

    renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference:
                "high-performance"
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.outputEncoding =
        THREE.sRGBEncoding;

    container.appendChild(
        renderer.domElement
    );
}


/* =====================================================
   LIGHTS
===================================================== */

function createLights() {

    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            0.35
        );

    scene.add(
        ambient
    );


    const pink =
        new THREE.PointLight(
            0xff006f,
            8,
            45
        );

    pink.position.set(
        4,
        3,
        6
    );

    scene.add(
        pink
    );


    const purple =
        new THREE.PointLight(
            0x7a00ff,
            7,
            45
        );

    purple.position.set(
        -5,
        -3,
        4
    );

    scene.add(
        purple
    );


    const white =
        new THREE.PointLight(
            0xffb7df,
            3,
            30
        );

    white.position.set(
        0,
        6,
        -4
    );

    scene.add(
        white
    );
}


/* =====================================================
   HEART
===================================================== */

function createHeart() {

    const shape =
        new THREE.Shape();


    const x = 0;
    const y = 0;


    shape.moveTo(
        x,
        y + 1
    );


    shape.bezierCurveTo(
        x - 1.5,
        y + 3,
        x - 4,
        y + 2,
        x - 4,
        y
    );


    shape.bezierCurveTo(
        x - 4,
        y - 2.5,
        x - 1,
        y - 3.5,
        x,
        y - 5
    );


    shape.bezierCurveTo(
        x + 1,
        y - 3.5,
        x + 4,
        y - 2.5,
        x + 4,
        y
    );


    shape.bezierCurveTo(
        x + 4,
        y + 2,
        x + 1.5,
        y + 3,
        x,
        y + 1
    );


    const geometry =
        new THREE.ExtrudeGeometry(
            shape,
            {
                depth: 1.8,

                bevelEnabled: true,

                bevelSegments: 8,

                steps: 3,

                bevelSize: 0.35,

                bevelThickness: 0.4
            }
        );


    geometry.center();


    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                0xff176b,

            metalness:
                0.25,

            roughness:
                0.12,

            clearcoat:
                1,

            clearcoatRoughness:
                0.08,

            emissive:
                0x660020,

            emissiveIntensity:
                0.8
        });


heart =
    new THREE.Mesh(
        geometry,
        material
    );

heart.scale.set(
    0.65,
    0.65,
    0.65
);

scene.add(
    heart
);


    /* Glow */

    const glowMaterial =
        new THREE.MeshBasicMaterial({

            color:
                0xff0066,

            transparent:
                true,

            opacity:
                0.13,

            side:
                THREE.BackSide
        });


    heartGlow =
        new THREE.Mesh(
            geometry.clone(),
            glowMaterial
        );


    heartGlow.scale.set(
        1.15,
        1.15,
        1.15
    );


    heart.add(
        heartGlow
    );
}


/* =====================================================
   STARS
===================================================== */

function createStars() {

    const count =
        3500;


    const geometry =
        new THREE.BufferGeometry();


    const positions =
        new Float32Array(
            count * 3
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const radius =
            35 +
            Math.random() *
            100;


        const theta =
            Math.random() *
            Math.PI *
            2;


        const phi =
            Math.acos(
                2 *
                Math.random() -
                1
            );


        positions[
            i * 3
        ] =
            radius *
            Math.sin(phi) *
            Math.cos(theta);


        positions[
            i * 3 + 1
        ] =
            radius *
            Math.sin(phi) *
            Math.sin(theta);


        positions[
            i * 3 + 2
        ] =
            radius *
            Math.cos(phi);
    }


    geometry.setAttribute(
        "position",

        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            color:
                0xffffff,

            size:
                0.07,

            transparent:
                true,

            opacity:
                0.9,

            sizeAttenuation:
                true
        });


    stars =
        new THREE.Points(
            geometry,
            material
        );


    scene.add(
        stars
    );
}


/* =====================================================
   PARTICLES
===================================================== */

function createParticles() {

    const count =
        500;


    const geometry =
        new THREE.BufferGeometry();


    const positions =
        new Float32Array(
            count * 3
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        positions[
            i * 3
        ] =
            (Math.random() -
                0.5) *
            35;


        positions[
            i * 3 + 1
        ] =
            (Math.random() -
                0.5) *
            28;


        positions[
            i * 3 + 2
        ] =
            (Math.random() -
                0.5) *
            35;
    }


    geometry.setAttribute(
        "position",

        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            color:
                0xff6fae,

            size:
                0.055,

            transparent:
                true,

            opacity:
                0.7
        });


    particles =
        new THREE.Points(
            geometry,
            material
        );


    scene.add(
        particles
    );
}


/* =====================================================
   NEBULA
===================================================== */

function createNebula() {

    const geometry =
        new THREE.SphereGeometry(
            45,
            32,
            32
        );


    const material =
        new THREE.MeshBasicMaterial({

            color:
                0x22002d,

            transparent:
                true,

            opacity:
                0.08,

            side:
                THREE.BackSide
        });


    const nebula =
        new THREE.Mesh(
            geometry,
            material
        );


    scene.add(
        nebula
    );
}


/* =====================================================
   EVENTS
===================================================== */

function addEvents() {

    window.addEventListener(
        "resize",
        resize
    );


    window.addEventListener(
        "mousemove",
        mouseMove
    );


    window.addEventListener(
        "touchmove",
        touchMove,
        {
            passive: true
        }
    );


    startButton.addEventListener(
        "click",
        startExperience
    );


    heartButton.addEventListener(
        "click",
        showQuestion
    );


    yesButton.addEventListener(
        "click",
        sayYes
    );


    notYetButton.addEventListener(
        "click",
        sayNotYet
    );


    backButton.addEventListener(
        "click",
        goBack
    );
}


/* =====================================================
   START
===================================================== */

function startExperience() {

    intro.classList.add(
        "hide"
    );


    setTimeout(() => {

        message.classList.remove(
            "hidden"
        );

    }, 800);
}


/* =====================================================
   QUESTION
===================================================== */

function showQuestion() {

    message.classList.add(
        "hidden"
    );


    setTimeout(() => {

        question.classList.remove(
            "hidden"
        );

    }, 500);
}


/* =====================================================
   YES
===================================================== */

function sayYes() {

    question.classList.add(
        "hidden"
    );


    setTimeout(() => {

        finalMessage.classList.remove(
            "hidden"
        );


        heartExplosion();

    }, 500);
}


/* =====================================================
   NOT YET
===================================================== */

function sayNotYet() {

    question.classList.add(
        "hidden"
    );


    setTimeout(() => {

        sadMessage.classList.remove(
            "hidden"
        );

    }, 500);
}


/* =====================================================
   BACK
===================================================== */

function goBack() {

    sadMessage.classList.add(
        "hidden"
    );


    setTimeout(() => {

        question.classList.remove(
            "hidden"
        );

    }, 500);
}


/* =====================================================
   MOUSE
===================================================== */

function mouseMove(event) {

    mouseX =
        (event.clientX /
            window.innerWidth) *
        2 -
        1;


    mouseY =
        (event.clientY /
            window.innerHeight) *
        2 -
        1;
}


/* =====================================================
   TOUCH
===================================================== */

function touchMove(event) {

    if (
        !event.touches.length
    ) return;


    const touch =
        event.touches[0];


    mouseX =
        (touch.clientX /
            window.innerWidth) *
        2 -
        1;


    mouseY =
        (touch.clientY /
            window.innerHeight) *
        2 -
        1;
}


/* =====================================================
   RESIZE
===================================================== */

function resize() {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );
}


/* =====================================================
   HEART EXPLOSION
===================================================== */

function heartExplosion() {

    const count =
        180;


    const geometry =
        new THREE.BufferGeometry();


    const positions =
        new Float32Array(
            count * 3
        );


    const velocity =
        [];


    for (
        let i = 0;
        i < count;
        i++
    ) {

        positions[
            i * 3
        ] = 0;


        positions[
            i * 3 + 1
        ] = 0;


        positions[
            i * 3 + 2
        ] = 0;


        velocity.push({

            x:
                (Math.random() -
                    0.5) *
                0.25,

            y:
                (Math.random() -
                    0.5) *
                0.25,

            z:
                (Math.random() -
                    0.5) *
                0.25
        });
    }


    geometry.setAttribute(
        "position",

        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            color:
                0xff4d9d,

            size:
                0.12,

            transparent:
                true,

            opacity:
                1
        });


    const explosion =
        new THREE.Points(
            geometry,
            material
        );


    scene.add(
        explosion
    );


    let frame =
        0;


    function animateExplosion() {

        frame++;


        const position =
            geometry.attributes
                .position.array;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            position[
                i * 3
            ] +=
                velocity[i].x;


            position[
                i * 3 + 1
            ] +=
                velocity[i].y;


            position[
                i * 3 + 2
            ] +=
                velocity[i].z;
        }


        geometry.attributes
            .position
            .needsUpdate = true;


        material.opacity =
            1 -
            frame / 160;


        if (
            frame < 160
        ) {

            requestAnimationFrame(
                animateExplosion
            );

        } else {

            scene.remove(
                explosion
            );

            geometry.dispose();

            material.dispose();
        }
    }


    animateExplosion();
}


/* =====================================================
   ANIMATION
===================================================== */

function animate() {

    requestAnimationFrame(
        animate
    );


    const time =
        clock.getElapsedTime();


    /* Heart */

    if (heart) {

        heart.rotation.y +=
            0.004;


        heart.rotation.z =
            Math.sin(
                time * 0.8
            ) *
            0.08;


        const scale =
            0.65 +
            Math.sin(
                time * 2
            ) *
            0.035;


        heart.scale.set(
            scale,
            scale,
            scale
        );
    }


    /* Glow */

    if (heartGlow) {

        const glowScale =
            1.12 +
            Math.sin(
                time * 2
            ) *
            0.08;


        heartGlow.scale.set(
            glowScale,
            glowScale,
            glowScale
        );
    }


    /* Stars */

    if (stars) {

        stars.rotation.y =
            time *
            0.012;

        stars.rotation.x =
            Math.sin(
                time * 0.1
            ) *
            0.04;
    }


    /* Particles */

    if (particles) {

        particles.rotation.y =
            time *
            0.02;

        particles.rotation.x =
            time *
            0.008;
    }


    /* Camera */

    targetCameraX =
        mouseX *
        1.5;


    targetCameraY =
        -mouseY *
        1;


    camera.position.x +=
        (
            targetCameraX -
            camera.position.x
        ) *
        0.025;


    camera.position.y +=
        (
            targetCameraY -
            camera.position.y
        ) *
        0.025;


    camera.lookAt(
        0,
        0,
        0
    );


    renderer.render(
        scene,
        camera
    );
}


/* =====================================================
   START
===================================================== */

init();