// Crear un modelo básico de un edificio con Three.js
export function crearEdificio() {
  const grupoEdificio = new THREE.Group();

  // Crear la base del edificio
  const geometriaBase = new THREE.BoxGeometry(2, 4, 2);
  const materialBase = new THREE.MeshStandardMaterial({ color: 0xD3D3D3 });
  const base = new THREE.Mesh(geometriaBase, materialBase);
  base.position.y = 2.2;
  grupoEdificio.add(base);

  // Crear el techo
  const geometriaTecho = new THREE.ConeGeometry(1.5, 1, 4);
  const materialTecho = new THREE.MeshStandardMaterial({ color: 0x8B0000 });
  const techo = new THREE.Mesh(geometriaTecho, materialTecho);
  techo.position.y = 4.7;
  techo.rotation.y = Math.PI / 4;
  grupoEdificio.add(techo);

  // Crear ventanas en las 4 caras
  const geometriaVentana = new THREE.BoxGeometry(0.3, 0.4, 0.05);
  const materialVentana = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
  
  // Ventanas frontales y traseras
  for (let i = -0.5; i <= 0.5; i += 1) {
    for (let j = 1; j <= 3.5; j += 1.2) {
      const ventanaFrente = new THREE.Mesh(geometriaVentana, materialVentana);
      ventanaFrente.position.set(i, j, 1.01);
      grupoEdificio.add(ventanaFrente);
      
      const ventanaAtras = new THREE.Mesh(geometriaVentana, materialVentana);
      ventanaAtras.position.set(i, j, -1.01);
      grupoEdificio.add(ventanaAtras);
    }
  }

  // Ventanas laterales
  const geometriaVentanaLateral = new THREE.BoxGeometry(0.05, 0.4, 0.3);
  for (let i = -0.5; i <= 0.5; i += 1) {
    for (let j = 1; j <= 3.5; j += 1.2) {
      const ventanaIzq = new THREE.Mesh(geometriaVentanaLateral, materialVentana);
      ventanaIzq.position.set(-1.01, j, i);
      grupoEdificio.add(ventanaIzq);
      
      const ventanaDer = new THREE.Mesh(geometriaVentanaLateral, materialVentana);
      ventanaDer.position.set(1.01, j, i);
      grupoEdificio.add(ventanaDer);
    }
  }

  return grupoEdificio;
}
