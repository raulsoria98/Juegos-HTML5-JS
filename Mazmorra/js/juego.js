var canvas;
var canvasWidth = 750;
var canvasHeight = 500;
var ctx;
var FPS = 60;

var anchoF = 50;
var altoF = 50;
var tileWith = 32;

var muro = 0;
var puerta = 1;
var tierra = 2;
var llave = 3;

var protagonista;
var tileMap;
var enemigos = [];
var antorchas = [];

var anchoEscenario = 30;
var altoEscenario = 20;
var anchoVisible = 15;
var altoVisible = 10;

var camara;
var camara1;
var camara2;
var camara3;
var camara4;

var escenario = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,0,0,0,2,2,2,2,0,0,2,2,2, 2,2,2,2,2,2,2,2,2,2,2,0,0,0,0],
    [0,0,2,2,2,2,2,2,0,2,0,0,2,2,0, 0,0,2,0,0,2,0,0,0,0,2,0,2,2,0],
    [0,0,2,0,0,2,2,2,0,2,2,2,2,2,0, 0,0,0,0,0,2,2,2,0,0,2,2,2,2,0],
    [0,0,2,2,2,0,2,2,0,0,2,2,2,0,0, 0,2,2,2,2,2,0,2,0,0,0,2,2,0,0],
    [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0, 0,2,0,0,2,0,0,2,0,0,0,0,2,2,0],
    [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0, 0,2,0,0,0,0,0,2,0,0,0,2,2,0,0],
    [0,2,2,2,0,0,2,0,0,2,2,2,2,2,2, 2,2,0,0,2,2,0,2,0,0,0,2,0,0,0],
    [0,2,2,2,0,0,2,0,0,2,2,2,2,2,0, 0,0,0,2,2,2,2,2,0,0,0,2,2,0,0],
    [0,2,2,2,0,0,0,0,0,0,0,2,0,0,0, 0,0,0,0,0,0,2,0,0,0,0,2,2,0,0],

    [0,2,2,2,0,0,0,0,0,0,0,2,0,0,0, 0,0,0,0,0,0,2,0,0,0,0,2,2,0,0],
    [0,2,0,2,2,2,0,0,0,0,0,2,2,2,0, 0,0,0,0,0,2,2,2,0,2,2,2,2,2,0],
    [0,2,0,2,2,2,0,0,0,0,0,2,0,0,0, 0,0,0,0,0,2,2,2,0,0,0,0,2,2,0],
    [0,2,0,0,0,2,2,2,2,2,2,2,0,2,0, 0,0,0,0,0,0,2,0,0,0,0,0,2,0,0],
    [0,2,0,0,0,2,0,0,0,0,0,2,0,2,2, 2,0,0,2,2,2,2,0,0,0,2,2,2,0,0],
    [0,2,2,2,0,2,0,0,2,2,0,2,0,0,2, 2,0,0,2,2,2,2,0,0,0,2,2,0,0,0],
    [0,2,0,2,0,0,2,0,2,2,0,2,0,0,2, 2,0,0,2,0,0,2,0,0,2,2,2,0,0,0],
    [0,0,0,2,0,0,2,0,2,2,2,2,0,0,2, 2,2,2,2,0,0,2,0,2,2,2,2,2,2,0],
    [0,0,0,2,2,2,2,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,2,2,2,2,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

function colocarObjetos(objeto)
{
    colocado = false;

    while(!colocado)
    {
        fila = random(1,altoEscenario-2);
        columna = random(1,anchoEscenario-2);
        console.log('random: ' + fila + ', ' + columna);
        
        for(var y = fila; y < altoEscenario-1; y++)
        {
            for(var x = columna; x < anchoEscenario-1; x++)
            {
                if(escenario[y][x] == tierra)
                {
                    console.log(objeto + ' en pos (' + y + ', ' + x + ')');
                    escenario[y][x] = objeto;
                    colocado = true;
                    break;
                }
            }

            if(colocado)
                break;
        }
    }
}

class Camara
{
    constructor(x,y,ancho,alto,posX,posY)
    {
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.posX = posX;
        this.posY = posY;
    }

    dibujar()
    {
        // Escenario
        for(var y = this.y; y < this.alto + this.y; y++)
        {
            for(var x = this.x; x < this.ancho + this.x; x++)
            {
                var tile = escenario[y][x];
                ctx.drawImage(tileMap, tile*tileWith,0, tileWith,tileWith, (x - this.x + this.posX)*anchoF,(y - this.y + this.posY)*altoF, anchoF,altoF);
            }
        }

        // Protagonista
        if((protagonista.x >= this.x) && (protagonista.x < this.x + this.ancho) && (protagonista.y >= this.y) && (protagonista.y < this.y + this.alto))
            ctx.drawImage(tileMap, 1*tileWith,1*tileWith, tileWith,tileWith, (protagonista.x - this.x + this.posX)*anchoF,(protagonista.y-this.y+this.posY)*altoF, anchoF,altoF);

        // Enemigos
        enemigos.forEach(enemigo => {
            if((enemigo.x >= this.x) && (enemigo.x < this.x + this.ancho) && (enemigo.y >= this.y) && (enemigo.y < this.y + this.alto))
                ctx.drawImage(tileMap, 0*tileWith,1*tileWith, tileWith,tileWith, (enemigo.x - this.x + this.posX)*anchoF,(enemigo.y-this.y+this.posY)*altoF, anchoF,altoF);
        });

        // Antorchas
        antorchas.forEach(antorcha => {
            if((antorcha.x >= this.x) && (antorcha.x < this.x + this.ancho) && (antorcha.y >= this.y) && (antorcha.y < this.y + this.alto))
                ctx.drawImage(tileMap, antorcha.fotograma*tileWith,2*tileWith, tileWith,tileWith, (antorcha.x - this.x + this.posX)*anchoF,(antorcha.y-this.y+this.posY)*altoF, anchoF,altoF);
        });
    }

    arriba()
    {
        if(this.y > 0)
        {
            this.y--;
        }
    }
    abajo()
    {
        if(this.y < altoEscenario - this.alto)
        {
            this.y++;
        }
    }
    izquierda()
    {
        if(this.x > 0)
        {
            this.x--;
        }
    }
    derecha()
    {
        if(this.x < anchoEscenario - this.ancho)
        {
            this.x++;
        }
    }
}

function reiniciar()
{
    for(var y = 1; y < altoEscenario-1; y++)
    {
        for(var x = 1; x < anchoEscenario-1; x++)
        {
            if(escenario[y][x] == puerta || escenario[y][x] == llave)
            {
                escenario[y][x] = tierra;
            }
        }
    }

    camara = camara1;

    protagonista.setPosicion(1,1);
    protagonista.llave1 = false;
    protagonista.llave2 = false;

    enemigos[0].setPosicion(1,8);
    enemigos[1].setPosicion(13,1);
    enemigos[2].setPosicion(8,6);
    enemigos.forEach(enemigo => {
        enemigo.contador = 0;
    });

    colocarObjetos(puerta);
    colocarObjetos(llave);
    colocarObjetos(llave);
}

class Antorcha
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;

        this.fotograma = 0; // 0-3;
        this.contador = 0;
        this.retraso = 7;
    }

    cambiaFotograma()
    {
        if(this.fotograma < 3)
            this.fotograma++;
        else
            this.fotograma = 0;
    }

    actualizar()
    {
        if(this.contador < this.retraso)
            this.contador++;
        else
        {
            this.contador = 0;
            this.cambiaFotograma();
        }
    }
}

