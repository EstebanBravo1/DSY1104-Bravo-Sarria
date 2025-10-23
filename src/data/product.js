
// HH-100 ACA DEFINIMOS LAS CATEGORIAS DE PRODUCTOS 
export const categorias =[
    {id: 'FR', nombre:'Frutas Frescas', descripcion: 'Las mejores frutas de temporada, directo del campo'},
    {id: 'VR', nombre: 'Verduras Organicas',descripcion:'Verduras cultivadas sin pesticidad ni quimicos'},
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
        practicas: ['Cultivo sostenible', 'Bajo en pesticidas'],
        recetas: [
            {
                nombre: 'Tarta de manzana',
                tiempo: '60 min',
                dificultad: 'Media',
                porciones: 6,
                ingredientes: [
                    '4 manzanas Fuji cortadas en rodajas',
                    '200g de harina',
                    '100g de azúcar',
                    '100g de mantequilla fría',
                    '1 huevo',
                    'Canela al gusto'
                ],
                pasos: [
                    'Precalentar el horno a 180°C',
                    'Pelar y cortar las manzanas en rodajas finas',
                    'Mezclar la harina con mantequilla hasta formar migas',
                    'Agregar el huevo y formar una masa',
                    'Extender la masa en un molde engrasado',
                    'Colocar las rodajas de manzana sobre la masa',
                    'Espolvorear azúcar y canela',
                    'Hornear por 40-45 minutos hasta dorar'
                ]
            },
            {
                nombre: 'Ensalada de frutas',
                tiempo: '15 min',
                dificultad: 'Fácil',
                porciones: 4,
                ingredientes: [
                    '2 manzanas Fuji en cubos',
                    '1 plátano en rodajas',
                    '1 naranja en gajos',
                    'Jugo de 1 limón',
                    'Miel al gusto'
                ],
                pasos: [
                    'Lavar y cortar todas las frutas en cubos pequeños',
                    'Colocar en un bowl grande',
                    'Exprimir el limón sobre las frutas',
                    'Agregar miel al gusto',
                    'Mezclar suavemente',
                    'Refrigerar 30 minutos antes de servir'
                ]
            }
        ],
        imagen: 'imagenes/Manzana-Fuji-granel.png'
    },
    {
        codigo: 'FR002',
        nombre: 'Naranjas Valencia',
        categoria: 'FR',
        precio: 1000,
        stock: 200,
        origen: 'Brasil',
        descripcion: 'Naranjas valencia dulces y jugosas, perfectas para zumos naturales.',
        practicas: ['Cultivo orgánico', 'Sin tratamientos químicos'],
        recetas: [
            {
                nombre: 'Jugo de naranja natural',
                tiempo: '10 min',
                dificultad: 'Fácil',
                porciones: 2,
                ingredientes: [
                    '4 naranjas Valencia',
                    'Hielo al gusto',
                    'Azúcar opcional'
                ],
                pasos: [
                    'Lavar bien las naranjas',
                    'Cortar por la mitad',
                    'Exprimir con un exprimidor manual o eléctrico',
                    'Colar para quitar semillas',
                    'Servir con hielo',
                    'Endulzar al gusto si lo deseas'
                ]
            },
            {
                nombre: 'Mermelada de naranja',
                tiempo: '90 min',
                dificultad: 'Media',
                porciones: 8,
                ingredientes: [
                    '1 kg de naranjas Valencia',
                    '500g de azúcar',
                    'Jugo de 1 limón',
                    '250ml de agua'
                ],
                pasos: [
                    'Lavar y pelar las naranjas, reservar la cáscara',
                    'Cortar la pulpa en trozos pequeños',
                    'Cortar la cáscara en tiras finas',
                    'Cocinar todo con agua y azúcar a fuego medio',
                    'Agregar jugo de limón',
                    'Cocinar 60-70 minutos removiendo constantemente',
                    'Dejar enfriar y envasar en frascos esterilizados'
                ]
            }
        ],
        imagen: 'imagenes/Naranjas_Valencias.png'
    },
    {
        codigo: 'FR003',
        nombre: 'Platanos Cavendish',
        categoria: 'FR',
        precio: 800,
        stock: 250,
        origen: 'Ecuador',
        descripcion: 'Plátanos Cavendish frescos y dulces, perfectos para snacks y postres.',
        practicas: ['Cultivo sostenble', 'Bajo en pesticidas'],
        recetas: [
            {
                nombre: 'Smoothie de plátano',
                tiempo: '5 min',
                dificultad: 'Fácil',
                porciones: 2,
                ingredientes: [
                    '2 plátanos Cavendish maduros',
                    '1 taza de leche (o leche vegetal)',
                    '1 cucharada de miel',
                    'Hielo al gusto',
                    'Canela opcional'
                ],
                pasos: [
                    'Pelar los plátanos y cortar en rodajas',
                    'Agregar todos los ingredientes a la licuadora',
                    'Licuar hasta obtener consistencia cremosa',
                    'Servir inmediatamente',
                    'Espolvorear canela si lo deseas'
                ]
            },
            {
                nombre: 'Pan de plátano',
                tiempo: '75 min',
                dificultad: 'Media',
                porciones: 8,
                ingredientes: [
                    '3 plátanos Cavendish muy maduros',
                    '2 tazas de harina',
                    '1 taza de azúcar',
                    '2 huevos',
                    '1/2 taza de mantequilla derretida',
                    '1 cucharadita de polvo de hornear',
                    '1 cucharadita de vainilla',
                    'Pizca de sal'
                ],
                pasos: [
                    'Precalentar el horno a 180°C',
                    'Machacar los plátanos con un tenedor',
                    'Mezclar los huevos, azúcar y mantequilla',
                    'Agregar los plátanos machacados y vainilla',
                    'Incorporar harina, polvo de hornear y sal',
                    'Verter en molde engrasado',
                    'Hornear 60 minutos hasta que un palillo salga limpio',
                    'Dejar enfriar antes de desmoldar'
                ]
            }
        ],
        imagen: 'imagenes/Platano_Cavendish.png'
    },
    {
        // VERDURAS
        codigo: 'VR001',
        nombre: 'Zanahorias Organicas',
        categoria: 'VR',
        precio: 5900,
        stock: 100,
        origen: 'Argentina',
        descripcion: 'Zanahorias organicas, crocantes y dulces, cultivadas sin pesticidad ni quimicos.',
        practicas: ['Cultivo sostenible', 'Bajo en pesticidas'],
        recetas: [
            {
                nombre: 'Crema de zanahoria',
                tiempo: '30 min',
                dificultad: 'Fácil',
                porciones: 4,
                ingredientes: [
                    '500g de zanahorias orgánicas',
                    '1 cebolla',
                    '2 dientes de ajo',
                    '500ml de caldo de verduras',
                    '200ml de crema de leche',
                    'Aceite de oliva',
                    'Sal y pimienta'
                ],
                pasos: [
                    'Pelar y cortar las zanahorias en rodajas',
                    'Picar la cebolla y el ajo',
                    'Sofreír cebolla y ajo en aceite de oliva',
                    'Agregar las zanahorias y cocinar 5 minutos',
                    'Añadir el caldo y cocinar 20 minutos',
                    'Licuar hasta obtener textura cremosa',
                    'Agregar crema, sal y pimienta',
                    'Servir caliente con pan tostado'
                ]
            },
            {
                nombre: 'Zanahorias asadas',
                tiempo: '40 min',
                dificultad: 'Fácil',
                porciones: 4,
                ingredientes: [
                    '600g de zanahorias orgánicas',
                    '3 cucharadas de aceite de oliva',
                    '2 cucharadas de miel',
                    '1 cucharadita de comino',
                    'Tomillo fresco',
                    'Sal y pimienta'
                ],
                pasos: [
                    'Precalentar el horno a 200°C',
                    'Lavar y cortar las zanahorias en bastones',
                    'Mezclar aceite, miel, comino, sal y pimienta',
                    'Bañar las zanahorias con la mezcla',
                    'Colocar en bandeja para horno',
                    'Hornear 30-35 minutos dando vuelta a mitad de cocción',
                    'Espolvorear tomillo fresco antes de servir'
                ]
            }
        ],
        imagen: 'imagenes/Zanahorias_Organicas.png'
    },
    {
        codigo: 'VR002',
        nombre: 'Espinacas Frescas',
        categoria: 'VR',
        precio: 700,
        stock: 80,
        origen: 'España',
        descripcion: 'Espinacas frescas y tiernas, ricas en hierro y vitaminas.',
        practicas: ['Cultivo sostenible', 'Bajo en pesticidas'],
        recetas: [
            {
                nombre: 'Ensalada de espinacas',
                tiempo: '15 min',
                dificultad: 'Fácil',
                porciones: 4,
                ingredientes: [
                    '200g de espinacas frescas',
                    '100g de queso feta',
                    '1/2 taza de nueces',
                    '1 manzana roja',
                    '4 cucharadas de aceite de oliva',
                    '2 cucharadas de vinagre balsámico',
                    'Sal y pimienta'
                ],
                pasos: [
                    'Lavar bien las espinacas y secar',
                    'Cortar la manzana en láminas finas',
                    'Desmenuzar el queso feta',
                    'Tostar ligeramente las nueces',
                    'Mezclar aceite, vinagre, sal y pimienta para el aderezo',
                    'Combinar todos los ingredientes en un bowl',
                    'Servir inmediatamente'
                ]
            },
            {
                nombre: 'Smoothie verde',
                tiempo: '5 min',
                dificultad: 'Fácil',
                porciones: 2,
                ingredientes: [
                    '2 tazas de espinacas frescas',
                    '1 plátano maduro',
                    '1 taza de piña',
                    '1 taza de agua o leche vegetal',
                    '1 cucharada de miel',
                    'Jugo de 1/2 limón'
                ],
                pasos: [
                    'Lavar bien las espinacas',
                    'Cortar el plátano y la piña',
                    'Agregar todos los ingredientes a la licuadora',
                    'Licuar hasta obtener consistencia suave',
                    'Servir inmediatamente con hielo si lo deseas'
                ]
            }
        ],
        imagen: 'imagenes/Espinacas_Frescas.png'
    },
    {
        codigo: 'VR003',
        nombre: 'Pimientos Tricolores',
        categoria: 'VR',
        precio: 1500,
        stock: 120,
        origen: 'Mexico',
        descripcion: 'Pimientos rojos, verdes y amarillos, ideales para ensaladas y salteados.',
        practicas: ['Cultivo sostenible', 'Bajo en pesticidas'],
        recetas: [
            {
                nombre: 'Pimientos asados',
                tiempo: '45 min',
                dificultad: 'Fácil',
                porciones: 4,
                ingredientes: [
                    '3 pimientos (rojo, amarillo, verde)',
                    '3 cucharadas de aceite de oliva',
                    '2 dientes de ajo',
                    'Vinagre balsámico',
                    'Sal y pimienta',
                    'Albahaca fresca'
                ],
                pasos: [
                    'Precalentar el horno a 220°C',
                    'Lavar los pimientos y secar',
                    'Colocar enteros en bandeja de horno',
                    'Asar 30-40 minutos dando vuelta ocasionalmente',
                    'Colocar en bolsa cerrada 10 minutos para pelar fácil',
                    'Pelar, quitar semillas y cortar en tiras',
                    'Aderezar con aceite, ajo, vinagre, sal y pimienta',
                    'Decorar con albahaca fresca'
                ]
            },
            {
                nombre: 'Ensalada de pimientos',
                tiempo: '20 min',
                dificultad: 'Fácil',
                porciones: 4,
                ingredientes: [
                    '2 pimientos rojos',
                    '2 pimientos amarillos',
                    '1 pimiento verde',
                    '1 cebolla morada',
                    'Aceite de oliva',
                    'Jugo de limón',
                    'Perejil fresco',
                    'Sal y pimienta'
                ],
                pasos: [
                    'Lavar y cortar los pimientos en tiras finas',
                    'Cortar la cebolla en aros finos',
                    'Mezclar aceite, jugo de limón, sal y pimienta',
                    'Combinar pimientos y cebolla',
                    'Agregar el aderezo',
                    'Refrigerar 10 minutos',
                    'Decorar con perejil picado antes de servir'
                ]
            }
        ],
        imagen: 'imagenes/Piminetos_Tricolores.png'
    },
    {
        // PRODUCTOS ORGANICOS
        codigo: 'PO001',
        nombre: 'Miel Organica',
        categoria: 'PO',
        precio: 5000,
        stock: 50,
        origen: 'Uruguay',
        descripcion: 'Miel organica pura, recolectada de colmenas certificadas.',
        practicas: ['Cultivo sostenible', 'Bajo en pesticidas'],
        recetas: [
            {
                nombre: 'Tostadas con miel',
                tiempo: '5 min',
                dificultad: 'Muy Fácil',
                porciones: 2,
                ingredientes: [
                    '4 rebanadas de pan integral',
                    '3 cucharadas de miel orgánica',
                    '2 cucharadas de mantequilla',
                    'Canela en polvo opcional'
                ],
                pasos: [
                    'Tostar el pan hasta dorar',
                    'Untar mantequilla mientras está caliente',
                    'Rociar generosamente con miel orgánica',
                    'Espolvorear canela si lo deseas',
                    'Servir inmediatamente'
                ]
            },
            {
                nombre: 'Batido de frutas con miel',
                tiempo: '10 min',
                dificultad: 'Fácil',
                porciones: 2,
                ingredientes: [
                    '1 plátano',
                    '1 taza de fresas',
                    '1 taza de yogurt natural',
                    '2 cucharadas de miel orgánica',
                    '1/2 taza de leche',
                    'Hielo al gusto'
                ],
                pasos: [
                    'Lavar y cortar las frutas',
                    'Agregar todos los ingredientes a la licuadora',
                    'Licuar hasta obtener consistencia cremosa',
                    'Probar y ajustar dulzor con más miel si necesario',
                    'Servir con hielo'
                ]
            }
        ],
        imagen: 'imagenes/Miel_Organica.png'
    },
    {
        codigo: 'PO003',
        nombre: 'Quinua Organica',
        categoria: 'PO',
        precio: 3000,
        stock: 70,
        origen: 'Peru',
        descripcion: 'Quinua organica, rica en proteinas y libre de gluten.',
        practicas: ['Cultivo sostenible', 'Bajo en pesticidas'],
        recetas: [
            {
                nombre: 'Ensalada de quinua',
                tiempo: '30 min',
                dificultad: 'Fácil',
                porciones: 4,
                ingredientes: [
                    '1 taza de quinua orgánica',
                    '2 tazas de agua',
                    '1 pepino',
                    '2 tomates',
                    '1/2 cebolla morada',
                    'Jugo de 2 limones',
                    '3 cucharadas de aceite de oliva',
                    'Cilantro fresco',
                    'Sal y pimienta'
                ],
                pasos: [
                    'Enjuagar bien la quinua',
                    'Cocinar en agua con sal 15-20 minutos',
                    'Dejar enfriar la quinua',
                    'Picar pepino, tomates y cebolla',
                    'Mezclar quinua con vegetales',
                    'Preparar aderezo con limón, aceite, sal y pimienta',
                    'Agregar cilantro picado',
                    'Refrigerar antes de servir'
                ]
            },
            {
                nombre: 'Galletas de quinua',
                tiempo: '40 min',
                dificultad: 'Media',
                porciones: 20,
                ingredientes: [
                    '1 taza de harina de quinua orgánica',
                    '1 taza de avena',
                    '1/2 taza de azúcar morena',
                    '1/2 taza de mantequilla',
                    '1 huevo',
                    '1 cucharadita de vainilla',
                    '1/2 cucharadita de polvo de hornear',
                    'Pizca de sal'
                ],
                pasos: [
                    'Precalentar el horno a 180°C',
                    'Mezclar harina de quinua, avena, azúcar, polvo de hornear y sal',
                    'Batir mantequilla, huevo y vainilla',
                    'Combinar ingredientes secos y húmedos',
                    'Formar bolitas y aplastar ligeramente',
                    'Colocar en bandeja con papel mantequilla',
                    'Hornear 12-15 minutos hasta dorar',
                    'Dejar enfriar en rejilla'
                ]
            }
        ],
        imagen: 'imagenes/Quinua_Organica.png'
    },
    {
        // PRODUCTOS LACTEOS
        codigo: 'PL001',
        nombre: 'Leche Entera',
        categoria: 'PL',
        precio: 1200,
        stock: 200,
        origen: 'Chile',
        descripcion: 'Leche fresca entera, libre de pastoreo y aditivos',
        practicas: ['Libre de hormonas', 'Alimentacion natural'],
        recetas: [
            {
                nombre: 'Café con leche',
                tiempo: '5 min',
                dificultad: 'Muy Fácil',
                porciones: 1,
                ingredientes: [
                    '1 taza de leche entera',
                    '1 shot de espresso o café concentrado',
                    'Azúcar al gusto',
                    'Canela opcional'
                ],
                pasos: [
                    'Calentar la leche sin hervir',
                    'Preparar el café o espresso',
                    'Verter el café en una taza',
                    'Agregar la leche caliente',
                    'Endulzar al gusto',
                    'Espolvorear canela si lo deseas'
                ]
            },
            {
                nombre: 'Batido de frutas',
                tiempo: '10 min',
                dificultad: 'Fácil',
                porciones: 2,
                ingredientes: [
                    '2 tazas de leche entera fría',
                    '1 plátano',
                    '1 taza de fresas',
                    '2 cucharadas de miel',
                    'Hielo opcional'
                ],
                pasos: [
                    'Lavar y cortar las frutas',
                    'Agregar todos los ingredientes a la licuadora',
                    'Licuar hasta obtener consistencia suave',
                    'Agregar hielo si lo deseas más frío',
                    'Servir inmediatamente'
                ]
            }
        ],
        imagen: 'imagenes/Leche_Entera.png'
    },

];

