import * as THREE from 'three'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000)
const renderer = new THREE.WebGLRenderer()
console.log(camera)
console.log(renderer)
// to use the renderer
document.body.appendChild(renderer.domElement)