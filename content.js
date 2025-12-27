let positionX = null;
let positionY = null;
const lapsos = 3000;
let mouseInactive = true;
let lastX = null;
let lastY = null;

// Detectar movimiento del mouse
document.addEventListener("mousemove", (e) => {
  positionX = e.clientX;
  positionY = e.clientY;  
  mouseInactive = false; // Hay actividad, marcar como activo
});

// “Bucle infinito” revisando la inactividad
// Cada cierto tiempo, simula un "mousemove" para YouTube
setInterval(() => {
  const evt = new MouseEvent('mousemove', {
    bubbles: true,
    cancelable: true,
    clientX: 0,
    clientY: 0
  });
  document.dispatchEvent(evt);
  console.log("Actividad simulada para YouTube");
}, 20000); // cada 20 segundos // revisa cada 100ms para estar “constante”

// Detectar cualquier tecla
document.addEventListener("keydown", (e) => {
  mouseInactive = false; // Teclado también cuenta como actividad
  if (e.key === "p") {
    console.log("La tecla 'p' fue presionada");
    chrome.runtime.sendMessage({ action: 'toggleKeepAwake' }, (response) => {
      console.log('Keep awake toggled:', response.status);
    });
  } else {
    console.log(`Tecla presionada: ${e.key}`);
  }
});
