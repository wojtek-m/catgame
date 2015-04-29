/*
  Mini stopwatch game 
 */

'use strict';

var MS_IN_MINUTE = 600;
var MS_IN_SEC = 10;
var timeInMs = 0; // time in milliseconds
var points = 0;
var score = 0;
var tries = 0;
var timer;
var timerIsRunning = false;

var minutesLabel = document.getElementById('stopClockMinutes');
var secondsLabel = document.getElementById('stopClockSeconds');
var millisecondsLabel = document.getElementById('stopClockMilliseconds');
var pointsLabel = document.getElementById('points');
var triesLabel = document.getElementById('tries');
var feedbackLabel = document.getElementById('feedback');
var scoreLabel = document.getElementById('score');
var winNotification = document.getElementById('win');
var finalFeedbackLabel = document.getElementById('finalFeeback');

var miau = new Audio('sound/miau.mp3');
var win = new Audio('sound/win.mp3');
var purr = new Audio('sound/purr.mp3');
purr.loop = true;

// Start and run the game
function catStart() {
  if (!timerIsRunning) {
    timer = setInterval(setTime, 100);
    setTime();
    timerIsRunning = true;
    purr.play();
  }
}

// Update the Stopwatch
function setTime() {
  timeInMs++;
  updateView();
}

// Evaluate the click, give audio feedback and update the score
function catStop() {
  clearInterval(timer);
  if (timerIsRunning) {
    if (timeInMs % MS_IN_SEC == 0) {
      points++;
      tries++;
      win.play();
      purr.pause();
    } else {
      tries++;
      miau.play();
      purr.pause();
    }
  }
  timerIsRunning = false;
  updateView();
  giveFeedback();
  
  if (points >= 10) {
    giveFinalFeedback();
    winPanelShow();
  }
}

// Reset the game
function catReset() {
  clearInterval(timer);
  timeInMs = 0;
  points = 0;
  tries = 0;
  score = 0;
  timerIsRunning = false;
  updateView();
  giveFeedback();
}

// Display the time as a two digit formated string
function formatTime(time) {
  var timeString = time + "";
    if(timeString.length < 2){
      return "0" + timeString;
    } else {
      return timeString;
    }
}

// Give written feedback to the user during the game
function giveFeedback() {
  if (tries > 2 && score < 25) {
    feedbackLabel.innerHTML = "<p class=\"poor feedback\">You are not doing very well...</p>";
  } else if ( tries > 2 && score < 35) {
    feedbackLabel.innerHTML = "<p class=\"neutral feedback\">You are doing OK!</p>";
  } else if ( tries > 2 && score < 45) {
    feedbackLabel.innerHTML = "<p class=\"well feedback\">You are doing very well!</p>";
  } else if ( tries > 2 && score >= 45) {
    feedbackLabel.innerHTML = "<p class=\"great feedback\">You are doing GREAT!</p>";
  } else {
    feedbackLabel.innerHTML = "<p class=\"neutral feedback\">Let's see how good you are!</p>";
  }
}

// Give written final feeback after the game is finished 
function giveFinalFeedback() {
  if (score >= 50) {
      finalFeedbackLabel.innerHTML = "You did great, congratulations!";
  } else if (score >= 25 ) {
      finalFeedbackLabel.innerHTML = "You did good, congratulations!";
  } else {
      finalFeedbackLabel.innerHTML = "Sorry, that was not good enough...";
  }

}

// Update all the variables in the view
function updateView() {
  var minutes = timeInMs / MS_IN_MINUTE;
  var seconds = timeInMs / MS_IN_SEC;
  var milliseconds = timeInMs % MS_IN_MINUTE % (10 * MS_IN_SEC) % MS_IN_SEC;
  score = (points / tries * 100);
  minutesLabel.innerHTML = formatTime(parseInt(minutes));
  secondsLabel.innerHTML = formatTime(parseInt(seconds));
  millisecondsLabel.innerHTML = parseInt(milliseconds);
  pointsLabel.innerHTML = points;
  triesLabel.innerHTML = tries;
  if (score > 0) {
    scoreLabel.innerHTML = parseInt(score);
  } else {
    scoreLabel.innerHTML = 0;
  }
  
}

// Hide win panel
function winPanelHide() {
  winNotification.style.visibility = "hidden";
}

// Show win panel
function winPanelShow() {
  winNotification.style.visibility = "visible";
}