// HH-200 RECETAS DETALLADAS
export const recetas = [
    {
        id: 'REC001',
        nombre: 'Smoothie verde',
        descripcion: 'Este es un batido energizante y nutritivo.',
        tiempoPreparacion: '10 minutos',
        porciones: 2,
        dificultad: 'Fácil',
        categoria: 'Bebidas',
        productosRelacionados: ['VR002', 'FR003', 'PL001'], // códigos de Espinacas, Plátano, Leche
        ingredientes: [
            { nombre: '1 taza de espinacas frescas', cantidad: '1 taza', producto: 'VR002' },
            { nombre: '1 plátano (banana) maduro', cantidad: '1 unidad', producto: 'FR003' },
            { nombre: '1/2 taza de piña o mango en trozos', cantidad: '1/2 taza' },
            { nombre: '1/2 taza de leche o bebida vegetal', cantidad: '1/2 taza', producto: 'PL001' },
            { nombre: '1 cucharadita de semillas de chía o linaza (opcional)', cantidad: '1 cucharadita', opcional: true },
            { nombre: 'Miel o endulzante al gusto (opcional)', cantidad: 'al gusto', opcional: true },
            { nombre: 'Hielo (opcional)', cantidad: 'al gusto', opcional: true }
        ],
        pasos: [
            {
                numero: 1,
                titulo: 'Preparar los ingredientes',
                descripcion: 'Lava bien la taza de espinacas. Pela y corta el plátano y la fruta que hayas elegido (piña/mango).'
            },
            {
                numero: 2,
                titulo: 'Licuar los ingredientes verdes',
                descripcion: 'Coloca las espinacas en el vaso de la licuadora. Agrega la leche o bebida vegetal (o agua). Comienza a licuar a velocidad baja para que las espinacas se trituren y no queden trozos grandes.'
            },
            {
                numero: 3,
                titulo: 'Añadir las frutas y el extra',
                descripcion: 'Incorpora el plátano, la piña/mango y los ingredientes opcionales (chía/linaza, endulzante).'
            },
            {
                numero: 4,
                titulo: 'Triturar',
                descripcion: 'Sube la velocidad de la licuadora y tritura hasta obtener una consistencia suave y homogénea. Si usas fruta congelada o deseas que esté más frío, añade cubitos de hielo y vuelve a licuar.'
            },
            {
                numero: 5,
                titulo: 'Servir',
                descripcion: 'Sirve inmediatamente en vasos. ¡Disfruta!'
            }
        ],
        consejos: [
            'Puedes sustituir el plátano por aguacate para una textura más cremosa',
            'Si prefieres más dulce, agrega dátiles o miel',
            'Para hacer más cantidad, simplemente duplica las proporciones'
        ],
        informacionNutricional: {
            calorias: 150,
            proteinas: '4g',
            carbohidratos: '30g',
            grasas: '2g',
            fibra: '5g'
        },
        imagen: 'imagenes/recetas/smoothie-verde.jpg'
    },
    {
        id: 'REC002',
        nombre: 'Tarta de manzana',
        descripcion: 'Deliciosa tarta casera con manzanas frescas y canela.',
        tiempoPreparacion: '60 minutos',
        porciones: 8,
        dificultad: 'Media',
        categoria: 'Postres',
        productosRelacionados: ['FR001', 'PL001'], // Manzanas, Leche
        ingredientes: [
            { nombre: '4 manzanas Fuji', cantidad: '4 unidades', producto: 'FR001' },
            { nombre: 'Masa para tarta', cantidad: '1 paquete' },
            { nombre: 'Azúcar', cantidad: '1/2 taza' },
            { nombre: 'Canela en polvo', cantidad: '1 cucharadita' },
            { nombre: 'Mantequilla', cantidad: '2 cucharadas' },
            { nombre: 'Huevo', cantidad: '1 unidad' }
        ],
        pasos: [
            {
                numero: 1,
                titulo: 'Preparar las manzanas',
                descripcion: 'Pela y corta las manzanas en láminas finas. Mézclalas con azúcar y canela.'
            },
            {
                numero: 2,
                titulo: 'Preparar el molde',
                descripcion: 'Forra un molde para tarta con la masa. Pincha el fondo con un tenedor.'
            },
            {
                numero: 3,
                titulo: 'Rellenar',
                descripcion: 'Coloca las manzanas sobre la masa formando círculos. Espolvorea con azúcar y añade trocitos de mantequilla.'
            },
            {
                numero: 4,
                titulo: 'Hornear',
                descripcion: 'Hornea a 180°C durante 40-45 minutos hasta que la masa esté dorada.'
            },
            {
                numero: 5,
                titulo: 'Servir',
                descripcion: 'Deja enfriar y sirve tibia. Puedes acompañar con helado de vainilla.'
            }
        ],
        consejos: [
            'Elige manzanas firmes para que no se deshagan al hornear',
            'Puedes agregar pasas o nueces para más textura',
            'Si la masa se dora muy rápido, cubre con papel aluminio'
        ],
        informacionNutricional: {
            calorias: 280,
            proteinas: '3g',
            carbohidratos: '45g',
            grasas: '10g',
            fibra: '3g'
        },
        imagen: 'imagenes/recetas/tarta-manzana.jpg'
    },
    {
        id: 'REC003',
        nombre: 'Ensalada de espinacas',
        descripcion: 'Ensalada fresca y nutritiva con espinacas tiernas.',
        tiempoPreparacion: '15 minutos',
        porciones: 4,
        dificultad: 'Fácil',
        categoria: 'Ensaladas',
        productosRelacionados: ['VR002', 'FR002'], // Espinacas, Naranjas
        ingredientes: [
            { nombre: '2 tazas de espinacas frescas', cantidad: '2 tazas', producto: 'VR002' },
            { nombre: '1 naranja Valencia en gajos', cantidad: '1 unidad', producto: 'FR002' },
            { nombre: 'Queso de cabra', cantidad: '100g' },
            { nombre: 'Nueces', cantidad: '1/4 taza' },
            { nombre: 'Aceite de oliva', cantidad: '2 cucharadas' },
            { nombre: 'Vinagre balsámico', cantidad: '1 cucharada' }
        ],
        pasos: [
            {
                numero: 1,
                titulo: 'Lavar y secar',
                descripcion: 'Lava bien las espinacas y sécalas con papel de cocina.'
            },
            {
                numero: 2,
                titulo: 'Preparar ingredientes',
                descripcion: 'Pela y corta la naranja en gajos. Desmenuza el queso de cabra. Tuesta ligeramente las nueces.'
            },
            {
                numero: 3,
                titulo: 'Mezclar',
                descripcion: 'En un bowl grande, mezcla las espinacas, gajos de naranja, queso y nueces.'
            },
            {
                numero: 4,
                titulo: 'Aliñar',
                descripcion: 'Prepara una vinagreta con aceite de oliva y vinagre balsámico. Agrega sal y pimienta al gusto.'
            },
            {
                numero: 5,
                titulo: 'Servir',
                descripcion: 'Vierte la vinagreta sobre la ensalada justo antes de servir.'
            }
        ],
        consejos: [
            'Usa espinacas baby para una textura más tierna',
            'Puedes sustituir las nueces por almendras',
            'Agrega un toque de miel a la vinagreta para balance'
        ],
        informacionNutricional: {
            calorias: 180,
            proteinas: '6g',
            carbohidratos: '12g',
            grasas: '12g',
            fibra: '4g'
        },
        imagen: 'imagenes/recetas/ensalada-espinacas.jpg'
    }
];

