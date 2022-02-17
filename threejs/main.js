import * as THREE from 'three'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000)
const renderer = new THREE.WebGLRenderer()
// to use the renderer
renderer.setSize(innerWidth,innerHeight) // set the size of the renderer
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)
// create a plane
const Boxgeometry = new THREE.BoxGeometry(1,1,1) // box geometry
const material = new THREE.MeshBasicMaterial({color:  0xffffff}) // mesh material
const mesh = new THREE.Mesh(Boxgeometry,material) // mesh
scene.add(mesh)
camera.position.z = 5
// create animate function
function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera) // render 
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
}
animate()