/**
 * 
 *  Document     : scene.js
 *  Created on   : 09 Dec, 2015, 12:08:25 PM
 *  Author       : pkjana
 *  Organization : IIT Khatagpur
 *  
 */

var l1=200;
var l2=240;
var l3=100;
var l4=50;
var l5=150;
var th1=0;
var th2=0;
var th3=0;
var th4=0;
var th5=2*Math.PI/3;
var th12=0;
var th23=0;
var th35=0;
var th34=0;
var th41=0;
var z1=10;
var z2=10;
var z3=10;
var z4=0;
var z5=10;
var a1=0*Math.PI/2;
var a2=0*Math.PI/2;
var a3=1*Math.PI/2;
var a4=1*Math.PI/2;
var a5=0*Math.PI/2;
var slidertube=2*(l1+l2+l3+l4);
var couplercurvelength = 1800;
var couplercurve = new Array(couplercurvelength);

var SimulatorSetup = {
    scene: null,
    camera: null,
    container: null,
    stats: null,
    controls: null,
    renderer: null,
    CONTAINER_WIDTH: null,
    CONTAINER_HEIGHT: null,
    cube: null,
	dummylinkstart: null,
	glink0: null,
	glink1: null,
	glink2: null,
	glink3: null,
	glink4: null,
	glink5: null,
	dummylinkend: null,
  	Joint02: null,
 	Joint12: null,
	Joint23: null,
	Joint34: null,
	Joint41: null,
	Joint35: null,
    init: function () {

        // create main scene
        this.scene = new THREE.Scene();

        this.container = document.getElementById("canvas3d-view");

        this.CONTAINER_WIDTH = this.container.offsetWidth;
        this.CONTAINER_HEIGHT = this.container.offsetHeight;


//  renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
        this.renderer.setSize(this.CONTAINER_WIDTH, this.CONTAINER_HEIGHT);
        this.renderer.setClearColor(0x000000, 1); // Set the background color of the canvas to black
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapSoft = true;
        this.container.appendChild(this.renderer.domElement);

// camera
        var VIEW_ANGLE = 45, ASPECT = this.CONTAINER_WIDTH / this.CONTAINER_HEIGHT, NEAR = 1, FAR = 10000;
        this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        //this.camera.position.z = 500;
        this.camera.position.set(0, 0, 1000);
        //this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.camera.lookAt(this.scene.position);
//        this.scene.add(this.camera);


        // And some sort of controls to move around
        // We'll use one of THREE's provided control classes for simplicity
        this.controls = new THREE.TrackballControls(this.camera);

        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;

        this.controls.noZoom = false;
        this.controls.noPan = false;

        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;

        this.controls.keys = [65, 83, 68];
        this.controls.enabled = false;
        // this.controls.addEventListener('change', render);

        //        Stats preparing
//        this.stats = new Stats();
//        this.stats.domElement.style.position = 'absolute';
//        this.stats.domElement.style.top = '45px';
//        this.container.appendChild(this.stats.domElement);

//        Add axes, The X axis is red. The Y axis is green. The Z axis is blue.
        axes = buildAxes(1200);
        this.scene.add(axes);
		
		CreateGeometries();

        this.container.addEventListener('mouseover', onContainerMouseOver, false);
        this.container.addEventListener('mouseout', onContainerMouseOut, false);

//        document.addEventListener('mousemove', onContainerMouseMove, false);
//        document.addEventListener('mousedown', onContainerMouseDown, false);
//        document.addEventListener('keydown', onContainerKeyDown, false);
//        document.addEventListener('keyup', onContainerKeyUp, false);
//        document.addEventListener('touchstart', onDocumentTouchStart, false);
//        document.addEventListener('touchmove', onDocumentTouchMove, false);
    }
};


function onContainerMouseOver() {
    SimulatorSetup.controls.enabled = true;
}
function onContainerMouseOut() {
    SimulatorSetup.controls.enabled = false;
}

// Animate the scene
function animate() {
    requestAnimationFrame(animate);
    update();
    render();
}

// Update controls and stats
function update() {
//    SimulatorSetup.controls.update(SimulatorSetup.clock.getDelta());
    SimulatorSetup.controls.update();
}
// Render the scene
function render() {
    if (SimulatorSetup.renderer) {
        SimulatorSetup.renderer.render(SimulatorSetup.scene, SimulatorSetup.camera);
    }
}

// Initialize SimulatorSetup on page load
function initializeSimulatorSetup() {
    SimulatorSetup.init();
    //render();
    animate()
}

if (window.addEventListener) {
    window.addEventListener('load', initializeSimulatorSetup, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', initializeSimulatorSetup);
} else {
    window.onload = initializeSimulatorSetup;
}