// HH-201 FUNCIÓN PARA OBTENER RECETAS POR PRODUCTO
export const getRecetasPorProducto = (codigoProducto) => {
    return recetas.filter(receta => 
        receta.productosRelacionados.includes(codigoProducto)
    );
};

// HH-202 FUNCIÓN PARA OBTENER RECETA POR ID
export const getRecetaPorId = (idReceta) => {
    return recetas.find(receta => receta.id === idReceta);
};

// HH-203 FUNCIÓN PARA OBTENER RECETAS POR CATEGORÍA
export const getRecetasPorCategoria = (categoria) => {
    return recetas.filter(receta => receta.categoria === categoria);
};

// HH-204 FUNCIÓN PARA OBTENER RECETAS POR DIFICULTAD
export const getRecetasPorDificultad = (dificultad) => {
    return recetas.filter(receta => receta.dificultad === dificultad);
};

//FORMATEO DE NUMERO A MONEDA LOCAL
  export const formatCLP = (precio) => {
        return new Intl.NumberFormat('es-CL',{
            style: 'currency',
            currency: 'CLP'
        }).format(precio);
    };

// ========== FUNCIONES ASÍNCRONAS PARA SIMULAR API CALLS ==========

// Función para obtener todos los productos (simula API call)
export const fetchProductos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(productos);
      } catch (err) {
        reject(new Error('Error al cargar productos: ' + err.message));
      }
    }, 600); // 600ms de delay
  });
};

