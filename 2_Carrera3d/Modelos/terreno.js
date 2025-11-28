// Crear un terreno básico con Three.js usando una matriz
import { crearEdificio } from './edificio.js';

export function crearTerreno(scale = 4) {
  const grupoTerreno = new THREE.Group();

  // Matriz base actual 11x11 (1: verde, 2: calles)
  const mapaBase = [
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 4, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 4, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 4, 1, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1]
  ];

  // Expandir la matriz a scale veces en cada dimensión (por defecto scale=4 -> 44x44)
  const filasBase = mapaBase.length;
  const colsBase = mapaBase[0].length;
  const mapaTerreno = [];

  for (let i = 0; i < filasBase * scale; i++) {
    const fila = [];
    for (let j = 0; j < colsBase * scale; j++) {
      const valor = mapaBase[Math.floor(i / scale)][Math.floor(j / scale)];
      fila.push(valor);
    }
    mapaTerreno.push(fila);
  }

  // Crear el terreno basado en la matriz escalada
  const tamañoCelda = 1;
  const alturaCelda = 0.2;
  const geometriaCelda = new THREE.BoxGeometry(tamañoCelda, alturaCelda, tamañoCelda);
  const materialVerde = new THREE.MeshStandardMaterial({ color: 0x228B22 });
  const materialCalle = new THREE.MeshStandardMaterial({ color: 0x808080 });

  const filasN = mapaTerreno.length;
  const colsN = mapaTerreno[0].length;

  for (let i = 0; i < filasN; i++) {
    for (let j = 0; j < colsN; j++) {
      const valor = mapaTerreno[i][j];
      const x = j - colsN / 2 + 0.5;
      const z = i - filasN / 2 + 0.5;

      // Si el valor es 4, crear un edificio en esa celda
      if (valor === 4) {
        // añadir una celda de suelo bajo el edificio
        const suelo = new THREE.Mesh(geometriaCelda, materialVerde);
        suelo.position.set(x, alturaCelda / 2, z);
        grupoTerreno.add(suelo);

        // crear y posicionar el edificio
        try {
          const edificio = crearEdificio();
          edificio.position.set(x, 0, z);
          grupoTerreno.add(edificio);
        } catch (e) {
          // Si falla la creación del edificio, añadir un bloque como placeholder
          const placeholder = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0xaaaaaa }));
          placeholder.position.set(x, 0.5, z);
          grupoTerreno.add(placeholder);
        }
        continue;
      }

      const material = valor === 1 ? materialVerde : materialCalle;
      const celda = new THREE.Mesh(geometriaCelda, material);
      celda.position.set(x, alturaCelda / 2, z);
      grupoTerreno.add(celda);
    }
  }

  return grupoTerreno;
}
