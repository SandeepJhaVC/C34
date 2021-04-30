var ball;
var database, position;
function setup() {
    createCanvas(500, 500);
    database = firebase.database();

    ball = createSprite(250, 250, 10, 10);
    ball.shapeColor = "red";

    var positionref = database.ref('ball/position');
    console.log(positionref);

    positionref.on("value", readpos, showerror);
}

function draw() {
    background("white");

    if (position !== undefined) {
        if (keyDown(LEFT_ARROW)) {
            writePosition(-1, 0);
        }
        else if (keyDown(RIGHT_ARROW)) {
            writePosition(1, 0);
        }
        else if (keyDown(UP_ARROW)) {
            writePosition(0, -1);
        }
        else if (keyDown(DOWN_ARROW)) {
            writePosition(0, +1);
        }
    }
    drawSprites();


}

function writePosition(x, y) {
    //ball.x = ball.x + x;
    //ball.y = ball.y + y;
    console.log(position);
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    })

}

function showerror(err) {
    console.log(err);
}

function readpos(data) {
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}