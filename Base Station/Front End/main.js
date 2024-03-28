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

class odometer {
    constructor(x,y,size,min,max,red,title) {
        this.x = x;            // X Location
        this.y = y;            // Y Location
        this.min = min;        // Minimum Value
        this.max = max;        // Maximum Value
        this.red = red;        // Number of Red Numbers (From Right)
        this.size = size*175;  // Size of Odometer
        this.title = title;    // Name of Odometer
    }
    draw(value) {
        strokeWeight(0);

        fill('#5D6D7E');

        circle(this.x, this.y, this.size);

        this.value = value;

        fill('#D6DBDF');    
        arc(this.x, this.y, this.size, this.size, PI - QUARTER_PI , QUARTER_PI);

        fill('#17202A');         //  TODO THIS PART::  -QUARTER_PI - (HALF_PI - HALF_PI * this.value/100)
        arc(this.x, this.y, this.size, this.size, PI - QUARTER_PI, PI - QUARTER_PI + ((5.4*this.value)*PI/180));
        
        textAlign(CENTER);
        
        fill('#5D6D7E'); 
        circle(this.x, this.y, this.size*0.9)

        textSize(this.size*0.075);
        fill('#17202A'); 
        text( this.value + 'mph', this.x, this.y - this.size*0.1);
        textSize(this.size*0.125);
        text( this.title, this.x, this.y+this.size*0.05);

        textSize(this.size*0.075);
        

        let x_table = [
            -0.265165042945,
            -0.356646193611,
            -0.370383127723,
            -0.303381372891,
            -0.170246437402,
            0.0,
            0.170246437402,
            0.303381372891,
            0.370383127723,
            0.356646193611,
            0.265165042945
        ]

        let y_table = [
            0.265165042945,
            0.115881372891,
            -0.0586629243901,
            -0.22041946961,
            -0.334127446571,
            -0.375,
            -0.334127446571,
            -0.22041946961,
            -0.0586629243901,
            0.115881372891,
            0.265165042945
        ]

        fill('white');
        for (let i = 0; i < 11-this.red; i++) {
            text(round(i*(this.max-this.min)/10), this.x+this.size*(x_table[i]), this.y+this.size*(y_table[i]));
        }

        fill('red');
        for (let i = 11-this.red; i < 11; i++) {
            text(round(i*(this.max-this.min)/10), this.x+this.size*(x_table[i]), this.y+this.size*(y_table[i]));
        }

        fill('#C0392B');

        let angle = (-135 + 5.4*this.value)*PI/180

        let x = this.x + this.size*0.45 * sin(angle);
        let y = this.y - this.size*0.45 * cos(angle);

        let y1 = this.y - this.size*0.3 * cos(angle) + this.size*0.025 * sin(angle);
        let x1 = this.x + this.size*0.3 * sin(angle) + this.size*0.025 * cos(angle);

        let y2 = this.y - this.size*0.3 * cos(angle) - this.size*0.025 * sin(angle);
        let x2 = this.x + this.size*0.3 * sin(angle) - this.size*0.025 * cos(angle);

        triangle(x, y, x1, y1, x2, y2);
    }
}

let speed_gauge = new odometer(200,200,1,0,50,3,'Speed');
let speed_gauge2 = new odometer(200,400,1,50,300,4,'Speed');

function setup() {
    realWindowsWidth = windowWidth - 184
    realWindowsHeight = windowHeight - 104
    var canvas = createCanvas(windowWidth-184, windowHeight-104);
    canvas.parent('p5Canvas');


    frameRate(20);
}

function windowResized() {
    realWindowsWidth = windowWidth - 184
    realWindowsHeight = windowHeight - 104
    resizeCanvas(windowWidth-184, windowHeight-104);
}


function draw() {

    speed_gauge.draw(20);
    speed_gauge2.draw(200);
}

