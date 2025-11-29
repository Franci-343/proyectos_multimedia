// Crear un terreno básico con Three.js usando una matriz
import { crearEdificio as crearEdificioGenerico } from './edificio.js';
import { crearEdificio as crearEdificioInformatica } from './edificioInformatica.js';
import { crearComedor } from './comedor.js';
import { crearArbol } from './arbol.js';
import { crearCeldaCalle } from './calle.js';

export function crearTerreno(scale = 4) {
  const grupoTerreno = new THREE.Group();

  // Matriz base actual 11x11 (1: verde, 2: calles,4: edificio informatica, 3: árbol,5 edificio)
  const mapaBase = [
    [1,1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1,1],
    [1,1, 1, 4, 4, 2, 5, 5, 2, 2, 2, 2,1],
    [1,1, 1, 4, 2, 2, 2, 2, 2, 1, 4, 4,1],
    [1,1, 1, 4, 2, 2, 3, 3, 2, 3, 1, 1,1],
    [1,1, 6, 2, 2, 2, 3, 3, 2, 2, 6, 6,1],
    [1,1, 6, 6, 1, 2, 2, 2, 2, 3, 6, 6,1],
    [1,1, 6, 6, 1, 5, 5, 5, 2, 1, 6, 6,1],
    [1,1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,1],
    [1,5, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5,1],
    [1,1, 1, 1, 1, 1, 1, 1, 2, 1, 3, 1,1]
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

  const filasN = mapaTerreno.length;
  const colsN = mapaTerreno[0].length;

  // Calcular el offset para centrar el terreno en el origen
  const offsetX = colsN / 2;
  const offsetZ = filasN / 2;

  // Rastrear qué bloques base ya generaron su árbol/edificio (evita duplicados por expansión)
  const objetosCreados = new Set();

  for (let i = 0; i < filasN; i++) {
    for (let j = 0; j < colsN; j++) {
      const valor = mapaTerreno[i][j];
      
      // Posición de la celda (índice de matriz → coordenada world)
      const x = j - offsetX + 0.5;
      const z = i - offsetZ + 0.5;

      // Calcular la celda base original (antes de escalar)
      const filaBase = Math.floor(i / scale);
      const colBase = Math.floor(j / scale);
      const claveBase = `${filaBase}-${colBase}`;

      // Si el valor es 4,5 o 6, crear un edificio/comedor en esa celda
      if (valor === 4 || valor === 5 || valor === 6) {
        // añadir una celda de suelo bajo el edificio
        const suelo = new THREE.Mesh(geometriaCelda, materialVerde);
        suelo.position.set(x, alturaCelda / 2, z);
        grupoTerreno.add(suelo);
        
        // Solo crear el edificio una vez por bloque base y por tipo
        const tipo = valor === 4 ? 'informatica' : (valor === 5 ? 'generico' : 'comedor');
        const keyEd = `edificio-${tipo}-${claveBase}`;
        if (!objetosCreados.has(keyEd)) {
          try {
            let crear;
            if (valor === 4) crear = crearEdificioInformatica;
            else if (valor === 5) crear = crearEdificioGenerico;
            else crear = crearComedor;
            const edificio = crear();
            
            // Posicionar en el centro del bloque escalado (usar misma fórmula que las celdas)
            const xCentro = (colBase * scale + scale / 2) - offsetX + 0.5;
            const zCentro = (filaBase * scale + scale / 2) - offsetZ + 0.5;
            edificio.position.set(xCentro, 0, zCentro);
            grupoTerreno.add(edificio);
            objetosCreados.add(keyEd);
          } catch (e) {
            const placeholder = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0xaaaaaa }));
            const xCentro = (colBase * scale + scale / 2) - offsetX + 0.5;
            const zCentro = (filaBase * scale + scale / 2) - offsetZ + 0.5;
            placeholder.position.set(xCentro, 0.5, zCentro);
            grupoTerreno.add(placeholder);
            objetosCreados.add(keyEd);
          }
        }
        continue;
      }

      // Si el valor es 3, crear un árbol en esa celda base
      if (valor === 3) {
        // añadir una celda de suelo bajo el árbol
        const suelo = new THREE.Mesh(geometriaCelda, materialVerde);
        suelo.position.set(x, alturaCelda / 2, z);
        grupoTerreno.add(suelo);

        // Solo crear el árbol una vez por bloque base
        if (!objetosCreados.has(`arbol-${claveBase}`)) {
          try {
            const arbol = crearArbol();
            
            // Posicionar en el centro del bloque escalado (usar misma fórmula que las celdas)
            const xCentro = (colBase * scale + scale / 2) - offsetX + 0.5;
            const zCentro = (filaBase * scale + scale / 2) - offsetZ + 0.5;
            arbol.position.set(xCentro, 0, zCentro);
            grupoTerreno.add(arbol);
            objetosCreados.add(`arbol-${claveBase}`);
          } catch (e) {
            const placeholder = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,1,8), new THREE.MeshStandardMaterial({ color: 0x8B4513 }));
            const xCentro = (colBase * scale + scale / 2) - offsetX + 0.5;
            const zCentro = (filaBase * scale + scale / 2) - offsetZ + 0.5;
            placeholder.position.set(xCentro, 0.5, zCentro);
            grupoTerreno.add(placeholder);
            objetosCreados.add(`arbol-${claveBase}`);
          }
        }
        continue;
      }

      // Usar el módulo de calle o crear césped
      if (valor === 2) {
        const calle = crearCeldaCalle(x, z, tamañoCelda, alturaCelda);
        grupoTerreno.add(calle);
      } else {
        // Césped (valor 1 o cualquier otro)
        const celda = new THREE.Mesh(geometriaCelda, materialVerde);
        celda.position.set(x, alturaCelda / 2, z);
        grupoTerreno.add(celda);
      }
    }
  }

  return grupoTerreno;
}
