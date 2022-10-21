/*
 * 
 * Author: P K JANA
 * IIT Kharagpur
 * 
 */

var i = 0;
var resultArray = [];
var questionCount = 0;

function quizInitialize() {
    document.getElementById("vqt-start").style.display = "none";
    document.getElementById("vqt-next").style.display = "block";

    questionCount = quizJSON.questions.length;
    if (i >= questionCount) {
        showResult();
    }
    document.getElementById("vlab-quiz-question").innerHTML = "<p style=\"font-weight:bold; padding-bottom:10px;\">" + (i + 1) + ". " + quizJSON.questions[i].q + "</p>";
    var ansCount = quizJSON.questions[i].a.length;
    var radioStr = "";
    for (var j = 0; j < ansCount; j++) {
        radioStr = radioStr + "<p><input type = \"radio\" name = \"ans\" value = \"" + j + "\"><label>" + quizJSON.questions[i].a[j].option + "</label></p>";
    }
    document.getElementById("vlab-quiz-options").innerHTML = radioStr;
}
function quizNext() {
    resultArray[i] = document.querySelector('input[name="ans"]:checked').value;
    i = i + 1;
    quizInitialize();
}
function showResult() {
    var resultCount = 0;
    var level = "";
    
    document.getElementById("vlab-quiz-question").style.display = "none";
    document.getElementById("vlab-quiz-options").style.display = "none";
    document.getElementById("vlab-quiz-result").style.display = "block";
    document.getElementById("vqt-next").style.display = "none";
    document.getElementById("vqt-try-again").style.display = "block";
    
    for (var k = 0; k < questionCount; k++) {
        if (quizJSON.questions[k].a[resultArray[k]].correct === true) {
            resultCount++;           
        }
    }
    var resultPercent = (resultCount / questionCount) * 100;
    if (resultPercent >= 75) {
        level = quizJSON.info.level1;
    } else if (resultPercent >= 60) {
        level = quizJSON.info.level2;
    } else if (resultPercent >= 50) {
        level = quizJSON.info.level3;
    } else if (resultPercent >= 40) {
        level = quizJSON.info.level4;
    } else {
        level = quizJSON.info.level5;
    }

    document.getElementById("vlab-quiz-result").innerHTML = "<p> You have scored " + resultCount + " out of " + questionCount + ".</p><p>Your level is: " + level + "</p>";
}
function tryAgain() {
    document.getElementById("vlab-quiz-question").style.display = "block";
    document.getElementById("vlab-quiz-options").style.display = "block";
    document.getElementById("vlab-quiz-result").style.display = "none";
    document.getElementById("vqt-next").style.display = "block";
    document.getElementById("vqt-try-again").style.display = "none";
    i = 0;
    resultArray = [];
    quizInitialize();
}