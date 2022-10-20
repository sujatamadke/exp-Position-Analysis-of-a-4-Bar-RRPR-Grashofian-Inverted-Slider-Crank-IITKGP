// JavaScript Document

function CreateGeometries(){
	SimulatorSetup.dummylinkstart = new THREE.Object3D();//create an empty container
	SimulatorSetup.dummylinkend = new THREE.Object3D();//create an empty container

	SimulatorSetup.glink1 = new THREE.Object3D();//create an empty container
	SimulatorSetup.glink2 = new THREE.Object3D();//create an empty container
	SimulatorSetup.glink3 = new THREE.Object3D();//create an empty container
	SimulatorSetup.glink4 = new THREE.Object3D();//create an empty container
	SimulatorSetup.glink5 = new THREE.Object3D();//create an empty container

	slidertube=l1+l2+l3+l4;
	
	SimulatorSetup.scene.add(SimulatorSetup.dummylinkstart);
	
	SimulatorSetup.Joint01=new Joint(SimulatorSetup.dummylinkstart,SimulatorSetup.glink1,0, 0*Math.PI/2, 0, 0, 10,0);
	SimulatorSetup.Joint12=new Joint(SimulatorSetup.glink1,SimulatorSetup.glink2,l2, a2, z2, 0*Math.PI/2, 10,0);
	SimulatorSetup.Joint23=new Joint(SimulatorSetup.glink2,SimulatorSetup.glink3,l3, a3, z3, 0*Math.PI/2, 10, 0);
	SimulatorSetup.Joint25=new Joint(SimulatorSetup.glink2,SimulatorSetup.glink5,l5, a5, z5, 0*Math.PI/2, 10,0);
	SimulatorSetup.Joint34=new Joint(SimulatorSetup.glink3,SimulatorSetup.glink4,l4, a4, z4, 0*Math.PI/2, 10,slidertube);
	SimulatorSetup.Joint41=new Joint(SimulatorSetup.glink4,SimulatorSetup.dummylinkend,l1, a1, z1, 0*Math.PI/2, 10,0);
	
	SimulatorSetup.Joint01.CreateJoint();
	SimulatorSetup.Joint12.CreateJoint();
	SimulatorSetup.Joint23.CreateJoint();
	SimulatorSetup.Joint25.CreateJoint();
	SimulatorSetup.Joint34.CreateJoint();
	SimulatorSetup.Joint41.CreateJoint();
	
	update();
	render();
}

function RemoveGeometries(){
    SimulatorSetup.glink4.remove(SimulatorSetup.dummylinkend);
    SimulatorSetup.glink3.remove(SimulatorSetup.glink4);
    SimulatorSetup.glink2.remove(SimulatorSetup.glink5);
    SimulatorSetup.glink2.remove(SimulatorSetup.glink3);
    SimulatorSetup.glink1.remove(SimulatorSetup.glink2);
    SimulatorSetup.dummylinkstart.remove(SimulatorSetup.glink1);
	SimulatorSetup.scene.remove(SimulatorSetup.dummylinkstart);
	
	update();
	render();
}

function UpdateGeometries(){
	RemoveGeometries();
	CreateGeometries();
}

