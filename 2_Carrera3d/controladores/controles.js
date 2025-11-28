// Controles de cámara personalizados para la escena 3D
export class ControlesCamara {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;
    
    // Velocidad de movimiento y rotación
    this.velocidadMovimiento = 0.2;
    this.velocidadRotacion = 0.005;
    
    // Estado de las teclas presionadas
    this.teclas = {
      arriba: false,
      abajo: false,
      izquierda: false,
      derecha: false
    };
    
    // Estado del mouse
    this.mousePresionado = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.rotacionX = 0;
    this.rotacionY = 0;
    
    // Inicializar eventos
    this.inicializarEventos();
  }
  
  inicializarEventos() {
    // Eventos de teclado
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
    document.addEventListener('keyup', (e) => this.onKeyUp(e));
    
    // Eventos de mouse
    this.domElement.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.domElement.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.domElement.addEventListener('mouseup', (e) => this.onMouseUp(e));
    this.domElement.addEventListener('mouseleave', (e) => this.onMouseUp(e));
    
    // Prevenir menú contextual en el canvas
    this.domElement.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  
  onKeyDown(event) {
    switch(event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        this.teclas.arriba = true;
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        this.teclas.abajo = true;
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        this.teclas.izquierda = true;
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        this.teclas.derecha = true;
        break;
    }
  }
  
  onKeyUp(event) {
    switch(event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        this.teclas.arriba = false;
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        this.teclas.abajo = false;
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        this.teclas.izquierda = false;
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        this.teclas.derecha = false;
        break;
    }
  }
  
  onMouseDown(event) {
    this.mousePresionado = true;
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
  
  onMouseMove(event) {
    if (!this.mousePresionado) return;
    
    const deltaX = event.clientX - this.mouseX;
    const deltaY = event.clientY - this.mouseY;
    
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    
    // Rotar la cámara según el movimiento del mouse
    this.rotacionY -= deltaX * this.velocidadRotacion;
    this.rotacionX -= deltaY * this.velocidadRotacion;
    
    // Limitar la rotación vertical
    this.rotacionX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotacionX));
  }
  
  onMouseUp(event) {
    this.mousePresionado = false;
  }
  
  update() {
    // Calcular la dirección de movimiento basada en la rotación de la cámara
    const direccionFrente = new THREE.Vector3(
      Math.sin(this.rotacionY),
      0,
      Math.cos(this.rotacionY)
    );
    
    const direccionDerecha = new THREE.Vector3(
      Math.cos(this.rotacionY),
      0,
      -Math.sin(this.rotacionY)
    );
    
    // Mover la cámara según las teclas presionadas
    if (this.teclas.arriba) {
      this.camera.position.x -= direccionFrente.x * this.velocidadMovimiento;
      this.camera.position.z -= direccionFrente.z * this.velocidadMovimiento;
    }
    if (this.teclas.abajo) {
      this.camera.position.x += direccionFrente.x * this.velocidadMovimiento;
      this.camera.position.z += direccionFrente.z * this.velocidadMovimiento;
    }
    if (this.teclas.izquierda) {
      this.camera.position.x -= direccionDerecha.x * this.velocidadMovimiento;
      this.camera.position.z -= direccionDerecha.z * this.velocidadMovimiento;
    }
    if (this.teclas.derecha) {
      this.camera.position.x += direccionDerecha.x * this.velocidadMovimiento;
      this.camera.position.z += direccionDerecha.z * this.velocidadMovimiento;
    }
    
    // Aplicar rotación a la cámara
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = this.rotacionY;
    this.camera.rotation.x = this.rotacionX;
  }
}
