const books =  [ 
        {
            id: 1,
            autor: "Gabriel Garcia Marquez",
            name: "En Agosto nos vemos",
            imagen:"assets/1.jpg",
            price: 20000
        
        },
        {
            id: 2,
            autor: "María Lobo",
            name: "Ciudad, 1951",
            imagen:"assets/2.jpg",
            price: 24000
           
        },
        {
            id: 3,
            autor: "Gabriel Rolón",
            name: "El duelo",
            imagen:"assets/3.jpg",
            price: 17000
           
        },
        {
            id: 4,
            autor: "Mariano Rojas Estapen",
            name: "Como hacer que te pasen cosas buenas",
            imagen:"assets/4.jpg",
            price: 30000
           
        },
        {
            id: 5,
            autor: "Florencia Bonelli",
            name: "La casa Neville: No quieras nada vil",
            imagen:"assets/5.jpg",
            price: 31000
           
        },
        {
            id: 6,
            autor: "John Grisham",
            name: "El intercambio",
            imagen:"assets/6.jpg",
            price: 26999
           
        },
];

let carrito = [];
const peso = '$';
const listaLibros = document.querySelector('#libros');
const carritoEL = document.querySelector('#carrito');
const total = document.querySelector('#total');
const botonVaciarCarrito = document.querySelector('#vaciarCarrito');
const botonComprar = document.querySelector('#comprar');


// Mensaje de bienvenida con el nombre ingresado por el usuario
// let userName = prompt("Introduce tu nombre, por favor");
// let userEmail = prompt("Introduce tu email, por favor");
// const userObj = {
//     username: userName,
//     email: userEmail
// }
// localStorage.setItem("user", JSON.stringify(userObj));
// alert("¡Hola " + userName + ", encantado de verte!");


// Función que arma todos los productos del array de books en el HTML
renderBooks = () => {
    books.forEach((info) => {
        
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');


        // Título
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.name;
        
        // Autor
        const miNodoAutor = document.createElement('h6');
        miNodoAutor.classList.add('card-text');
        miNodoAutor.textContent = info.autor;

        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);

        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${peso} ${info.price}`;

        // Boton para agregar al carrito
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = 'Añadir al carrito';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', addToCart);


        // Agregamos los nodos para que se "dibujen" en el HTML
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoAutor);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        listaLibros.appendChild(miNodo);
    });
}

//Función que añade el libro al carrito
addToCart = (evento) => {
    carrito.push(evento.target.getAttribute('marcador'));
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderCart();
}

// Función que muestra todos los elementos cargados al carrito visualemente
renderCart = () => {
    carritoEL.textContent = '';
    

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
        const miItem = books.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].name} - ${peso}${miItem[0].price}`;
        

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', deleteBookfromCart);
        miNodo.appendChild(miBoton);
        carritoEL.appendChild(miNodo);
    });
    total.textContent = calcTotal();
}

// Función que elimina un libro del carrito
deleteBookfromCart = (evento) => {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderCart();
}

// Función que calcula el total
calcTotal = () => {
    return carrito.reduce((total, item) => {
        const miItem = books.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].price;
    }, 0).toFixed(2);
}

// Función que vacía el carrito
emptyCart = () => {
    carrito = [];
    renderCart();
}

// Función para confirmar la compra
buyBook = () => {
    if(carrito.length > 0) {
        showSuccessAlert();
    } else {
        showWarningAlert();
    }
}


// Función que genera un alert mostrando el resultado exitoso de la compra 

showSuccessAlert = () => {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);

    const successAlert = document.createElement("div");
    successAlert.role = "alert"
    successAlert.className = "alert alert-success alert-dismissible fade show";
    successAlert.textContent = `¡Muchísimas gracias por su compra ${userData.username}! Pronto estará recibiendo en ${userData.email} la factura correspondiente.`
    const container = document.querySelector(".totals");
    container.appendChild(successAlert);

    setTimeout(() => {
        container.removeChild(successAlert)
    }, 5000);
}

// Función que genera un alert avisandole al usuario que debe agregar un elemento para poder comprar
showWarningAlert = () => {
    const warningAlert = document.createElement("div");
    warningAlert.role = "alert"
    warningAlert.className = "alert alert-warning alert-dismissible fade show";
    warningAlert.textContent = "Para avanzar con la compra debe agregar por lo menos un item al carrito.";
    const container = document.querySelector(".totals");
    container.appendChild(warningAlert);

    setTimeout(() => {
        container.removeChild(warningAlert)
    }, 5000);
}

// Evento
botonVaciarCarrito.addEventListener('click', emptyCart);
botonComprar.addEventListener('click', buyBook);

// Funciones que se inician con el proyecto
renderBooks();
renderCart();