function Joint(ParentBody,ChildBody,x, a, z, t, thickness, sliderlength, pinlength, pinoffset)	{
		this.ParentBody=ParentBody;
		this.ChildBody=ChildBody;
		this.x=x;
		this.a=a;
		this.z=z;
		this.t=t;
		this.thickness=thickness;
		this.pinlength=pinlength;
		this.pinoffset=pinoffset;
		this.sliderlength=sliderlength;
		link:null;
		this.CreateJoint= function ()	{
			var DH = new THREE.Matrix4();
			var DHz = new THREE.Matrix4();
			var DHt = new THREE.Matrix4();
			var DHx = new THREE.Matrix4();
			var DHa = new THREE.Matrix4();
			
			var DHinv = new THREE.Matrix4();
			
			DHa.set(1, 0, 0, 0,		0, Math.cos(a), -Math.sin(a), 0,		0, Math.sin(a), Math.cos(a), 0,		0,0,0,1);
			DHx.set(1, 0, 0, x,		0, 1, 0, 0,		0, 0, 1, 0,		0,0,0,1);
			DHt.set(Math.cos(t), -Math.sin(t), 0, 0,		Math.sin(t), Math.cos(t), 0, 0,		0, 0, 1, 0,		0,0,0,1);
			DHz.set(1, 0, 0, 0,		0, 1, 0, 0,		0, 0, 1, z,		0,0,0,1);
			
			DH.identity();
			DH.multiply(DHt);
			DH.multiply(DHz);
			DH.multiply(DHx);
			DH.multiply(DHa);

			var xjoint = new THREE.Object3D();

			var xjcylinder = new THREE.Mesh( new THREE.CylinderGeometry( 2*thickness, 2*thickness, 2*thickness, 32 ), new THREE.MeshNormalMaterial( ) );			
			xjcylinder.overdraw = true;
			xjcylinder.rotation.x += Math.PI/2;
			xjcylinder.position.z = 0;
			
			xjoint.add(xjcylinder);
			
			var xpcylinder = new THREE.Mesh( new THREE.CylinderGeometry( 1*thickness, 1*thickness, pinlength, 32 ), new THREE.MeshNormalMaterial( ) );			
			xpcylinder.overdraw = true;
			xpcylinder.rotation.x += Math.PI/2;
			xpcylinder.position.z = (pinoffset+pinlength)/2;
			
			xjoint.add(xpcylinder);

//			xjoint.rotation.x=a;
			xjoint.applyMatrix(DHa);

			var xoff = new THREE.Object3D();

			var xocylinder = new THREE.Mesh( new THREE.CylinderGeometry( thickness, thickness, x, 32 ), new THREE.MeshNormalMaterial( ) );
			xocylinder.overdraw = true;
			xocylinder.rotation.z += Math.PI/2;
			xocylinder.position.x += -x/2;

			xoff.add(xocylinder);
//			xoff.position.x = x;
			xoff.applyMatrix(DHx);

			xoff.add(xjoint);

			var zbend = new THREE.Object3D();

			var zbsphere = new THREE.Mesh(new THREE.SphereGeometry(1*thickness, 50, 50, false), new THREE.MeshNormalMaterial());
			zbsphere.overdraw = true;

			zbend.add(zbsphere);

//			zbend.rotation.z = t;
			zbend.applyMatrix(DHt);

			zbend.add(xoff);

			var zoff = new THREE.Object3D();

			var zocylinder = new THREE.Mesh( new THREE.CylinderGeometry( thickness, thickness, (z+2*Math.abs(sliderlength)), 32 ), new THREE.MeshNormalMaterial( ) );
			zocylinder.overdraw = true;
			zocylinder.rotation.x += Math.PI/2;
			zocylinder.position.z += -(z+2*sliderlength)/2*0;
			
			zoff.add(zocylinder);
			
			zoff.position.z = z;
			zoff.applyMatrix(DHz);

			zoff.add(zbend);

			this.link = new THREE.Object3D();
			this.link.add(zoff);
	
			axes = buildAxes(100);
        	ChildBody.add(axes);
			
			this.ChildBody.applyMatrix(DH);	
			this.ParentBody.add(this.link);
			this.link.add(this.ChildBody);

		}
	
		this.MoveJoint = function(zdisp,theta)	{
			this.link.position.z=zdisp;	
			this.link.rotation.z=theta;	
		}
}


