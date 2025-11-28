// Modelo simple de comedor
export function crearComedor() {
  const grupo = new THREE.Group();

  // Base del edificio (un poco más baja que un edificio normal)
  const baseGeom = new THREE.BoxGeometry(5, 3, 4);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
  const base = new THREE.Mesh(baseGeom, baseMat);
  base.position.y = 1.5;
  grupo.add(base);

  // Puerta
  const puertaGeom = new THREE.BoxGeometry(0.8, 1.6, 0.1);
  const puertaMat = new THREE.MeshStandardMaterial({ color: 0x4B2E83 });
  const puerta = new THREE.Mesh(puertaGeom, puertaMat);
  puerta.position.set(0, 0.8, 2.05);
  grupo.add(puerta);

  // Mesas (tres mesas con sillas representadas por cajas pequeñas)
  const mesaGeom = new THREE.BoxGeometry(0.9, 0.05, 0.6);
  const sillaGeom = new THREE.BoxGeometry(0.2, 0.4, 0.2);
  const mesaMat = new THREE.MeshStandardMaterial({ color: 0x8B5A2B });
  const sillaMat = new THREE.MeshStandardMaterial({ color: 0x333333 });

  const posicionesMesas = [
    { x: -1.2, z: 0 },
    { x: 0, z: 0 },
    { x: 1.2, z: 0 }
  ];

  posicionesMesas.forEach(p => {
    const mesa = new THREE.Mesh(mesaGeom, mesaMat);
    mesa.position.set(p.x, 1.1, p.z);
    grupo.add(mesa);

    const s1 = new THREE.Mesh(sillaGeom, sillaMat);
    s1.position.set(p.x - 0.5, 0.8, p.z);
    grupo.add(s1);
    const s2 = new THREE.Mesh(sillaGeom, sillaMat);
    s2.position.set(p.x + 0.5, 0.8, p.z);
    grupo.add(s2);
  });

  return grupo;
}
// Crear un modelo básico de un edificio con Three.js
export function crearEdificio() {
  const grupoEdificio = new THREE.Group();

  // Crear la base del edificio (aumentamos el ancho)
  const width = 6;
  const height = 4;
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
