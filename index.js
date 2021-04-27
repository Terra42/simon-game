let gamePattern = [];
let userClickedPattern = [];

const buttonColours = ['red', 'blue', 'green', 'yellow'];

let gameStarted = false;
let level = 0;

$(document).on('keypress', () => {
  if (!gameStarted) {
    setTimeout(nextSequence, 1000);
    gameStarted = true;
  }
});

$('.btn').on('click', (event) => {
  let userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log('wrong');
    $('h1').text('Game Over, Press Any Key to Restart');
    setTimeout(() => {
      var audioWrong = document.createElement('audio');
      audioWrong.setAttribute('src', './sounds/wrong.wav');
      audioWrong.play();
      $('body').addClass('game-over');
      setTimeout(() => {
        $('body').removeClass('game-over');
      }, 200);
    }, 300);
    startOver();
  }
};

const startOver = () => {
  level = 0;
  gameStarted = false;
  gamePattern = [];
};

const nextSequence = () => {
  userClickedPattern = [];

  level++;
  $('h1').text(`Level ${level}`);

  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};

const playSound = (name) => {
  $(`#audio-${name}`)[0].play();
};

const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(() => {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
};
