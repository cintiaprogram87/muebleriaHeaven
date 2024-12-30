document.addEventListener('DOMContentLoaded', () => {
    // Variables
    let baseDeDatos = [
        { id: 6, nombre: 'Mueble de cocina', precio: 40000, imagen: "../img/cocina6.jpg" },
        { id: 35, nombre: 'Escritorio', precio: 10500, imagen: "../img/oficina1.jpg" },
        { id: 36, nombre: 'Escritorio melanina', precio: 18900, imagen: "../img/oficina3.jpg" },
        { id: 39, nombre: 'comoda 3 puertas', precio:10500, imagen: "../img/oficina5.jpg" },
        { id: 10, nombre: 'Cama 2 plazas', precio: 940000, imagen: "../img/dormitorio2.jpg" },
        { id: 12, nombre: 'Ropero', precio: 440000, imagen: "../img/dormitorio4.jpg" },
        { id: 21, nombre: 'Banner', precio: 14000, imagen: "../img/lavanderia1.jpg" },
        { id: 22, nombre: 'Dispenser 2 puertas', precio: 42000, imagen:"../img/lavanderia2.jpg" },
        { id: 15, nombre: 'Juego de mesa con sillas', precio: 140000, imagen: "../img/jardin1.jpg" },
        { id: 16, nombre: 'Mesa con sillas de jardin', precio: 200000, imagen: "../img/jardin2.jpg" },
        { id: 18, nombre: 'Mesa y sillones de jardin', precio: 148000, imagen: "../img/jardin4.jpg" },
        { id: 14, nombre: 'Comodas x 3', precio: 440000, imagen: "../img/dormitorio7.jpg" }
    ];

    let carrito = [];
    const moneda = '$';
    const DOMitems = document.querySelector('.grid-container');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const DOMbotonComprar = document.querySelector('#boton-pagar');

    // Funciones

    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            const miNodo = document.createElement('div');
            miNodo.classList.add("grid-item",'card');
    
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-between');
    
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid', 'mb-3');
            miNodoImagen.setAttribute('src', info.imagen); 
            miNodoImagen.style.width = '100%'; 
            miNodoImagen.style.height = '100%'; 
    
            const miNodoTitle = document.createElement('h6');
            miNodoTitle.classList.add('card-title', 'text-center');
            miNodoTitle.setAttribute("id", "mueble-descripcion")
            miNodoTitle.textContent = info.nombre;
    
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add("mueble-precio",'card-title');
            miNodoPrecio.setAttribute("id","mueble-precio")
            miNodoPrecio.textContent = `${moneda}${info.precio}`;
    
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', "btn-warning",'mt-auto');
            miNodoBoton.textContent = 'Comprar';
            miNodoBoton.setAttribute("id", "btnComprar")
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', agregarProductoAlCarrito);
    
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
    
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }
    

    function agregarProductoAlCarrito(evento) {
        carrito.push(parseInt(evento.target.getAttribute('marcador')));
        renderizarCarrito();
    }

    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => itemBaseDatos.id === item);
            const numeroUnidadesItem = carrito.reduce((total, itemId) => itemId === item ? total += 1 : total, 0);
    
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mx-2');
    
            miNodo.innerHTML = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${moneda}${miItem[0].precio}`;
    
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', "text-white","btn-danger");
            miBoton.setAttribute("id","botonX")
            miBoton.textContent = 'x';
            miBoton.style.fontSize = '90%';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
    
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        DOMtotal.textContent = calcularTotal();
    }  

    function borrarItemCarrito(evento) {
        const id = parseInt(evento.target.dataset.item);  
        carrito = carrito.filter((carritoId) => carritoId !== id);
        renderizarCarrito();
    }

    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => itemBaseDatos.id === parseInt(item));
            return total + miItem[0].precio;
        }, 0).toFixed(2);
        
        
    }

    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
    }

    function redirigirFormspree() {
        // Solicitar el email del usuario
        const email = prompt("Por favor, ingresa tu email para completar la compra:");
        
        // Validar que el usuario haya ingresado un email
        if (!email || !email.includes('@')) {
            alert("Por favor, ingresa un email válido.");
            return; // No continuar si el email no es válido
        } 
        
        const form = document.createElement('form');
        form.action = "https://formspree.io/f/mwpkebaz"; // Reemplaza esta dirección con tu código de Formspree
        form.method = 'POST';
    
        // Agregar productos al formulario
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach(item => {
            const miItem = baseDeDatos.find(producto => producto.id === item);
            const cantidad = carrito.filter(id => id === item).length; 
    
            const inputNombre = document.createElement('input');
            inputNombre.type = 'hidden';
            inputNombre.name = 'producto_nombre[]';
            inputNombre.value = miItem.nombre;
            form.appendChild(inputNombre);
    
            const inputPrecio = document.createElement('input');
            inputPrecio.type = 'hidden';
            inputPrecio.name = 'producto_precio[]';
            inputPrecio.value = miItem.precio;
            form.appendChild(inputPrecio);
    
            const inputCantidad = document.createElement('input');
            inputCantidad.type = 'hidden';
            inputCantidad.name = 'producto_cantidad[]';
            inputCantidad.value = cantidad;
            form.appendChild(inputCantidad);
        });
       
    
        // Agregar total al formulario
        const inputTotal = document.createElement('input');
        inputTotal.type = 'hidden';
        inputTotal.name = 'total';
        inputTotal.value = DOMtotal.textContent;
        form.appendChild(inputTotal);
    
        // Agregar el email al formulario
        const inputEmail = document.createElement('input');
        inputEmail.type = 'hidden';
        inputEmail.name = 'email';
        inputEmail.value = email;
        form.appendChild(inputEmail);
    
        document.body.appendChild(form);
        form.submit();
    }     

    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    DOMbotonComprar.addEventListener('click', redirigirFormspree);

    renderizarProductos();
    renderizarCarrito();
});











