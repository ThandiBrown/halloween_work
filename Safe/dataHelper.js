var a = 0;
var b = 0;

function pollGamepads() {
var gp = navigator.getGamepads()[0];
    if(gp) {
      gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id + ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
      gameLoop();
      clearInterval(interval);
    }

}

function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

function gameLoop() {
  var gp = navigator.getGamepads()[0];
  if (buttonPressed(gp.buttons[0])) {
    document.getElementById("gamepad-info").innerHTML = "D was clicked.";
    nextPkg("d");
  } else if (buttonPressed(gp.buttons[2])) {
    document.getElementById("gamepad-info").innerHTML = "A was clicked.";
    nextPkg("a");
  }
  if(buttonPressed(gp.buttons[1])) {
    document.getElementById("gamepad-info").innerHTML = "C was clicked.";
    nextPkg("c");
  } else if(buttonPressed(gp.buttons[3])) {
    document.getElementById("gamepad-info").innerHTML = "B was clicked.";
    nextPkg("b");
  }
  var start = rAF(gameLoop);
};
