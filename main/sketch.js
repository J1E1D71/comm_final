var serial;
var latestData = "waiting for data";
var init_x = 500;
var init_y = 600;
var main_state = 1;
var intro_video;
var delay;
var but_down;
var but_down_prev;


function setup() {
    createCanvas(windowWidth, windowHeight);

    serial = new p5.SerialPort();
    serial.list();
    serial.open("/dev/cu.usbmodem1421");
    serial.on('connected', serverConnected);
    serial.on('list', gotList);
    serial.on('data', gotData);
    serial.on('error', gotError);
    serial.on('open', gotOpen);

    img1 = loadImage("media/pics/big_one.jpg");
    img2 = loadImage("media/pics/stand1.png");

    intro_video = createVideo(['media/videos/Intro_sequence.mp4']);
    intro_video.hide();
    intro_video.autoplay();

    delay = new p5.Delay();

    but_down = 0;

}

function serverConnected() {
    println("Connected to Server");
}

function gotList(thelist) {
    println("List of Serial Ports:");
    for (var i = 0; i < thelist.length; i++) {
        println(i + " " + thelist[i]);
    }
}

function gotOpen() {
    println("Serial Port is Open");
}

function gotError(theerror) {
    println(theerror);
}

function gotData() {
    var currentString = serial.readLine();
    trim(currentString);
    if (!currentString) return;
    latestData = currentString;
}

function gotRawData(thedata) {
    println("gotRawData" + thedata);
}

function draw() {

    background(255, 255, 255);

    fill(255, 255, 255);
    // text(latestData, 10, 10);

    var total_data = latestData.split(",");

    var joy_x = parseInt(total_data[0]);
    var joy_y = parseInt(total_data[1]);
    var acc_x = parseInt(total_data[2]);
    var acc_y = parseInt(total_data[3]);
    var acc_x = parseInt(total_data[4]);
    // var but_down = parseInt(total_data[5]);
    var but_up = parseInt(total_data[6]);

    // console.log(main_state);
    console.log("but_down" + but_down);
    console.log("but_down_prev" + but_down_prev);


    if (main_state === 1) {
        image(intro_video, 0, 0, windowWidth, windowHeight);
        intro_video.onended(function () {
            main_state = 2;
        })

        if (but_down === 1 && but_down_prev === 0) {
            main_state = 2;
        }
    }

    if (main_state === 2) {
        textAlign(CENTER, CENTER);
        textSize(320);
        fill(0);
        text('The Game', windowWidth / 2, windowHeight / 2 - 300);
        text('of', windowWidth / 2, windowHeight / 2);
        text('Life', windowWidth / 2, windowHeight / 2 + 300);

        if (but_down === 1 && but_down_prev === 0) {
            main_state = 3;
        }
    }

    if (main_state === 3) {
        image(img1, 0, 0, windowWidth, windowHeight);

    }


    strokeWeight(3);
    ellipse(init_x, init_y, 20, 20);

    var x_increas = int(map(joy_x, 133, 219, 0, 7));
    var y_increas = int(map(joy_y, 129, 216, 0, 7));

    init_x += x_increas;
    init_y -= y_increas;

    but_down_prev = but_down;



}

function keyPressed() {
    if (keyCode === 80) {
        but_down = 1;
    } else {
        but_down = 0;
    }
}
