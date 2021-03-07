/* global THREE */
let renderer, scene, camera
let controls
let magenta
let light1

setup()
draw()

function setup () {
  scene = new THREE.Scene()
  // scene.background = new THREE.Color(0xF7BDFF)

  const ar = window.innerWidth / window.innerHeight
  camera = new THREE.PerspectiveCamera(75, ar, 0.1, 1000)
  camera.position.z = 3
  scene.add(camera)

  // hemisphere light
  const light = new THREE.HemisphereLight(0x8F6BFF, 0x8F6BFF, 1)
  scene.add(light)

  const sphere = new THREE.SphereGeometry(0.5, 16, 8)
  const mat = new THREE.MeshBasicMaterial({ color: 0xff0040 })
  const lightSphere = new THREE.Mesh(sphere, mat)
  light1 = new THREE.PointLight(0xff0040, 1, 50)
  light1.add(lightSphere)
  scene.add(light1)
  light1.position.set(0, 10, 0)

  // ground
  const geometry = new THREE.PlaneGeometry(50, 50, 50, 50)
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: 0xFF67D3,
    wireframe: true
  })
  const plane = new THREE.Mesh(geometry, material)
  scene.add(plane)
  plane.rotation.x = Math.PI / 2

  // lotus flowers
  const loader = new THREE.GLTFLoader().setPath('models/')
  loader.load('lf-magenta.gltf', (gltf) => {
    // console.log(gltf)
    // const magenta = gltf.scene.children[0]
    magenta = gltf.scene
    scene.add(magenta)
    magenta.scale.set(20, 20, 20)
    magenta.position.x = 3
  })

  renderer = new THREE.WebGLRenderer({
    alpha: true
  })
  // renderer.autoClearColor = 0xF7BDFF
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.minDistance = 20
  controls.maxDistance = 50
  controls.update()
}

function draw () {
  window.requestAnimationFrame(draw)

  const time = Date.now() * 0.0005

  light1.position.x = Math.sin(time) * 5
  light1.position.x = Math.sin(time * 0.2) * 4
  light1.position.z = Math.cos(time * 0.3) * 10

  renderer.render(scene, camera)
}
