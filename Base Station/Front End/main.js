let items = []
let Allitems = ['ca_AmpHrs', 'ca_Voltage', 'ca_Current', 'ca_Speed', 'ca_Miles', 'motor_temp', 'Battery_1', 'Battery_2', 'IMU_Accel_x', 'IMU_Accel_y', 'IMU_Accel_z', 'IMU_Gyro_x', 'IMU_Gyro_y', 'IMU_Gyro_z', 'Brake_Pedal', 'throttle', 'counter', 'time']
function updateContent() {
    // Get the selected value from the dropdown
    var school = document.getElementById("schoolSelection").value;
    // If set to All, set all items
    if(document.getElementById("itemSelection").value == "All"){
        items = Allitems;
    }
    // console.log('Selected school:', school);
    // console.log('Selected things:', items);
} 
updateContent();

var realWindowsWidth, realWindowsHeight

class odometer {
    constructor(x,y,title,rate,max=100,min=0,size=1,red=3) {
        this.x = x;            // X Location
        this.y = y;            // Y Location
        this.rate = rate;      // Rate (Relates to the value)
        this.min = min;        // Minimum Value
        this.max = max;        // Maximum Value
        this.red = red;        // Number of Red Numbers (From Right)
        this.size = size*200;  // Size of Odometer
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
        arc(this.x, this.y, this.size, this.size, PI-QUARTER_PI, PI-QUARTER_PI + (((270/(this.max-this.min))*(this.value-this.min))*PI/180));
        
        fill('#5D6D7E'); 
        circle(this.x, this.y, this.size*0.9)

        textSize(this.size*0.075);
        fill('#17202A'); 
        text( this.value + this.rate, this.x, this.y - this.size*0.1);
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
            text(round((i*(this.max-this.min)/10)+this.min), this.x+this.size*(x_table[i]), this.y+this.size*(y_table[i]));
        }

        fill('red');
        for (let i = 11-this.red; i < 11; i++) {
            text(round((i*(this.max-this.min)/10)+this.min), this.x+this.size*(x_table[i]), this.y+this.size*(y_table[i]));
        }

        fill('#C0392B');

        let angle = (((270/(this.max-this.min))*(this.value-this.min))-135)*PI/180

        let x = this.x + this.size*0.45 * sin(angle);
        let y = this.y - this.size*0.45 * cos(angle);

        let y1 = this.y - this.size*0.3 * cos(angle) + this.size*0.025 * sin(angle);
        let x1 = this.x + this.size*0.3 * sin(angle) + this.size*0.025 * cos(angle);

        let y2 = this.y - this.size*0.3 * cos(angle) - this.size*0.025 * sin(angle);
        let x2 = this.x + this.size*0.3 * sin(angle) - this.size*0.025 * cos(angle);

        triangle(x, y, x1, y1, x2, y2);
    }
}

class odometer_counter {
    constructor(x,y,title,size=1) {
        this.x = x;            // X Location
        this.y = y;            // Rate (Relates to the value)
        this.size = size*200;  // Size of Odometer
        this.title = title;    // Name of Odometer
    }
    draw(value) { // ###.####
        value = round(value, 3);

        fill("white");
        rect(
            this.x-this.size,
            this.y-(this.size/2.8),
            this.size*2,
            this.size*0.125
        );
        
        
        fill("#5D6D7E");
        rect(
            this.x-this.size,
            this.y-(this.size/2)+(this.size/4),
            (this.size*2),
            (this.size/2)
        );
        fill("#D6DBDF");
        for (let i = 0; i < 6; i++) {
            rect(
                this.x-this.size+i*3*(this.size*2)/19+(i+1)*(this.size*2)/(19*7),
                this.y-(this.size/2)+(this.size*2)/(19*7)+(this.size/4),
                3*(this.size*2)/19,
                (this.size/2)-2*(this.size*2)/(19*7)
            );
        }
        fill("#17202A");
        
        textSize((this.size/2)-(this.size/100))

        let numbers = []
        let numberStr = value.toString().replace('.', '');
        for (let i = 0; i < numberStr.length; i++) {
            numbers.push(parseInt(numberStr[i], 10));
        }
        if(numbers.length == 5 && value >9){
            numbers.unshift(0);
        }else if(numbers.length == 4)
        for (let i = 0; i < 6; i++) {
            text(
                numbers[i],
                this.x-5*(this.size*2)/12+i*(this.size*2)/6,
                this.y+(this.size/30)
            );
        };
        
        text(
            ".",
            this.x,
            this.y+(this.size/30)
        );

        textSize(this.size*0.125);

        text(
            this.title,
            this.x,
            this.y-(this.size/3.4)
        );
        
        
    }
}

let speed = new odometer(75,100,'Speed','mph',50,0,0.7);
let voltage = new odometer(75*3,100,'Voltage','V',53,43,0.7,0);
let current = new odometer(75*5,100,'Current','amps',150,-20,0.7,6);
let miles = new odometer_counter(75*8,50,'Miles',0.7);
let ampHrs = new odometer_counter(75*8,140,'Amp Hours',0.7);

let Motor_Temp = new odometer(100,100*3,'Motor Temp',"°F",150,32,0.7,4);
let Battery_Temp_1 = new odometer(100*3,100*3,'Temp 1',"°F",120,32,0.7,4);
let Battery_Temp_2 = new odometer(100*5,100*3,'Temp 2',"°F",120,32,0.7,4);

function setup() {
    realWindowsWidth = windowWidth - 184
    realWindowsHeight = windowHeight - 104
    var canvas = createCanvas(windowWidth-184, windowHeight-104);
    canvas.parent('p5Canvas');

    textAlign(CENTER,CENTER);
    frameRate(20);
}
function windowResized() {
    realWindowsWidth = windowWidth - 184
    realWindowsHeight = windowHeight - 104
    resizeCanvas(windowWidth-184, windowHeight-104);
}


function draw() {
    
    speed.draw(0);
    voltage.draw(48);
    current.draw(0);
    miles.draw(0);
    ampHrs.draw(48.6548);

    Motor_Temp.draw(63);
    Battery_Temp_1.draw(45);
    Battery_Temp_2.draw(44);

    // circle(200,500,20)
}