class Jugador {
    constructor() {
        this.x = 1;
        this.y = 1;
        this.color = '#820C01';
        this.llave1 = false;
        this.llave2 = false;
    }

    setPosicion(x,y)
    {
        this.x = x;
        this.y = y;
    }

    dibujar()
    {
        ctx.drawImage(tileMap, 1*tileWith,1*tileWith, tileWith,tileWith, this.x*anchoF,this.y*altoF, anchoF,altoF);
    }

    arriba()
    {
        if(!this.colision(this.x,this.y-1))
        {
            this.y--;
            if(this.y < altoEscenario/2)
            {
                if(camara == camara3)
                    camara = camara1;
                else if(camara == camara4)
                    camara = camara2;
            }
            protagonista.interactuar();
        }
    }
    abajo()
    {
        if(!this.colision(this.x,this.y+1))
        {
            this.y++;
            if(this.y >= altoEscenario/2)
            {
                if(camara == camara1)
                    camara = camara3;
                else if(camara == camara2)
                    camara = camara4;
            }
            protagonista.interactuar();
        }
    }
    izquierda()
    {
        if(!this.colision(this.x-1,this.y))
        {
            this.x--;
            if(this.x < anchoEscenario/2)
            {
                if(camara == camara2)
                    camara = camara1;
                else if(camara == camara4)
                    camara = camara3;
            }
            protagonista.interactuar();
        }
    }
    derecha()
    {
        if(!this.colision(this.x+1,this.y))
        {
            this.x++;
            if(this.x >= anchoEscenario/2)
            {
                if(camara == camara1)
                    camara = camara2;
                else if(camara == camara3)
                    camara = camara4;
            }
            protagonista.interactuar();
        }
    }

    colision(x,y)
    {
        if(escenario[y][x] == muro)
            return true;
        else
            return false;
    }

