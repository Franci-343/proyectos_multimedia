// Crear un modelo básico de un edificio con Three.js
export function crearEdificio() {
  const grupoEdificio = new THREE.Group();

  // Crear la base del edificio (aumentamos el ancho)
  const width = 6;
  const height = 5;
  const depth = 4;
  const geometriaBase = new THREE.BoxGeometry(width, height, depth);
  const materialBase = new THREE.MeshStandardMaterial({ color: 0xFFA000 });
  const base = new THREE.Mesh(geometriaBase, materialBase);
  base.position.y = height / 2;
  grupoEdificio.add(base);

  // (Techo eliminado a pedido)

  // Crear ventanas en las 4 caras, ajustadas al nuevo ancho
  const materialVentana = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
  const ventanaFrontalGeom = new THREE.BoxGeometry(0.5, 0.7, 0.05);
  const ventanaLateralGeom = new THREE.BoxGeometry(0.05, 0.7, 0.5);

  const halfW = width / 2;
  const halfD = depth / 2;
  const spacing = 1.5;

  // columnas en el eje X para front/back
  const startX = -halfW + spacing / 2;
  for (let x = startX; x <= halfW - spacing / 2 + 0.001; x += spacing) {
    for (let y = 1; y <= height - 0.6; y += 1.2) {
      const vFront = new THREE.Mesh(ventanaFrontalGeom, materialVentana);
      vFront.position.set(x, y, halfD + 0.02);
      grupoEdificio.add(vFront);

      const vBack = new THREE.Mesh(ventanaFrontalGeom, materialVentana);
      vBack.position.set(x, y, -halfD - 0.02);
      grupoEdificio.add(vBack);
    }
  }

  // columnas en el eje Z para left/right
  const startZ = -halfD + spacing / 2;
  for (let z = startZ; z <= halfD - spacing / 2 + 0.001; z += spacing) {
    for (let y = 1; y <= height - 0.6; y += 1.2) {
      const vLeft = new THREE.Mesh(ventanaLateralGeom, materialVentana);
      vLeft.position.set(-halfW - 0.02, y, z);
      grupoEdificio.add(vLeft);

      const vRight = new THREE.Mesh(ventanaLateralGeom, materialVentana);
      vRight.position.set(halfW + 0.02, y, z);
      grupoEdificio.add(vRight);
    }
  }

  return grupoEdificio;
}
