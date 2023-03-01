const note = [
  "C0",
  "Db0",
  "D0",
  "Eb0",
  "E0",
  "F0",
  "Gb0",
  "G0",
  "Ab0",
  "A0",
  "Bb0",
  "B0",
  "C1",
  "Db1",
  "D1",
  "Eb1",
  "E1",
  "F1",
  "Gb1",
  "G1",
  "Ab1",
  "A1",
  "Bb1",
  "B1",
  "C2",
  "Db2",
  "D2",
  "Eb2",
  "E2",
  "F2",
  "Gb2",
  "G2",
  "Ab2",
  "A2",
  "Bb2",
  "B2",
  "C3",
  "Db3",
  "D3",
  "Eb3",
  "E3",
  "F3",
  "Gb3",
  "G3",
  "Ab3",
  "A3",
  "Bb3",
  "B3",
];

const keys = document.querySelectorAll(".key");
const notes = document.querySelectorAll(".id"); //returns numbers co# = 1 ......

function playSound(newUrl) {
  new Audio(newUrl).play();
}

var allnote = new Set();



function keypressed(newUrl, notes, i) {
  // console.log(`Note played: ${note[notes]}`);
  keys[i].classList.add("played");
  playSound(newUrl);
  setTimeout(() => {
    keys[i].classList.remove("played");
  }, 100);

  
}

const order = [
  "z",
  "1",
  "x",
  "2",
  "c",
  "v",
  "3",
  "b",
  "4",
  "n",
  "5",
  "m",
  ",",
  "6",
  ".",
  "7",
  "q",
  "w",
  "8",
  "e",
  "9",
  "r",
  "/",
  "t",
  "y",
  ";",
  "u",
  "'",
  "i",
  "o",
  "[",
  "p",
  "]",
  "a",
  "0",
  "s",
  "d",
  "-",
  "f",
  "=",
  "g",
  "h",
  "@",
  "j",
  " ",
  "k",
  "`",
  "l",
];
let pressed_keys = new Set();
let pressed_keys2 = [];
function clear_set() {}
let counter = 0;
let startTime = null;



document.addEventListener("keypress", (event) => {
  pressed_keys.add(event.key);

  if (startTime === null) {
    startTime = Date.now();
    console.log("Timer started." + startTime);
    var note_duration = document.getElementById("Duration");
    note_duration.innerHTML = "0 s";
  } 
  else {
    if(((Date.now() - startTime) /1000) >=4){
      startTime = Date.now();
      console.log("Timer started." + startTime);
      var note_duration = document.getElementById("Duration");
      note_duration.innerHTML = "0 s";
    }
    else{

      let elapsedSeconds = (Date.now() - startTime) /1000;
      console.log(`Key pressed after ${elapsedSeconds.toFixed(2)} seconds.`);
      
      var note_duration = document.getElementById("Duration");
      note_duration.innerHTML = elapsedSeconds;
      startTime = Date.now();
    }
  
     
  }
  
  setTimeout(() => {
    pressed_keys.clear();
    allnote.clear();
  }, 100);

  if (pressed_keys.size === 1) {
    // console.log("note detected");

    order.forEach((odr) => {
      if (event.key === `${odr}`) {
        const newUrl = "piano-mp3/" + `${note[order.indexOf(odr)]}` + ".mp3";
        keypressed(newUrl, order.indexOf(odr), order.indexOf(odr));

        // var note_played = document.getElementById("sequence");
        // note_played.innerHTML = note[order.indexOf(odr)];
        allnote.add(note[order.indexOf(odr)]);

        let notestr = "";
        for (const x of allnote.values()) {
          notestr += x + " ";
        }
        var note_played = document.getElementById("piano_sequence");
        note_played.innerHTML = notestr;
      }
    });
  } else {
    // console.log("chord detected");

    // for (each_key in pressed_keys){

    order.forEach((odr) => {
      if (event.key === `${odr}`) {
        const newUrl = "piano-mp3/" + `${note[order.indexOf(odr)]}` + ".mp3";
        keypressed(newUrl, order.indexOf(odr), order.indexOf(odr));

        allnote.add(note[order.indexOf(odr)]);

        let notestr = "";
        for (const x of allnote.values()) {
          notestr += x + " ";
        }
        var note_played = document.getElementById("piano_sequence");
        note_played.innerHTML = notestr;

              }
            });
            // }
          }
         if(counter === 2) counter = 1;
});


keys.forEach((key, notes) => {
  const number = notes < 9 ? "0" + (notes + 1) : notes + 1;
  const newUrl = "24-piano-keys/key" + number + ".mp3";
  key.addEventListener("click", () => {
    // console.log(`Note played: ${note[notes]}`);
    key.classList.add("played");
    playSound(newUrl);
    setTimeout(() => {
      key.classList.remove("played");
    }, 100);
  });
});


