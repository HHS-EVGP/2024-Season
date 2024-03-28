let items = []
let Allitems = ['ca_AmpHrs', 'ca_Voltage', 'ca_Current', 'ca_Speed', 'ca_Miles', 'motor_temp', 'Battery_1', 'Battery_2', 'IMU_Accel_x', 'IMU_Accel_y', 'IMU_Accel_z', 'IMU_Gyro_x', 'IMU_Gyro_y', 'IMU_Gyro_z', 'Brake_Pedal', 'throttle', 'counter', 'time']
function updateContent() {
    // Get the selected value from the dropdown
    var school = document.getElementById("schoolSelection").value;
    // If set to All, set all items
    if(document.getElementById("itemSelection").value == "All"){
        items = Allitems;
    }
    console.log('Selected school:', school);
    console.log('Selected things:', items);
} 
updateContent();

var realWindowsWidth, realWindowsHeight

class gauge {
    constructor(x, y, title) {
        this.x = x;
        this.y = y;
        this.title = title;
    }
    drw(value) {

        this.value = value;

        fill('#D6DBDF');    
        arc(this.x, this.y, 200, 200, 5*QUARTER_PI, -QUARTER_PI);

        fill('#17202A');    
        arc(this.x, this.y, 200, 200, 5*QUARTER_PI, -QUARTER_PI - (HALF_PI - HALF_PI * this.value/100));

        fill('#5D6D7E');    
        arc(this.x, this.y, 180, 180, -PI, 0);

        textAlign(CENTER);

        textSize(15);
        fill('#17202A'); 
        text( this.value + '%', this.x, this.y - 20);
        textSize(25);
        text( this.title, this.x, this.y+10);

        fill('#C0392B');

        let angle = -QUARTER_PI + (HALF_PI * this.value/100);

        let x = this.x + 90 * sin(angle);
        let y = this.y - 90 * cos(angle);

        let y1 = this.y - 60 * cos(angle) + 5  * sin(angle);
        let x1 = this.x + 60 * sin(angle) + 5  * cos(angle);

        let y2 = this.y - 60 * cos(angle) - 5  * sin(angle);
        let x2 = this.x + 60 * sin(angle) - 5  * cos(angle);

        triangle(x, y, x1, y1, x2, y2);
    }
}

let g_one = new gauge(200,200, 'first');
let g_two = new gauge(400,200, 'second');

function setup() {
    realWindowsWidth = windowWidth - 184
    realWindowsHeight = windowHeight - 104
    var canvas = createCanvas(windowWidth-184, windowHeight-104);
    canvas.parent('p5Canvas');


    frameRate(20);
    noStroke();

    g_one.drw(60);
    g_two.drw(20);

}
function windowResized() {
    realWindowsWidth = windowWidth - 184
    realWindowsHeight = windowHeight - 104
    resizeCanvas(windowWidth-184, windowHeight-104);
  }
let time = 0;

function draw() {
    time += 1;


    background('#5D6D7E');
    g_one.drw(time%100);
    g_two.drw(100 - time%100);
    console.log(time)
}

