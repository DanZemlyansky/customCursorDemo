const cursor = document.querySelector("#cursor");
const trails = [];
const maxTrails = 10;
let positions = []; 

const createTrails = () => {
  for (let i = 0; i < maxTrails; i++) {
    const trail = document.createElement("div");
    trail.classList.add("trail");
    document.body.appendChild(trail);
    trails.push(trail);

    positions.push({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  }
};

const positionCursor = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
  
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  
    trails.forEach((trail, index) => {
      setTimeout(() => {
        trail.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        trail.style.opacity = 1 - index * 0.1; 
      }, index * 50);
    });
  };
  

createTrails();
window.addEventListener("mousemove", positionCursor);
