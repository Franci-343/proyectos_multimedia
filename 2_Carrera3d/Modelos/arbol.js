// Crear un modelo básico de un árbol con Three.js
export function crearArbol() {
  const grupoArbol = new THREE.Group();

  // Crear el tronco
  const geometriaTronco = new THREE.CylinderGeometry(0.15, 0.2, 1.5, 8);
  const materialTronco = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const tronco = new THREE.Mesh(geometriaTronco, materialTronco);
  tronco.position.y = 0.95;
  grupoArbol.add(tronco);

  // Crear la copa con múltiples conos
  const materialCopa = new THREE.MeshStandardMaterial({ color: 0x228B22 });
  
  const copa1 = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.5, 8), materialCopa);
  copa1.position.y = 2.2;
  grupoArbol.add(copa1);
  
  const copa2 = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.2, 8), materialCopa);
  copa2.position.y = 3;
  grupoArbol.add(copa2);
  
  const copa3 = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1, 8), materialCopa);
  copa3.position.y = 3.6;
  grupoArbol.add(copa3);

  return grupoArbol;
}