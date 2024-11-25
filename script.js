const ctx = pintura.getContext("2d");
let puntaje = 0;
let nivel = 1;
let finJuego = false;

let objetos = [
    { x: 50, y: 0, width: 20, color: "#FF0000", velocidad: 1 },
    { x: 150, y: 0, width: 20, color: "#FF4500", velocidad: 1.5 },
    { x: 250, y: 0, width: 20, color: "#FF6347", velocidad: 2 },
];

const jugadorImg = new Image();
jugadorImg.src = "./JUEGO.png"; 


let x = 0,
    y = 0; 
const minRad = 15;
const rangeRad = 10;
let radioCreciente = true;
let p = 0;

// Detectar colisión
const colision = (objeto1, objeto2) => {
    const distancia = Math.sqrt(
        (objeto2.x - objeto1.x) ** 2 + (objeto2.y - objeto1.y) ** 2
    );
    return distancia <= objeto1.width / 2 + objeto2.width / 2;
};

// Actualizar nivel y velocidad
const actualizarNivel = () => {
    nivel = Math.floor(puntaje / 10) + 1;
    objetos.forEach((objeto) => {
        objeto.velocidad = 1 + nivel * 0.5; 
    });
    document.getElementById("nivel").innerText = `Nivel: ${nivel}`;
};

// Animación principal
function animate() {
    if (radioCreciente) {
        p += 0.01;
        if (p > 1) radioCreciente = false;
    } else {
        p -= 0.01;
        if (p < 0.1) radioCreciente = true;
    }

    ctx.clearRect(0, 0, pintura.width, pintura.height);

    // Dibuja enemigos
    objetos.forEach((objeto) => {
        ctx.beginPath();
        ctx.arc(objeto.x, objeto.y, objeto.width, 0, Math.PI * 2);
        ctx.fillStyle = objeto.color;
        ctx.fill();
        ctx.stroke();

        // Detectar colisión
        if (colision({ x: x, y: y, width: 20 }, objeto)) {
            finJuego = true;
            alert(`¡Game Over! Tu puntaje final es: ${puntaje}`);
        }

        // Mover enemigos
        objeto.y += objeto.velocidad;

        // Reiniciar si salen del canvas
        if (objeto.y > pintura.height) {
            objeto.y = 0;
            objeto.x = Math.random() * pintura.width;
            puntaje++;
            document.getElementById("puntaje").innerText = `Puntaje: ${puntaje}`;
            actualizarNivel();
        }
    });

    // Dibujar jugador
    ctx.drawImage(jugadorImg, x - 15, y - 15, 30, 30); 

    if (!finJuego) requestAnimationFrame(animate);
}

animate();

// Mover jugador con el mouse
pintura.addEventListener("mousemove", (info) => {
    x = info.offsetX;
    y = info.offsetY;
});
