//
// Работа с 3D моделями
//

import * as THREE        from 'https://unpkg.com/three@0.123.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.123.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader }    from 'https://unpkg.com/three@0.123.0/examples/jsm/loaders/GLTFLoader.js';

var scene;
var camera;
var renderer;
var model;

window.addEventListener("load", function(){
	scene = new THREE.Scene();
	var renderSurface = document.getElementById("renderSurface"); //$('#renderSurface');
	camera = new THREE.PerspectiveCamera( 60, /*renderSurface.innerWidth/renderSurface.innerHeight*/ 1.2, 0.1, 200 );

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color( 0xD3D3D3 ), 1.0);
	renderSurface.appendChild( renderer.domElement );

	const light = new THREE.AmbientLight( 0xFFFFFF,2 );
	scene.add( light );

	// Условная поверхность земли
	//var geometry = new THREE.BoxGeometry( 50, 0.01, 50 );
	//var material = new THREE.MeshBasicMaterial( { color: 0x406040 } );
	//var cube = new THREE.Mesh( geometry, material );
//	cube.position.y = -0.1;
	//scene.add( cube );

	camera.position.z = 30;
	camera.position.y = 10;
	
	const controls = new OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render ); // use if there is no animation loop
	controls.minDistance = 1;
	controls.maxDistance = 50;
	controls.target.set( 0, 0, 0 );
	controls.update();	

	var animate = function () {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
	};

	animate();
});

function render() 
{
	renderer.render( scene, camera );
}

// Путь к хранилищу моделей. Может быть абсолютный (http://...) или относительно корня сайта
var modelsRootPath = "models/";

export function loadModel(modelName, onStatus)
{
	if (model != undefined) {
		scene.remove(model);
		model = null;
	}
	onStatus('Загрузка...');
	
	const loader = new GLTFLoader();

	loader.load( modelsRootPath + modelName /*'models/Sverdlova9/Sverdlova9.glb'*/, function ( gltf ) {
		// Adjust buffer size to current window size
		renderer.setSize( renderSurface.clientWidth, renderSurface.clientHeight );
		camera.aspect = renderSurface.clientWidth / renderSurface.clientHeight;
		camera.updateProjectionMatrix();
		
		model = gltf.scene;
		scene.add( model );
		// In model, up-axis is Z. We want Y
		model.rotation.x -= Math.PI / 2;
		onStatus('');

	}, function ( xhr ) {

		onStatus( Math.round( xhr.loaded / xhr.total * 100 ) + '% загружено' );

	}, function ( error ) {

		console.error( error );
		//onStatus( error );
		onStatus("Ошибка при загрузке модели");

	} );	
	
}

