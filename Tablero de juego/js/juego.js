var canvas
var ctx;
var FPS = 50;

var anchoF = 100;
var altoF = 100;

var cesped = 'green';
var agua = 'blue';
var tierra = 'brown';

var escenario = [
    [0,1,0,0,0],
    [0,1,1,0,0],
    [2,2,2,2,2],
    [2,0,1,1,1],
    [0,0,0,0,1]
];

function dibujaEscenario()
{
    for(y = 0; y < escenario.length; y++)
    {
        for(x = 0; x < escenario.length; x++)
        {
            if(escenario[y][x] == 0)
                ctx.fillStyle = cesped;
            else if(escenario[y][x] == 1)
                ctx.fillStyle = agua;
            else if(escenario[y][x] == 2)
                ctx.fillStyle = tierra;

            ctx.fillRect(x*anchoF, y*altoF, anchoF, altoF);
        }
    }
}

function inicializar()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    setInterval(principal, 1000/FPS);
}

function borraCanvas()
{
    canvas.width = 500;
    canvas.height = 500;
}

function principal()
{
    borraCanvas();

    dibujaEscenario();
}