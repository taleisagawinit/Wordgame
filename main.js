$(document).ready(() => {

    var wordlist = commonWords.filter(function(a) {
        if (a.length > 3) {
            return true;
        }
    })

    function randomWord(array) {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
          }
        return array[getRandomInt(0, array.length)]
    }

    var yourWord = randomWord(wordlist);
    console.log(yourWord);

    function makeBlankSpaces(word) {
        var blank = "";
        for (var i = 0; i < word.length; i++) {
            if (word.charAt(i)) {
                blank = blank + "_"
            }
        }
        return blank
    }
    var blankSpaces = makeBlankSpaces(yourWord)
    console.log(blankSpaces);
    $(".word").html(blankSpaces)

    var guessesLeft = 10
    var spacesArray = blankSpaces.split('');
    var wordArray = yourWord.split('')
    var allGuesses = "";
    var health = 500;

    //maybe make all these sounds methods:

    function playWin() {
        var snd = new Audio("https://freesound.org/data/previews/267/267528_5060556-lq.mp3");
        snd.play();
        snd.currentTime=0;
    }
    
    function playLose() {
        var losesnd = new Audio("https://freesound.org/data/previews/157/157218_1670580-lq.mp3");
        losesnd.play();
        losesnd.currentTime=0;
    }

    function lostGame() {
        var losegm = new Audio("https://freesound.org/data/previews/362/362205_6629901-lq.mp3");
        losegm.play();
        losegm.currentTime=0;
    }

    function wonGame() {
        var losegm = new Audio("https://freesound.org/data/previews/270/270319_5123851-lq.mp3");
        losegm.play();
        losegm.currentTime=0;
    }



    function wrong() {
        allGuesses = allGuesses + $("#guess").val();
        $("#guess").val("")
        guessesLeft--;
        $(".allGuesses").html(allGuesses);
        health = health - 50;
        $("#health").css("width",`${health}px`);
        if (guessesLeft == 0) {
            alert('You lost! Your word was ' + "'" + yourWord + "'")
            return lostGame();
        } 
        return playLose();
        
    }

    function right() {
        if (spacesArray.indexOf("_") == -1) {
            alert('You won the game!')
            return wonGame();
        }
        playWin();
        allGuesses = allGuesses + $("#guess").val();
        $("#guess").val("")
        $(".allGuesses").html(allGuesses);
    }
    
    

    function addLetters(letter) {
        for (var i = 0; i <= wordArray.length-1; i++) {
               if (wordArray[i] === letter) {
                spacesArray[i] = letter;
                spacesArray;
                    for (var j = i+1; j <= wordArray.length-1; j++) {
                        if (wordArray[j] === letter) {
                            spacesArray[j] = letter;
                            spacesArray;
                        }
                    }
                    right();
                    return $(".word").html(spacesArray.join(''))
                }
        }
        wrong()
        return $(".num").html(guessesLeft);
    }


    $("button").on('click', function(e) {
        // e.preventDefault();
        if (allGuesses.charAt(allGuesses.length-1) === $("#guess").val()) {
            $("#guess").val("")
            // remove return value below if I want to return that the letter is wrong AND minus guesses left
            return alert('You already guessed this letter! Try a different one')
        }
        addLetters($("#guess").val())

    })
    









})