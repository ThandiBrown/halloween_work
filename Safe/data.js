


var main_node;

var map = new Map();

var click_sound = new Audio("../media/click_sound.mp3");

// --------------- Prompts ------------------

// Text prompts
var startPrompt = "You wake up on a dark road with no memory of how you got there.";
var situp = "Sit up";
var situpPrompt = "You sit up on the gravel. Dim street lights barely light the road ahead and you see nothing else but trees.";
var pat = "Pat yourself down / Check yourself";
var thought = "This doesn't make any sense.";
var patPrompt = "You search yourself and find a folded note in your pocket. \nIt's blank. \n" + thought.italics();
var hello = '"Hello?!"';
var helloPrompt = '"Hello?!" You hear nothing in response.';
var panic = "Panic";
var panicPrompt =  "Oh my god, oh my god what the fuck is happening *breathe* *breathe*. Ok, my name is John. Nothing is broken but... ah, my head hurts... I just need to figure what the heck is going on.";
var getOut =  "Find a way out / Get walking";
// Text prompts end

// Text Packages
const p1 = new textPackage("p1", startPrompt, situp, pat, "Curl into fetal position", hello);
    const p1a = new textPackage("p1a", situpPrompt, pat, panic, hello, getOut);
    const p1b = new textPackage("p1b", patPrompt, panic, hello, situp, null);
    const p1c = new textPackage("p1c","Your bitch ass lays on your side and curls into fetal position.", "Cry", "Muster the courage to sit up", null, null);
    const p1d = new textPackage("p1d", helloPrompt, panic, pat, situp, null);

// Package Model
const fake = new textPackage("fake", "l", a, b, c, d);



//---------- Methods ---------------

// click a button to update the new prompt
function nextPkg(clicked_button){
  click_sound.play();
  var node = getNode(); // get the node and find which button was clicked
  switch(clicked_button){
    case "a":
      const temp_node_a_pkg = map.get(node.choice_a.next);  // get the next node out the map
      update_Site(temp_node_a_pkg); // and display it
      break;
    case "b":
      const temp_node_b_pkg = map.get(node.choice_b.next);  // get the next node out the map
      update_Site(temp_node_b_pkg); // and display it
      break;
    case "c":
      const temp_node_c_pkg = map.get(node.choice_c.next);  // get the next node out the map
      update_Site(temp_node_c_pkg); // and display it
      break;
    case "d":
      const temp_node_d_pkg = map.get(node.choice_d.next);  // get the next node out the map
      update_Site(temp_node_d_pkg); // and display it
      break;
  }

}

// makes a new prompt with next choices
function textPackage(name, prompt, choice_a, choice_b, choice_c, choice_d) {

  // links this node to the node that will be displayed before it
  if( name != "p1"){    // exemplies the first prompt of the game from this process
    var choiceValue = name.slice(-1); // indicates whether this node is the product of the abcd button being pushed
    var prevNode = eval(name.substr(0, name.length-1)); // retrieves the node that came before this node
      switch(choiceValue){
        case "a":
          prevNode.choice_a.next = name + "_ptr"; // creates a string that will be used to link the previous node with this current node
          break;
        case "b":
          prevNode.choice_b.next = name + "_ptr";
          break;
        case "c":
          prevNode.choice_c.next = name + "_ptr";
          break;
        case "d":
          prevNode.choice_d.next = name + "_ptr";
          break;
      }
    }

  this.name = name;
  this.prompt = prompt;

  // checks / handles cases where there isn't a 1,2,3 or 4 button on the screen
  if(choice_a == null)
    this.choice_a = new choiceNode(choice_a, null); // this is needed or else the button would appear with "A." followed by nothing else
  // sets the button text otherwise
  else
    this.choice_a = new choiceNode("A. " + choice_a, null);

  if(choice_b == null)
    this.choice_b = new choiceNode(choice_b, null);
  else
    this.choice_b = new choiceNode("B. " + choice_b, null);

  if(choice_c == null)
    this.choice_c = new choiceNode(choice_c, null);
  else
    this.choice_c = new choiceNode("C. " + choice_c, null);

  if(choice_d == null)
    this.choice_d = new choiceNode(choice_d, null);
  else
    this.choice_d = new choiceNode("D. " + choice_d, null);
}

// each button has a next pointer
function choiceNode(choiceName, next) {
  this.choiceName = choiceName;         // button's string text
  this.next = next;                     // button's next pointer
}

// updates the start with the new prompt
function update_Site(the_node){
  setNode(the_node);
  document.getElementsByClassName("gameTextDiv")[0].innerHTML = the_node.prompt;

  if(the_node.choice_a.choiceName == null)
    document.getElementById("a").style.display = "none";
  else{
    document.getElementById("a").style.display = "inline";
    document.getElementById("a").innerText = the_node.choice_a.choiceName;
  }

  if(the_node.choice_b.choiceName == null)
    document.getElementById("b").style.display = "none";
  else{
    document.getElementById("b").style.display = "inline";
    document.getElementById("b").innerText = the_node.choice_b.choiceName;
  }

  if(the_node.choice_c.choiceName == null)
    document.getElementById("c").style.display = "none";
  else{
    document.getElementById("c").style.display = "inline";
    document.getElementById("c").innerText = the_node.choice_c.choiceName;
  }

  if(the_node.choice_d.choiceName == null)
    document.getElementById("d").style.display = "none";
  else{
    document.getElementById("d").style.display = "inline";
    document.getElementById("d").innerText = the_node.choice_d.choiceName;
  }

}

// the node that is currently being displayed
function setNode(the_node){
  main_node = the_node;
}

function getNode(){
  return main_node;
}
