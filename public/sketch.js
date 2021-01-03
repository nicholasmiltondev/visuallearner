let song;
let slider;
let button;
let fft;
let volhistory = [];
let w;
let x;
let stop;
let img;
let mic;

function toggleSong(){
    if(song.isPlaying()){
        song.pause();
        stop.html("play");
    } else {
        song.play();
        stop.html("pause");
    }
}

function toggleVisual(){
    switch (x) {
        case 0:
        x++;
        break;
        case 1:
        x++;
        break;
        case 2:
        x = 0;
        break;
        default:
        x = 0;
    }
}

function preload(){
    song = loadSound("adventures.mp3");
    img = loadImage('rabbit.png');
}

function setup(){
    x = 0;
    createCanvas(300, 300);
    colorMode(HSB);
    button = createButton("toggle visual");
    button.mousePressed(toggleVisual);
    stop = createButton('pause');
    stop.mousePressed(toggleSong);
    song.play();
    fft = new p5.FFT(0, 64);
    w = width / 64;
    mic = new p5.AudioIn();
    mic.start();
}


function draw(){
    background(img, 1);
    let spectrum = fft.analyze();
    let vol = mic.getLevel();
    switch (x) {
        case 0:
        stroke(255);
        for(let i = 0; i < spectrum.length; i++){
            let amp = spectrum[i];
            let y = map(amp, 0, 256, height, 0);
            line(i*w, height, i*w, y);
        }
        break;
        case 1:
            noStroke();
            for(let i = 0; i < spectrum.length; i++){
                let amp = spectrum[i];
                let y = map(amp, 0, 256, height, 0);
                fill(i, 255, 255);
                rect(i * w, y, w, height - y);
            }
        break;
        case 2:
            ellipse(100, 100, 200, vol * 200);
        break;
        default:
            stroke(255);
            for(let i = 0; i < spectrum.length; i++){
                let amp = spectrum[i];
                let y = map(amp, 0, 256, height, 0);
                line(i*w, height, i*w, y);
            }
    } 



    // var vol = amp.getLevel();
    // volhistory.push(vol);
    // stroke(255, 0, 0);
    // noFill();
//     beginShape();
// for(var i = 0; i < volhistory.length; i++){
//     var y = map(volhistory[i], 0, 1, height/2, 0);
//     vertex(i, y);
// }

//     ellipse(100, 100, 200, vol * 200);
//     endShape();
//     if(volhistory.length > width){
//         volhistory.splice(0, 1);
//     }
}

