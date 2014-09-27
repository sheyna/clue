// Set up cards
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

var who = new CardList(["person0", "person1",
  "person2", "person3", "person4", "person5"],
  ["Mr. Green", "Mrs. Peacock", "Prof. Plum",
  "Miss Scarlet", "Col. Mustard", "Mrs. White"], "person");

var what = new CardList(["weapon0", "weapon1",
  "weapon2", "weapon3", "weapon4", "weapon5"],
  ["Dagger", "Rope", "Candlestick",
  "Revolver", "Wrench", "Lead Pipe"], "weapon");

var where = new CardList(["room0", "room1", "room2",
  "room3", "room4", "room5", "room6", "room7", "room8"],
  ["Dining Room", "Kitchen", "Ballroom",
  "Billiard Room", "Conservatory", "Library",
  "Lounge", "Study", "Hall"], "room");

// Creates cards:
who.createHTML();
what.createHTML();
where.createHTML();

// Sets up answers
var whoNumber, whatNumber, whereNumber;

whoNumber = Math.floor(Math.random() * who.list.length);
whatNumber = Math.floor(Math.random() * what.list.length);
whereNumber = Math.floor(Math.random() * where.list.length);

// Sets up players: user and computer answers:
function Player(who, what, where, whoTitle, whatTitle, whereTitle) {
  this.who = who;
  this.what = what;
  this.where = where;
  this.whoTitle = whoTitle;
  this.whatTitle = whatTitle;
  this.whereTitle = whereTitle;
}

var user = new Player();
var answers = new Player(who.list[whoNumber], what.list[whatNumber],
  where.list[whereNumber], who.cardTitle[whoNumber],
  what.cardTitle[whatNumber], where.cardTitle[whereNumber]);

// To test game:
console.log("the answers are " + answers.who + answers.what + " and " + answers.where);

// Variables and functions to determine status of the user's guesses:
var whoWrong, whatWrong, whereWrong;
var whoRight, whatRight, whereRight;

var compareWho = function() {
  if (user.who == answers.who) {
    whoWrong = false;
    whoRight = true;
  } else {
    whoWrong = true;
    whoRight = false;
  }
};

var compareWhat = function() {
  if (user.what == answers.what) {
    whatWrong = false;
    whatRight = true;
  } else {
    whatWrong = true;
    whatRight = false;
  }
};

var compareWhere = function() {
  if (user.where == answers.where) {
    whereWrong = false;
    whereRight = true;
  } else {
    whereWrong = true;
    whereRight = false;
  }
};

var eliminated = []; // Array stores eliminated guesses

// Adds eliminated guesses to an array:
var addToEliminated = function() {
  if (whoWrong) {
    eliminated.push(user.who);
  }
  if (whatWrong) {
    eliminated.push(user.what);
  }
  if (whereWrong) {
    eliminated.push(user.where);
  }
}; // End addToEliminated function declaration

// Declare Gray out eliminated card function:
var grayOut = function() {
  $('li.card').each(function() {
    if ($.inArray($(this).attr('id'), eliminated) > -1) {
      $(this).css({
        'opacity': '0.2'
      });
    }
  });
};

// Function declaration to fade in cards
var fadeInCards = function() {
  $li = $('li');
  $li.hide().each(function(index) {
    $(this).delay(100 * index).fadeIn(700);
  });
};

// Function declaration for main card page display (with the question and lists):
var mainCardDisplay = function(question, cardListOutPut) {
  $('.choices').prepend('<ol class="currentDisplay"><li class="questions" \
    >' + question + '</li><ul>' + cardListOutPut + '</ul></ol>');
};

// ANSWER/GUESS DISPLAY FUNCTIONS:

// Stores html for individual answer cards:
var whoAnswerPrintOut, whatAnswerPrintOut, whereAnswerPrintOut;

// Creates base card display for user guess and and answers
var answerGuessDisplay = function(cardClass, answerGuessID, answerGuessTitle, answerGuessPrinted) {
  return '<li class="' + cardClass + '" id="' + answerGuessID + '" \
  title="' + answerGuessTitle + '">' + answerGuessPrinted + '</li>';
};

