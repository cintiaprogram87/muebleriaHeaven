El siguiente proyecto consiste en una pagina web comercial de una muebleria.
Consta de la pagina principal index.html y 4 paginas secundarias (productos.html, contacto.html, quienessomos.html y preguntasfrecuentes.html).
Cada archivo de html consta de un archivo css, y un archivo principal (styles.css).
La pagina consiste en la muestra de las distintas imagenes de muebles con sus caracteristicas respectivas, ubicacion de la sucursal, datos de la empresa, iconos de las redes sociales a las cuales pueden hacerse y una barra de menu para explorar. 
Cada pagina esta realizada con un diseño flexbox y grid, ademas de darle sistema responsivo que se adapte a pantallas como celulares, tablet y monitores.
Tambien cuenta con un formulario de contacto complementado a formspree para manejar el envio de datos.
La pagina index esta relacionada con una API (productos.json) que muestra distintos productos en el index.html mediante un fetchData (index.js).
la pagina de productos.html se anexa a un archivo de javascript (productos,js) que utiliza el DOM para visualizar el contenido y un carrito de compras, que una vez seleccionado el producto, se realiza una simulacion de compra en donde se envia la informacion al mail del vendedor por medio de formspree.