let items = [];
let Allitems = ['ca_AmpHrs', 'ca_Voltage', 'ca_Current', 'ca_Speed', 'ca_Miles', 'motor_temp', 'Battery_1', 'Battery_2', 'IMU_Accel_x', 'IMU_Accel_y', 'IMU_Accel_z', 'IMU_Gyro_x', 'IMU_Gyro_y', 'IMU_Gyro_z', 'Brake_Pedal', 'throttle', 'counter', 'time'];
var hidden = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
var objects = [];

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
        fill('#17202A');
        arc(this.x, this.y, this.size, this.size, PI-QUARTER_PI, PI-QUARTER_PI + (((270/(this.max-this.min))*(this.value-this.min))*PI/180));
        fill('#5D6D7E'); 
        circle(this.x, this.y, this.size*0.9);
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
        let angle = (((270/(this.max-this.min))*(this.value-this.min))-135)*PI/180;
        let x = this.x + this.size*0.45 * sin(angle);
        let y = this.y - this.size*0.45 * cos(angle);
        let y1 = this.y - this.size*0.3 * cos(angle) + this.size*0.025 * sin(angle);
        let x1 = this.x + this.size*0.3 * sin(angle) + this.size*0.025 * cos(angle);
        let y2 = this.y - this.size*0.3 * cos(angle) - this.size*0.025 * sin(angle);
        let x2 = this.x + this.size*0.3 * sin(angle) - this.size*0.025 * cos(angle);
        triangle(x, y, x1, y1, x2, y2);
    }
    setup(){
        strokeWeight(0);
        fill('#5D6D7E');
        circle(this.x, this.y, this.size);
        fill('#D6DBDF');    
        arc(this.x, this.y, this.size, this.size, PI - QUARTER_PI , QUARTER_PI);
        fill('#5D6D7E'); 
        circle(this.x, this.y, this.size*0.9);
        textSize(this.size*0.075);
        fill('#17202A'); 
        text( "__" + this.rate, this.x, this.y - this.size*0.1);
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
    }
    hide(){
        strokeWeight(0);
        fill('white'); 
        circle(this.x, this.y, this.size*1.01);
    }
}

class odometer_counter {
    constructor(x,y,title,size=1) {
        this.x = x;            // X Location
        this.y = y;            // Rate (Relates to the value)
        this.size = size*200;  // Size of Odometer
        this.title = title;    // Name of Odometer
    }
    draw(value) {
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
        textSize((this.size/2)-(this.size/100));
        let strNum = value.toFixed(3);
        let parts = strNum.replace('.', '').split('');
        let result = parts.map(digit => parseInt(digit, 10));
        while (result.length < 6) {
            result.unshift(0);
        }
        let numbers = [];
        numbers = result;
        for (let i = 0; i < 6; i++) {
            text(
                numbers[i],
                this.x-5*(this.size*2)/12+i*(this.size*2)/6,
                this.y+(this.size/30)
            );
        };
        fill("red");
        text(
            ".",
            this.x,
            this.y+(this.size/30)
        );
        textSize(this.size*0.125);
        fill("#17202A");
        text(
            this.title,
            this.x,
            this.y-(this.size/3.4)
        );
    }
    setup(){
        var value = 0;
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
        textSize((this.size/2)-(this.size/100));
        let strNum = value.toFixed(3);
        let parts = strNum.replace('.', '').split('');
        let result = parts.map(digit => parseInt(digit, 10));
        while (result.length < 6) {
            result.unshift(0);
        }
        let numbers = [];
        numbers = result;
        for (let i = 0; i < 6; i++) {
            text(
                numbers[i],
                this.x-5*(this.size*2)/12+i*(this.size*2)/6,
                this.y+(this.size/30)
            );
        };
        fill("red");
        text(
            ".",
            this.x,
            this.y+(this.size/30)
        );
        textSize(this.size*0.125);
        fill("#17202A");
        text(
            this.title,
            this.x,
            this.y-(this.size/3.4)
        );
    }
    hide(){
        strokeWeight(0);
        fill("white");
        rect(
            this.x-this.size*1.01,
            this.y-this.size/2.8-1,
            this.size*2.02,
            this.size*0.615+1
        );
    }
}

