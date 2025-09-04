let catSpeechPhrases = [
  "yum! good choice!",
  "that's my \n favorite",
  "let's go to \n the next station!",
  "ready?",
];
let catSpeechIndex = 0;
let showCatSpeech = false;
let catSpeechComplete = false;

let scene2Phrases = [
  "welcome inside \n the bakery!",
  "to make \n your dessert...",
  "you'll visit \n three stations",
  "ready? let's go!",
];
let scene2Index = 0;
let scene2Text = scene2Phrases[0];
let speechText = "hello! welcome to \nbread bound!";
let phrases = [
  "we are happy \nthat you are here!",
  "ready to make \na dessert?",
  "and get a great book \nrecommendation?",
  "great! come on in!"
];
let phraseIndex = 0;
let particles = [];
let sound, bg, img, speech, font;
let textColor = '#000000';
let scene = "welcome"; // "welcome" or "next"

const DESIGN_WIDTH = 910;
const DESIGN_HEIGHT = 650;

// UI elements based on DESIGN_WIDTH and DESIGN_HEIGHT
let btnX = 720;
let btnY = 580;
let btnW = 150;
let btnH = 40;

let hoverArea = {
  x: 50, 
  y: 320, 
  width: 240,
  height: 90,
}

let hoverArea2 = {
  x: 250,
  y: 430,
  width: 350,
  height: 150,
}

let hoverArea3 = {
  x: 500,
  y: 300,
  width: 160,
  height: 90,
}

let hoverArea4 = { 
  x: 680,
  y: 160, 
  width: 180,
  height: 400,
}

let selectedDessert = null;

function preload() {
  bg = loadImage('assets/baker.png');
  img = loadImage('assets/cat.png');
  speech = loadImage('assets/speech.png');
  font = loadFont('assets/font.ttf');
  sound = loadSound('assets/music.mp3');
  bg2 = loadImage('assets/bakeryinside.png');
  station1 = loadImage('assets/station1.png');
  station1pudding = loadImage('assets/station1pudding.png');
  pie1 = loadImage('assets/station1pie.png');
  cupcake1 = loadImage('assets/station1cupcake.png');
  icecream1 = loadImage('assets/station1icecream.png');
  choosepie = loadImage('assets/choosepie.png');
  choosecupcake = loadImage('assets/choosecupcake.png');
  choosepudding = loadImage('assets/choosepudding.png');
  chooseicecream = loadImage('assets/chooseicecream.png');
}

function setup() {
  createCanvas(windowWidth - 510, windowHeight -150).parent('sketch');

  let btn = document.getElementById('toggle-sound');
  if (btn) {
    btn.addEventListener('click', toggleMusic);
  }

  for (let i = 0; i < 100; i++) {
    particles.push(new Sparkle());
  }

  let volumeSlider = document.getElementById('vol');
  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      let vol = parseFloat(volumeSlider.value);
      sound.setVolume(vol);
      document.getElementById('volVal').textContent = vol.toFixed(2);
    });
  }

  let restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', restartSketch);
  }

  const textColorPicker = document.getElementById('text-color');
  textColorPicker.addEventListener('input', () => {
    textColor = textColorPicker.value;
  });
}

class Sparkle {
  constructor() {
    this.x = random(DESIGN_WIDTH);
    this.y = random(DESIGN_HEIGHT);
    this.alpha = 0;
    this.fadeSpeed = random(2, 5);
    this.fadingIn = true;
    this.size = random(5, 15);
  }

  update() {
    if (this.fadingIn) {
      this.alpha += this.fadeSpeed;
      if (this.alpha >= 255) {
        this.alpha = 255;
        this.fadingIn = false;
      }
    } else {
      this.alpha -= this.fadeSpeed;
      if (this.alpha <= 0) {
        this.alpha = 5;
        this.fadingIn = true;
        this.x = random(DESIGN_WIDTH);
        this.y = random(DESIGN_HEIGHT);
      }
    }
  }

