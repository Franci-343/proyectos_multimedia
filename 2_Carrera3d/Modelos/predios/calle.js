// Modelo de calle con parámetros personalizables
export function crearCalle(config = {}) {
  const {
    ancho = 1,           // Ancho de la calle (por defecto 1 unidad)
    largo = 1,           // Largo de la calle (por defecto 1 unidad)
    altura = 0.2,        // Altura de la calle
    color = 0x505050,    // Color gris oscuro para asfalto
    offsetX = -40,         // Desplazamiento horizontal (+ derecha, - izquierda)
    offsetZ = 0,         // Desplazamiento en profundidad (+ atrás, - adelante)
    conLineas = true     // Si debe tener líneas de señalización
  } = config;

  // Base de la calle (asfalto) - usar geometría directamente sin grupo
  const geometriaCalle = new THREE.BoxGeometry(ancho, altura, largo);
  const materialCalle = new THREE.MeshStandardMaterial({ 
    color: color,
    roughness: 0.9,      // Superficie mate
    metalness: 0.1       // Poco reflectante
  });
  const calle = new THREE.Mesh(geometriaCalle, materialCalle);
  calle.position.set(offsetX, altura / 2, offsetZ);
  
  return calle;

}

// Crear una celda de calle simple (compatibilidad con terreno.js)
export function crearCeldaCalle(x, z, tamañoCelda = 1, alturaCelda = 0.2) {
  return crearCalle({
    ancho: tamañoCelda,
    largo: tamañoCelda,
    altura: alturaCelda,
    offsetX: x,
    offsetZ: z,
    conLineas: false  // Sin líneas para celdas individuales
  });
}
