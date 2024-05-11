// Selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let end_btn = document.querySelector(".end_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft, TIME_LIMIT, quotes_array;

// Fetch the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    TIME_LIMIT = data.TIME_LIMIT;
    quotes_array = data.quotes_array;
    // initializeGame(); // Start the game after loading data
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

// Initialize SCORM
function scormInit() {
  if (pipwerks.SCORM.init()) {
      console.log("SCORM initialized");
      // Optionally set the initial status to incomplete
      pipwerks.SCORM.set("cmi.completion_status", "incomplete");
      pipwerks.SCORM.set("cmi.core.lesson_status", "incomplete");
  } else {
      console.log("Failed to initialize SCORM");
  }
}

// Set SCORM completion status
function scormComplete() {
  pipwerks.SCORM.set("cmi.core.entry", "resume");
  pipwerks.SCORM.save(); // Ensure data is saved

  pipwerks.SCORM.set("cmi.core.lesson_status", "completed");
  pipwerks.SCORM.save(); // Ensure data is saved
  console.log("SCORM completed");
}

// Terminate SCORM
function scormTerminate() {
  if (pipwerks.SCORM.quit()) {
      console.log("SCORM terminated");
  } else {
      console.log("Failed to terminate SCORM");
  }
}

// Initialize the game
function initializeGame() {
  timeLeft = TIME_LIMIT;
  resetValues();
  updateQuote();

  // Clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}


function updateQuote() {
  // Check if all quotes are completed
  if (quoteNo >= quotes_array.length) {
      finishGame(); // End the game if all quotes are completed
      return;  // Exit the function to avoid further execution
  }
  console.log("Updating quote: " + quoteNo);
  console.log("quotes_array.length: " + quotes_array.length);
  // Update the displayed quote
  quote_text.innerHTML = "";  // Clear the existing content
  current_quote = quotes_array[quoteNo];

  // Iterate over each character in the quote
  for (let char of current_quote) {
      const charSpan = document.createElement('span');
      charSpan.classList.add('character');
      charSpan.textContent = char;
      quote_text.appendChild(charSpan);
  }

  // Increment the quote index for next update, or reset if all quotes are typed
  if (quoteNo < quotes_array.length) {
      quoteNo++;
  } else {
      // Reset to the first quote to potentially repeat the loop (optional)
      quoteNo = 0;
  }
}




function processCurrentText() {
  // get current input text and split it
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  // increment total characters typed
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
      let typedChar = curr_input_array[index];

      if (typedChar == null) {
          char.classList.remove('correct_char');
          char.classList.remove('incorrect_char');
      } else if (typedChar === char.innerText) {
          char.classList.add('correct_char');
          char.classList.remove('incorrect_char');
      } else {
          char.classList.add('incorrect_char');
          char.classList.remove('correct_char');
          errors++;
      }
  });

  error_text.textContent = total_errors + errors;
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);

  // Check if the current quote is fully typed
  if (curr_input.length == current_quote.length) {
      total_errors += errors;  // Update total errors
      input_area.value = "";   // Clear the input area
      updateQuote();           // Move to the next quote or finish the game
  }
}


function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.disabled = true;

  // show finishing text
  quote_text.textContent = "Click on restart to start a new game.";

  // display restart button
  restart_btn.style.display = "block";
  end_btn.style.display = "block";
  calculateCPMandWPM();
  scormComplete(); // Set completion status when game is finished
}

// Calculate CPM and WPM, called from finishGame()
function calculateCPMandWPM() {
  let cpm = Math.round(((characterTyped / timeElapsed) * 60));
  let wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}


function startGame() {
  
  resetValues();
  updateQuote();

  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  scormInit();
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}