  show() {
    noStroke();
    fill(255, 237, 180, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}

function draw() {
  background(255);

  // Calculate scale and offsets for centering content
  const scaleX = width / DESIGN_WIDTH;
  const scaleY = height / DESIGN_HEIGHT;
  const scaleFactor = min(scaleX, scaleY);

  const offsetX = (width - DESIGN_WIDTH * scaleFactor) / 2;
  const offsetY = (height - DESIGN_HEIGHT * scaleFactor) / 2;

  push();
  translate(offsetX, offsetY);
  scale(scaleFactor);

  // Scale UI elements positions and sizes for hit detection and drawing
  const scaledBtnX = btnX;
  const scaledBtnY = btnY;
  const scaledBtnW = btnW;
  const scaledBtnH = btnH;

  if (scene === "welcome") {
    image(bg, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);

    for (let sparkle of particles) {
      sparkle.update();
      sparkle.show();
    }
    image(speech, 500, 170, 200, 200);
    image(img, 380, 190, 300, 380);

    textSize(14);
    fill(textColor);
    textFont(font);
    textAlign(CENTER, CENTER);
    text(speechText, 600, 266);

    if (showContinueBtn) {
      fill(255);
      stroke(0);
      strokeWeight(3);
      rect(scaledBtnX, scaledBtnY, scaledBtnW, scaledBtnH, 40);

      noStroke();
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(16);
      text("continue", scaledBtnX + scaledBtnW / 2, scaledBtnY + scaledBtnH / 2);
    }
  } else if (scene === "next") {
    image(bg2, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
    image(img, 190, 150, 300, 380);
    image(speech, 320, 130, 200, 200);

    textSize(14);
    fill(textColor);
    textFont(font);
    textAlign(CENTER, CENTER);
    text(scene2Text, 415, 226);

    if (showContinueBtn) {
      fill(255);
      stroke(0);
      strokeWeight(3);
      rect(scaledBtnX, scaledBtnY, scaledBtnW, scaledBtnH, 40);

      noStroke();
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(16);
      text("continue", scaledBtnX + scaledBtnW / 2, scaledBtnY + scaledBtnH / 2);
    }
  } else if (scene === "scene3") {
    background(255);
    for (let sparkle of particles) {
      sparkle.update();
      sparkle.show();
    }

    image(station1, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);

    // Show selected dessert image or hover previews
    if (selectedDessert !== null) {
      if (selectedDessert === "pudding") {
        image(choosepudding, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
      } else if (selectedDessert === "pie") {
        image(choosepie, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
      } else if (selectedDessert === "cupcake") {
        image(choosecupcake, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
      } else if (selectedDessert === "icecream") {
        image(chooseicecream, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
      }
      fill(textColor);
      textSize(14);
      textFont(font);
    } else {
      // Hover previews for dessert selection
      const mx = mouseXScaled();
      const my = mouseYScaled();

      if (pointInRect(mx, my, hoverArea)) {
        image(station1pudding, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
      }
      if (pointInRect(mx, my, hoverArea2)) {
        image(pie1, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
      }
      if (pointInRect(mx, my, hoverArea3)) {
        image(cupcake1, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
      }
      if (pointInRect(mx, my, hoverArea4)) {
        image(icecream1, 0, 0, DESIGN_WIDTH, DESIGN_HEIGHT);
      }
    }

    fill(textColor);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("station one — choose your dessert base", DESIGN_WIDTH / 2, 60);
    textSize(15);
    text("hover over an option, then press to select!", DESIGN_WIDTH / 2, 100);

    if (showCatSpeech) {
      // Cat speech bubble positioning
      let catX = 0;
      let catY = 380;
      let catW = 250;
      let catH = 320;

      let bubbleX = catX + 90;
      let bubbleY = catY - 50;
      let bubbleW = 200;
      let bubbleH = 200;

      image(img, catX, catY, catW, catH);
      image(speech, bubbleX, bubbleY, bubbleW, bubbleH);

      fill(textColor);
      textSize(14);
      textFont(font);
      textAlign(CENTER, CENTER);
      if (catSpeechIndex < catSpeechPhrases.length) {
        text(catSpeechPhrases[catSpeechIndex], bubbleX + bubbleW / 2, bubbleY + bubbleH / 2 - 5);
      }
    }

    if (showContinueBtn) {
      fill(255);
      stroke(0);
      strokeWeight(3);
      rect(scaledBtnX, scaledBtnY, scaledBtnW, scaledBtnH, 40);

      noStroke();
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(16);
      text("continue", scaledBtnX + scaledBtnW / 2, scaledBtnY + scaledBtnH / 2);
    }
  } else if (scene === 'scene4') {
    background(220);
    fill(0);
    textSize(15);
    textFont(font);
    textAlign(CENTER, CENTER);
    text("station two — select your flavoring", DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2);
  }

  pop();
}

function mousePressed() {
  const scaleX = width / DESIGN_WIDTH;
  const scaleY = height / DESIGN_HEIGHT;
  const scaleFactor = min(scaleX, scaleY);

  const offsetX = (width - DESIGN_WIDTH * scaleFactor) / 2;
  const offsetY = (height - DESIGN_HEIGHT * scaleFactor) / 2;

  // Convert mouse coords to design coords
  const mx = (mouseX - offsetX) / scaleFactor;
  const my = (mouseY - offsetY) / scaleFactor;

  if (scene === "welcome") {
    if (showContinueBtn && pointInRect(mx, my, {x: btnX, y: btnY, width: btnW, height: btnH})) {
      advanceWelcome();
    }
  } else if (scene === "next") {
    if (showContinueBtn && pointInRect(mx, my, {x: btnX, y: btnY, width: btnW, height: btnH})) {
      advanceScene2();
    }
  } else if (scene === "scene3") {
  if (!showCatSpeech) {
    // Dessert selection
    if (pointInRect(mx, my, hoverArea)) {
      selectedDessert = "pudding";
      showCatSpeech = true;
      catSpeechIndex = 0;
      catSpeechComplete = false;
      showContinueBtn = true;  // <-- Keep button visible!
    } else if (pointInRect(mx, my, hoverArea2)) {
      selectedDessert = "pie";
      showCatSpeech = true;
      catSpeechIndex = 0;
      catSpeechComplete = false;
      showContinueBtn = true;
    } else if (pointInRect(mx, my, hoverArea3)) {
      selectedDessert = "cupcake";
      showCatSpeech = true;
      catSpeechIndex = 0;
      catSpeechComplete = false;
      showContinueBtn = true;
    } else if (pointInRect(mx, my, hoverArea4)) {
      selectedDessert = "icecream";
      showCatSpeech = true;
      catSpeechIndex = 0;
      catSpeechComplete = false;
      showContinueBtn = true;
    }
  } else if (showCatSpeech && !catSpeechComplete) {
  catSpeechIndex++;
  if (catSpeechIndex >= catSpeechPhrases.length) {
    catSpeechIndex = catSpeechPhrases.length - 1; // Prevent overflow
    catSpeechComplete = true;
  }
  } else if (showCatSpeech && catSpeechComplete && showContinueBtn) {
    if (pointInRect(mx, my, {x: btnX, y: btnY, width: btnW, height: btnH})) {
      scene = "scene4";
      showContinueBtn = false;
    }
  }
}
}

function advanceWelcome() {
  phraseIndex++;
  if (phraseIndex < phrases.length) {
    speechText = phrases[phraseIndex];
  } else {
    scene = "next";
    scene2Text = scene2Phrases[0];
    scene2Index = 0;
    phraseIndex = 0;
    speechText = "";
  }
}

function advanceScene2() {
  scene2Index++;
  if (scene2Index < scene2Phrases.length) {
    scene2Text = scene2Phrases[scene2Index];
  } else {
    scene = "scene3";
    scene2Text = "";
    showContinueBtn = false;
  }
}

function pointInRect(px, py, rect) {
  return px > rect.x && px < rect.x + rect.width && py > rect.y && py < rect.y + rect.height;
}

function mouseXScaled() {
  const scaleX = width / DESIGN_WIDTH;
  const scaleY = height / DESIGN_HEIGHT;
  const scaleFactor = min(scaleX, scaleY);
  const offsetX = (width - DESIGN_WIDTH * scaleFactor) / 2;
  return (mouseX - offsetX) / scaleFactor;
}

function mouseYScaled() {
  const scaleX = width / DESIGN_WIDTH;
  const scaleY = height / DESIGN_HEIGHT;
  const scaleFactor = min(scaleX, scaleY);
  const offsetY = (height - DESIGN_HEIGHT * scaleFactor) / 2;
  return (mouseY - offsetY) / scaleFactor;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function toggleMusic() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}

function restartSketch() {
  phraseIndex = 0;
  speechText = "hello! welcome to \nbread bound!";
  scene = "welcome";
  showContinueBtn = true;
  showCatSpeech = false;
  selectedDessert = null;
  catSpeechIndex = 0;
  catSpeechComplete = false;
}

// Initial state variables
let showContinueBtn = true;