// Creates HTML for all individual answers cards:
var createAnswerCards = function() {
  if (whoWrong) {
    whoAnswerPrintOut = answerGuessDisplay("card-answers", "personhidden", "incorrect: try again", "&nbsp;");
  } else {
    whoAnswerPrintOut = answerGuessDisplay("card-answers", answers.who, answers.whoTitle, answers.whoTitle);
  }

  if (whatWrong) {
    whatAnswerPrintOut = answerGuessDisplay("card-answers", "weaponhidden", "incorrect: try again", "&nbsp;");
  } else {
    whatAnswerPrintOut = answerGuessDisplay("card-answers", answers.what, answers.whatTitle, answers.whatTitle);
  }

  if (whereWrong) {
    whereAnswerPrintOut = answerGuessDisplay("card-answers", "roomhidden", "incorrect: try again", "&nbsp;");
  } else {
    whereAnswerPrintOut = answerGuessDisplay("card-answers", answers.where, answers.whereTitle, answers.whereTitle);
  }

};

// Stores html for individual guess cards:
var whoGuessPrintOut, whatGuessPrintOut, whereGuessPrintOut;

// Creates HTML for all individual guess cards:
var createGuessCards = function() {
  whoGuessPrintOut = answerGuessDisplay("card-guessed", user.who, user.whoTitle, user.whoTitle);
  whatGuessPrintOut = answerGuessDisplay("card-guessed", user.what, user.whatTitle, user.whatTitle);
  whereGuessPrintOut = answerGuessDisplay("card-guessed", user.where, user.whereTitle, user.whereTitle);
};

// Counter for number of user's guess attemps:
var numberOfAttempts = 0;

