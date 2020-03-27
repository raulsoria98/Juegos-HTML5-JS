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

var puntuacion = 0;

// (12x21) pero se verán (10x16)
var tablero = [
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
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],

    [1, 1,1,1,1,1,1,1,1,1,1 ,1]
];

var tableroCopia = [
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
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],
    [1, 0,0,0,0,0,0,0,0,0,0 ,1],

    [1, 1,1,1,1,1,1,1,1,1,1 ,1]
];

function resetea()
{
    for(var py = 0; py < altoTablero; py++)
    {
        for(var px = 0; px < anchoTablero; px++)
        {
            tablero[py][px] = tableroCopia[py][px];
        }
    }

    puntuacion = 0;

    pieza.nueva();
}

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
];

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
];

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
];

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
];

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
];

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
];

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
];

// Llamada: ficha[1][3][y][x]; ficha 1 rotacion 3 en cordenada x,y
var fichas = [ficha1, ficha2, ficha3, ficha4, ficha5, ficha6, ficha7];

var pieza;

class Pieza
{
    constructor()
    {
        this.nueva();

        this.retraso = FPS;
        this.contador = 0;
    }

    nueva()
    {
        this.y = 1;
        this.x = 4;

        this.tipo = Math.floor(Math.random() * 7);
        this.rotacion = 0;
    }

    fijar()
    {
        for(var py = 0; py < 4; py++)
        {
            for(var px = 0; px < 4; px++)
            {
                if(fichas[this.tipo][this.rotacion][py][px] != 0)
                    tablero[this.y+py][this.x+px] = this.tipo + 1;
            }
        }
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
                    ctx.fillRect((this.x + px - 1) * anchoF, (this.y + py - margenSuperior) * altoF, anchoF, altoF);
                }
            }
        }
    }
    
    colision(x,y,rotacion)
    {   
        for(var py = 0; py < 4; py++)
        {
            for(var px = 0; px < 4; px++)
            {
                if(fichas[this.tipo][rotacion][py][px] != 0)
                {
                    if(tablero[y+py][x+px] != 0)
                        return true;
                }
            }
        }

        return false;
    }
    
    caer()
    {
        if(this.contador < this.retraso)
            this.contador++;
        else
        {
            this.contador = 0;

            if(!this.colision(this.x, this.y + 1, this.rotacion))
                this.y++;
            else
            {
                this.fijar();

                if(pierde())
                    resetea();
                else
                {
                    puntuacion++;
                    limpia();
                    this.nueva();
                }
            }
        }
    }

    rotar()
    {
        var nuevaRotacion = this.rotacion;

        if(nuevaRotacion < 3)
            nuevaRotacion++;
        else
            nuevaRotacion = 0;
        
        if(!this.colision(this.x, this.y, nuevaRotacion))
            this.rotacion = nuevaRotacion;
    }

    abajo()
    {
        if(!this.colision(this.x, this.y+1, this.rotacion))
            this.y++;
    }

    izquierda()
    {
        if(!this.colision(this.x-1, this.y, this.rotacion))
            this.x--;
    }

    derecha()
    {
        if(!this.colision(this.x+1, this.y, this.rotacion))
            this.x++;
    }
}

function escribePuntuacion()
{
    ctx.font = '25px impact';
    ctx.fillStyle = '#555555';
    ctx.fillText('Puntuacion: ' + puntuacion, 10,40);
}

function limpia()
{
    var filaCompleta;

    for(var py = margenSuperior; py < altoTablero - 1; py++)
    {
        filaCompleta = true;

        for(var px = 1; px < anchoTablero - 1; px++)
        {
            if(tablero[py][px] == 0)
                filaCompleta = false;
        }

        if(filaCompleta)
        {
            tablero.splice(py,1);
            tablero.unshift([1, 0,0,0,0,0,0,0,0,0,0 ,1]);
        }
    }
}

function pierde()
{
    for(var px = 1; px < anchoTablero-1; px++)
    {
        if(tablero[margenSuperior][px] != 0)
            return true;
    }

    return false;
}

function dibujarTablero()
{
    escribePuntuacion();

    for(var y = margenSuperior; y < altoTablero - 1; y++)
    {
        for(var x = 1; x < anchoTablero - 1; x++)
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

            case 'r':
                resetea();
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

    pieza.caer();
    
    dibujarTablero();

    pieza.dibujar();
}