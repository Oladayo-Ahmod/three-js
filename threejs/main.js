import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { color } from 'dat.gui'
const  gui = new dat.GUI()
const world  = {
    plane : {
        width : 10,
        height : 10,
        widthSegment : 10,
        heightSegment : 10
    }
}
function generatePlane(){
    planeMesh.geometry.dispose()
    planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width,world.plane.height,world.plane.widthSegment,world.plane.heightSegment)

    const {array} = planeMesh.geometry.attributes.position;
    for (let i = 0; i < array.length; i += 3) {
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];
        array[i +2] = z + Math.random()
        
    }
}

// raycaster
const raycaster = new THREE.Raycaster()
console.log(raycaster)
// width gui
gui.add(world.plane,'width',1,20).onChange((generatePlane))
// height gui
gui.add(world.plane,'height',1,20).onChange((generatePlane))
// widthsegment gui
gui.add(world.plane,'widthSegment',1,50).onChange((generatePlane))
// heightsegement gui
gui.add(world.plane,'heightSegment',1,50).onChange((generatePlane))
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000)
const renderer = new THREE.WebGLRenderer()
// to use the renderer
renderer.setSize(innerWidth,innerHeight) // set the size of the renderer
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)
new OrbitControls(camera,renderer.domElement)
// create a box geometry
// const Boxgeometry = new THREE.BoxGeometry(1,1,1) // box geometry
// const Boxmaterial = new THREE.MeshBasicMaterial({color:  0xffffff}) // box mesh material
// const BoxMesh = new THREE.Mesh(Boxgeometry,Boxmaterial) // box mesh
// scene.add(BoxMesh)
camera.position.z = 5
// create a plane geometry
const planeGeometry  = new THREE.PlaneGeometry(5,5,10,10)
const planeMaterial = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, flatShading : THREE.FlatShading,vertexColors : true }) // plane mesh material
const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial) // plane mesh
scene.add(planeMesh)
const {array} = planeMesh.geometry.attributes.position;
for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];
    array[i +2] = z + Math.random()
    
}
const colors = []
for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    colors.push(0,0,1)
    // console.log(element)
    
}
console.log(colors)
planeMesh.geometry.setAttribute('color',new THREE.BufferAttribute(new Float32Array(colors),3))
console.log(planeMesh.geometry.attributes)
// front light
const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(0,0,1)
scene.add(light)
// back light
const backlight = new THREE.DirectionalLight(0xffffff,1)
backlight.position.set(0,0,-1)
scene.add(backlight)
console.log(planeMesh)
// mouse
const mouse = {
    x : undefined,
    y : undefined
}
// create animate function
function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera) // render
    raycaster.setFromCamera(mouse,camera)
    const intersects  = raycaster.intersectObject(planeMesh)
    if (intersects.length > 0){
       console.log(intersects[0].object.geometry.attributes.color) 
       intersects[0].object.geometry.attributes.color.setX(intersects[0].face.a,0)
    //    intersects[0].object.geometry.attributes.color.setX(0,0)
       intersects[0].object.geometry.attributes.color.needsUpdate = true
      
    } 
    // BoxMesh.rotation.x += 0.01
    // BoxMesh.rotation.y += 0.01
    // planeMesh.rotation.x += 0.01
    // planeMesh.rotation.y += 0.01
}
animate()
addEventListener('mousemove',(event)=>{
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = -(event.clientY / innerHeight) * 2 +1

})
