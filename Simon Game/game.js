var gamePattern = [];
var userClickedPattern =[];

var buttonColors = ["red","blue","green", "yellow"];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        start = true;
   }
});

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length-1);

    animatePress(userChosenColor);
    playSound(userChosenColor);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        console.log("success");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }else{
        console.log("Wrong");
        playSound("wrong");
        $(".body").addClass(".game-over");

        setTimeout(function(){
            $(".body").removeClass(".game-over")
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();   
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#"+ currentColor).removeClass("pressed")
    },100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
