// ------------THE CARDS:------------
// Set up the cards
function CardList(list, cardTitle, card2ndClass) {
  this.list = list; // card IDs
  this.cardTitle = cardTitle; // card titles
  this.card2ndClass = card2ndClass; // Additional card class
  this.output = ""; // the "" prevents undetermined errors

  this.createHTML = function() {  // makes the cards from each object
    for (var i = 0; i < this.list.length; i++) {
    this.output += '<li class="card' + ' ' + card2ndClass + '" \
      id="' + this.list[i] + '" title="' + this.cardTitle[i] + '\
      ">' + this.cardTitle[i] + '</li>';
    }
  };
}

// the suspect "who" cards:
var who = new CardList(["person0", "person1",
  "person2", "person3", "person4", "person5"],
  ["Mr. Green", "Mrs. Peacock", "Prof. Plum",
  "Miss Scarlet", "Col. Mustard", "Mrs. White"], "person");

// the weapon "what" cards:
var what = new CardList(["weapon0", "weapon1",
  "weapon2", "weapon3", "weapon4", "weapon5"],
  ["Dagger", "Rope", "Candlestick",
  "Revolver", "Wrench", "Lead Pipe"], "weapon");

// the room "where" cards:
var where = new CardList(["room0", "room1", "room2",
  "room3", "room4", "room5", "room6", "room7", "room8"],
  ["Dining Room", "Kitchen", "Ballroom",
  "Billiard Room", "Conservatory", "Library",
  "Lounge", "Study", "Hall"], "room");

// Calls the command to create the cards:
who.createHTML();
what.createHTML();
where.createHTML();

// ------------THE ANSWERS/JUDGING USER GUESSES:------------

// Sets up answers
var whoNumber, whatNumber, whereNumber;

whoNumber = Math.floor(Math.random() * who.list.length);
whatNumber = Math.floor(Math.random() * what.list.length);
whereNumber = Math.floor(Math.random() * where.list.length);

// Sets up players: 1.) user and 2.) computer answers:
function Player(who, what, where, whoTitle, whatTitle, whereTitle) {
  this.who = who;
  this.what = what;
  this.where = where;
  this.whoTitle = whoTitle;
  this.whatTitle = whatTitle;
  this.whereTitle = whereTitle;
}

// The user's guesses will be stored here:
var user = new Player();

// The computer's answers will be stored here:
var answers = new Player(who.list[whoNumber], what.list[whatNumber],
  where.list[whereNumber], who.cardTitle[whoNumber],
  what.cardTitle[whatNumber], where.cardTitle[whereNumber]);

// Variables holding the status of the user's guesses:
var whoRight, whatRight, whereRight;

// Function declaration to determine status of user's guesses:
var compareWho = function() {
  if (user.who == answers.who) {
    whoRight = true;
  } else {
    whoRight = false;
  }
};

var compareWhat = function() {
  if (user.what == answers.what) {
    whatRight = true;
  } else {
    whatRight = false;
  }
};

var compareWhere = function() {
  if (user.where == answers.where) {
    whereRight = true;
  } else {
    whereRight = false;
  }
};

var eliminated = []; // Array stores user's eliminated guesses

// Function declaration to add user's eliminated guesses to the array:
var addToEliminated = function() {
  if (!whoRight) {
    eliminated.push(user.who);
  }
  if (!whatRight) {
    eliminated.push(user.what);
  }
  if (!whereRight) {
    eliminated.push(user.where);
  }
}; // End addToEliminated function declaration

// Function declaration to gray out eliminated cards:
var grayOut = function() {
  $('li.card').each(function() {
    if ($.inArray($(this).attr('id'), eliminated) > -1) {
      $(this).addClass('cardGray');
    }
  });
};

// ------------GUESS PAGE DISPLAYS------------

// Function declaration to put cards into layout with the related question
var mainCardDisplay = function(question, cardListOutPut) {
  $('.choices').prepend('<ol class="currentDisplay"><li class="questions" \
    >' + question + '</li><ul>' + cardListOutPut + '</ul></ol>');
};

// Function declaration to fade in cards
var fadeInCards = function() {
  $('li').hide().each(function(index) {
    $(this).delay(100 * index).fadeIn(700);
  });
};

// Guess who:
var guessWho = function() {
  mainCardDisplay("Who Killed Mr. Body?", who.output);
  grayOut(); // Gray out eliminated cards
  fadeInCards(); // fade in who display

  // Records user "Who" guess:
  $('li.person').on('click', function() {
    user.who = $(this).attr('id');
    user.whoTitle = $(this).attr('title');
    $(this).addClass('cardPicked');
  });
};

