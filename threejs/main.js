import * as THREE from 'three'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000)
const renderer = new THREE.WebGLRenderer()
// to use the renderer
renderer.setSize(innerWidth,innerHeight) // set the size of the renderer
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)
// create a box geometry
const Boxgeometry = new THREE.BoxGeometry(1,1,1) // box geometry
const Boxmaterial = new THREE.MeshBasicMaterial({color:  0xffffff}) // box mesh material
const BoxMesh = new THREE.Mesh(Boxgeometry,Boxmaterial) // box mesh
scene.add(BoxMesh)
camera.position.z = 5
// create a plane geometry
const planeGeometry  = new THREE.PlaneGeometry(5,5,10,10)
const planeMaterial = new THREE.MeshBasicMaterial({color:  0x00ff00, side: THREE.DoubleSide}) // plane mesh material
const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial) // plane mesh
scene.add(planeMesh)
// create animate function
function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera) // render 
    BoxMesh.rotation.x += 0.01
    BoxMesh.rotation.y += 0.01
    planeMesh.rotation.x += 0.01
    planeMesh.rotation.y += 0.01
}
animate()