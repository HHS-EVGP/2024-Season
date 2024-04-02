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
} 
updateContent();

var realWindowsWidth, realWindowsHeight;


objects[0] = new odometer_counter(75*8,140,'Amp Hours',0.7);
objects[1]= new odometer(75*3,100,'Voltage','V',53,43,0.7,0);
objects[2] = new odometer(75*5,100,'Current','amps',150,-20,0.7,6);
objects[3] = new odometer(75,100,'Speed','mph',50,0,0.7);
objects[4] = new odometer_counter(75*8,50,'Miles',0.7);

objects[5] = new odometer(75*2.75,300+150/2,'Motor Temp',"°F",150,32,0.7,4);
objects[6] = new odometer(75,300,'Temp 1',"°F",120,32,0.7,4);
objects[7] = new odometer(75,450,'Temp 2',"°F",120,32,0.7,4);

objects[8] = new graph(400,200,'Acceleration. X',0.9,"Counter","m per s^2");
objects[9] = new graph(589,200,'Acceleration. Y',0.9,"Counter","m per s^2");
objects[10] = new graph(778,200,'Acceleration. Z',0.9,"Counter","m per s^2");
objects[11] = new graph(400,344,'Gyroscopic. X',0.9,"Counter","Value?");
objects[12] = new graph(589,344,'Gyroscopic. Y',0.9,"Counter","Value?");
objects[13] = new graph(778,344,'Gyroscopic. Z',0.9,"Counter","Value?");

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
    realWindowsWidth = windowWidth - 184;
    realWindowsHeight = windowHeight - 104;
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


        }else{
            if(!hidden[i]){
                objects[i].hide();
                hidden[i] = true;
            }
        }
    }
}

