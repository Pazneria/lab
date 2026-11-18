import { clamp } from './geometry.js'
import { START, move, zoneFor } from './navigation.js'
import { makeRenderer } from './render.js'
import { makeWorld } from './world.js'

const canvas = document.querySelector('#view')
const enter = document.querySelector('#enter')
const heading = document.querySelector('#heading')
const note = document.querySelector('.input-note')
const zone = document.querySelector('#zone')
const errorBox = document.querySelector('#error')
const keys = new Set()
const walkingKeys = ['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','KeyQ','KeyE']
const noMotion = matchMedia('(prefers-reduced-motion: reduce)')
let renderer, world
let frame = 0
let lastFrame
let mode = 'paused'
let pendingLock = false
let started = false
let drag = null
let x, z, yaw, pitch, steps, pace
let shownZone = ''

function reset() {
  x = START[0]
  z = START[1]
  yaw = -.178
  pitch = .011
  steps = 0
  pace = 0
  requestDraw()
}

function requestDraw() {
  if (!frame && renderer) frame = requestAnimationFrame(tick)
}

function setMode(next) {
  mode = next
  document.body.classList.toggle('active',next!=='paused')
  lastFrame = undefined
  if (next === 'paused') {
    keys.clear()
    drag = null
    if (started) {
      heading.textContent = 'Walk paused'
      enter.firstChild.textContent = 'Resume walk '
      note.textContent = 'WASD to walk · Mouse to look · R to return to the entrance'
    }
  } else {
    started = true
    if (next === 'drag') {
      note.textContent = 'WASD to walk · Drag the scene to look · Esc to pause'
    }
  }
  requestDraw()
}

function inform(message) {
  errorBox.textContent = message
  errorBox.hidden = !message
}

function useDrag() {
  if (!pendingLock) return
  pendingLock = false
  inform('Pointer lock is unavailable. Drag the scene to look around.')
  setMode('drag')
}

async function begin() {
  if (!renderer || mode!=='paused' || pendingLock) return
  pendingLock = true
  inform('')
  if (typeof canvas.requestPointerLock !== 'function') {
    useDrag()
    return
  }
  try {
    await canvas.requestPointerLock()
  } catch {
    useDrag()
  }
}

function mouseLook(dx,dy) {
  yaw = (yaw + clamp(dx,-480,480)*.00235) % (Math.PI*2)
  pitch = clamp(pitch-clamp(dy,-480,480)*.00235,-1.35,1.35)
  requestDraw()
}

function tick(now) {
  frame = 0
  if (!renderer) return
  const delta = lastFrame === undefined ? 0 : clamp((now-lastFrame)/1000,0,.05)
  lastFrame = now
  if (mode !== 'paused') {
    const active = (...options) => Number(options.some((k)=>keys.has(k)))
    const forward = active('KeyW','ArrowUp')-active('KeyS','ArrowDown')
    const side = active('KeyD','ArrowRight')-active('KeyA','ArrowLeft')
    const turn = active('KeyE')-active('KeyQ')
    yaw += turn*1.42*delta
    const magnitude = Math.hypot(forward,side)
    const speed = (keys.has('ShiftLeft')||keys.has('ShiftRight')) ? 4.05 : 2.76
    let travel = 0
    if (magnitude) {
      const scale = speed*delta/magnitude
      const vx = (Math.sin(yaw)*forward+Math.cos(yaw)*side)*scale
      const vz = (-Math.cos(yaw)*forward+Math.sin(yaw)*side)*scale
      const [nextX,nextZ] = move(x,z,vx,vz)
      travel = Math.hypot(nextX-x,nextZ-z)
      x = nextX
      z = nextZ
    }
    steps += travel*3.88
    pace += ((travel>0 ? 1 : 0)-pace)*Math.min(1,delta*14)
  }
  const eye = [x,1.65+(noMotion.matches ? 0 : Math.sin(steps*2)*.014*pace),z]
  const area = zoneFor(z)
  if (shownZone !== area) {
    shownZone = area
    zone.textContent = area
  }
  renderer.draw(eye,yaw,pitch,noMotion.matches ? 0 : now/1000)
  if (mode !== 'paused') requestDraw()
}

enter.addEventListener('click',begin)
document.addEventListener('pointerlockchange',()=>{
  pendingLock = false
  if (document.pointerLockElement === canvas) {
    inform('')
    setMode('locked')
  } else if (mode === 'locked') {
    setMode('paused')
  }
})
document.addEventListener('pointerlockerror',useDrag)
document.addEventListener('mousemove',(event)=>{
  if (mode==='locked') mouseLook(event.movementX,event.movementY)
})
canvas.addEventListener('pointerdown',(event)=>{
  if (mode!=='drag') return
  drag = {id:event.pointerId,x:event.clientX,y:event.clientY}
  canvas.setPointerCapture(event.pointerId)
})
canvas.addEventListener('pointermove',(event)=>{
  if (!drag || drag.id!==event.pointerId) return
  mouseLook(event.clientX-drag.x,event.clientY-drag.y)
  drag.x=event.clientX
  drag.y=event.clientY
})
for (const type of ['pointerup','pointercancel','lostpointercapture']) {
  canvas.addEventListener(type,(event)=>{
    if (drag?.id === event.pointerId) drag=null
  })
}
window.addEventListener('keydown',(event)=>{
  if (event.altKey || event.ctrlKey || event.metaKey) return
  if (event.code === 'KeyR') {
    reset()
    event.preventDefault()
  }
  if (event.code === 'Escape' && mode === 'drag') {
    setMode('paused')
    inform('')
  }
  if (mode === 'paused') return
  keys.add(event.code)
  if (walkingKeys.includes(event.code)) event.preventDefault()
})
window.addEventListener('keyup',(event)=>keys.delete(event.code))
window.addEventListener('blur',()=>keys.clear())
document.addEventListener('visibilitychange',()=>{
  lastFrame=undefined
  if (document.hidden) keys.clear()
  else requestDraw()
})
window.addEventListener('resize',requestDraw)
canvas.addEventListener('webglcontextlost',(event)=>{
  event.preventDefault()
  renderer=undefined
  if (document.pointerLockElement===canvas) document.exitPointerLock()
  setMode('paused')
  enter.disabled=true
  inform('The graphics context was lost. Waiting for the browser to restore it.')
})
canvas.addEventListener('webglcontextrestored',initialize)

function initialize() {
  try {
    world ??= makeWorld()
    renderer=makeRenderer(canvas,world)
    enter.disabled=false
    inform('')
    requestDraw()
  } catch(error) {
    enter.disabled=true
    inform(error.message)
    console.error(error)
  }
}

reset()
initialize()
