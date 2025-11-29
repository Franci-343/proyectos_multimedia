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
