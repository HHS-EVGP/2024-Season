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

