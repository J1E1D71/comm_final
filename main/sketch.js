var serial;
var latestData = "waiting for data";
var init_x = 500;
var init_y = 600;
var x_increas;
var y_increas;
var main_state = 1;
var intro_video;
var but_down;
var but_down_prev;
var but_up;
var but_up_prev;
var left_pics;
var number_for_iter = 0;
var used_for_state_13 = false;
var used_for_state_14 = false;
var used_for_state_15 = false;
var used_for_state_16 = false;
var show_map = false;
var times_of_but_up = 0;
var times_for_audio = 0

function preload() {
    sound_test = loadSound("media/audios/test.wav");
    sound_test_2 = loadSound("media/audios/test_2.wav");
    intro_video = createVideo(['media/videos/Intro_sequence.mp4']);
    intro_video.hide();

}


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

    bedroom_bed = loadImage("media/pics/bedroom_bed.jpg");
    bedroom_bed_update = loadImage("media/pics/bedroom_bed_update.jpg");
    bedroom_posterwall = loadImage("media/pics/bedroom_posterwall.jpg");
    bedroom_tvwall = loadImage("media/pics/bedroom_tvwall.jpg");

    stand = loadImage("media/pics/stand1.png");
    stand_left_1 = loadImage("media/pics/stand_left_1.png");
    stand_left_2 = loadImage("media/pics/stand_left_2.png");
    stand_left_3 = loadImage("media/pics/stand_left_3.png");
    stand_left_4 = loadImage("media/pics/stand_left_4.png");
    stand_left_5 = loadImage("media/pics/stand_left_5.png");
    stand_left_6 = loadImage("media/pics/stand_left_6.png");
    stand_left_7 = loadImage("media/pics/stand_left_7.png");
    stand_left_8 = loadImage("media/pics/stand_left_8.png");

    left_pics = [stand_left_1, stand_left_2, stand_left_3, stand_left_4, stand_left_5, stand_left_6, stand_left_7, stand_left_8];

    sign1 = loadImage("media/pics/sign_1.jpg");
    sign2 = loadImage("media/pics/sign_2.jpg");
    sign3 = loadImage("media/pics/sign_3.jpg");
    sign4 = loadImage("media/pics/sign_4.jpg");
    sign5 = loadImage("media/pics/sign_5.jpg");
    sign6 = loadImage("media/pics/sign_6.jpg");
    sign7 = loadImage("media/pics/sign_7.jpg");
    sign8 = loadImage("media/pics/sign_8.jpg");
    sign9 = loadImage("media/pics/sign_9.jpg");

    note_boxing = loadImage("media/pics/note_boxing.jpg");
    note_poster = loadImage("media/pics/note_poster.jpg");

    map_1 = loadImage("media/pics/map.png")

    // sound_test.play();
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
    var but_down = parseInt(total_data[5]);
    var but_up = parseInt(total_data[6]);

    // console.log(main_state);
    // console.log("but_down" + but_down);
    // console.log("but_down_prev" + but_down_prev);

    // INTRO VIDEO
    if (main_state === 1) {
        image(intro_video, 0, 0, windowWidth, windowHeight);
        // if (!intro_video.isPlaying()){
        //     intro_video.play();
        // }
        intro_video.play();

        intro_video.onended(function () {
            main_state = 2;
        })

        if (but_down === 1 && but_down_prev === 0) {
            main_state = 2;
            but_down_prev = 1
            intro_video.stop();
        }
    }

    // GAME TITLE
    else if (main_state === 2) {
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


    // INTRO SIGNS
    else if (main_state === 3) {


        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        image(sign1, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
        image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        if (but_down === 1 && but_down_prev === 0) {
            main_state = 4;
        }

        if (init_x > windowWidth * (0.7)) {
            init_x = windowWidth * (0.7);
        }

        if (init_x < windowWidth * (-0.2)) {
            init_x = windowWidth * (-0.2);
        }

    }

    else if (main_state === 4) {
        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        image(sign2, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
        image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        if (but_down === 1 && but_down_prev === 0) {
            main_state = 5;
        }

        if (init_x > windowWidth * (0.7)) {
            init_x = windowWidth * (0.7);
        }

        if (init_x < windowWidth * (-0.2)) {
            init_x = windowWidth * (-0.2);
        }

    }

    else if (main_state === 5) {
        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        image(sign3, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
        image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        // if (!sound_test.isPlaying() && times_for_audio === 0) {
        //     sound_test.play();
        //     times_for_audio += 1;

        // }


        if (but_down === 1 && but_down_prev === 0) {
            main_state = 6;
        }

        if (init_x > windowWidth * (0.7)) {
            init_x = windowWidth * (0.7);
        }

        if (init_x < windowWidth * (-0.2)) {
            init_x = windowWidth * (-0.2);
        }

    }

    else if (main_state === 6) {
        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        image(sign4, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
        image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        if (but_down === 1 && but_down_prev === 0) {
            main_state = 7;
        }

        if (init_x > windowWidth * (0.7)) {
            init_x = windowWidth * (0.7);
        }

        if (init_x < windowWidth * (-0.2)) {
            init_x = windowWidth * (-0.2);
        }

    }

    else if (main_state === 7) {
        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        image(sign5, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
        image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        if (but_down === 1 && but_down_prev === 0) {
            main_state = 8;
        }

        if (init_x > windowWidth * (0.7)) {
            init_x = windowWidth * (0.7);
        }

        if (init_x < windowWidth * (-0.2)) {
            init_x = windowWidth * (-0.2);
        }

    }
    else if (main_state === 8) {
        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        image(sign6, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
        image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        if (but_down === 1 && but_down_prev === 0) {
            main_state = 9;
        }

        if (init_x > windowWidth * (0.7)) {
            init_x = windowWidth * (0.7);
        }

        if (init_x < windowWidth * (-0.2)) {
            init_x = windowWidth * (-0.2);
        }

    }

    else if (main_state === 9) {
        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        image(sign7, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
        image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        if (but_down === 1 && but_down_prev === 0) {
            main_state = 10;
        }

        if (init_x > windowWidth * (0.7)) {
            init_x = windowWidth * (0.7);
        }

        if (init_x < windowWidth * (-0.2)) {
            init_x = windowWidth * (-0.2);
        }

    }

    else if (main_state === 10) {
        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        image(sign8, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
        image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        if (but_down === 1 && but_down_prev === 0) {
            main_state = 11;
        }

        if (init_x > windowWidth * (0.7)) {
            init_x = windowWidth * (0.7);
        }

        if (init_x < windowWidth * (-0.2)) {
            init_x = windowWidth * (-0.2);
        }

    }

    else if (main_state === 11) {
        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        image(sign9, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
        image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        if (but_down === 1 && but_down_prev === 0) {
            main_state = 12;
        }

        if (init_x > windowWidth * (0.7)) {
            init_x = windowWidth * (0.7);
        }

        if (init_x < windowWidth * (-0.2)) {
            init_x = windowWidth * (-0.2);
        }

    }


    // BED INITIAL
    else if (main_state === 12) {
        if (x_increas < 0) {
            number_for_iter++;
        }

        var pic_index = int(number_for_iter / 2) % 8;

        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        if (init_x > windowWidth * 0.6 && init_x < windowWidth * 0.7) {
            image(bedroom_bed_update, 0, 0, windowWidth, windowHeight);
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            image(note_boxing, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
        }

        if (init_x < windowWidth * (-0.2)) {
            main_state = 15;
        }

        if (init_x > windowWidth * (0.8)) {
            main_state = 16;
        }
    }

    // BED FROM LEFT
    else if (main_state === 13) {
        used_for_state_15 = false;

        if (x_increas < 0) {
            number_for_iter++;
        }

        if (used_for_state_13 === false) {
            init_x = windowWidth * (-0.19);
        }

        var pic_index = int(number_for_iter / 2) % 8;

        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        if (init_x > windowWidth * 0.6 && init_x < windowWidth * 0.7) {
            image(bedroom_bed_update, 0, 0, windowWidth, windowHeight);
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            image(note_boxing, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
        }

        if (init_x < windowWidth * (-0.2)) {
            main_state = 15;
        }

        if (init_x > windowWidth * (0.8)) {
            main_state = 16;
        }

        used_for_state_13 = true;
    }

    // BED FROM RIGHT
    else if (main_state === 14) {
        used_for_state_16 = false;

        if (used_for_state_14 === false) {
            init_x = windowWidth * 0.7;
        }

        if (x_increas < 0) {
            number_for_iter++;
        }

        var pic_index = int(number_for_iter / 2) % 8;

        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        if (init_x > windowWidth * 0.6 && init_x < windowWidth * 0.7) {
            image(bedroom_bed_update, 0, 0, windowWidth, windowHeight);
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            image(note_boxing, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
        }

        if (init_x < windowWidth * (-0.2)) {
            main_state = 15;
        }

        if (init_x > windowWidth * (0.8)) {
            main_state = 16;
        }

        used_for_state_14 = true;
    }



    // POSTER WALL
    else if (main_state === 15) {
        used_for_state_13 = false;
        used_for_state_14 = false;


        if (used_for_state_15 === false) {
            init_x = windowWidth * 0.7;
        }

        image(bedroom_posterwall, 0, 0, windowWidth, windowHeight);
        image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        if (init_x > windowWidth * (0.8)) {
            main_state = 13;
        }

        used_for_state_15 = true;

        // if (init_x > windowWidth * 0.6 && init_x < windowWidth * 0.7) {
        //     image(bedroom_bed_update, 0, 0, windowWidth, windowHeight);
        //     image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        //     image(note_boxing, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8)
        // }


    }


    // TV WALL
    else if (main_state === 16) {
        used_for_state_13 = false;
        used_for_state_14 = false;

        if (used_for_state_16 === false) {
            init_x = windowWidth * (-0.19);
        }

        image(bedroom_tvwall, 0, 0, windowWidth, windowHeight);
        image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        if (init_x < windowWidth * (-0.2)) {
            main_state = 14;
        }

        if (init_x > windowWidth * (0.7)) {
            init_x = windowWidth * (0.7);
        }

        used_for_state_16 = true;

        // if (init_x > windowWidth * 0.6 && init_x < windowWidth * 0.7) {
        //     image(bedroom_bed_update, 0, 0, windowWidth, windowHeight);
        //     image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        //     image(note_boxing, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8)
        // }


    }


    // MAP
    if (but_up === 1 && but_up_prev === 0) {
        show_map = true;
        but_down_prev = 1;
    }

    if (but_up === 0 && but_up_prev === 1) {
        if (times_of_but_up === 2) {
            show_map = false
            times_of_but_up = 0;
        }
        but_down_prev = 1;
        times_of_but_up += 1;
    }


    if (show_map === true) {
        image(map_1, 0, 0);
        // if (!sound_test.isPlaying()) {
        //     // sound_test.play();
        //     // sound_test.noLoop();
        // }
    }


    // strokeWeight(3);
    // ellipse(init_x, init_y, 20, 20);

    x_increas = int(map(joy_x, 133, 219, 0, 10));
    y_increas = int(map(joy_y, 129, 216, 0, 10));

    init_x += x_increas;
    init_y -= y_increas;

    but_down_prev = but_down;
    but_up_prev = but_up;



}