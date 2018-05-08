var serial;
var latestData = "waiting for data";
var init_x = 500;
var init_y = 600;
var x_increas;
var y_increas;
var main_state = 2;
var intro_video;
var but_down;
var but_down_prev;
var but_up;
var but_up_prev;
var left_pics;
var right_pics;
var number_for_iter = 0;
var used_for_state_13 = false;
var used_for_state_14 = false;
var used_for_state_15 = false;
var used_for_state_16 = false;
var show_map = false;
var times_of_but_up = 0;
var times_for_audio = 0;
var got_key = false;
var count_for_text = 0;

function preload() {
    sound_test = loadSound("media/audios/test.wav");
    sound_test_2 = loadSound("media/audios/test_2.wav");
    // intro_video = createVideo(['media/videos/Intro_sequence.mp4']);
    // intro_video.hide();

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

    instruction_main = loadImage("media/pics/instruction.jpg");
    instruction_up = loadImage("media/pics/instruction_up.jpg");
    instruction_down = loadImage("media/pics/instruction_down.jpg");
    instruction_joystick = loadImage("media/pics/instruction_j.jpg");

    bedroom_bed = loadImage("media/pics/bedroom_bed.jpg");
    bedroom_bed_update = loadImage("media/pics/bedroom_bed_update.jpg");
    bedroom_posterwall = loadImage("media/pics/bedroom_posterwall.jpg");
    bedroom_posterwall_update_1 = loadImage("media/pics/bedroom_posterwall_update_1.jpg");
    bedroom_posterwall_update_2 = loadImage("media/pics/bedroom_posterwall_update_2.jpg");
    bedroom_posterwall_update_3 = loadImage("media/pics/bedroom_posterwall_update_3.jpg");
    poster_1 = loadImage("media/pics/poster_1.jpg");
    poster_1_note = loadImage("media/pics/paper_wall_poster_sign_2.jpg");
    poster_2 = loadImage("media/pics/poster_2.jpg");
    poster_2_note = loadImage("media/pics/paper_wall_poster_sign_1.jpg");
    poster_3 = loadImage("media/pics/poster_3.jpg");
    poster_3_note = loadImage("media/pics/paper_wall_poster_sign_3.jpg");
    bedroom_tvwall = loadImage("media/pics/bedroom_tvwall.jpg");
    bedroom_tvwall_update_1 = loadImage("media/pics/bedroom_tvwall_update_1.jpg");
    bedroom_tvwall_update_2 = loadImage("media/pics/bedroom_tvwall_update_2.jpg");
    tvwall_note_1 = loadImage("media/pics/tvwall_note_1.jpg");
    tvwall_note_2 = loadImage("media/pics/tvwall_note_2.jpg");
    door_locked_pic = loadImage("media/pics/door_locked.jpg");
    got_key_note = loadImage("media/pics/keys_get.jpg");

    stand = loadImage("media/pics/stand.png");
    stand_left_1 = loadImage("media/pics/stand_left_1.png");
    stand_left_2 = loadImage("media/pics/stand_left_2.png");
    stand_left_3 = loadImage("media/pics/stand_left_3.png");
    stand_left_4 = loadImage("media/pics/stand_left_4.png");
    stand_left_5 = loadImage("media/pics/stand_left_5.png");
    stand_left_6 = loadImage("media/pics/stand_left_6.png");

    stand_right_1 = loadImage("media/pics/stand_right_1.png");
    stand_right_2 = loadImage("media/pics/stand_right_2.png");
    stand_right_3 = loadImage("media/pics/stand_right_3.png");
    stand_right_4 = loadImage("media/pics/stand_right_4.png");
    stand_right_5 = loadImage("media/pics/stand_right_5.png");
    stand_right_6 = loadImage("media/pics/stand_right_6.png");


    left_pics = [stand_left_1, stand_left_2, stand_left_3, stand_left_4, stand_left_5, stand_left_6];
    right_pics = [stand_right_1, stand_right_2, stand_right_3, stand_right_4, stand_right_5, stand_right_6];

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
        // intro_video.play();

        // intro_video.onended(function () {
        //     main_state = 2;
        // })

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
            main_state = 500;
        }
    }


    else if (main_state === 500) {
        image(instruction_main, 0, 0, windowWidth, windowHeight);
        if (but_down === 1) {
            image(instruction_down, 0, 0, windowWidth, windowHeight);
            count_for_text += 1;
        }
        if (but_up === 1) {
            image(instruction_up, 0, 0, windowWidth, windowHeight);
        }
        if (x_increas != 0) {
            image(instruction_joystick, 0, 0, windowWidth, windowHeight);
        }

        if (count_for_text > 30) {
            main_state = 3;
        }
    }


    // INTRO SIGNS
    else if (main_state === 3) {


        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        image(sign1, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);

        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

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
        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

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
        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

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
        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

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
        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

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
        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

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
        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

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
        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

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
        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

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

        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

        if (init_x > windowWidth * 0.6 && init_x < windowWidth * 0.7) {
            image(bedroom_bed_update, 0, 0, windowWidth, windowHeight);

            image(note_boxing, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
            // person move
            if (x_increas < 0 || x_increas > 0) {
                number_for_iter++;
            }
            var pic_index = int(number_for_iter / 3) % 6;
            if (x_increas === 0) {
                image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            } else if (x_increas < 0) {
                image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

            } else if (x_increas > 0) {
                image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            }
            // person move ends
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

        if (used_for_state_13 === false) {
            init_x = windowWidth * (-0.19);
        }


        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

        if (init_x > windowWidth * 0.6 && init_x < windowWidth * 0.7) {
            image(bedroom_bed_update, 0, 0, windowWidth, windowHeight);
            // person move
            if (x_increas < 0 || x_increas > 0) {
                number_for_iter++;
            }
            var pic_index = int(number_for_iter / 3) % 6;
            if (x_increas === 0) {
                image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            } else if (x_increas < 0) {
                image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

            } else if (x_increas > 0) {
                image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            }
            // person move ends
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


        image(bedroom_bed, 0, 0, windowWidth, windowHeight);
        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

        if (init_x > windowWidth * 0.6 && init_x < windowWidth * 0.7) {
            image(bedroom_bed_update, 0, 0, windowWidth, windowHeight);
            image(note_boxing, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
            // person move
            if (x_increas < 0 || x_increas > 0) {
                number_for_iter++;
            }
            var pic_index = int(number_for_iter / 3) % 6;
            if (x_increas === 0) {
                image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            } else if (x_increas < 0) {
                image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

            } else if (x_increas > 0) {
                image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            }
            // person move ends
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
        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

        if (init_x > windowWidth * (0.8)) {
            main_state = 13;
        }

        used_for_state_15 = true;

        if (init_x > windowWidth * 0.5 && init_x < windowWidth * 0.62) {
            image(bedroom_posterwall_update_1, 0, 0, windowWidth, windowHeight);
            // person move
            if (x_increas < 0 || x_increas > 0) {
                number_for_iter++;
            }
            var pic_index = int(number_for_iter / 3) % 6;
            if (x_increas === 0) {
                image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            } else if (x_increas < 0) {
                image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

            } else if (x_increas > 0) {
                image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            }
            // person move ends
            if (but_down === 1) {
                image(poster_1, 0, 0, windowWidth, windowHeight);
                image(poster_1_note, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
            }
        }

        if (init_x > windowWidth * 0.1 && init_x < windowWidth * 0.2) {
            image(bedroom_posterwall_update_2, 0, 0, windowWidth, windowHeight);
            // person move
            if (x_increas < 0 || x_increas > 0) {
                number_for_iter++;
            }
            var pic_index = int(number_for_iter / 3) % 6;
            if (x_increas === 0) {
                image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            } else if (x_increas < 0) {
                image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

            } else if (x_increas > 0) {
                image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            }
            // person move ends
            if (but_down === 1) {
                image(poster_2, 0, 0, windowWidth, windowHeight);
                image(poster_2_note, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
            }
        }

        if (init_x > windowWidth * (-0.15) && init_x < windowWidth * (0)) {
            image(bedroom_posterwall_update_3, 0, 0, windowWidth, windowHeight);
            // person move
            if (x_increas < 0 || x_increas > 0) {
                number_for_iter++;
            }
            var pic_index = int(number_for_iter / 3) % 6;
            if (x_increas === 0) {
                image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            } else if (x_increas < 0) {
                image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

            } else if (x_increas > 0) {
                image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            }
            // person move ends
            if (but_down === 1) {
                image(poster_3, 0, 0, windowWidth, windowHeight);
                image(poster_3_note, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
            }
        }

        if (init_x <= windowWidth * (-0.2)) {
            if (got_key === false) {
                init_x = windowWidth * (-0.2);
                image(door_locked_pic, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
            }
            else {
                main_state = 17;
            }
        }


    }


    // TV WALL
    else if (main_state === 16) {
        used_for_state_13 = false;
        used_for_state_14 = false;

        if (used_for_state_16 === false) {
            init_x = windowWidth * (-0.19);
        }

        image(bedroom_tvwall, 0, 0, windowWidth, windowHeight);
        // person move
        if (x_increas < 0 || x_increas > 0) {
            number_for_iter++;
        }
        var pic_index = int(number_for_iter / 3) % 6;
        if (x_increas === 0) {
            image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        } else if (x_increas < 0) {
            image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

        } else if (x_increas > 0) {
            image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
        }
        // person move ends

        if (init_x < windowWidth * 0) {
            image(bedroom_tvwall_update_1, 0, 0, windowWidth, windowHeight);
            image(tvwall_note_1, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
            // person move
            if (x_increas < 0 || x_increas > 0) {
                number_for_iter++;
            }
            var pic_index = int(number_for_iter / 3) % 6;
            if (x_increas === 0) {
                image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            } else if (x_increas < 0) {
                image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

            } else if (x_increas > 0) {
                image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            }
            // person move ends
        }

        if (init_x > windowWidth * 0.05 && init_x < windowWidth * 0.15) {
            image(bedroom_tvwall_update_2, 0, 0, windowWidth, windowHeight);
            image(tvwall_note_2, windowWidth * 0.04, windowHeight * 0.04, 769 * 0.8, 207 * 0.8);
            // person move
            if (x_increas < 0 || x_increas > 0) {
                number_for_iter++;
            }
            var pic_index = int(number_for_iter / 3) % 6;
            if (x_increas === 0) {
                image(stand, init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            } else if (x_increas < 0) {
                image(left_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);

            } else if (x_increas > 0) {
                image(right_pics[pic_index], init_x, windowHeight * 0.2, 1000 * 0.6, 1772 * 0.6);
            }
            // person move ends
            if (but_down === 1) {
                got_key = true;
                image(got_key_note, windowWidth * (0.23), windowHeight * (0.4));

            }
        }


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