function CrankRotator12(sliderVal) {
	var a, b, c;
	var th12, th23, th34, th41, th21;

	var toggle=1;
	if (document.getElementById("toggle").checked==true ) {toggle=-1}

	th1=0.0;
	th2=sliderVal*Math.PI/180;
	d=l1*l1+l2*l2-(l4-l3)*(l4-l3)-2*l1*l2*Math.cos(th2);
	if (d>0) {
		s34=toggle*Math.sqrt(d);
		a=(l4-l3)*l2*Math.sin(th2)-s34*l2*Math.cos(th2)+s34*l1;
		b=(l4-l3)*l2*Math.cos(th2)+s34*l2*Math.sin(th2)-(l4-l3)*l1;
		th3=Math.atan2(a,b);
		th12=th2-th1;
		th23=th3-th12;
		th4=th3;
		th41=th1-th4;
		th34=Math.PI+th4-th3;
		th25=th5+th23;
		
		SimulatorSetup.Joint12.MoveJoint(0,th12*1);
		SimulatorSetup.Joint23.MoveJoint(0,th23*1);
		SimulatorSetup.Joint34.MoveJoint(s34,th34*1);
		SimulatorSetup.Joint25.MoveJoint(0,th25*1);
		SimulatorSetup.Joint41.MoveJoint(0,th41*1);
	
		var couplerPt = new THREE.Mesh(new THREE.SphereGeometry(3, 50, 50, false), new THREE.MeshNormalMaterial());
		var DHcouplerPt = new THREE.Matrix4();
		DHCouplerPt =	SimulatorSetup.glink5.matrixWorld;
		couplerPt.applyMatrix(DHCouplerPt);
		SimulatorSetup.scene.add(couplerPt);
			
	
		var c2d = document.getElementById("canvas-2d");
		var ctx = c2d.getContext("2d");
		ctx.fillText("-360", c2d.width/2 - 25, -2);
		ctx.fillText("+360", -c2d.width/2,  - 2);
		ctx.fillText("+360", 0,  -c2d.height/2 + 10);
		ctx.fillText("+360", 0,  c2d.height/2 - 0);
	
		if (document.getElementById("th12x").checked==true ) {
			if (document.getElementById("th12y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th12*180/Math.PI)*c2d.width/720), -Math.round((th12*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(255, 0, 0)";
				ctx.fill();
			}
			if (document.getElementById("s34y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th12*180/Math.PI)*c2d.width/720), -Math.round((s34*360/(l1+l2+l4-l3))*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(50, 150, 50)";
				ctx.fill();
			}
			if (document.getElementById("th41y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th12*180/Math.PI)*c2d.width/720), -Math.round((th41*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(0, 0, 255)";
				ctx.fill();
			}
		}
		if (document.getElementById("s34x").checked==true ) {
			if (document.getElementById("th12y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((s34*360/(l1+l2+l4-l3))*c2d.width/720), -Math.round((th12*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(127, 128, 0)";
				ctx.fill();
			}
			if (document.getElementById("s34y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((s34*360/(l1+l2+l4-l3))*c2d.width/720), -Math.round((s34*360/(l1+l2+l4-l3))*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(0, 127, 128)";
				ctx.fill();
			}
			if (document.getElementById("th41y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((s34*360/(l1+l2+l4-l3))*c2d.width/720), -Math.round((th41*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(128, 0, 127)";
				ctx.fill();
			}
		}
		if (document.getElementById("th41x").checked==true ) {
			ctx.fillText("-100", c2d.width/2 - 25, -2);
			ctx.fillText("+100", -c2d.width/2,  - 2);
			ctx.fillText("+100", 0,  -c2d.height/2 + 10);
			ctx.fillText("+100", 0,  c2d.height/2 - 0);
			if (document.getElementById("th12y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th41*180/Math.PI)*c2d.height/720), -Math.round((th12*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(127, 64, 64)";
				ctx.fill();
			}
			if (document.getElementById("s34y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th41*180/Math.PI)*c2d.height/720), -Math.round((s34*360/(l1+l2+l4-l3))*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(64, 127, 64)";
				ctx.fill();
			}
			if (document.getElementById("th41y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th41*180/Math.PI)*c2d.height/720), -Math.round((th41*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(64, 64, 127)";
				ctx.fill();
			}
		}
	}
	update();
    render();
}

function CrankRotator41(sliderVal) {
	var a, b, c;
	var th12, th23, th34, th41, th21;

	var toggle=1;
	if (document.getElementById("toggle").checked==true ) {toggle=-1}

	th1=0.0;
	th41=sliderVal*Math.PI/180;
	th4=th41;

	d=l2*l2-(l1*Math.cos(th4)+(l4-l3))*(l1*Math.cos(th4)+(l4-l3));
	if (d>0) {
		s34=l1*Math.sin(th4)+toggle*Math.sqrt(d);
		th2=Math.atan2(s34*Math.cos(th4)+(l4-l3)*Math.sin(th4), l1-s34*Math.sin(th4)+(l4-l3)*Math.cos(th4));
//		th3=th4-Math.PI/2;
		th3=th4;
		th12=th2-th1;
		th23=th3-th12;
		th41=th1-th4;
		th34=Math.PI+th4-th3;
		th25=th5+th23;
		
		SimulatorSetup.Joint12.MoveJoint(0,th12*1);
		SimulatorSetup.Joint23.MoveJoint(0,th23*1);
		SimulatorSetup.Joint34.MoveJoint(s34,th34*1);
		SimulatorSetup.Joint25.MoveJoint(0,th25*1);
		SimulatorSetup.Joint41.MoveJoint(0,th41*1);
	
		var couplerPt = new THREE.Mesh(new THREE.SphereGeometry(3, 50, 50, false), new THREE.MeshNormalMaterial());
		var DHcouplerPt = new THREE.Matrix4();
		DHCouplerPt =	SimulatorSetup.glink5.matrixWorld;
		couplerPt.applyMatrix(DHCouplerPt);
		SimulatorSetup.scene.add(couplerPt);
			
	
		var c2d = document.getElementById("canvas-2d");
		var ctx = c2d.getContext("2d");
		ctx.fillText("-360", c2d.width/2 - 25, -2);
		ctx.fillText("+360", -c2d.width/2,  - 2);
		ctx.fillText("+360", 0,  -c2d.height/2 + 10);
		ctx.fillText("+360", 0,  c2d.height/2 - 0);
	
		if (document.getElementById("th12x").checked==true ) {
			if (document.getElementById("th12y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th12*180/Math.PI)*c2d.width/720), -Math.round((th12*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(255, 0, 0)";
				ctx.fill();
			}
			if (document.getElementById("s34y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th12*180/Math.PI)*c2d.width/720), -Math.round((s34*360/(l1+l2+l4-l3))*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(50, 150, 50)";
				ctx.fill();
			}
			if (document.getElementById("th41y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th12*180/Math.PI)*c2d.width/720), -Math.round((th41*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(0, 0, 255)";
				ctx.fill();
			}
		}
		if (document.getElementById("s34x").checked==true ) {
			if (document.getElementById("th12y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((s34*360/(l1+l2+l4-l3))*c2d.width/720), -Math.round((th12*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(127, 128, 0)";
				ctx.fill();
			}
			if (document.getElementById("s34y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((s34*360/(l1+l2+l4-l3))*c2d.width/720), -Math.round((s34*360/(l1+l2+l4-l3))*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(0, 127, 128)";
				ctx.fill();
			}
			if (document.getElementById("th41y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((s34*360/(l1+l2+l4-l3))*c2d.width/720), -Math.round((th41*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(128, 0, 127)";
				ctx.fill();
			}
		}
		if (document.getElementById("th41x").checked==true ) {
			if (document.getElementById("th12y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th41*180/Math.PI)*c2d.height/720), -Math.round((th12*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(127, 64, 64)";
				ctx.fill();
			}
			if (document.getElementById("s34y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th41*180/Math.PI)*c2d.height/720), -Math.round((s34*360/(l1+l2+l4-l3))*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(64, 127, 64)";
				ctx.fill();
			}
			if (document.getElementById("th41y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th41*180/Math.PI)*c2d.height/720), -Math.round((th41*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(64, 64, 127)";
				ctx.fill();
			}
		}
	}
	update();
    render();
}

function CrankRotator23(sliderVal) {
	var a, b, c;
	var th12, th23, th34, th41, th21;

	var toggle=1;
	if (document.getElementById("toggle").checked==true ) {toggle=-1}

	th1=0.0;
	s34=sliderVal;
	a=2.0*l1*(l4-l3);
	b=-2.0*l1*s34;
	c=l1*l1-l2*l2+s34*s34+(l4-l3)*(l4-l3);
	d=a*a+b*b-c*c;
	if (d>0) {
		th4=2.0*Math.atan2(-b+toggle*Math.sqrt(d),c-a);
		th2=Math.atan2((l4-l3)*Math.sin(th4)+s34*Math.cos(th4), (l4-l3)*Math.cos(th4)-s34*Math.sin(th4)+l1);
//		th3=th4-Math.PI/2;
		th3=th4;
		th12=th2-th1;
		th23=th3-th12;
		th41=th1-th4;
		th34=Math.PI+th4-th3;
		th25=th5+th23;
		
		SimulatorSetup.Joint12.MoveJoint(0,th12*1);
		SimulatorSetup.Joint23.MoveJoint(0,th23*1);
		SimulatorSetup.Joint34.MoveJoint(s34,th34*1);
		SimulatorSetup.Joint25.MoveJoint(0,th25*1);
		SimulatorSetup.Joint41.MoveJoint(0,th41*1);
	
		var couplerPt = new THREE.Mesh(new THREE.SphereGeometry(3, 50, 50, false), new THREE.MeshNormalMaterial());
		var DHcouplerPt = new THREE.Matrix4();
		DHCouplerPt =	SimulatorSetup.glink5.matrixWorld;
		couplerPt.applyMatrix(DHCouplerPt);
		SimulatorSetup.scene.add(couplerPt);
			
	
		var c2d = document.getElementById("canvas-2d");
		var ctx = c2d.getContext("2d");
		ctx.fillText("-360", c2d.width/2 - 25, -2);
		ctx.fillText("+360", -c2d.width/2,  - 2);
		ctx.fillText("+360", 0,  -c2d.height/2 + 10);
		ctx.fillText("+360", 0,  c2d.height/2 - 0);
	
		if (document.getElementById("th12x").checked==true ) {
			if (document.getElementById("th12y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th12*180/Math.PI)*c2d.width/720), -Math.round((th12*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(255, 0, 0)";
				ctx.fill();
			}
			if (document.getElementById("s34y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th12*180/Math.PI)*c2d.width/720), -Math.round((s34*360/(l1+l2+l4-l3))*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(50, 150, 50)";
				ctx.fill();
			}
			if (document.getElementById("th41y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th12*180/Math.PI)*c2d.width/720), -Math.round((th41*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(0, 0, 255)";
				ctx.fill();
			}
		}
		if (document.getElementById("s34x").checked==true ) {
			if (document.getElementById("th12y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((s34*360/(l1+l2+l4-l3))*c2d.width/720), -Math.round((th12*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(127, 128, 0)";
				ctx.fill();
			}
			if (document.getElementById("s34y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((s34*360/(l1+l2+l4-l3))*c2d.width/720), -Math.round((s34*360/(l1+l2+l4-l3))*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(0, 127, 128)";
				ctx.fill();
			}
			if (document.getElementById("th41y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((s34*360/(l1+l2+l4-l3))*c2d.width/720), -Math.round((th41*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(128, 0, 127)";
				ctx.fill();
			}
		}
		if (document.getElementById("th41x").checked==true ) {
			if (document.getElementById("th12y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th41*180/Math.PI)*c2d.height/720), -Math.round((th12*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(127, 64, 64)";
				ctx.fill();
			}
			if (document.getElementById("s34y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th41*180/Math.PI)*c2d.height/720), -Math.round((s34*360/(l1+l2+l4-l3))*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(64, 127, 64)";
				ctx.fill();
			}
			if (document.getElementById("th41y").checked==true ) {		
				ctx.beginPath();
				ctx.arc(Math.round((th41*180/Math.PI)*c2d.height/720), -Math.round((th41*180/Math.PI)*c2d.height/720), 2, 0, 2 * Math.PI, false);
				ctx.fillStyle = "rgb(64, 64, 127)";
				ctx.fill();
			}
		}
	}
	update();
    render();
}