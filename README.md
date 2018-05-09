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
3. Open Arduino and load the code under the folder `./wiichuck-arduino` and upload the code to your board.

4. Check the name of the serial port your Arduino is using and change it in `main/sketch.js` to match yours. In my case, my serial port name is `/dev/tty.usbmodem1421`, and yours should look like that.
5. Open terminal, change the directory to this folder, install the dependencies with: 
```
npm install
``` 
and start the server with: 
```
node startserver.js
```
6. Open another tab in terminal under that same directory, and build your local server to host the website. If you have Python installed on your machine, the simpliest way is to run 
```
python -m SimpleHTTPServer
```
in the terminal. And if you are using Python 3, use this instead:
```
python -m http.server
```
And more Options are offered [here][11].

7. Open your browser and enter the page. In my case, I just need to visit `http://localhost:8000/main/` and the game will start. 



[1]:	http://p5js.org/
[2]:	https://www.arduino.cc
[3]:	https://www.amazon.com/Wii-Nunchuk-Controller-White-nintendo/dp/B000IMYKQ0?th=1
[4]:	https://www.dfrobot.com/product-91.html
[11]: https://github.com/processing/p5.js/wiki/Local-server
