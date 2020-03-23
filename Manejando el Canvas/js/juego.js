var canvas
var ctx;
var FPS = 50;

var imgProta;

function inicializar()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Cargamos la imágen del personaje
    imgProta = new Image();
    imgProta.src = 'img/MegaMan.png'

    setInterval(principal, 1000/FPS);
}

class protagonista
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.velocidad = 5;
    }

    texto()
    {
        ctx.font = '30px impact';
        ctx.fillStyle = '#555555';
        ctx.fillText('X: ' + this.x + ' Y: ' + this.y, 10,40);
    }

    dibujar()
    {
        ctx.drawImage(imgProta,this.x,this.y,50,50);
        this.texto();
    }

    abajo()
    {
        this.y += this.velocidad;
    }
    arriba()
    {
        this.y -= this.velocidad;
    }
    izquierda()
    {
        this.x -= this.velocidad;
    }
    derecha()
    {
        this.x += this.velocidad;
    }
}

class enemigo
{
    constructor(x, y, color)
    {
        this.x = x;
        this.y = y;
        this.color = color;

        this.der = true;
    }
    
    dibujar()
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 50, 50);
    }
    
    abajo(velocidad)
    {
        this.y += velocidad;
    }
    arriba(velocidad)
    {
        this.y -= velocidad;
    }
    izquierda(velocidad)
    {
        this.x -= velocidad;
    }
    derecha(velocidad)
    {
        this.x += velocidad;
    }

    mueve(velocidad)
    {
        if(this.der)
        {
            if(this.x < 450)
                this.derecha(velocidad);
            else
                this.der = false;
        }
        else
        {
            if(this.x > 0)
                this.izquierda(velocidad);
            else
                this.der = true;
        }
    }
}

var per1 = new enemigo(10,50,'red');
var per2 = new enemigo(10,120,'blue');
var per3 = new enemigo(10,230,'green');

var megaMan = new protagonista(200,200);

/* var configTeclado = { is_unordered : true };
var eventoTeclado = new window.keypress.Listener(this, configTeclado);
eventoTeclado.simple_combo('down', function()
{
    megaMan.abajo();
});
eventoTeclado.simple_combo('up', function()
{
    megaMan.arriba();
});
eventoTeclado.simple_combo('left', function()
{
    megaMan.izquierda();
});
eventoTeclado.simple_combo('right', function()
{
    megaMan.derecha();
}); */

document.addEventListener('keydown',function(tecla)
{
    switch (tecla.key) {
        case 'ArrowDown':
            megaMan.abajo();
        break;

        case 'ArrowUp':
            megaMan.arriba();
        break;

        case 'ArrowLeft':
            megaMan.izquierda();
        break;

        case 'ArrowRight':
            megaMan.derecha();
        break;
    
        default:
            break;
    }
});

function borraCanvas()
{
    canvas.width = 500;
    canvas.height = 400;
}

function principal()
{
    borraCanvas();

    per1.dibujar();
    per2.dibujar();
    per3.dibujar();

    per1.mueve(1);
    per2.mueve(3);
    per3.mueve(7);

    megaMan.dibujar();
}