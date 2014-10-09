#Clue Project
###for Code Fellows Foundation 1, Sept. 2014
Game allows user to guess the suspect, weapon and room. The computer shows the user the answer "card" when they are correct and hides it when they are wrong. The user can guess again until they get the correct answer. A counter keeps track of how many tries it takes the user to get the all three guesses correct.

###Most recent updates
I have condensed the guess-displays into one function call instead of two. Now when the user guesses again it uses the same function as it used for the first guess. I moved the remaining bits of CSS to the CSS file: the red-orange border highlight (when the user selects a guess) as well as the "gray out" style when the computer displays eliminated cards when the user guesses again. I also condensed a couple of my variables. For example, the code no longer uses both a "whoWrong" and "whoRight" variable. All of this cut some 45 lines from my code. For the images, I was able to get the file size of the magnifying-glass at the top of the page down 84 KB by cropping it tighter and then using CSS to rotate it.

The one area I have had no luck is when I try to make a function out of the code where a user clicks on a card to make a guess (currently at lines 142, 157 and 172 of the code). I have tried this several ways and multiple times. I asked several TAs for help with this but they couldn't get it to work either.
