import * as THREE from 'three'
import * as dat from 'dat.gui'
import gsap from 'gsap'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { color } from 'dat.gui'
const  gui = new dat.GUI()
const world  = {
    plane : {
        width : 19,
        height : 19,
        widthSegment : 17,
        heightSegment : 17
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
        // color of the material
        const colors = []
        for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
            colors.push(0,0.19,0.4) // RGB color
            // console.log(element)
        }
            
        planeMesh.geometry.setAttribute('color',new THREE.BufferAttribute(new Float32Array(colors),3))

}

// raycaster
const raycaster = new THREE.Raycaster()
// width gui
gui.add(world.plane,'width',1,30).onChange((generatePlane))
// height gui
gui.add(world.plane,'height',1,30).onChange((generatePlane))
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
const planeGeometry  = new THREE.PlaneGeometry(24,24,25,25)
const planeMaterial = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, flatShading : THREE.FlatShading,vertexColors : true }) // plane mesh material
const planeMesh = new THREE.Mesh(planeGeometry,planeMaterial) // plane mesh
scene.add(planeMesh)
// vertice position randomization
const randomValue = []
const {array} = planeMesh.geometry.attributes.position;
for (let i = 0; i < array.length; i++) {
    // check if there is no remainder for division 3
    if(i % 3 === 0){
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];
        // array[i +2] = z + Math.random()
        array[i] = x + (Math.random() - 0.5)
        array[i + 1] = y + (Math.random() - 0.5)
        array[i + 2] = z + Math.random()
    }
    randomValue.push(Math.random())
    
}
planeMesh.geometry.attributes.position.randomValue = randomValue // push random value to the position array
console.log(planeMesh.geometry.attributes.position)
planeMesh.geometry.attributes.position.originalPositions = planeMesh.geometry.attributes.position.array
// console.log(planeMesh.geometry.attributes.position)
// color of the material
const colors = []
for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    colors.push(0,0.19,0.4) // RGB color
    // console.log(element)
   
    
}


planeMesh.geometry.setAttribute('color',new THREE.BufferAttribute(new Float32Array(colors),3))
// front light
const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(0,0,1)
scene.add(light)
// back light
const backlight = new THREE.DirectionalLight(0xffffff,1)
backlight.position.set(0,0,-1)
scene.add(backlight)
// mouse
const mouse = {
    x : undefined,
    y : undefined
}
// create animate function
let frame = 0
function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera) // render
    raycaster.setFromCamera(mouse,camera)
    // console.log(planeMesh.geometry.attributes.position.array)
    frame += 0.01;
    const {array , originalPositions, randomValue} = planeMesh.geometry.attributes.position
    // console.log(originalAttribute)
    for (let i = 0; i < array.length; i += 3 ) {
        // x axis
         array[i] = originalPositions[i] + Math.cos(frame + randomValue[i]) * 0.003
        // y axis
          array[i +1] = originalPositions[i + 1] + Math.sin(frame + randomValue[i]) * 0.003
        //  console.log(originalPositions[i])
        
    }
    planeMesh.geometry.attributes.position.needsUpdate = true
    const intersects  = raycaster.intersectObject(planeMesh)
    if (intersects.length > 0){
       const {color} = intersects[0].object.geometry.attributes
        //    vertice  1
       color.setX(intersects[0].face.a,0.1)
       color.setY(intersects[0].face.a,0.5)
       color.setZ(intersects[0].face.a,1)
        //    vertice 2
       color.setX(intersects[0].face.b,0.1)
       color.setY(intersects[0].face.b,0.5)
       color.setZ(intersects[0].face.b,1)
        //    vertice 3
       color.setX(intersects[0].face.c,0.1)
       color.setY(intersects[0].face.c,0.5)
       color.setZ(intersects[0].face.c,1)
    //    intersects[0].object.geometry.attributes.color.setX(0,0)
       intersects[0].object.geometry.attributes.color.needsUpdate = true
        
    //    implementing gsap for the hover effect
        // initial color of the plane
        const initialColor = {
            r:0,
            g:0.19,
            b : 0.4
        }
        // hover color of the plane
        const hoverColor = {
            r:0.1,
            g:0.5,
            b:1,
        }
        // transit the hovercolor to the initial color
        gsap.to(hoverColor,{
          r: initialColor.r,
          g: initialColor.g,
          b: initialColor.b,
          onUpdate : ()=>{
               //    vertice  1
            color.setX(intersects[0].face.a,hoverColor.r)
            color.setY(intersects[0].face.a,hoverColor.g)
            color.setZ(intersects[0].face.a,hoverColor.b)
                //    vertice 2
            color.setX(intersects[0].face.b,hoverColor.r)
            color.setY(intersects[0].face.b,hoverColor.g)
            color.setZ(intersects[0].face.b,hoverColor.b)
                //    vertice 3
            color.setX(intersects[0].face.c,hoverColor.r)
            color.setY(intersects[0].face.c,hoverColor.g)
            color.setZ(intersects[0].face.c,hoverColor.b)
          }
        })
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
