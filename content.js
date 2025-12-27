const lapsos = 90000;

// Detectar movimiento del mouse
let mouseInactive = true;
document.addEventListener("mousemove", (e) => {
  mouseInactive = false; // hay actividad
});

// Detectar cualquier tecla
document.addEventListener("keydown", (e) => {
  mouseInactive = false; // teclado también cuenta como actividad
  if (e.key === "p") {
    console.log("La tecla 'p' fue presionada");
    chrome.runtime.sendMessage({ action: 'toggleKeepAwake' }, (response) => {
      console.log('Keep awake toggled:', response.status);
    });
    window.open('https://www.youtube.com/shorts/qJRYhoyGtwM', '_blank');
  } else {
    console.log(`Tecla presionada: ${e.key}`);
  }
});

// “Bucle infinito” para pausar y reproducir el video y simular actividad
setInterval(() => {
  const video = document.querySelector('video'); // capturamos el video
  if (video) {
    if (video.paused) {
      console.log('esta pausado');
    } else {
    video.pause(); // pausar inmediatamente
    console.log("Video pausado automáticamente");

    setTimeout(() => {
      video.play(); // reproducir después de 10 ms
      console.log("Video reproducido automáticamente");
    }, 10); // 10 milisegundos
  }
  }
  // Simular actividad para YouTube
  document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, cancelable: true, clientX: 0, clientY: 0 }));
  console.log("Actividad simulada para YouTube");
}, lapsos); // intervalo definido por lapsos
