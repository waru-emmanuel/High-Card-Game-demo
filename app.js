
// Default
let userScore, aiScore, user_card, ai_card,userNumber,aiNumber, shuffleLimit,highScore;

highScore=5;
shuffleLimit=3;
userScore=0;
aiScore=0;
document.getElementById("btn-hold").disabled=true;

// Init
document.querySelector('#btn-new').addEventListener('click',()=>{
    // 1. Reset JS scores & shuffle limit.
    shuffleLimit=3;
    userScore=0;
    compScore=0;

    // 2. Reset HTML scores & texts.
    document.querySelector("#score-0").textContent=userScore;
    document.querySelector("#score-1").textContent=compScore;
    document.getElementById("player-title-0").textContent="Player 1";
    document.getElementById("player-title-1").textContent="Computer";

    // 3. Concile all users' cards.
    user_card=document.getElementById("player-card-0");
    user_card.src='img/PNG/card_back.png';
    ai_card=document.getElementById("player-card-1");
    ai_card.src='img/PNG/card_back.png';

    // 4. Ensure shuffle button is enabled.
    document.getElementById("btn-shuffle").disabled=false;
});

// Shuffle
document.querySelector('#btn-shuffle').addEventListener('click',()=>{
    
    if (userScore!=highScore && aiScore!=highScore){
        // 1. Reset player title and ai card
        document.getElementById("player-title-0").textContent="Player";
        document.getElementById("player-title-1").textContent="Computer";

        ai_card=document.getElementById("player-card-1");
        ai_card.src='img/PNG/card_back.png';
        
        // 2. Random number
        userNumber=Math.floor(Math.random()*13)+1;

        // 3.Display result
        if (shuffleLimit>0){
            user_card=document.getElementById("player-card-0");
            user_card.src='img/PNG/card-'+userNumber+'.png';
        }

        // 4. Update shuffle limit
        shuffleLimit-=1;

        // 5. Enable Hold button
        document.getElementById("btn-hold").disabled=false;
    
    }else if(userScore==highScore){
        document.getElementById("player-title-0").textContent="Champion";
        document.getElementById("btn-shuffle").disabled=true;
        document.getElementById("btn-hold").disabled=true;
    }else{
        document.getElementById("player-title-1").textContent="Champion";
        document.getElementById("btn-shuffle").disabled=true;
        document.getElementById("btn-hold").disabled=true;
    }
});


// Hold
function hold (){
    if (userScore!=highScore && aiScore!=highScore){
        //  1. Ai random number
        aiNumber=Math.floor(Math.random()*13)+1;

        // 2. Display results
        ai_card=document.getElementById("player-card-1");
        ai_card.src='img/PNG/card-'+aiNumber+'.png';

        // 3. Compare results
        if (userNumber>aiNumber){
            userScore+=1;
            document.getElementById("player-title-0").textContent="Winner";
            document.querySelector("#score-0").textContent=userScore;

        }
        else if (userNumber<aiNumber){
            aiScore+=1;
            document.getElementById("player-title-1").textContent="Winner";
            document.querySelector("#score-1").textContent=aiScore;    
        }
        shuffleLimit=3;
        document.getElementById("btn-hold").disabled=true;
    }else if(userScore==highScore){
        document.getElementById("player-title-0").textContent="Champion";
        document.getElementById("btn-shuffle").disabled=true;
        document.getElementById("btn-hold").disabled=true;
    }else{
        document.getElementById("player-title-1").textContent="Champion";
        document.getElementById("btn-shuffle").disabled=true;
        document.getElementById("btn-hold").disabled=true;
    }
}

document.getElementById('btn-hold').addEventListener('click',hold);