// Guess what:
var guessWhat = function() {
  $('ol').remove('.currentDisplay'); // hides previous display
  mainCardDisplay("Mr. Body Was Killed With What?", what.output);
  grayOut(); // Gray out eliminated cards
  fadeInCards(); // fade in what display

  // Records user "What" guess:
  $('li.weapon').on('click', function() {
    user.what = $(this).attr('id');
    user.whatTitle = $(this).attr('title');
    $(this).addClass('cardPicked');
  });
};

// Guess where:
var guessWhere = function() {
  $('ol').remove('.currentDisplay'); // hides previous display
  mainCardDisplay("Where Was Mr. Body Was Killed?", where.output);
  grayOut(); // Gray out eliminated cards
  fadeInCards(); // fade in what display

  // Records user "Where" guess:
  $('li.room').on('click', function() {
    user.where = $(this).attr('id');
    user.whereTitle = $(this).attr('title');
    $(this).addClass('cardPicked');
  });
};

// ------------ANSWER PAGE DISPLAY FUNCTIONS:------------

// Stores html for individual answer cards:
var whoAnswerPrintOut, whatAnswerPrintOut, whereAnswerPrintOut;

// Function declaration to creates base card display for user guesses and answers
var answerGuessDisplay = function(cardClass, answerGuessID, answerGuessTitle, answerGuessPrinted) {
  return '<li class="' + cardClass + '" id="' + answerGuessID + '" \
    title="' + answerGuessTitle + '">' + answerGuessPrinted + '</li>';
};

// Function declaration to creates HTML for all individual answers cards:
var createAnswerCards = function() {
  if (!whoRight) {
    whoAnswerPrintOut = answerGuessDisplay("card-answers", "personhidden", "incorrect: try again", "&nbsp;");
  } else {
    whoAnswerPrintOut = answerGuessDisplay("card-answers", answers.who, answers.whoTitle, answers.whoTitle);
  }

  if (!whatRight) {
    whatAnswerPrintOut = answerGuessDisplay("card-answers", "weaponhidden", "incorrect: try again", "&nbsp;");
  } else {
    whatAnswerPrintOut = answerGuessDisplay("card-answers", answers.what, answers.whatTitle, answers.whatTitle);
  }

  if (!whereRight) {
    whereAnswerPrintOut = answerGuessDisplay("card-answers", "roomhidden", "incorrect: try again", "&nbsp;");
  } else {
    whereAnswerPrintOut = answerGuessDisplay("card-answers", answers.where, answers.whereTitle, answers.whereTitle);
  }
};

// Stores html for individual guess cards:
var whoGuessPrintOut, whatGuessPrintOut, whereGuessPrintOut;

// Function declaration to creates HTML for all individual guess cards:
var createGuessCards = function() {
  whoGuessPrintOut = answerGuessDisplay("card-guessed", user.who, user.whoTitle, user.whoTitle);
  whatGuessPrintOut = answerGuessDisplay("card-guessed", user.what, user.whatTitle, user.whatTitle);
  whereGuessPrintOut = answerGuessDisplay("card-guessed", user.where, user.whereTitle, user.whereTitle);
};

// Counter for number of user's guess attempts:
var numberOfAttempts = 1; // Is added to when user clicks "Guess Again"

// Function declaration to creates and print HTML for entire answer page display:
var printAnswersGuesses = function() {
  $('.choices').prepend('<ol class="answerDisplay"><div class="choices-correct">\
    <div class="attempts">Attempts:\
    ' + numberOfAttempts + '</div><ol>\
    <li class="questions" id="answers">Correct \
    Answers:</li><ul class="answers">\
    ' + whoAnswerPrintOut + whatAnswerPrintOut + whereAnswerPrintOut + '\
    </ul></ol></div>\
    <li class="questions" id="youGuessed">You Guessed:</li>\
    <ul class="guessesAnswers">\
    ' + whoGuessPrintOut + whatGuessPrintOut + whereGuessPrintOut + '\
    </ul></ol>');
};

// ------------GUESS AGAIN FUNCTION DECLARATIONS:------------

// BUTTONS:
// Shows Weapon guess again button; hides all others
var showWeaponAgainButton = function() {
  $('section.guessAgainButtons').show();
  $('button.guessAgainWeapons').show();
  $('button.guessAgainRooms').hide();
  $('button.checkanswers').hide();
  $('section.answerPageButtons').hide();
};

// Shows Room guess again button; hides all others
var showRoomAgainButton = function() {
  $('button.guessAgainWeapons').hide();
  $('button.guessAgainRooms').show();
  $('button.checkanswers').hide();
  $('section.answerPageButtons').hide();
};

