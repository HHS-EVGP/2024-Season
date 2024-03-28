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

function setup() {
    realWindowsWidth = windowWidth - 184
    realWindowsHeight = windowHeight - 104
    var canvas = createCanvas(windowWidth-184, windowHeight-104);
    canvas.parent('p5Canvas'); // Make sure this ID matches the one in your div
}
function windowResized() {
    realWindowsWidth = windowWidth - 184
    realWindowsHeight = windowHeight - 104
    resizeCanvas(windowWidth-184, windowHeight-104);
  }
  
function draw() {
    background(220);
}