// Función para obtener todas las recetas (simula API call)
export const fetchRecetas = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(recetas);
      } catch (err) {
        reject(new Error('Error al cargar recetas: ' + err.message));
      }
    }, 400); // 400ms de delay
  });
};

// Función para obtener un producto por código (simula API call)
export const fetchProductoPorCodigo = (codigo) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = productos.find(p => p.codigo === codigo);
      if (producto) {
        resolve(producto);
      } else {
        reject(new Error(`Producto con código ${codigo} no encontrado`));
      }
    }, 300); // 300ms de delay
  });
};

// Función para obtener productos por categoría (simula API call)
export const fetchProductosPorCategoria = (categoriaId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const productosCategoria = productos.filter(p => p.categoria === categoriaId);
        resolve(productosCategoria);
      } catch (err) {
        reject(new Error('Error al filtrar productos por categoría: ' + err.message));
      }
    }, 450); // 450ms de delay
  });
};

// Función para obtener recetas relacionadas con un producto (simula API call)
export const fetchRecetasPorProducto = (codigoProducto) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const recetasRelacionadas = recetas.filter(receta => 
          receta.productosRelacionados.includes(codigoProducto)
        );
        resolve(recetasRelacionadas);
      } catch (err) {
        reject(new Error('Error al cargar recetas relacionadas: ' + err.message));
      }
    }, 350); // 350ms de delay
  });
};

// Función para buscar productos por término (simula API call)
export const searchProductos = (termino) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!termino || termino.trim() === '') {
          resolve([]);
          return;
        }
        
        const terminoLower = termino.toLowerCase();
        const resultados = productos.filter(producto => 
          producto.nombre.toLowerCase().includes(terminoLower) ||
          producto.descripcion.toLowerCase().includes(terminoLower) ||
          producto.origen.toLowerCase().includes(terminoLower)
        );
        
        resolve(resultados);
      } catch (err) {
        reject(new Error('Error en la búsqueda de productos: ' + err.message));
      }
    }, 500); // 500ms de delay
  });
};