The Game of Life
=============

The Game of Life is a interactive web game created by Dylan Wang and Antonia Li designed with [p5.js][1].

What do you need to run this game
---- 
- A Computer running either Windows or MacOS.
- [Arduino][2], an open-source electronics platform based on easy-to-use hardware and software.
- [An Nintendo Wii Nunchuck][3].
- [The WiiChuck Adapter (Arduino Compatible)][4].

How can you run the game
---- 
1. Download or clone this GitHub repository to your computer.
2. Connect you Arduino board with your Nintendo Wii Nunchuck using the WiiChuck Adapter as the following circuit.
![img_3083](https://user-images.githubusercontent.com/32665343/39795282-b5fdf308-5381-11e8-8b3b-9a062f12f930.JPG)
3. Open Arduino and load the code under the folder ./wiichuck-arduino as shown in the following screenshot and upload the code to your board.
<img width="877" alt="screen shot 2018-05-09 at 11 57 00" src="https://user-images.githubusercontent.com/32665343/39795156-d4342df2-5380-11e8-98a9-6eebbebd869d.png">
4. Check the name of the serial port your Arduino is using and change it in main/sketch.js to match yours. In my case, my serial port name is */dev/tty.usbmodem1421*, and yours should look like that.














p5.serialport 
=============

A [p5.js][5] library that enables communication between your p5 sketch and Arduino (or another serial enabled device). 

What Does it Do?
---- 

p5.serialport more or less clones the [Processing Serial Library API][6]. As JavaScript in a browser can not interact directly with a serial port, this library solves this. p5.serialport comes in two flavors; one is a simple app, this is good for all skill levels and is the easiest to use; second is Node.js based WebSocket server, this is for more skilled advanced users or someone who needs heavy customization.

p5.serial App
---- 

To begin download and run a [release of p5.serialcontrol][7]. This application incorporates p5.serialserver in a GUI application for MacOS and Windows.

Once you have the application launched load one of the [examples/][8] in your browser to see it in action.  

* You'll likely have to change the name of the serial port in the examples to the one your Arduino is using.

p5.serial Node.js
---- 

To Use:

Connect an Arduino or other serial device to your computuer.

Clone or download this repo and install the dependencies with: `npm install` and start the server with: `node startserver.js`

Alternatively, you can install the server globally via npm with `sudo npm install -g p5.serialserver`  and then run it with `p5serial` or locally with `npm install p5.serialserver` and run it from the node\_modules directory with `node startserver.js`

Then load one of the [examples/][9] in your browser to see it in action.  

* You'll likely have to change the name of the serial port in the examples to the one your Arduino is using.

API
---

[API documentation now available][10]

The basics:
```javascript
var serial;

function setup() {
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1421");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
    print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readStringUntil("\r\n");
  console.log(currentString);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer

function draw() {
  // Polling method
/*
  if (serial.available() > 0) {
    var data = serial.read();
    ellipse(50,50,data,data);
  }
*/
}
```

### Documentation
To generate documentation, install yuidoc (`npm install -g yuidocjs`) and run
`yuidoc -c yuidoc.json ./lib`

[1]:	http://p5js.org/
[2]:	https://www.arduino.cc
[3]:	https://www.amazon.com/Wii-Nunchuk-Controller-White-nintendo/dp/B000IMYKQ0?th=1
[4]:	https://www.dfrobot.com/product-91.html
[5]:	http://p5js.org/
[6]:	https://processing.org/reference/libraries/serial/index.html
[7]:	https://github.com/vanevery/p5.serialcontrol/releases
[8]:	https://github.com/vanevery/p5.serialport/tree/master/examples
[9]:	https://github.com/vanevery/p5.serialport/tree/master/examples
[10]:	http://vanevery.github.io/p5.serialport/docs/classes/p5.serialport.html
