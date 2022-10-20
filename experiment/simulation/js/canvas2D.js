/**
 * @author pkjana, IIT Kharagpur
 * @returns {undefined}
 * Copyright 2014, IIT Kharagpur
 * 
 */

var canvas2d = {
    container: null,
    containerWidth: null,
    containerHeight: null,
    couplerCanvas: null,
    ctx: null,
    init: function() { // Initialization

        this.container = document.getElementById("graph-view");
        this.containerWidth = this.container.clientWidth;
        this.containerHeight = this.container.clientHeight;

        this.couplerCanvas = document.createElement('canvas');
        this.couplerCanvas.id = ('canvas-2d');
        this.couplerCanvas.width = this.containerWidth;
        this.couplerCanvas.height = this.containerHeight;

        this.container.appendChild(this.couplerCanvas);

        this.ctx = this.couplerCanvas.getContext("2d");

        this.ctx.font = "10px Arial";
//        this.ctx.fillText("-360", 0 + 5, this.couplerCanvas.height / 2 - 5);
//        this.ctx.fillText("+360", this.couplerCanvas.width - 30, this.couplerCanvas.height / 2 - 5);
//        this.ctx.fillText("-360", this.couplerCanvas.width / 2 + 5, this.couplerCanvas.height - 5);
//        this.ctx.fillText("+360", this.couplerCanvas.width / 2 + 5, 0 + 10);

        var centerX = this.couplerCanvas.width / 2;
        var centerY = this.couplerCanvas.height / 2;
        this.ctx.translate(centerX, centerY);

        var radius = 10;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);

        //X axis
        this.ctx.moveTo(-this.couplerCanvas.width / 2, 0);
        this.ctx.lineTo(this.couplerCanvas.width / 2, 0);
        //Y axis
        this.ctx.moveTo(0, -this.couplerCanvas.width / 2);
        this.ctx.lineTo(0, this.couplerCanvas.width / 2);
        this.ctx.moveTo(-this.couplerCanvas.width / 2, this.couplerCanvas.width / 4);
        this.ctx.lineTo(this.couplerCanvas.width / 2, this.couplerCanvas.width / 4);
        this.ctx.moveTo(-this.couplerCanvas.width / 2, -this.couplerCanvas.width / 4);
        this.ctx.lineTo(this.couplerCanvas.width / 2, -this.couplerCanvas.width / 4);
        this.ctx.moveTo(this.couplerCanvas.width / 4, -this.couplerCanvas.width / 2);
        this.ctx.lineTo(this.couplerCanvas.width / 4, this.couplerCanvas.width / 2);
        this.ctx.moveTo(-this.couplerCanvas.width / 4, -this.couplerCanvas.width / 2);
        this.ctx.lineTo(-this.couplerCanvas.width / 4, this.couplerCanvas.width / 2);
        this.ctx.lineWidth = 0.5;

        // set line color
        this.ctx.strokeStyle = '#0000ff';
        this.ctx.stroke();
    }
};


// Initialize cylinderScene on page load
function initializeCanvas2D() {
    canvas2d.init();
}

if (window.addEventListener) {
    window.addEventListener('load', initializeCanvas2D, false);
	//window.addEventListener('resize', onWindow`, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', initializeCanvas2D);
} else {
    window.onload = initializeCanvas2D;
}

/*
 canvas2d.couplerCanvas.mouseover = function(mouseData) {   
 console.log("MOUSE OVER!");
 };
 
 canvas2d.couplerCanvas.mouseout = function(mouseData) {
 console.log("MOUSE OUT!");
 };
 
 canvas2d.couplerCanvas.mousedown = function(mouseData) {
 console.log("MOUSE DOWN!");
 };
 
 canvas2d.couplerCanvas.mouseup = function(mouseData) {
 console.log("MOUSE UP!");
 };
 
 canvas2d.couplerCanvas.click = function(mouseData) {
 console.log("CLICK!");
 };
 
 canvas2d.couplerCanvas.touchstart = function(touchData) {
 console.log("TOUCH START!");
 };
 
 canvas2d.couplerCanvas.touchend = function(touchData) {
 console.log("TOUCH END!");
 };
 
 canvas2d.couplerCanvas.tap = function(touchData) {
 console.log("TAP!");
 };
 */

