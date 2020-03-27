var canvas;
var canvasWidth = 400;
var canvasHeight = 640;
var ctx;
var FPS = 60;

var anchoTablero = 12;
var altoTablero = 21;

var margenSuperior = 4;
var margneLateral = 1;

var anchoF = 40;
var altoF = 40;

// (12x21) pero se verán (10x16)
var tablero = [
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],

    [1, 3,0,0,0,0,0,0,0,0,2 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 4,0,0,0,0,0,0,0,0,5 ,1],

    [1, 1,1,1,1,1,1,1,1,1,1 ,1]
];

// Colores
var rojo = '#FF0000';
var morado = '#800080';
var naranja = '#FF8C00';
var amarillo = '#FFD700';
var verde = '#008000';
var cyan = '#00CED1';
var azul = '#0000CD';

var coloresFichas = [rojo, morado, naranja, amarillo, verde, cyan, azul];

var ficha1 = [
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ]
]

var ficha2 = [
    [
        [0,0,0,0],
        [2,2,2,2],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [0,0,2,0],
        [0,0,2,0],
        [0,0,2,0],
        [0,0,2,0]
    ],
    [
        [0,0,0,0],
        [2,2,2,2],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [0,0,2,0],
        [0,0,2,0],
        [0,0,2,0],
        [0,0,2,0]
    ]
]

var ficha3 = [
    [
        [0,0,0,0],
        [0,0,3,3],
        [0,3,3,0],
        [0,0,0,0]
    ],
    [
        [0,0,3,0],
        [0,0,3,3],
        [0,0,0,3],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [0,0,3,3],
        [0,3,3,0],
        [0,0,0,0]
    ],
    [
        [0,0,3,0],
        [0,0,3,3],
        [0,0,0,3],
        [0,0,0,0]
    ]
]

var ficha4 = [
    [
        [0,0,0,0],
        [0,4,4,0],
        [0,0,4,4],
        [0,0,0,0]
    ],
    [
        [0,0,0,4],
        [0,0,4,4],
        [0,0,4,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [0,4,4,0],
        [0,0,4,4],
        [0,0,0,0]
    ],
    [
        [0,0,0,4],
        [0,0,4,4],
        [0,0,4,0],
        [0,0,0,0]
    ]
]

var ficha5 = [
    [
        [0,0,0,0],
        [0,5,5,5],
        [0,5,0,0],
        [0,0,0,0]
    ],
    [
        [0,0,5,0],
        [0,0,5,0],
        [0,0,5,5],
        [0,0,0,0]
    ],
    [
        [0,0,0,5],
        [0,5,5,5],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [0,5,5,0],
        [0,0,5,0],
        [0,0,5,0],
        [0,0,0,0]
    ]
]

var ficha6 = [
    [
        [0,0,0,0],
        [0,6,6,6],
        [0,0,0,6],
        [0,0,0,0]
    ],
    [
        [0,0,6,6],
        [0,0,6,0],
        [0,0,6,0],
        [0,0,0,0]
    ],
    [
        [0,6,0,0],
        [0,6,6,6],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [0,0,6,0],
        [0,0,6,0],
        [0,6,6,0],
        [0,0,0,0]
    ]
]

var ficha7 = [
    [
        [0,0,0,0],
        [0,7,7,7],
        [0,0,7,0],
        [0,0,0,0]
    ],
    [
        [0,0,7,0],
        [0,0,7,7],
        [0,0,7,0],
        [0,0,0,0]
    ],
    [
        [0,0,7,0],
        [0,7,7,7],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [0,0,7,0],
        [0,7,7,0],
        [0,0,7,0],
        [0,0,0,0]
    ]
]

// Llamada: ficha[1][3][y][x]; ficha 1 rotacion 3 en cordenada x,y
var fichas = [ficha1, ficha2, ficha3, ficha4, ficha5, ficha6, ficha7];

var pieza;

class Pieza
{
    constructor()
    {
        this.x = 5;
        this.y = 7;

        this.tipo = 6;
        this.rotacion = 1;
    }

    dibujar()
    {
        for(var py = 0; py < 4; py++)
        {
            for(var px = 0; px < 4; px++)
            {
                if(fichas[this.tipo][this.rotacion][py][px] != 0)
                {
                    ctx.fillStyle = coloresFichas[this.tipo];
                    ctx.fillRect((this.x + px) * anchoF, (this.y + py) * altoF, anchoF, altoF);
                }
            }
        }
    }

    rotar()
    {
        console.log("rotar");
    }

    abajo()
    {
        console.log("abajo");
    }

    izquierda()
    {
        console.log("izquierda");
    }

    derecha()
    {
        console.log("derecha");
    }
}

function dibujarTablero()
{
    for(var y = margenSuperior; y < altoTablero; y++)
    {
        for(var x = 0; x < anchoTablero; x++)
        {
            if(tablero[y][x] != 0)
            {
                ctx.fillStyle = coloresFichas[tablero[y][x] - 1];
                ctx.fillRect((x-1) * anchoF, (y-margenSuperior) * altoF, anchoF, altoF);
            }
        }
    }
}

function inicializar()
{
    canvas = document.createElement("CANVAS");
    canvas.setAttribute("id", "canvas");
    canvas.style.width = canvasWidth;
    canvas.style.height = canvasHeight;
    canvas.style.border = "3px solid black"
    document.body.appendChild(canvas);
    
    ctx = canvas.getContext('2d');

    pieza = new Pieza();

    document.addEventListener('keydown',function(tecla)
    {
        switch (tecla.key) {
            case 'ArrowUp':
                pieza.rotar();
            break;
            
            case 'ArrowDown':
                pieza.abajo();
            break;
    
            case 'ArrowLeft':
                pieza.izquierda();
            break;
    
            case 'ArrowRight':
                pieza.derecha();
            break;
        
            default:
                break;
        }
    });
    
    setInterval(principal, 1000/FPS);
}

function borraCanvas()
{
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

function principal()
{
    borraCanvas();

    dibujarTablero();

    pieza.dibujar();
}