// Creates and prints HTML for entire answer-guess card display:
var printAnswersGuesses = function() {
  numberOfAttempts += 1;
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

// answer page display with all functions
var answerPageDisplay = function() {
  compareWho(); // check user guesses
  compareWhat();
  compareWhere();

  createAnswerCards(); // creates answer cards
  createGuessCards(); // creates guess cards

  printAnswersGuesses(); // print cards out
  fadeInCards(); // Fades-in guess and answer cards
  addToEliminated(); // Adds eliminated guesses to an array

  // New Game button, reloads entire page to start over:
  $('button.new-game').on('click', function() {
    location.reload();
  });
};

// GUESS AGAIN FUNCTIONS:

// Shows Weapon guess again button; hides all others
var showWeaponAgainButton = function() {
  $('button.guessAgainWeapons').show();
  $('button.guessAgainRooms').hide();
  $('button.guessAgainAnswers').hide();
  $('section.answerPageButtons').hide();
};

// Shows Room guess again button; hides all others
var showRoomAgainButton = function() {
  $('button.guessAgainWeapons').hide();
  $('button.guessAgainRooms').show();
  $('button.guessAgainAnswers').hide();
  $('section.answerPageButtons').hide();
};

// Shows Answers guess again button; hides all others
var showAnswersAgainButton = function() {
  $('button.guessAgainWeapons').hide();
  $('button.guessAgainRooms').hide();
  $('button.guessAgainAnswers').show();
  $('section.answerPageButtons').hide();
};

// Shows answer page Guess Again and new game buttons; hides all others
var showGuessAgainNewGameButtons = function() {
  $('button.guessAgainWeapons').hide();
  $('button.guessAgainRooms').hide();
  $('button.guessAgainAnswers').hide();
  $('section.answerPageButtons').show();
  $('ol').remove('.currentDisplay'); // hides previous display
};

// Guess again: who
var guessAgainWho = function() {
  $('ol').remove('.currentDisplay'); // hides previous display
  mainCardDisplay("Who Killed Mr. Body?", who.output);
  grayOut(); // Gray out eliminated cards
  fadeInCards(); // fade in what display

  // Records user "Who" guess:
  $('li.person').on('click', function() {
    user.who = $(this).attr('id');
    user.whoTitle = $(this).attr('title');
    $(this).css({
      'border': '2px solid #e48d68'
    });
  });
};

// Guess again: what
var guessAgainWhat = function() {
  $('ol').remove('.currentDisplay'); // hides previous display
  mainCardDisplay("Mr. Body Was Killed With What?", what.output);
  grayOut(); // Gray out eliminated cards
  fadeInCards(); // fade in what display

  // Records user "What" guess:
  $('li.weapon').on('click', function() {
    user.what = $(this).attr('id');
    user.whatTitle = $(this).attr('title');
    $(this).css({
      'border': '2px solid #e48d68'
    });
  });
};

// Guess again: where
var guessAgainWhere = function() {
  $('ol').remove('.currentDisplay'); // hides previous display
  mainCardDisplay("Where Was Mr. Body Was Killed?", where.output);
  grayOut(); // Gray out eliminated cards
  fadeInCards(); // fade in what display

  // Records user "Where" guess:
  $('li.room').on('click', function() {
    user.where = $(this).attr('id');
    user.whereTitle = $(this).attr('title');
    $(this).css({
      'border': '2px solid #e48d68'
    });
  });
};

// Guess again where circumlocutors
var guessAgainWhereLoop = function() {
  if (whereWrong) {
    guessAgainWhere();
    showAnswersAgainButton(); // shows answer button; hides all others
  } else {
    showGuessAgainNewGameButtons(); // shows guess again & new game button; hides all others
    answerPageDisplay(); // show answers page display and run functions
  }
}; // End guessAgainWhereLoop

// Guess again what circumlocutors
var guessAgainWhatLoop = function() {
  if (whatWrong && whereWrong) {
    guessAgainWhat();
    showRoomAgainButton(); // shows where button; hides all others
  } else if (whatWrong && whereRight) {
    guessAgainWhat();
    showAnswersAgainButton(); // shows answer button; hides all others
  } else {
    guessAgainWhereLoop();
  }
}; // End guessAgainWhatLoop

// Guess again who circumlocutors
var guessAgainWhoLoop = function() {
  if (whoWrong && whatWrong) {
    guessAgainWho();
    showWeaponAgainButton(); // shows what button; hides all others
  } else if (whoWrong && whatRight && whereWrong) {
    guessAgainWho();
    showRoomAgainButton(); // shows where button; hides all others
  } else if (whoWrong && whatRight && whereRight) {
    guessAgainWho();
    showAnswersAgainButton(); // shows where button; hides all others
  } else {
    guessAgainWhatLoop();
  }
}; // end guessAgainWhoLoop

/////////////// START DISPLAY:

// Start Who display:
$(document).ready(function() {
  fadeInCards(); // fade in opening display
  $('button.guessweapons').show(); // hide What button
  $('button.guessrooms').hide(); // hide Where button
  $('button.checkanswers').hide(); // hide answers button
  $('section.answerPageButtons').hide(); // hide Where
  $('section.guessAgainButtons').hide(); // hide Where

  // Records user Who guess:
  $('li.person').on('click', function() {
    user.who = $(this).attr('id');
    user.whoTitle = $(this).attr('title');
    $(this).css({
      'border': '2px solid #e48d68'
    });
  });
}); // End start Who display

// Who > What:
$('button.guessweapons').on('click', function() {
  $('ol').remove('.currentDisplay'); // removes who display
  mainCardDisplay("Mr. Body Was Killed With What?", what.output);
  $('button.guessweapons').hide(); // hide What button
  $('button.guessrooms').show(); // hide Where button
  $('button.checkanswers').hide(); // hide answers button
  $('section.answerPageButtons').hide(); // hide Where
  $('section.guessAgainButtons').hide(); // hide Where
  fadeInCards(); // fade in what display

  // Records user "What" guess:
  $('li.weapon').on('click', function() {
    user.what = $(this).attr('id');
    user.whatTitle = $(this).attr('title');
    $(this).css({
      'border': '2px solid #e48d68'
    });
  });
}); // End Who > What

// What > Where:
$('button.guessrooms').on('click', function() {
  $('ol').remove('.currentDisplay'); // removes what
  mainCardDisplay("Where Was Mr. Body Was Killed?", where.output);
  $('button.guessweapons').hide(); // hide What button
  $('button.guessrooms').hide(); // hide Where button
  $('button.checkanswers').show(); // hide answers button
  $('section.answerPageButtons').hide(); // hide Where
  $('section.guessAgainButtons').hide(); // hide Where
  fadeInCards(); // fade in where display

  // Records user "Where" guess:
  $('li.room').on('click', function() {
    user.where = $(this).attr('id');
    user.whereTitle = $(this).attr('title');
    $(this).css({
      'border': '2px solid #e48d68'
    });
  });
}); // End What > Where

// Where > Answers:
$('button.checkanswers').on('click', function() {
  $('ol').remove('.currentDisplay'); // removes where
  $('section').remove('.firstSetButtons'); // remove first set of buttons
  $('section.answerPageButtons').show(); // hide What
  $('section.guessAgainButtons').hide(); // hide Where

  answerPageDisplay();

}); // End Where > Answers

// GUESS AGAIN:
$('button.guess-again').on('click', function() {
  $('ol').remove('.answerDisplay'); // Removes answer display
  $('section.guessAgainButtons').show(); // shows Guess Again buttons
  guessAgainWhoLoop();

  $('button.guessAgainWeapons').on('click', function() {
      guessAgainWhatLoop();
    });

  $('button.guessAgainRooms').on('click', function() {
      guessAgainWhereLoop();
    });

  $('button.guessAgainAnswers').on('click', function() {
      showGuessAgainNewGameButtons(); // shows guess again & new game button; hides all others
      answerPageDisplay(); // show answers page display and run functions
    });

}); // End Guess Again
