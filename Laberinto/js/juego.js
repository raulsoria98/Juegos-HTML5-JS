var canvas
var ctx;
var FPS = 60;

var anchoF = 50;
var altoF = 50;

var muro = 0;
var tierra = 1;
var puerta = 2;
var llave = 3;

var colorMuro = '#044F14';
var colorTierra = '#C6892F';
var colorPuerta = '#3A1700';
var colorLlave = '#C6BC00';

var protagonista;

var escenario = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,1,1,1,1,0,0,1,1,0],
    [0,0,1,1,1,1,1,0,0,1,0,0,1,0,0],
    [0,0,1,0,0,0,1,1,0,1,1,1,1,0,0],
    [0,0,1,1,1,0,0,1,0,0,0,1,0,0,0],
    [0,1,1,0,0,0,0,1,0,0,0,1,0,0,0],
    [0,0,1,0,0,0,1,1,1,0,0,1,1,1,0],
    [0,1,1,1,0,0,1,0,0,0,3,0,0,1,0],
    [0,1,1,1,0,0,2,0,0,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

function dibujaEscenario()
{
    for(y = 0; y < escenario.length; y++)
    {
        for(x = 0; x < escenario[0].length; x++)
        {
            switch (escenario[y][x])
            {
                case muro:
                    ctx.fillStyle = colorMuro;
                break;

                case tierra:
                    ctx.fillStyle = colorTierra;
                break;

                case puerta:
                    ctx.fillStyle = colorPuerta;
                break;

                case llave:
                    ctx.fillStyle = colorLlave;
                break;
            
                default:
                    break;
            }

            ctx.fillRect(x*anchoF, y*altoF, anchoF, altoF);
        }
    }
}

class Jugador {
    constructor() {
        this.x = 1;
        this.y = 1;
        this.color = '#820C01';
        this.llave = false;
    }

    dibujar()
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*anchoF, this.y*altoF, anchoF, altoF);
    }

    abajo()
    {
        if(!this.colision(this.x,this.y+1))
        {
            this.y++;
            protagonista.interactuar();
        }
    }
    arriba()
    {
        if(!this.colision(this.x,this.y-1))
        {
            this.y--;
            protagonista.interactuar();
        }
    }
    izquierda()
    {
        if(!this.colision(this.x-1,this.y))
        {
            this.x--;
            protagonista.interactuar();
        }
    }
    derecha()
    {
        if(!this.colision(this.x+1,this.y))
        {
            this.x++;
            protagonista.interactuar();
        }
    }

    colision(x,y)
    {
        var colision = false;

        if(escenario[y][x] == muro)
            colision = true;

        return colision;
    }

    interactuar()
    {
        var objeto = escenario[this.y][this.x];
        
        if(objeto == llave)
        {
            escenario[this.y][this.x] = tierra;
            this.llave = true;
            alert("Has encontrado una llave!!");
        }
        else if(objeto == puerta)
        {
            if(this.llave)
                alert("HAS ESCAPADO DEL LABERINTO!!!");
            else
                alert("Puerta cerrada");
        }
    }
}

function inicializar()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    protagonista = new Jugador();

    document.addEventListener('keydown',function(tecla)
    {
        switch (tecla.key) {
            case 'ArrowDown':
                protagonista.abajo();
            break;
    
            case 'ArrowUp':
                protagonista.arriba();
            break;
    
            case 'ArrowLeft':
                protagonista.izquierda();
            break;
    
            case 'ArrowRight':
                protagonista.derecha();
            break;
        
            default:
                break;
        }
    });
    
    setInterval(principal, 1000/FPS);
}

function borraCanvas()
{
    canvas.width = 750;
    canvas.height = 500;
}

function principal()
{
    borraCanvas();

    dibujaEscenario();

    protagonista.dibujar();
}