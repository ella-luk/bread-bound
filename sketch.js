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

// Continue button variables
let showContinueBtn = false;
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
  // const c = createCanvas(910, 650);
  const c = createCanvas(910,650);
  c.parent('sketch');

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
    this.x = random(width);
    this.y = random(height);
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
        this.x = random(width);
        this.y = random(height);
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
  background(220);

  if (scene === "welcome") {
  image(bg, 0, 0, 910, 650);

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
  text(speechText,600,266);

  text("[ click mousepad to continue ]", width/2,620)

  // Draw continue button if needed
  if (showContinueBtn) {
    fill(255);
    stroke(0);
    strokeWeight(3);
    rect(btnX, btnY, btnW, btnH, 10); // rounded corners

    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("continue", btnX + btnW / 2, btnY + btnH / 2);
  }
   } 
   
   else if (scene === "next") {
    // ✨ Scene 2: New screen
    image(bg2, 0, 0, 910, 650);
    image(img, 190, 150, 300, 380)
    image(speech, 320, 130, 200, 200);

    textSize(14);
  fill(textColor);
  textFont(font);
  textAlign(CENTER, CENTER);
  text(scene2Text, 415, 226); 
  text("[ click mousepad to continue ]", width/2,620)

  if (showContinueBtn) {
    fill(255);
    stroke(0);
    strokeWeight(3);
    rect(btnX, btnY, btnW, btnH, 10); // rounded corners

    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("continue", btnX + btnW / 2, btnY + btnH / 2);
  }
  }

  else if (scene === "scene3") {
  background(219, 193, 180);
  for (let sparkle of particles) {
    sparkle.update();
    sparkle.show();
  }

  // Base station background
  image(station1, 0, 0, 910, 650);

  // Show selected image if clicked, otherwise use hover
  if (selectedDessert !== null) {
    if (selectedDessert === "pudding") {
      image(choosepudding, 0, 0, 910, 650);
      fill(textColor);
      textSize(14);
      textFont(font);
      text("[ click mousepad to continue ]", width/2,620)
    } else if (selectedDessert === "pie") {
      image(choosepie, 0, 0, 910, 650);
      fill(textColor);
      textSize(14);
      textFont(font);
      text("[ click mousepad to continue ]", width/2,620)
    } else if (selectedDessert === "cupcake") {
      image(choosecupcake, 0, 0, 910, 650);
      fill(textColor);
      textSize(14);
      textFont(font);
      text("[ click mousepad to continue ]", width/2,620)
    } else if (selectedDessert === "icecream") {
      image(chooseicecream, 0, 0, 910, 650);
      fill(textColor);
      textSize(14);
      textFont(font);
      text("[ click mousepad to continue ]", width/2,620)
    }
  } else {
    // No dessert selected yet — use hover to preview
    if (mouseX > hoverArea.x && mouseX < hoverArea.x + hoverArea.width &&
        mouseY > hoverArea.y && mouseY < hoverArea.y + hoverArea.height) {
      image(station1pudding, 0, 0, 910, 650); 
    }
    if (mouseX > hoverArea2.x && mouseX < hoverArea2.x + hoverArea2.width &&
        mouseY > hoverArea2.y && mouseY < hoverArea2.y + hoverArea2.height) {
      image(pie1, 0, 0, 910, 650); 
    }
    if (mouseX > hoverArea3.x && mouseX < hoverArea3.x + hoverArea3.width &&
        mouseY > hoverArea3.y && mouseY < hoverArea3.y + hoverArea3.height) {
      image(cupcake1, 0, 0, 910, 650); 
    }
    if (mouseX > hoverArea4.x && mouseX < hoverArea4.x + hoverArea4.width &&
        mouseY > hoverArea4.y && mouseY < hoverArea4.y + hoverArea4.height) {
      image(icecream1, 0, 0, 910, 650); 
    }
  }

  fill(textColor);
  textSize(30);
  text("station one — choose your dessert base", width/2, 60);
  textSize(15);
  text("hover over an option, then press to select!", width/2, 100);

  if (showCatSpeech) {
  // New positions
  let catX = 0;
  let catY = 380;
  let catW = 250;
  let catH = 320;

  let bubbleX = catX + 90;
  let bubbleY = catY - 50;
  let bubbleW = 200;
  let bubbleH = 200;

  // Draw cat and bubble
  image(img, catX, catY, catW, catH); // cat in bottom left
  image(speech, bubbleX, bubbleY, bubbleW, bubbleH); // speech bubble

  // Draw text in speech bubble
  fill(textColor);
  textSize(14);
  textFont(font);
  textAlign(CENTER, CENTER);
  if (catSpeechIndex < catSpeechPhrases.length) {
    text(catSpeechPhrases[catSpeechIndex], bubbleX + bubbleW / 2, bubbleY + bubbleH / 2 -5);
  }
}

if (showContinueBtn) {
    fill(255);
    stroke(0);
    strokeWeight(3);
    rect(btnX, btnY, btnW, btnH, 10); // rounded corners

    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("continue", btnX + btnW / 2, btnY + btnH / 2);
  }

}

  else if (scene === 'scene4') {
    background(220);
    fill(0);
    textSize(15);
    textFont(font)
    text("station two — select your flavoring", width/2, height/2);
  }

}


