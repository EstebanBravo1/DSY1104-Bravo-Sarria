

// HH-100 ACA DEFINIMOS LAS CATEGORIAS DE PRODUCTOS 
export const categorias =[
    {id: 'FR', nombre:'Frutas Frescas', descripcion: 'Las mejores frutas de temporada, directo del campo'},
    {id: 'VE', nombre: 'Verduras Organicas',descripcion:'Verduras cultivadas sin pesticidad ni quimicos'},
    {id: 'PO', nombre: 'Productos Organicos', descripcion:'Una seleccion de productos certificados organicos'},
    {id: 'PL', nombre: 'Lacteos', descripcion:'Leche fresca, queso, yogures de productores locales'}

];

// HH-20 Y HH-101 ARREGLO DE LOS PRODUCTOS

export const productos = [
    //FRUTAS

    {
        codigo: 'FR001',
        nombre: 'Manzanas Fuji',
        categoria: 'FR',
        precio: 1200,
        stock: 150,
        origen: 'Chile',
        descripcion: 'Manzana fuji fresca y jugosa, ideal para comer al natural o en postres.',
        practicas: ['Cultivo sostenble', 'Bajo en pesticidas'],
        recetas: ['Tarta de manzana', 'Ensalada de frutas'],
        imagen: 'manzana_roja.jpg'

    },
    {
        codigo: 'FR002',
        nombre: 'Naranjas Valencia',
        categoria: 'FR',
        precio: 1000,
        stock: 200,
        origen: 'Brasil',
        descripcion: 'Naranjas valencia dulces y jugosas, perfectas para zumos naturales.',
        practicas:['Comercio justo','Cultivo sostenible'],
        recetas: ['Batido de naranja', 'Mermelada'],
        imagen: 'banana.jpg'
    },
    {
        codigo: 'FR003',
        nombre: 'Platanos Cavendish',
        categoria: 'FR',
        precio: 800,
        stock: 250,
        origen: 'Ecuador',
        descripcion: 'Platanos cavendish maduros y cremosos, ideales para snacks y postres.'
    },
    {
        // VERDURAS
        codigo: 'VE001',
        nombre: 'Zanahorias Organicas',
        categoria: 'VE',
        precio: 5900,
        stock: 100,
        origen: 'Argentina',
        descripcion: 'Zanahorias organicas, crocantes y dulces, cultivadas sin pesticidad ni quimicos.'
    },
    {
        codigo: 'VE002',
        nombre: 'Espinacas Frescas',
        categoria: 'VE',
        precio: 700,
        stock: 80,
        origen: 'España',
        descripcion: 'Espinacas frescas y tiernas, ricas en hierro y vitaminas.'
    },
    {
        codigo: 'VE003',
        nombre: 'Pimientos Tricolores',
        categoria: 'VE',
        precio: 1500,
        stock: 120,
        origen: 'Mexico',
        descripcion: 'Pimientos rojos, verdes y amarillos, ideales para ensaladas y salteados.'
    },
    {
        // PRODUCTOS ORGANICOS
        codigo: 'PO001',
        nombre: 'Miel Organica',
        categoria: 'PO',
        precio: 5000,
        stock: 50,
        origen: 'Uruguay',
        descripcion: 'Miel organica pura, recolectada de colmenas certificadas.'
    },
    {
        codigo: 'PO002',
        nombre: 'Quinua Organica',
        categoria: 'PO',
        precio: 3000,
        stock: 70,
        origen: 'Peru',
        descripcion: 'Quinua organica, rica en proteinas y libre de gluten.'

    },
    {
        // PRODUCTOS LACTEOS
        codigo: 'PL001',
        nombre: 'Leche Entera',
        categoria: 'PL',
        precio: 1200,
        stock: 200,
        origen: 'Chile',
        descripcion: 'Leche fresca entera, libre de pastoreo y aditivos'
    },

];
//FORMATEO DE NUMERO A MONEDA LOCAL
  export const formatCLP = (precio) => {
        return new Intl.NumberFormat('es-CL',{
            style: 'currency',
            currency: 'CLP'
        }).format(precio);
    };