let renderer, scene, camera
let controls

setup()
draw()

function setup(){
  scene = new THREE.Scene()
  //scene.background = new THREE.Color(0xF7BDFF)

  const ar = innerWidth / innerHeight
  camera = new THREE.PerspectiveCamera(75, ar, 0.1, 1000)
  camera.position.z = 3
  scene.add(camera)

//hemisphere light
  const light = new THREE.HemisphereLight(0x8F6BFF, 0x8F6BFF, 5)
  scene.add(light)

//ground
  const geometry = new THREE.PlaneGeometry(50, 50, 50, 50)
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: 0xFF67D3,
    wireframe: true,
  })
  const plane = new THREE.Mesh(geometry, material)
  scene.add(plane)
  plane.rotation.x = Math.PI / 2

//lotus flowers
  const loader = new THREE.GLTFLoader().setPath('models/')
  loader.load('lf-magenta.gltf', (gltf) => {
    console.log(gltf)
    const magenta = gltf.scene.children[0]
    scene.add(magenta)
    magenta.position.x = 3
  })

  renderer = new THREE.WebGLRenderer({
    alpha: true,
  })
  //renderer.autoClearColor = 0xF7BDFF
  renderer.setSize(innerWidth, innerHeight)
  document.body.appendChild(renderer.domElement)

  controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.minDistance = 20;
  controls.maxDistance = 50;
  controls.update()

}

function draw(){
  requestAnimationFrame(draw)
  renderer.render(scene, camera)
}