function mousePressed() {
  if (
    mouseX >= 0 && mouseX <= width &&
    mouseY >= 0 && mouseY <= height
  ) {
    // SCENE: "welcome"
    if (scene === "welcome") {
      if (phraseIndex < phrases.length) {
        speechText = phrases[phraseIndex];
        phraseIndex++;
        if (phraseIndex === phrases.length) {
          showContinueBtn = true;
        }
      }

      // Check if continue button is clicked in welcome scene
      if (
        showContinueBtn &&
        mouseX > btnX && mouseX < btnX + btnW &&
        mouseY > btnY && mouseY < btnY + btnH
      ) {
        scene = "next";
        showContinueBtn = false; // reset button for scene 2
      }

    }

    // SCENE: "next"
    else if (scene === "next") {
      // Show scene 2 phrases one by one
      if (scene2Index < scene2Phrases.length) {
        scene2Text = scene2Phrases[scene2Index];
        scene2Index++; // increment after showing text

        // Show continue button only after last phrase
        if (scene2Index === scene2Phrases.length) {
          showContinueBtn = true;
        }
      } else {
        // Continue button clicked after all scene 2 phrases shown
        if (
          showContinueBtn &&
          mouseX > btnX && mouseX < btnX + btnW &&
          mouseY > btnY && mouseY < btnY + btnH
        ) {
          scene = "scene3";
          showContinueBtn = false; // reset for next scene
        }
      }
    }

    // SCENE: "scene3" (dessert selection)
    else if (scene === "scene3") {
  // Only allow selection if nothing has been selected yet
  if (selectedDessert === null) {
    if (mouseX > hoverArea.x && mouseX < hoverArea.x + hoverArea.width &&
        mouseY > hoverArea.y && mouseY < hoverArea.y + hoverArea.height) {
      selectedDessert = "pudding";
    } else if (mouseX > hoverArea2.x && mouseX < hoverArea2.x + hoverArea2.width &&
               mouseY > hoverArea2.y && mouseY < hoverArea2.y + hoverArea2.height) {
      selectedDessert = "pie";
    } else if (mouseX > hoverArea3.x && mouseX < hoverArea3.x + hoverArea3.width &&
               mouseY > hoverArea3.y && mouseY < hoverArea3.y + hoverArea3.height) {
      selectedDessert = "cupcake";
    } else if (mouseX > hoverArea4.x && mouseX < hoverArea4.x + hoverArea4.width &&
               mouseY > hoverArea4.y && mouseY < hoverArea4.y + hoverArea4.height) {
      selectedDessert = "icecream";
    }

    // If a selection was made, trigger the cat speech
    if (selectedDessert !== null) {
      showCatSpeech = true;
      catSpeechIndex = 0;
      catSpeechComplete = false;
    }
  }
  else if (showCatSpeech && !catSpeechComplete) {
  catSpeechIndex++;

  if (catSpeechIndex >= catSpeechPhrases.length - 1) {
    catSpeechIndex = catSpeechPhrases.length - 1; // prevent out-of-bounds
    catSpeechComplete = true;
    showContinueBtn = true;
  }
} else {
        if (
          showContinueBtn &&
          mouseX > btnX && mouseX < btnX + btnW &&
          mouseY > btnY && mouseY < btnY + btnH
        ) {
          scene = "scene4";
          showContinueBtn = false; // reset for next scene
        }
      }
}
  }
}



function toggleMusic() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}

function restartSketch() {
  // Reset scene state
  scene = "welcome";
  nextScene = null;
  isTransitioning = false;
  transitionAlpha = 0;

  // Reset speech text & index
  phraseIndex = 0;
  speechText = "hello! welcome to \nbread bound!";
  showContinueBtn = false;

  // Reset particles
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push(new Sparkle());
  }

  // Reset sound
  if (sound.isPlaying()) {
    sound.stop();
  }

  const volumeSlider = document.getElementById('vol');
  if (volumeSlider) {
    volumeSlider.value = 0.5;
    document.getElementById('volVal').textContent = "0.50";
    sound.setVolume(0.5);
  }

  // Reset text color
  const textColorPicker = document.getElementById('text-color');
  if (textColorPicker) {
    textColorPicker.value = '#000000';
    textColor = '#000000';
  }
  scene2Index = 0;
  scene2Text = scene2Phrases[0];

  selectedDessert = null;
catSpeechIndex = 0;
showCatSpeech = false;
catSpeechComplete = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//hello 