// Shows Answers guess again button; hides all others
var showAnswersAgainButton = function() {
  $('button.guessAgainWeapons').hide();
  $('button.guessAgainRooms').hide();
  $('button.checkanswers').show();
  $('section.answerPageButtons').hide();
};

// GUESS AGAIN IF-ELSE LOOPs:
// Guess again where loop:
var guessWhereLoop = function() {
  if (!whereRight) {
    guessWhere(); // shows where display
    showAnswersAgainButton(); // shows answer button; hides all others
  }
}; // End guessWhereLoop

// Guess again what loop:
var guessWhatLoop = function() {
  if (!whatRight && !whereRight) {
    guessWhat(); // shows what display
    showRoomAgainButton(); // shows where button; hides all others
  } else if (!whatRight && whereRight) {
    guessWhat(); // shows what display
    showAnswersAgainButton(); // shows answer button; hides all others
  } else {
    guessWhereLoop(); // launches Where loop
  }
}; // End guessWhatLoop

// Guess again who loop:
var guessWhoLoop = function() {
  if (!whoRight && !whatRight) {
    guessWho(); // shows who display
    showWeaponAgainButton(); // shows what button; hides all others
  } else if (!whoRight && whatRight && !whereRight) {
    guessWho(); // shows who display
    showRoomAgainButton(); // shows where button; hides all others
  } else if (!whoRight && whatRight && whereRight) {
    guessWho(); // shows who display
    showAnswersAgainButton(); // shows answer button; hides all others
  } else {
    guessWhatLoop(); // launches What loop
  }
}; // end guessWhoLoop

////////////////// START DISPLAY///////////////////////////

// Start Who display:
$(document).ready(function() {
  $('button.guessweapons').show(); // show What button
  $('button.guessrooms').hide(); // hide Where button
  $('button.checkanswers').hide(); // hide Answers button
  $('section.answerPageButtons').hide(); // hide answer-page buttons
  $('section.guessAgainButtons').hide(); // hide guess-again buttons
  guessWho(); // Who display
});

// Who > What:
$('button.guessweapons').on('click', function() {
  $('button.guessweapons').hide(); // hide What button
  $('button.guessrooms').show(); // show Where button
  $('button.checkanswers').hide(); // hide Answers button
  $('section.answerPageButtons').hide(); // hide answer-page buttons
  $('section.guessAgainButtons').hide(); // hide guess-again buttons
  guessWhat(); // What display (removes previous display)
});

// What > Where:
$('button.guessrooms').on('click', function() {
  $('button.guessweapons').hide(); // hide What button
  $('button.guessrooms').hide(); // hide Where button
  $('button.checkanswers').show(); // show Answers button
  $('section.answerPageButtons').hide(); // hide answer-page buttons
  $('section.guessAgainButtons').hide(); // hide guess-again buttons
  guessWhere(); // Where display (removes previous display)
});

// Start Where > Answers:
$('button.checkanswers').on('click', function() {
  $('ol').remove('.currentDisplay'); // removes Where display
  $('section').remove('.firstSetButtons'); // removes first set of buttons
  $('section.answerPageButtons').show(); // shows answer-page buttons
  $('section.guessAgainButtons').hide(); // hide guess-again buttons

  compareWho(); // check user's guesses
  compareWhat();
  compareWhere();

  createAnswerCards(); // creates answer cards
  createGuessCards(); // creates guess cards

  printAnswersGuesses(); // print cards out
  fadeInCards(); // Fades-in guess and answer cards
  addToEliminated(); // Adds eliminated guesses to an array

  if (whoRight && whatRight && whereRight) {
    $('.choices').append('<h3>You Solved the Mystery!</h3>');
    $('button.guess-again').hide();
  }
}); // End Where > Answers

// New Game button, reloads entire page to start over:
$('button.new-game').on('click', function() {
  location.reload();
});

// START GUESS AGAIN LOOPS:
$('button.guess-again').on('click', function() {
  $('ol').remove('.answerDisplay'); // Removes answer display
  $('section.guessAgainButtons').show(); // Shows guess-again buttons
  numberOfAttempts += 1; // Adds a number to the number of attempts

  guessWhoLoop(); // Allows user to guess again "Who"

  $('button.guessAgainWeapons').on('click', function() {
      guessWhatLoop(); // Allows user to guess again "What"
    });
  $('button.guessAgainRooms').on('click', function() {
      guessWhereLoop(); // Allows user to guess again "Where"
    });
}); // End Guess Again Loop