    colisionEnemigo(x,y)
    {
        if(this.x == x && this.y == y)
        {
            alert('Un enemigo te ha matado :(');
            reiniciar();
        }
    }

    interactuar()
    {
        var objeto = escenario[this.y][this.x];
        
        if(objeto == llave)
        {
            escenario[this.y][this.x] = tierra;

            if(this.llave1)
            {
                alert("Has encontrado otra llave!!!!! Ya tienes dos!!");
                this.llave2 = true;
            }
            else
            {
                alert("Has encontrado una llave!!");
                this.llave1 = true;
            }
        }
        else if(objeto == puerta)
        {
            if(this.llave2)
            {
                alert("HAS ESCAPADO DEL LABERINTO!!!");
                reiniciar();
            }
            else if(this.llave1)
            {
                alert("Tienes una llave... pero la cerradura es para dos llaves!!!");
            }
            else
                alert("Puerta cerrada");
        }
    }
}

function random(min,max)
{
    return num = Math.floor(Math.random() * (max - min + 1)) + min;
}

class Enemigo {
    constructor(x,y) {
        this.x = x;
        this.y = y;

        this.direcion = random(0,3);

        this.retraso = FPS;
        this.contador = 0;
    }

    setPosicion(x,y)
    {
        this.x = x;
        this.y = y;
    }

    dibujar()
    {
        ctx.drawImage(tileMap, 0*tileWith,1*tileWith, tileWith,tileWith, this.x*anchoF,this.y*altoF, anchoF,altoF);
    }

    colision(x,y)
    {
        if(escenario[y][x] == muro || escenario[y][x] == puerta || escenario[y][x] == llave)
            return true;
        else
            return false;
    }

    intentarMover()
    {
        protagonista.colisionEnemigo(this.x,this.y);

        if(this.contador < this.retraso)
            this.contador++;
        else
        {
            this.contador = 0;
            this.direcion = random(0,3);
            this.mover();
        }
    }

    mover()
    {
        switch (this.direcion) {
            case 0: // ARRIBA
                if(!this.colision(this.x,this.y-1))
                    this.y--;
                else
                {
                    this.direcion = random(0,3);
                    this.mover();
                }
            break;

            case 1: // ABAJO
                if(!this.colision(this.x,this.y+1))
                    this.y++;
                else
                {
                    this.direcion = random(0,3);
                    this.mover();
                }
            break;

            case 2: // IZQUIERDA
                if(!this.colision(this.x-1,this.y))
                    this.x--;
                else
                {
                    this.direcion = random(0,3);
                    this.mover();
                }
            break;

            case 3: // DERECHA
                if(!this.colision(this.x+1,this.y))
                    this.x++;
                else
                {
                    this.direcion = random(0,3);
                    this.mover();
                }
            break;
        
            default:
                break;
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
    
    tileMap = new Image();
    tileMap.src = "img/tilemap.png"

    camara1 = new Camara(0,0, anchoVisible,altoVisible, 0,0);
    camara2 = new Camara(anchoEscenario/2,0, anchoVisible,altoVisible, 0,0);
    camara3 = new Camara(0,altoEscenario/2, anchoVisible,altoVisible, 0,0);
    camara4 = new Camara(anchoEscenario/2,altoEscenario/2, anchoVisible,altoVisible, 0,0);
    camara = camara1;

    protagonista = new Jugador();

    enemigos.push(new Enemigo(1,8));
    enemigos.push(new Enemigo(13,1));
    enemigos.push(new Enemigo(8,6));

    antorchas.push(new Antorcha(1,3));
    antorchas.push(new Antorcha(4,1));
    antorchas.push(new Antorcha(4,3));
    antorchas.push(new Antorcha(10,2));
    antorchas.push(new Antorcha(10,9));
    antorchas.push(new Antorcha(2,9));
    antorchas.push(new Antorcha(12,5));
    antorchas.push(new Antorcha(8,5));

    colocarObjetos(puerta);
    colocarObjetos(llave);
    colocarObjetos(llave);

    document.addEventListener('keydown',function(tecla)
    {
        switch (tecla.key) {
            case 'ArrowDown':
                protagonista.abajo();
                // camara.abajo();
            break;
    
            case 'ArrowUp':
                protagonista.arriba();
                // camara.arriba();
            break;
    
            case 'ArrowLeft':
                protagonista.izquierda();
                // camara.izquierda();
            break;
    
            case 'ArrowRight':
                protagonista.derecha();
                // camara.derecha();
            break;

            case 'r':
                reiniciar();
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

    // dibujaEscenario();
    camara.dibujar();

    // protagonista.dibujar();

    enemigos.forEach(enemigo => {
        enemigo.intentarMover();
        // enemigo.dibujar();
    });

    antorchas.forEach(antorcha => {
        antorcha.actualizar();
    });
}