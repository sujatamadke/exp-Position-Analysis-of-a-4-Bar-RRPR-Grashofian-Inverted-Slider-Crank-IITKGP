/**
 * 
 *  Document     : controller.js
 *  Created on   : 29 Nov, 2015, 4:45:25 PM
 *  Author       : pkjana
 *  Organization : IIT Khatagpur
 *  
 */

function sliderChange12() {
    var sliderVal = document.getElementById("slider12").value;
    document.getElementById("rangeValue12").value = sliderVal;
    CrankRotator12(sliderVal);
}

function sliderChange23() {
    var sliderVal = document.getElementById("slider23").value;
    document.getElementById("rangeValue23").value = sliderVal;
    CrankRotator23(sliderVal);
}

function sliderChange41() {
    var sliderVal = document.getElementById("slider41").value;
    document.getElementById("rangeValue41").value = sliderVal;
    CrankRotator41(sliderVal);
}

function readInput() {
    l1 = parseFloat(document.getElementById("L1").value,10);
    l2 = parseFloat(document.getElementById("L2").value,10);
    l3 = parseFloat(document.getElementById("L3").value,10);
    l4 = parseFloat(document.getElementById("L4").value,10);
    l5 = parseFloat(document.getElementById("L5").value,10);
    th5 = parseFloat(document.getElementById("Theta5").value,10);
	th5 = th5*Math.PI/180;
	slidertube=l2+l3+l4;
	UpdateGeometries();
}