// CODING CHALLENGE

// Function constructor called Question to describe a question
// A question should include:
// a) the question itself
// b) the answers from which the player can choose the correct one (choose data structure)
// c) correct answer

(function() {

    var numberOfQuestions = 0,
        questions,
        score = 0,
        checkIfAnswerCorrect,
        quitTheGame = false,
        randomQuestion;

    function Question(questionText, answers, correctAnswerIndex){
        this.questionText = questionText;
        this.answers = answers;
        this.correctAnswerIndex = correctAnswerIndex;
    }

    Question.prototype.displayQuestion = function(){
        console.log(this.questionText);
    };

    Question.prototype.displayAnswers = function(){
        for (var i = 0; i < this.answers.length; i += 1) {
            console.log(i + ': ' + this.answers[i]);
        }
    };

    Question.prototype.checkIfAnswerCorrect = function(answer, correctAnswer) {

        if ( answer === this.correctAnswerIndex) {
            score += 1;
            console.log("Correct answer !, you're score is now: " + score );
        } else {
            console.log("Wrong answer ! you're score is: " + score);
        }      
    }; 



    questions = [
            new Question("If javascript is the collest programming language ?", ['Yes', 'No'], 0),
            new Question("Who's the course owner ?", ['Michael', 'Charles', 'Jonas'], 2),
            new Question("Who's the president of the United States ?", ['Donald Trump', 'Benjamin Netanyahu', 'Charles Cohen'], 0)
    ];

    var getNewQuestion = function() {
        
        numberOfQuestions += 1;
        randomQuestion = questions[Math.round( Math.random() * (questions.length-1) )];
        
        console.log('Question number ' + numberOfQuestions);
        
        randomQuestion.displayQuestion();
        randomQuestion.displayAnswers();

    };


    while(quitTheGame === false) {

        getNewQuestion();

        var answer = prompt(randomQuestion.questionText);

        if (answer === 'exit') {
            quitTheGame = true;
            console.log("You quit the game");
        } else {
            randomQuestion.checkIfAnswerCorrect(parseInt(answer));
        }
    }



})();