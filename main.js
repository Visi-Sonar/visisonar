function loadGifs(folder,count){
	let imageList=[]
	for (let i=1;i<=count;i++){
		imageList.push(folder+i+'.gif')
	}
	return imageList
}

function  makeImageOctave(imageList,DOMId,width,height){
	var body = document.querySelector("body");
	var outputDOM = document.createElement("div");
	body.appendChild(outputDOM);
	outputDOM.id = DOMId
	output = {'current':undefined,'images':[]}
	imageList.forEach(img=>{
		var image = document.createElement("img");
		image.src = img;
		outputDOM.appendChild(image);
		output.images.push(image)
		image.style.display = 'none'
		image.style.width = width;
    	image.style.height = height;
    	image.style.objectFit = 'cover';

	})
	return output;
}

function changeImage(obj,number){
	console.log('changeImage',number)

	if (!obj.images) return;
	if (!obj.images[number]) return;

	if (obj.current!=number){
		if (obj.current!=undefined) obj.images[obj.current].style.display = 'none'
		obj.current = number
	}
	obj.images[number].style.display = 'inline'
}

let backgroundImages = loadGifs('./visi_sonor_gifs/whole_background_nature_night/',8)
let background = makeImageOctave(backgroundImages,'background','1000px','700px');

let dancingImages = loadGifs('./visi_sonor_gifs/individual_dancing/',8)
let dancing = makeImageOctave(backgroundImages,'background','100px','70px');

let energyBodyImages = loadGifs('./visi_sonor_gifs/energy_bodies/',5)
let energyBody = makeImageOctave(backgroundImages,'background','100px','70px');


console.log(background)
//changeImage(background,2)

let bassObj={'z':'A1','x':'B1','c':'C2','v':'D2','b':'E2','n':'F2','m':'G2',',':'A2'}
let bassNum={'z':0,'x':1,'c':2,'v':3,'b':4,'n':5,'m':6,',':7}
let midObj={'a':'A3','s':'B3','d':'C4','f':'D4','g':'E4','h':'F4','j':'G4','k':'A4'}
let midNum={'a':0,'s':1,'d':2,'f':3,'g':4,'h':5,'j':6,'k':7}
let highObj={'q':'445','w':'678','e':'C6','r':'D6','t':'E6','y':'F6','u':'G6','i':'A6'}
let highNum={'q':0,'w':1,'e':2,'r':3,'t':4,'y':5,'u':6,'i':7}

// TODO: allow for microtonal adjustments

var bassSynth = new Tone.AMSynth().toMaster()
var midSynth = new Tone.Synth().toMaster()
var highSynth = new Tone.FMSynth().toMaster()

document.addEventListener("keyup", function(e){
	var loop = new Tone.Loop(function(time){
		console.log(e.key)

		if (bassObj.hasOwnProperty(e.key)) {
			bassSynth.triggerAttackRelease(bassObj[e.key], '8n')
			changeImage(background,bassNum[e.key])
		}

		if (midObj.hasOwnProperty(e.key)) {
			midSynth.triggerAttackRelease(midObj[e.key], '8n')
			changeImage(dancing,midNum[e.key])
		}
		if (highObj.hasOwnProperty(e.key)) {
			highSynth.triggerAttackRelease(highObj[e.key], '8n')
			//changeImage(dancing,midNum[e.key])
		}
	}, 4);

	loop.start();
	Tone.Transport.start();

});


var camera, scene,renderer;
var controls
var geometry, material, mesh;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	// geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	// material = new THREE.MeshNormalMaterial();

	// mesh = new THREE.Mesh( geometry, material );
	// scene.add( mesh );

	renderer = new THREE.CSS3DRenderer();
	console.log('renderer',renderer)
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	let background = document.getElementById('background')
	let object = new THREE.CSS3DSprite( background);
	object.position.z = -300;
	scene.add( object );


	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 4;

}

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}