class graph {
    constructor(x,y,title,size=1,x_axis_title="Counter",y_axis_title="Value",unit="") {
        this.x = x;            // X Location
        this.y = y;            // Y Location
        this.size = size*200;
        this.title = title;
        this.x_title = x_axis_title;
        this.y_title = y_axis_title;
        this.unit = unit;
    }
    draw(x_values,y_values){
        setup();

        let leng = x_values.length;
        let y_min = min(y_values);
        let y_max = max(y_values);

        console.log(y_min)

        for (let i = 0; i < leng; i++) {
            let x_point = (this.x-this.size/2+(1/8)*this.size) + (((i+0.5)/leng)*((this.x+this.size/2-(6*this.size/200))-(this.x-this.size/2+(1/8)*this.size)) + (2.5/64*this.size));
            let x_point3 = (this.x-this.size/2+(1/8)*this.size) + ((((i+1)+0.5)/leng)*((this.x+this.size/2-(6*this.size/200))-(this.x-this.size/2+(1/8)*this.size)) + (2.5/64*this.size));
            let y_point = (this.y+(18*this.size/200)) + (i/10*((this.y+this.size*(3/4)*(7/8)-(6*this.size/200))-(this.y+(18*this.size/200))));
            let y_point2 = map(
                y_values[i],
                y_min,
                y_max,
                (this.y+(18*this.size/200)) + ((leng-1)/10*((this.y+this.size*(3/4)*(7/8)-(6*this.size/200))-(this.y+(18*this.size/200)))),
                (this.y+(18*this.size/200)) + (0/10*((this.y+this.size*(3/4)*(7/8)-(6*this.size/200))-(this.y+(18*this.size/200))))
                );
            let y_point3 = map(
                y_values[i+1],
                y_min,
                y_max,
                (this.y+(18*this.size/200)) + ((leng-1)/10*((this.y+this.size*(3/4)*(7/8)-(6*this.size/200))-(this.y+(18*this.size/200)))),
                (this.y+(18*this.size/200)) + (0/10*((this.y+this.size*(3/4)*(7/8)-(6*this.size/200))-(this.y+(18*this.size/200))))
                );
            //X
            text(
                x_values[i],
                x_point,
                this.y+this.size*(3/4)*(7/8)+(6*this.size/200)
            );
            textAlign(RIGHT, CENTER);
            text(
                round(y_min+(y_max-y_min)*(map(i,0,(leng-1),1,0)),1),
                this.x-this.size/2+(11/64)*this.size - (1*this.size/200),
                y_point
            );
            textAlign(CENTER, CENTER);
            strokeWeight(3);
            point(
                x_point,
                y_point2
            );
            strokeWeight(1);
            line(
                x_point,
                y_point2,
                x_point3,
                y_point3
            );
        }
    }
    setup(){
        strokeWeight(0);
        fill("#dbdbdb");
        rect(this.x-this.size/2,this.y,this.size,this.size*3/4);
        strokeWeight(1);
        fill("black");
        line(
            this.x-this.size/2+(11/64)*this.size,
            this.y+this.size*(3/4)*(7/8),
            this.x+this.size/2,
            this.y+this.size*(3/4)*(7/8)
        );
        line(
            this.x-this.size/2+(11/64)*this.size,
            this.y,
            this.x-this.size/2+(11/64)*this.size,
            this.y+this.size*(3/4)*(7/8)
        );
        
        textSize(10*this.size/200);
        text(
            this.x_title,
            this.x,
            this.y+this.size*(3/4)-4*this.size/200
        );
        let list_of_y_axis = [];
        for (let i = 0; i < this.y_title.length; i++) {
            list_of_y_axis[i] = (this.y_title)[i];
            if(this.y_title.length%2 == 1){
                text(
                    list_of_y_axis[i],
                    this.x-this.size/2+5*this.size/200,
                    this.y+this.size*(3/4)*(1/2)+(9*this.size/200)*(i-(this.y_title.length-1)/2)
                );
            }else{
                text(
                    list_of_y_axis[i],
                    this.x-this.size/2+5*this.size/200,
                    this.y+this.size*(3/4)*(1/2)+(9*this.size/200)*(i-(this.y_title.length)/2)
                );
            }
        }
        text(
            this.title,
            this.x,
            this.y+6*this.size/200
        );
    }
    hide(){
        strokeWeight(0);
        fill("white");
        rect(this.x-this.size/2,this.y,this.size,this.size*3/4)
    }
}


objects[0] = new odometer_counter(75*8,140,'Amp Hours',0.7);
objects[1]= new odometer(75*3,100,'Voltage','V',53,43,0.7,0);
objects[2] = new odometer(75*5,100,'Current','amps',150,-20,0.7,6);
objects[3] = new odometer(75,100,'Speed','mph',50,0,0.7);
objects[4] = new odometer_counter(75*8,50,'Miles',0.7);

objects[5] = new odometer(75*2.75,300+150/2,'Motor Temp',"°F",150,32,0.7,4);
objects[6] = new odometer(75,300,'Temp 1',"°F",120,32,0.7,4);
objects[7] = new odometer(75,450,'Temp 2',"°F",120,32,0.7,4);

objects[8] = new graph(600,200,'Acl. X',1);
objects[9] = new graph(825,200,'Acl. Y',1);
objects[10] = new graph(1050,200,'Acl. Z',1);
objects[11] = new graph(600,375,'Gry. X',1);
objects[12] = new graph(825,375,'Gry. Y',1);
objects[13] = new graph(1050,375,'Gry. Z',1);

function setup() {
    realWindowsWidth = windowWidth - 184;
    realWindowsHeight = windowHeight - 104;
    var canvas = createCanvas(windowWidth-184, windowHeight-104);
    canvas.parent('p5Canvas');

    textAlign(CENTER,CENTER);
    frameRate(20);

    for (let i = 0; i < 14; i++) {
        objects[i].setup();
    }

}

function windowResized() {  
    realWindowsWidth = windowWidth - 184
    realWindowsHeight = windowHeight - 104
    resizeCanvas(windowWidth-184, windowHeight-104);

    for (let i = 0; i < 14; i++) {
        objects[i].setup();
    }
}

function draw() {
    for (let i = 0; i < 14; i++) {
        // console.log(i, items.includes(Allitems[i]),hidden[i]);

        if(items.includes(Allitems[i])){
            if(hidden[i]){
                hidden[i] = false;
                objects[i].setup();
            }
            //Update the object if it is live HERE

            objects[8].draw([1,2,3,4,5,6,7,8,9,10],[5,9,3,7,15,8,1,82,0,20])


        }else{
            if(!hidden[i]){
                objects[i].hide();
                hidden[i] = true;
            }
        }
    }
}

