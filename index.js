const planeTrail = document.querySelector('.plane-trail');
const planeImage = './Airplane-1.png'; 
let plane = null; 
let lastX = 0, lastY = 0; 
let lastRotation = 0; //store the last rotation value to smooth the transition

document.body.style.cursor = `url(${planeImage}), auto`;

document.addEventListener('mousemove', (event) => {
  const { clientX: x, clientY: y } = event;

  if (!plane) {
    plane = document.createElement('img');
    plane.src = planeImage;
    plane.style.position = 'absolute';
    plane.style.width = '100px';  
    plane.style.height = '100px';
    plane.style.transition = 'transform 0.1s'; 
    planeTrail.appendChild(plane);
  }

  const deltaX = x - lastX;
  const deltaY = y - lastY;

  plane.style.left = `${x - 50}px`; 
  plane.style.top = `${y - 50}px`;

  let rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

  if (Math.abs(rotation - lastRotation) > 180) {
    if (rotation > lastRotation) {
      lastRotation += 360;
    } else {
      rotation += 360;
    }
  }

  const rotationDifference = rotation - lastRotation;
  const smoothRotation = lastRotation + rotationDifference * 0.1; 

  plane.style.transform = `rotate(${smoothRotation}deg)`;

  lastRotation = smoothRotation;

  createSmoke(x, y, deltaX, deltaY);

  lastX = x;
  lastY = y;
});

function createSmoke(x, y, deltaX, deltaY) {
  const smoke = document.createElement('div');
  smoke.classList.add('smoke');

  const smokeOffsetX = x - 50 - (deltaX > 0 ? 70 : -70) + Math.random() * 40; 
  const smokeOffsetY = y + Math.random() * 20 - 10;  

  smoke.style.left = `${smokeOffsetX}px`;
  smoke.style.top = `${smokeOffsetY}px`;
  smoke.style.opacity = Math.random() * 0.3 + 0.3; 

  smoke.style.zIndex = -1;

  planeTrail.appendChild(smoke);

  setTimeout(() => {
    smoke.remove();
  }, 1000);
}
