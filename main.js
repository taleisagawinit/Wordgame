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
    // var wrongGuess = "";
    var allGuesses = "";
    
    function addLetters(letter) {
        // fix guesses so they know AALLL letters guessed. not just wrong ones

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
                    alert('Correct Guess')
                    allGuesses = allGuesses + $("#guess").val();
                    $("#guess").val("")
                    $(".allGuesses").html(allGuesses);
                    return $(".word").html(spacesArray.join(''))
                }
        }
        alert('Wrong Guess')
        // wrongGuess = wrongGuess + $("#guess").val()
        allGuesses = allGuesses + $("#guess").val();
        $("#guess").val("")
        guessesLeft--;
        $(".allGuesses").html(allGuesses);
        return $(".num").html(guessesLeft);
    }


    $("button").on('click', function(e) {
        // e.preventDefault();
        if (allGuesses.charAt(allGuesses.length-1) === $("#guess").val()) {
            $("#guess").val("")
            // remove return value below if I want to still return that the letter is wrong and minus guesses left or right
            return alert('You already guessed this letter! Try a different one')
        }
        addLetters($("#guess").val())
        if (guessesLeft == 0) {
            alert('You lost! Your word was ' + "'" + yourWord + "'")
        } else if (spacesArray.indexOf("_") == -1) {
            alert('You won the game!')
        }
    })
    









})