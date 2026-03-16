const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
5000
)

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)

document.getElementById("space").appendChild(renderer.domElement)

camera.position.z = 120

const controls = new THREE.OrbitControls(camera,renderer.domElement)
controls.enableDamping = true


// luz
const light = new THREE.PointLight(0xffffff,2,3000)
scene.add(light)

const ambient = new THREE.AmbientLight(0xffffff,0.2)
scene.add(ambient)

const loader = new THREE.TextureLoader()


// estrelas
const starsGeometry = new THREE.BufferGeometry()
const starVertices = []

for(let i=0;i<8000;i++){

starVertices.push(
(Math.random()-0.5)*4000,
(Math.random()-0.5)*4000,
(Math.random()-0.5)*4000
)

}

starsGeometry.setAttribute(
'position',
new THREE.Float32BufferAttribute(starVertices,3)
)

const starsMaterial = new THREE.PointsMaterial({color:0xffffff})

const stars = new THREE.Points(starsGeometry,starsMaterial)

scene.add(stars)


// sol
const sun = new THREE.Mesh(
new THREE.SphereGeometry(16,64,64),
new THREE.MeshBasicMaterial({
map:loader.load("https://threejsfundamentals.org/threejs/resources/images/sun.jpg")
})
)

scene.add(sun)


// função planeta
function planet(size,texture,distance){

const mesh = new THREE.Mesh(

new THREE.SphereGeometry(size,64,64),

new THREE.MeshStandardMaterial({
map:loader.load(texture)
})

)

mesh.position.x = distance

scene.add(mesh)

return mesh

}


// planetas
const mercury = planet(
2,
"https://threejsfundamentals.org/threejs/resources/images/mercury.jpg",
28
)

const venus = planet(
3,
"https://threejsfundamentals.org/threejs/resources/images/venus.jpg",
40
)

const earth = planet(
3.2,
"https://threejsfundamentals.org/threejs/resources/images/earth.jpg",
55
)

const mars = planet(
2.6,
"https://threejsfundamentals.org/threejs/resources/images/mars.jpg",
70
)

const jupiter = planet(
7,
"https://threejsfundamentals.org/threejs/resources/images/jupiter.jpg",
100
)

const saturn = planet(
6,
"https://threejsfundamentals.org/threejs/resources/images/saturn.jpg",
140
)


// anel saturno
const ringGeo = new THREE.RingGeometry(8,12,64)

const ringMat = new THREE.MeshBasicMaterial({
map:loader.load("https://threejsfundamentals.org/threejs/resources/images/saturnringcolor.jpg"),
side:THREE.DoubleSide
})

const ring = new THREE.Mesh(ringGeo,ringMat)

ring.rotation.x = Math.PI/2

saturn.add(ring)


// lua
const moon = new THREE.Mesh(
new THREE.SphereGeometry(1,32,32),
new THREE.MeshStandardMaterial({
map:loader.load("https://threejsfundamentals.org/threejs/resources/images/moon.jpg")
})
)

moon.position.x = 6

earth.add(moon)


// animação
function animate(){

requestAnimationFrame(animate)

mercury.rotation.y +=0.01
venus.rotation.y +=0.008
earth.rotation.y +=0.02
mars.rotation.y +=0.018
jupiter.rotation.y +=0.03
saturn.rotation.y +=0.025

moon.rotation.y +=0.03

controls.update()

renderer.render(scene,camera)

}

animate()


window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})
