const bullets = document.querySelector("#bullets");
const goku = document.querySelector("#goku");
const enemies = document.querySelector("#enemies");
const freiza = document.querySelector("#freiza");
const freizaImage = document.getElementById("freiza").querySelector("img");
const gokuImage = document.getElementById("goku").querySelector("img");
let fixedx;
let fixedy;
let gokuimageint;
let charging1;
let finished = true;
let finalcounter = 0;
let cursound = new Audio("menu/cursor.ogg")
cursound.volume = 0.5;
goku.style.left = window.innerWidth * 0.05 + "px";
goku.style.top = window.innerHeight * 0.4 + "px";
let imgfreizaint ;
let isFiring = false; 
let isCharging = false; 
let gokuhit = false; 
let freizahit = false; 
let freizarun = false; 
let health =100;
let win = false;
let lose = false;
let fhealth=100;
let ki =100;
let score = 0;
let gameover = false;
let gamepaused = false;
let chint;
let isFiring1=false; 
let pause = false;
let counter = 0;
let timerInterval; 
let winningTime = null; 
let sec = -1;
let timerRunning = false;
let freizasound = new Audio("start/1.mp3")
let freizadial = false;
let gokusound = new Audio("mad.ogg")
let gokudial = false;
let chargingsound = new Audio("charge.ogg")
let moving = false;
let mmm = Math.ceil(Math.random()*18);
let hurtsound = new Audio(`hurt/1 (${mmm}).ogg`);
let baudio;
let scores;
let temp;
let currentPage = 0;
const scoresPerPage = 5;

function displayScores() {
    const scorecontainer = document.getElementsByClassName("scores-container");
    const scoresList = document.getElementById('scoresList');
    scoresList.innerHTML = ""; 
    scorecontainer[0].style.display = "block"; 
       const start = currentPage * scoresPerPage;
    const end = start + scoresPerPage;
temp = JSON.parse(scores);
    console.log(Array.isArray(temp)); 
    const currentScores = temp.slice(start, end);
        currentScores.forEach(score => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="score-item">${score.rank}</span>
            <span class="score-item">${score.name}</span>
            <span class="score-item">${score.score}</span>
            <span class="score-item">${score.timem}</span>
        `;
        scoresList.appendChild(li);
    });
}
document.getElementById('prevButton').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        displayScores();
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    if ((currentPage + 1) * scoresPerPage < temp.length) {
        currentPage++;
        displayScores();
    }
});

StartGame();

let keys = {};



function updatePosition() {
    const gokuRect = goku.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (!isFiring && !gameover && !win) {
        if (keys[65] && gokuRect.left > 0) {
            goku.style.left = `${parseInt(goku.style.left) - 5}px`;
            moving = true;
        }
        if (keys[68] && gokuRect.right < screenWidth * 0.5) {
            goku.style.left = `${parseInt(goku.style.left) + 5}px`;
            moving = true;

        }
        if (keys[87] && gokuRect.top > 35) {
            goku.style.top = `${parseInt(goku.style.top) - 5}px`;
            moving = true;

        }
        if (keys[83] && gokuRect.bottom < screenHeight) {
            goku.style.top = `${parseInt(goku.style.top) + 5}px`;
            moving = true;

        }
    }

    if (isCharging&&!gameover&&!win) {
        if(!charging1&&!gameover&&!win){
            isFiring = true; 
            isFiring1= true;

        const gokuImage = goku.querySelector("img");
        chint = setInterval(() => {
            if (ki <100){
                if(!moving&&!gokuhit){
            ki++;
            UpdateKi();} else {
                clearInterval(chint);
                charging1 = false;
            }}
        },85);
        gokuImage.src = "img/goku/charging3.gif";};
        charging1 = true; 
    }

    requestAnimationFrame(updatePosition);
}

window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
    if (e.keyCode === 32 && !isFiring1 && !isFiring) { 
        fireBullet();
    }
    if (e.keyCode === 75  && !isFiring && !gameover) { 
        fireKame();
    }
    if (e.keyCode === 74 && !isFiring && !isFiring1) { 
        if(isCharging==false){
         chargingsound.currentTime=0;      
        chargingsound.play();    
        }    
        isCharging = true; 
    }
    if (e.keyCode === 80 && !gameover && !win){
        pause = true;
        counter=1;
    }
    // if (e.key === "r") {
    //     fireupper();    }
});

window.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
    moving = false;
    if ((e.keyCode === 74&&(isCharging||gokuhit))) {
        isFiring = false; 
        isFiring1= false;
        isCharging = false; // Stop charging when 'j' is released
        charging1= false; // Stop charging when
        chargingsound.pause();
        clearInterval(chint);
        if (!gameover&&!win){
        const gokuImage = goku.querySelector("img");
        gokuImage.src = "img/goku/gokumoving.gif";}
    }
});


// Start the animation loop
requestAnimationFrame(updatePosition);


function fireBullet() {
    if (ki >=10){
        ki = ki -10;
        UpdateKi();
    if (!gokuhit){
        isFiring = true; 
        setTimeout(()=>{
            isFiring = false;
        },200)    
    clearTimeout(gokuimageint);
    const new_bullet = document.createElement("div");
    new_bullet.className = "bullet";
    const bulletImage = document.createElement("img");
    bulletImage.src = "img/goku/kamehameha.gif"; 
    bulletImage.alt = "Bullet"; 
    new_bullet.appendChild(bulletImage); 
    bullets.appendChild(new_bullet);
    new_bullet.style.display = "none"; 
    const reomver = setInterval(() => {
        if (gokuhit){
            new_bullet.remove();
            clearInterval(reomver);
            return;
        }
    },10);
    if (!gokuhit) {
        setTimeout(() => {
            new_bullet.style.display = "block"; // Ensure bullet is visible // Start bullet movement
            let kis = new Audio("sfx/kiblast.ogg")
            kis.volume= 0.2;
            kis.play();
        }, 40);
    }

    const goku_loc = goku.getBoundingClientRect();
    new_bullet.style.left = goku_loc.left + goku_loc.width / 2 + "px";
    new_bullet.style.top = goku_loc.top + 32 + "px";

    let firedbullet_left = goku_loc.x - 100;

    function moveBullet() {
            fire(new_bullet, firedbullet_left);
            firedbullet_left += 20; // Move bullet

            let freiza_loc = freiza.getBoundingClientRect();
            let bullet_loc = new_bullet.getBoundingClientRect();

            // Collision detection
            if (bullet_loc.left < freiza_loc.left + freiza_loc.width &&
                bullet_loc.left + bullet_loc.width > freiza_loc.left &&
                bullet_loc.top < freiza_loc.top + freiza_loc.height &&
                bullet_loc.top + bullet_loc.height > freiza_loc.top) {
                
                // Hit logic
                fhealth = fhealth -1.5;         
                       hurtsound.pause();
                 mmm = Math.ceil(Math.random()*18);
                 hurtsound = new Audio(`hurt/1 (${mmm}).ogg`);
                hurtsound.volume= 1;
                if(!freizadial){
                    freizadial=true;
                    hurtsound.play();
                }
                setTimeout(()=>{
                    freizadial=false;
                },3000)
                UpdateFriezaHealth();
                if(fhealth <=0){
                    ki =0;
                    pauseTimer(); // Pause the timer
                    clearTimeout(imgfreizaint);
                    win = true; //
                    isFiring1 = true;
                    isFiring= true;
                    finished= false;
                    gokuhit = true;  
                    score = Math.ceil((100000/(sec+2)));
                    const gameOverDiv = document.createElement("div");
                    gameOverDiv.className = "game-over";
                    gameOverDiv.innerHTML = `
                        <h1 style="font-family: myFont;">You Win!</h1>
                        <h2> Your Score is ${score} </h2>
                            <form id="nameForm">

        <input type="text" id="userName"         maxlength="6" 
 placeholder="Enter Your Name" name="userName" required style="font-family: myFont;">
<button type="submit" style="font-family: myFont;">Submit</button>
    </form>
                        <button id="restartButton"  style="font-family: myFont;">Restart</button>
                    `;
                    // Before creating a new game over div, remove any existing one
    const existingGameOverDiv = document.querySelector('.game-over');
    if (existingGameOverDiv) {
        existingGameOverDiv.remove();
    }
                    document.body.appendChild(gameOverDiv);
                
                    // Restart functionality
                    document.getElementById('nameForm').addEventListener('submit', function(event) {
                        event.preventDefault(); // Prevent the default form submission
                        const userName = document.getElementById('userName').value;
                    
                        // Call your specific function here
                        yourSpecificFunction(userName,score,sec);
                    });
                    document.getElementById("restartButton").addEventListener('mouseover', () => {
                        cursound.currentTime = 0; // Reset sound to start
                        cursound.play(); // Play the sound
                    });
                    document.getElementById("restartButton").addEventListener("click", () => {
                        location.reload(); // Reload the page to restart the game
                    });


                }
                if(win){
                    freizaImage.src = "img/freiza/dead2.gif";
                    freizahit = true;
                    gokuImage.src = "img/goku/gokuwin.gif";
                    isFiring = true; // Reset firing state
                    isFiring1 = true;

                } else {
                    clearTimeout(imgfreizaint);
                freizaImage.src = "img/freiza/damage.gif";
                freizahit = true;
                imgfreizaint =  setTimeout(() => {
                    freizaImage.src = "img/freiza/freiza.gif";
                    freizahit= false;
                    freiza.style.top = window.innerHeight * 0.4  + "px"
                    finished = true;
                }, 850);}
                new_bullet.style.left = firedbullet_left + "px";
                // Change bullet image and remove it
                const imgInBullet = new_bullet.querySelector("img");
                imgInBullet.src = "img/goku/explostion.gif";
                let kis = new Audio("sfx/kiblastexplode.ogg");
                kis.volume= 0.35;
                kis.play();
                setTimeout(() => {
                    new_bullet.remove();
                }, 800);
            } else {
                if (firedbullet_left <= window.innerWidth) {
                    requestAnimationFrame(moveBullet); // Continue moving
                } else {
                    new_bullet.remove(); // Remove bullet if it goes off-screen
                }
            }
        }
        clearInterval(reomver);
    requestAnimationFrame(moveBullet); // Start bullet movement

    const gokuImage = goku.querySelector("img");
    gokuImage.src = "img/goku/gokukame2.gif";
    gokuimageint = setTimeout(() => {
        if(!win){
        gokuImage.src = "img/goku/gokumoving.gif";
        isFiring = false;}  else {
            gokuImage.src = "img/goku/gokuwin.gif";
            isFiring = true; // Reset firing state
            isFiring1 = true;
        }
    }, 500);
}}}

function fire(new_bullet, firedbullet_left) {
    new_bullet.style.left = firedbullet_left + "px";
}

function fireKame() {
    if (ki >=15){
        ki = ki -15;
        UpdateKi();
    if (!gokuhit){
        isFiring = true; 
        isFiring1= true;
    clearTimeout(gokuimageint);
    const goku_loc = goku.getBoundingClientRect(); // Move this up for correct positioning
    const new_bullet = document.createElement("div");
    new_bullet.className = "kame";
    const bulletImage = document.createElement("img");
    bulletImage.src = "img/goku/kamehameha.gif"; 
    bulletImage.alt = "kamehameha"; 
    new_bullet.appendChild(bulletImage); 
    bullets.appendChild(new_bullet);
    new_bullet.style.display = "none"; 
    new_bullet.style.position = "absolute"; // Ensure it's absolutely positioned
    const reomver = setInterval(() => {
        if (gokuhit){
            new_bullet.remove();
            clearInterval(reomver);
            return;
        }
    },10);
    // Set initial position
    new_bullet.style.left = goku_loc.left + goku_loc.width / 2 + "px";
    new_bullet.style.top = goku_loc.top - 48 + "px"; // Position above Goku
     let firedbullet_left1 = parseInt(new_bullet.style.left)-120; 
    setTimeout(() => {
        new_bullet.style.display = "block"; // Show bullet after a delay
        clearInterval(reomver);
        moveBullet1(new_bullet,firedbullet_left1); // Start moving the bullet

    }, 800);

    const gokuImage = goku.querySelector("img");
    gokuImage.src = "img/goku/superkame3.gif";
    let kis = new Audio("sfx/kames.mp3")
    kis.volume= 1;
    kis.play();
    gokuimageint = setTimeout(() => {
        if(!win){
        gokuImage.src = "img/goku/gokumoving.gif";
        isFiring = false; // Reset firing state
        isFiring1 = false;} else {
            gokuImage.src = "img/goku/gokuwin.gif";
            isFiring = true; // Reset firing state
            isFiring1 = true;
        }
    }, 1500);
}}

function moveBullet1(new_bullet, firedbullet_left1) {
    firedbullet_left1 += 10; // Move bullet to the right
    new_bullet.style.left = firedbullet_left1 + "px"; // Update bullet position
    let freiza_loc = freiza.getBoundingClientRect();
            let bullet_loc = new_bullet.getBoundingClientRect();
            // Collision detection
            if (bullet_loc.left < freiza_loc.left + freiza_loc.width &&
                bullet_loc.left + bullet_loc.width > freiza_loc.left &&
                bullet_loc.top < freiza_loc.top + freiza_loc.height &&
                bullet_loc.top + bullet_loc.height > freiza_loc.top) {
                
                // Hit logic
                fhealth = fhealth -10;
                hurtsound.pause();
                mmm = Math.ceil(Math.random()*18);
                if (fhealth>0){
                hurtsound = new Audio(`hurt/1 (${mmm}).ogg`);
               hurtsound.volume= 1;
               hurtsound.play();}
                UpdateFriezaHealth();
                if(fhealth <=0){
                    ki =0;
                    pauseTimer(); // Pause the timer

                    win = true; //
                    isFiring1 = true;
                    isFiring= true;
                    finished= false;
                    gokuhit = true;  
                    score = Math.ceil((100000/(sec+2)));
                    const gameBoard = document.getElementById('game-board');
                    gameBoard.innerHTML = ''; // Clear game board
                    const finishVideo = document.getElementById('finishVideo');
                    finishVideo.style.display = 'block';
                    baudio.pause(); //
                    () =>{
                        const audioElements = document.querySelectorAll('audio');
                        audioElements.forEach(audio => {
                            audio.pause();          // Pause the audio
                            audio.currentTime = 0; // Reset the playback position
                        });
                    }
    // Play the video
    finishVideo.play();

    // Request full screen
    if (finishVideo.requestFullscreen) {
        finishVideo.requestFullscreen();
    } else if (finishVideo.mozRequestFullScreen) { // Firefox
        finishVideo.mozRequestFullScreen();
    } else if (finishVideo.webkitRequestFullscreen) { // Chrome, Safari and Opera
        finishVideo.webkitRequestFullscreen();
    } else if (finishVideo.msRequestFullscreen) { // IE/Edge
        finishVideo.msRequestFullscreen();
    }
    finishVideo.addEventListener('ended', resetGame);
                }
                if(win){
                    freizaImage.src = "img/freiza/dead2.gif";
                    freizahit = true;
                    gokuImage.src = "img/goku/gokuwin.gif";
                    isFiring = true; // Reset firing state
                    isFiring1 = true;

                } else {
                freizaImage.src = "img/freiza/damage.gif";
                freizahit = true;
                setTimeout(() => {
                    freizaImage.src = "img/freiza/freiza.gif";
                    freizahit= false;
                }, 500);}
                new_bullet.style.left = 20+firedbullet_left1 + "px";                // Change bullet image and remove it
                const imgInBullet = new_bullet.querySelector("img");
                imgInBullet.src = "img/goku/explostion.gif";
                                imgInBullet.src = "img/goku/explostion.gif";
                let kis = new Audio("sfx/kiblastexplode.ogg");
                kis.volume= 0.6;
                kis.play();
                setTimeout(() => {
                    new_bullet.remove();
                }, 800);
            } else {
    // Continue moving the bullet if it's within the screen width
    if (firedbullet_left1 <= window.innerWidth) {
        requestAnimationFrame(() => moveBullet1(new_bullet, firedbullet_left1));
    } else {
        new_bullet.remove(); // Remove the bullet if it goes off-screen
    }
}}}



function Deathball() {
    if(!freizahit){
    finished = false;
    let exploded = false; // Flag to track if the death ball has exploded
    const death_ball = document.createElement("div");
    death_ball.className = "enemy1";
    const deathballImage = document.createElement("img");
    deathballImage.src = "img/freiza/deathball.gif";
    deathballImage.alt = "deathball";
    death_ball.appendChild(deathballImage);
    const reomver = setInterval(() => {
        if (freizahit){
            death_ball.remove();
            clearInterval(reomver);
            return;
        }
    },10);
    enemies.appendChild(death_ball);

    death_ball.style.display = "block";
    death_ball.style.left = window.innerWidth * 0.825 + "px";
    death_ball.style.top = window.innerHeight * 0.125 + "px";

    setTimeout(() => {
        deathballImage.src = "img/freiza/fulldeathball.gif";
    }, 1300);

    let speed = 8; // Adjust this value for slower movement
    if (fhealth <50){
        speed = 12;
    }
    const maxDistance = 500; // Maximum distance to follow Goku
    const initialPosition = {
        x: parseFloat(death_ball.style.left),
        y: parseFloat(death_ball.style.top),
    };

    let followingGoku = true; // Flag to control following behavior

    function moveDeathball() {
        if (exploded) return; // Stop movement if exploded

        const goku_loc = goku.getBoundingClientRect();
        const death_ball_loc = death_ball.getBoundingClientRect();

        if (death_ball_loc.left < goku_loc.left + goku_loc.width &&
            death_ball_loc.left + death_ball_loc.width > goku_loc.left &&
            death_ball_loc.top < goku_loc.top + goku_loc.height &&
            death_ball_loc.top + death_ball_loc.height > goku_loc.top) {
                if(isCharging){
                    isCharging = false; // Stop charging when 'j' is released
                    charging1= false; // Stop charging when
                    isFiring = false; 
                    isFiring1= false;
                    chargingsound.pause();
                    clearInterval(chint);
                }
                health = health -35;
                UpdateHealth();
                if(health<=0){
                ki =0;
                pauseTimer(); // Pause the timer

                lose = true; //
                isFiring1 = true;
                isFiring= true;
                gameover = true;
                finished= false;
                gokuhit = true;
                const gameOverDiv = document.createElement("div");
                gameOverDiv.className = "game-over";
                gameOverDiv.innerHTML = `
                <h1 style="font-family: myFont;">Game Over</h1>
                <p style="font-family: myFont;">In a heart-stopping moment, Goku found himself overwhelmed. Frieza's final attack hit with cataclysmic force, sending Goku crashing to the ground, his energy waning. As the dust settled, the once-hopeful warrior lay defeated, the weight of his loss heavy in the air. 
            
                With Goku's fall, the hopes of the universe dimmed. Frieza stood victorious, a cruel smile etched on his face, as he savored the taste of triumph over the legendary Saiyan. In that moment, the tides of fate shifted, leaving Goku's friends to wonder if they could ever rise against the darkness that now threatened to engulf them all.</p>
                <button id="restartButton" style="font-family: myFont;">Restart</button>
            `;
                // Before creating a new game over div, remove any existing one
const existingGameOverDiv = document.querySelector('.game-over');
if (existingGameOverDiv) {
    existingGameOverDiv.remove();
}
                document.body.appendChild(gameOverDiv);
            
                // Restart functionality
                document.getElementById("restartButton").addEventListener('mouseover', () => {
                    cursound.currentTime = 0; // Reset sound to start
                    cursound.play(); // Play the sound
                });
                document.getElementById("restartButton").addEventListener("click", () => {
                    location.reload(); // Reload the page to restart the game
                });}
                isFiring= true;
                death_ball.style.left = death_ball_loc.left - 1.5 * death_ball_loc.width +"px";
            // Hit logic
            if (gameover){
                gokuImage.src = `img/goku/gokudead2.gif`;
            } else {
            let random = Math.ceil(Math.random() * 4);
            gokuImage.src = `img/goku/gokuhurtimg/${random}.gif`;
       
            setTimeout(() => {
                              if(!gameover){
                gokuImage.src = "img/goku/gokumoving.gif";
                gokuhit = false;
                isFiring=false;}
            }, 500);}

            // Change bullet image and remove it
            const imgInDeathball = death_ball.querySelector("img");
            imgInDeathball.src = "img/freiza/puexplosion.gif";
            let deathballexp =new Audio("sfx/deathball.ogg")
            deathballexp.play();
            exploded = true; // Mark as exploded
            setTimeout(() => {
                death_ball.remove();
            }, 800);
        }

        const deltaX = goku_loc.x - death_ball_loc.x;
        const deltaY = goku_loc.y - death_ball_loc.y;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        if (followingGoku && distance > 0) {
            // Normalize direction
            const directionX = deltaX / 300;
            const directionY = deltaY / 300;

            // Move towards Goku
            death_ball.style.left = (parseFloat(death_ball.style.left) + directionX * speed) + "px";
            death_ball.style.top = (parseFloat(death_ball.style.top) - 2 + directionY * speed) + "px";
        }

        // Check traveled distance
        const traveledDistance = Math.sqrt(
            Math.pow(parseFloat(death_ball.style.left) - initialPosition.x, 2) +
            Math.pow(parseFloat(death_ball.style.top) - initialPosition.y, 2)
        );

        if (followingGoku) {
            if (traveledDistance >= maxDistance) {
                followingGoku = false;
                fixedx = deltaX;
                fixedy = deltaY;
            }
        }

        // Continue moving in the last direction until it exits the screen
        if (!followingGoku) {
            const directionX = fixedx / 300;
            const directionY = fixedy / 300;
            death_ball.style.left = (parseFloat(death_ball.style.left) + directionX * speed) + "px";
            death_ball.style.top = (parseFloat(death_ball.style.top) - 2 + directionY * speed) + "px";
        }

        // Remove the death ball if it exits the screen
        const death_ball_loc_new = death_ball.getBoundingClientRect();
        if (death_ball_loc_new.x < -150 || death_ball_loc_new.x > window.innerWidth + 100 || 
            death_ball_loc_new.y < -150 || death_ball_loc_new.y > window.innerHeight + 100) {
            death_ball.remove();
        } else {
            requestAnimationFrame(moveDeathball);
        }
    }

    setTimeout(() => {
        requestAnimationFrame(moveDeathball);
        clearInterval(reomver);
    }, 2000);

    const freizaimg = freiza.querySelector("img");
    freizaimg.src = "img/freiza/freizadeathball.gif";
    // let shooot = new Audio("sfx/shooot.wav")
    // if (!freizadial){
    //     freizadial =true;
    // shooot.play();}
    // setTimeout(() => {
    //     freizadial = false;
    // },3000)
    setTimeout(() => {
        if(!win){
        if (lose == true){
            freizaimg.src = "img/freiza/win.gif"
        } else {
        freizaimg.src = "img/freiza/freiza.gif";}
        if (!gameover) {
        finished = true;}};
    }, 2700);
}}

// function firedeathball(death_ball, firedbullet_left) {
//     death_ball.style.left = firedbullet_left + "px";

//     if (firedbullet_left < -100) {
//         death_ball.remove();
//     }
// }

function fireLaser() {
    if(!freizahit){
    finished = false;
    clearTimeout(imgfreizaint);
    const new_laser = document.createElement("div");
    new_laser.className = "laser"; 
    const laserImage = document.createElement("img");
    laserImage.src = "img/freiza/laser.png";
    laserImage.alt = "Laser"; 
    const goku_loc = goku.getBoundingClientRect();
    freiza.style.top = goku_loc.top + "px";
    new_laser.appendChild(laserImage); 
    enemies.appendChild(new_laser);
    const reomver = setInterval(() => {
        if (freizahit){
            new_laser.remove();
            clearInterval(reomver);
            return;
        }
    },10);
    const freiza_loc = freiza.getBoundingClientRect();
    setTimeout(() => {
        
    new_laser.style.left = window.innerWidth * 0.845 + "px";
    new_laser.style.top = goku_loc.top  + 40+ "px";
    clearInterval(reomver);
    new_laser.style.display = "block"
    let kis = new Audio("sfx/laser (1).ogg");
    kis.volume= 0.6;
    kis.play();
    let firedLaser_left = freiza_loc.x + 50;

    const laserInterval = setInterval(() => {
        fire(new_laser, firedLaser_left, laserInterval);
        firedLaser_left -= 60;
        const goku_loc = goku.getBoundingClientRect();
        const death_ball_loc = new_laser.getBoundingClientRect();
        if (death_ball_loc.left < goku_loc.left + goku_loc.width &&
            death_ball_loc.left + death_ball_loc.width > goku_loc.left &&
            death_ball_loc.top < goku_loc.top + goku_loc.height &&
            death_ball_loc.top + death_ball_loc.height > goku_loc.top) {
                if(isCharging){
                    isCharging = false; // Stop charging when 'j' is released
                    charging1= false; // Stop charging when
                    isFiring = false; 
                    isFiring1= false;
                    chargingsound.pause();
                    clearInterval(chint);
                }
                health = health -5;
                UpdateHealth();
                if(health<=0){
                    pauseTimer(); // Pause the timer

                    ki =0;
                    lose =true;
                    isFiring1 = true;
                    isFiring= true;
                    gameover = true;
                    finished= false;
                    gokuhit = true;
                const gameOverDiv = document.createElement("div");
                gameOverDiv.className = "game-over";
                gameOverDiv.innerHTML = `
                <h1 style="font-family: myFont;">Game Over</h1>
                <p style="font-family: myFont;">In a heart-stopping moment, Goku found himself overwhelmed. Frieza's final attack hit with cataclysmic force, sending Goku crashing to the ground, his energy waning. As the dust settled, the once-hopeful warrior lay defeated, the weight of his loss heavy in the air. 
            
                With Goku's fall, the hopes of the universe dimmed. Frieza stood victorious, a cruel smile etched on his face, as he savored the taste of triumph over the legendary Saiyan. In that moment, the tides of fate shifted, leaving Goku's friends to wonder if they could ever rise against the darkness that now threatened to engulf them all.</p>
                <button id="restartButton" style="font-family: myFont;">Restart</button>
            `;
               
                const existingGameOverDiv = document.querySelector('.game-over');
                if (existingGameOverDiv) {
                    existingGameOverDiv.remove();
                } 
                document.body.appendChild(gameOverDiv);
                // Restart functionality
                document.getElementById("restartButton").addEventListener('mouseover', () => {
                    cursound.currentTime = 0; // Reset sound to start
                    cursound.play(); // Play the sound
                });
                document.getElementById("restartButton").addEventListener("click", () => {
                    location.reload(); // Reload the page to restart the game
                });}
                isFiring= true;
            // Hit logic
            if (gameover){
                gokuImage.src = `img/goku/gokudead2.gif`;
            } else {
            let random = Math.ceil(Math.random() * 4);
            gokuImage.src = `img/goku/gokuhurtimg/${random}.gif`;
       
            setTimeout(() => {
                                if(!gameover){
                gokuImage.src = "img/goku/gokumoving.gif";
                gokuhit = false;
                isFiring=false;}
            }, 500);}

            // Change bullet image and remove it
            setTimeout(() => {
                new_laser.remove();
            }, 800);
        }

    }, 1);},1400);
    const freizaImage = freiza.querySelector("img");
    freizaImage.src = "img/freiza/freizabean.gif";
    let kis = new Audio("sfx/tlp.ogg");
    kis.volume= 0.5;
    kis.play();
    imgfreizaint = setTimeout(() => {
        if(!win){
        if (lose == true){
            freizaImage.src = "img/freiza/win.gif"
        } else {
            freizaImage.src = "img/freiza/freiza.gif";}
        freiza.style.top = window.innerHeight * 0.4  + "px"
        if(!gameover){
        finished = true;}};
},1890);
}}


function firedbean(death_ball, firedbullet_left, bulletInterval) { 
    death_ball.style.left = firedbullet_left + "px";

    if (firedbullet_left > window.innerWidth) {
        death_ball.remove();
        clearInterval(bulletInterval);
    }
}

function fireupper() {
    if (!freizahit) {
        finished = false;
        clearTimeout(imgfreizaint);
        
        const bullets = [];
        const exploded = [false, false, false];
        let k = Math.ceil(3/(fhealth/100))
        if (k >12){
            k= 12;
        }
        for (let i = 0; i < k; i++) {
            const bullet = document.createElement("div");
            bullet.className = "upper";
            const bulletImage = document.createElement("img");
            bulletImage.src = "img/freiza/upper.gif";
            bulletImage.alt = "upper";
            bullet.appendChild(bulletImage);
            enemies.appendChild(bullet);
            bullets.push(bullet);

        }

        const goku_loc = goku.getBoundingClientRect();
        bullets[0].style.left = goku_loc.left + 15 + "px";
        for(let j=1;j<k;j++ ){
        bullets[j].style.left = window.innerWidth * Math.random() * 0.5 + "px";}

        let upper_top = 0;

        function checkCollision(bulletRect, gokuRect) {
            return (
                bulletRect.left < gokuRect.left + gokuRect.width &&
                bulletRect.left + 0.5 *bulletRect.width > gokuRect.left &&
                bulletRect.top < gokuRect.top + gokuRect.height &&
                bulletRect.top + bulletRect.height > gokuRect.top
            );
        }

        function moveLasers() {
            const goku_loc = goku.getBoundingClientRect();

            bullets.forEach((bullet, index) => {
                const bullet_loc = bullet.getBoundingClientRect();

                if (!exploded[index] && checkCollision(bullet_loc, goku_loc)) {
                    if(isCharging){
                        isCharging = false; // Stop charging when 'j' is released
                        charging1= false; // Stop charging when
                        isFiring = false; 
                        isFiring1= false;

                        chargingsound.pause();
                        clearInterval(chint);
                    }
                    let kis = new Audio("sfx/kiblastexplode.ogg");
                    kis.volume= 0.6;
                    kis.play();
                    health -= 5;
                    UpdateHealth();
                    if(health<=0){
                        
                        ki =0;
                        pauseTimer(); // Pause the timer

                        lose= true;
                        isFiring1 = true;
                        isFiring= true;
                        gameover = true;
                        finished= false;
                        gokuhit = true;
                        const gameOverDiv = document.createElement("div");
                        gameOverDiv.className = "game-over";
                        gameOverDiv.innerHTML = `
                <h1 style="font-family: myFont;">Game Over</h1>
                <p style="font-family: myFont;">In a heart-stopping moment, Goku found himself overwhelmed. Frieza's final attack hit with cataclysmic force, sending Goku crashing to the ground, his energy waning. As the dust settled, the once-hopeful warrior lay defeated, the weight of his loss heavy in the air. 
            
                With Goku's fall, the hopes of the universe dimmed. Frieza stood victorious, a cruel smile etched on his face, as he savored the taste of triumph over the legendary Saiyan. In that moment, the tides of fate shifted, leaving Goku's friends to wonder if they could ever rise against the darkness that now threatened to engulf them all.</p>
                <button id="restartButton" style="font-family: myFont;">Restart</button>
            `;
                        const existingGameOverDiv = document.querySelector('.game-over');
if (existingGameOverDiv) {
    existingGameOverDiv.remove();
}
                        document.body.appendChild(gameOverDiv);
                    
                        // Restart functionality
                        document.getElementById("restartButton").addEventListener('mouseover', () => {
                            cursound.currentTime = 0; // Reset sound to start
                            cursound.play(); // Play the sound
                        });
                        document.getElementById("restartButton").addEventListener("click", () => {
                            location.reload(); // Reload the page to restart the game
                        });}
                    hitGoku(bullet, bullet.querySelector("img"), bullet_loc.y);
                    exploded[index] = true;
                    bullet.remove(); // Remove the bullet immediately after hitting
                }
            });

            // Move the lasers up if they haven't exploded
            fireupper1(bullets, upper_top, exploded);

            upper_top += 30;

            // Stop the animation if all lasers are exploded or off-screen
            if (upper_top <= window.innerHeight || !exploded.every(e => e)) {
                requestAnimationFrame(moveLasers);
            }
        }

        // Start the laser movement after a delay
        setTimeout(() => {
            requestAnimationFrame(moveLasers);
        }, 1400);

        const freizaImage = freiza.querySelector("img");
        freizaImage.src = "img/freiza/freizaupper.gif";
        imgfreizaint = setTimeout(() => {
            if(!win){
            if (lose == true){
                freizaImage.src = "img/freiza/win.gif"
            } else {
            freizaImage.src = "img/freiza/freiza.gif";}
            if(!gameover) {
            finished = true;}};
        }, 1900);
    }
}

function fireupper1(bullets, firedbullet_top, exploded) {
    bullets.forEach((bullet, index) => {
        if (!exploded[index]) {
            bullet.style.top = firedbullet_top + "px";
        }
    });

    // Remove bullets if they've moved off the screen
    if (firedbullet_top > window.innerHeight) {
        bullets.forEach(bullet => bullet.remove());
    }
}



function hitGoku(upperElement, upperImage,top) {
    isFiring = true;
    if (gameover){
        gokuImage.src = `img/goku/gokudead2.gif`;
    } else {
    let random = Math.ceil(Math.random() * 4);
    gokuImage.src = `img/goku/gokuhurtimg/${random}.gif`;

    setTimeout(() => {
                if(!gameover){
        gokuImage.src = "img/goku/gokumoving.gif";
        gokuhit = false;
        isFiring=false;}
    }, 500);}


    upperImage.src = "img/freiza/explodepu.gif";
    setTimeout(() => {
        upperElement.remove();
    }, 800);
}


 function randomAction() {
    setTimeout(() => {
        const srandomNum = Math.ceil(Math.random() * 4); 
         freizasound = new Audio(`start/${srandomNum}.mp3`); 
         freizasound.play();
         freizadial=true;
         setTimeout(()=>{
             freizadial=false;
         },7000);
    }, 300);
    setTimeout(() => {
         gokusound = new Audio(`mad.ogg`); 
         gokusound.play();
         gokudial=true;
         setTimeout(()=>{
            gokudial=false;
         },7000);
    }, 5500);
    setInterval(() => {
        if (finished) {
            if (pause){
                Pause();
                counter ++;
            } else {
            const randomNum = Math.random();

            if (randomNum <= 0.34) {
                Deathball();
            } else if (randomNum <= 0.66) {
                fireLaser();
            } else {
                fireupper();
            }
        }}
    }, 50); 
}

const  status = document.querySelector("#stats");

const gokuHealthBarDiv = document.createElement('div');
gokuHealthBarDiv.className ="gokuhealth"
gokuHealthBarDiv.style.width = window.innerWidth * 0.33 + "px";
gokuHealthBarDiv.style.height = '20px';
gokuHealthBarDiv.style.border = '1px solid #000';
gokuHealthBarDiv.style.backgroundColor = '#ddd';
const pfp = document.createElement('div');
pfp.className = "thegokupic"
const pfpgoku = document.createElement('img');
pfpgoku.src = 'img/goku/gokupfp.png';
pfpgoku.alt ='gokupfp';

pfp.appendChild(pfpgoku);
status.appendChild(pfp)
const gokuHealthBar = document.createElement('div');
gokuHealthBar.style.width = window.innerWidth * 0.33 + "px";
gokuHealthBar.style.height = '20px';
gokuHealthBar.style.backgroundColor = 'green';

gokuHealthBarDiv.appendChild(gokuHealthBar);
status.appendChild(gokuHealthBarDiv);

function UpdateHealth() {
    if (health > 100) health = 100;
    if (health <=50 && health >0){
        let  bvc =Math.ceil(Math.random()*3)
        let mos = new Audio(`middle/h${bvc}.ogg`);
        if (!freizadial){
            freizadial =true;
            mos.play();
        }
        setTimeout(() => {
            freizadial = false;
        },6000)
    }
    if (health < 0) {
        health = 0;
        fetch("http://localhost:8080/")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            scores = JSON.stringify(data);
            displayScores(); 
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
        let kis = new Audio("menu/finish.ogg");
        kis.volume= 1;
        if(counter<1){
            counter++;
        kis.play();
        setTimeout(()=>{
          let  bvc =Math.ceil(Math.random()*2)
            let mos = new Audio(`end/1 (${bvc}).wav`);
            if (!freizadial){
                freizadial =true;
                mos.play();
            }
            setTimeout(() => {
                freizadial = false;
            },6000)
        }, 1000);}
    }

    gokuHealthBar.style.width = health + '%';

    if (health > 50) {
        gokuHealthBar.style.backgroundColor = 'green';
        
    } else if (health > 25) {
        gokuHealthBar.style.backgroundColor = 'yellow';
    } else {
        gokuHealthBar.style.backgroundColor = 'red';
    }
}

const friezaHealthBarDiv = document.createElement('div');

friezaHealthBarDiv.className = "freizahealth"
friezaHealthBarDiv.style.width =  window.innerWidth * 0.33 + "px";
friezaHealthBarDiv.style.height = '20px';
friezaHealthBarDiv.style.border = '1px solid #000';
friezaHealthBarDiv.style.backgroundColor = '#ddd';
const pfpf = document.createElement('div');
pfpf.className = "thefreizapic"
const pfpfreiza = document.createElement('img');
pfpfreiza.src = 'img/freiza/freizapfp.png';
pfpfreiza.alt ='freizaupfp';

pfpf.appendChild(pfpfreiza);
status.appendChild(pfpf)
const friezaHealthBar = document.createElement('div');
friezaHealthBar.style.width = window.innerWidth * 0.33 + "px";
friezaHealthBar.style.height = '20px';
friezaHealthBar.style.backgroundColor = 'purple';

friezaHealthBarDiv.appendChild(friezaHealthBar);
document.body.appendChild(friezaHealthBarDiv);

function UpdateFriezaHealth() {
    if (fhealth > 100) {fhealth = 100;}
    if (fhealth <=50 && fhealth >0){
        let  bvc =Math.ceil(Math.random()*3)
        let mos = new Audio(`middle/f${bvc}.mp3`);
        if (!freizadial){
            freizadial =true;
            mos.play();
        }
        setTimeout(() => {
            freizadial = false;
        },6000)    }
    if (fhealth < 0) {
        fhealth = 0;
        let kis = new Audio("menu/finish.ogg");
        kis.volume= 1;
        kis.play();
        setTimeout(()=>{
            let mos = new Audio(`end/impossible.ogg`);
            mos.play();
        }, 1000);
    }

    friezaHealthBar.style.width = fhealth + '%';
    friezaHealthBar.style.backgroundColor='purple';
}

const gokuKiBarDiv = document.createElement('div');
gokuKiBarDiv.className = "kibar"
gokuKiBarDiv.style.width = window.innerWidth * 0.25 + "px";
gokuKiBarDiv.style.height = '12px'; 
gokuKiBarDiv.style.border = '1px solid #000';
gokuKiBarDiv.style.backgroundColor = '#ddd';

// Create the ki bar itself
const gokuKiBar = document.createElement('div');
gokuKiBar.style.width = window.innerWidth * 0.25 + "px";
gokuKiBar.style.height = '12px'; 
gokuKiBar.style.backgroundColor = 'white'; 

gokuKiBarDiv.appendChild(gokuKiBar);
status.appendChild(gokuKiBarDiv);

// Function to update the ki bar
function UpdateKi() {
    if (ki > 100) ki = 100;
    if (ki < 0) ki = 0;

    gokuKiBar.style.width = ki + '%';
    if (ki==100){
        gokuKiBar.style.backgroundColor = 'white';
    }
    else if (ki > 50) {
        gokuKiBar.style.backgroundColor = 'yellow';
    } else if (ki > 25) {
        gokuKiBar.style.backgroundColor = 'orange';
    } else {
        gokuKiBar.style.backgroundColor = 'red';
}
}

function Pause() {
    isFiring = true;
    gameover = true;
    isFiring1 = true;

    if (counter == 1) {
        let sound = new Audio("menu/pause.ogg")
        sound.play();
        const pauseScreenDiv = document.createElement("div");
        pauseScreenDiv.className = "ps";
        pauseScreenDiv.innerHTML = `
            <button id="restartButton" style="font-family: myFont;">Restart</button>
            <button id="resumeButton" style="font-family: myFont;">Resume</button>
        `;
        
        const existingPauseScreenDiv = document.querySelector('.ps');
        if (existingPauseScreenDiv) {
            existingPauseScreenDiv.remove();
        }
        
        document.body.appendChild(pauseScreenDiv);
        pauseTimer(); 


        
    document.getElementById("resumeButton").addEventListener('mouseover', () => {
        cursound.currentTime = 0; 
        cursound.play(); 
    });

    document.getElementById("restartButton").addEventListener('mouseover', () => {
        cursound.currentTime = 0; 
        cursound.play(); 
    });
        document.getElementById("restartButton").addEventListener("click", () => {
            location.reload(); 
        });

        document.getElementById("resumeButton").addEventListener("click", () => {
            pause = false; 
            counter = 0;
            pauseScreenDiv.remove();
            let resumes = new Audio("menu/resume.ogg")
            resumes.play();
            isFiring = false; 
            gameover = false; 
            isFiring1 = false; 
            gokuImage.src = "img/goku/gokumoving.gif";
            resumeTimer();
        });
    }
}

function pad(val) {
    return val > 9 ? val : "0" + val; 
}      
 function startTimer() {
    if (!timerRunning) { // Only start if the timer is not already running
        timerRunning = true;
        timerInterval = setInterval(function () {
            sec++; // Increment seconds
            document.getElementById("seconds").innerHTML = pad(sec % 60);
            document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10) % 60);
            document.getElementById("hours").innerHTML = pad(parseInt(sec / 3600, 10));
        }, 1000);
    }
}
function pauseTimer() {
    clearInterval(timerInterval); // Stop the timer
    timerRunning = false; // Update the state
}

function resumeTimer() {
    startTimer(); // Start the timer again
}
function checkWinCondition() {
    if(fhealth <=0){
        if (win) { 
            winningTime = sec; 
            console.log(`this is last ${sec}`);

            score = 100000/sec;
            pauseTimer(); 
            alert("You win! Time: " + pad(parseInt(winningTime / 3600, 10)) + ":" + pad(parseInt((winningTime % 3600) / 60, 10)) + ":" + pad(winningTime % 60));
        }
    }
}


function StartGame() {
    isFiring = true;
    gameover = true;
    isFiring1 = true;
    baudio = new Audio("theme.mp3");
    baudio.volume = 0.4;
    baudio.loop = true;
    baudio.play();
        const pauseScreenDiv = document.createElement("div");
        pauseScreenDiv.className = "st";
        pauseScreenDiv.innerHTML = `
                <button id="resumeButton" style="font-family: myFont;">Start Game</button>

        <p style="font-family: myFont;">Use the following controls:</p>
        <ul style="font-family: myFont;">
            <li><strong>Space</strong>: Ki Blast</li>
            <li><strong>K</strong>: Kamehameha</li>
            <li><strong>J</strong>: Charge Up</li>
            <li><strong>WASD</strong>: Move</li>
        </ul>

                <div class="lore-container" style="display: flex; align-items: center;">
            <div class="lore-text" style="flex: 1; font-family: myFont;">
                In the vast reaches of space, where the stars shine like lanterns against the endless darkness, the balance of power between good and evil shifts as the mighty, tyrannical Emperor Frieza, fueled by hatred, prepares to fight his greatest rival, the legendary Saiyan Goku. On the dying planet Namek, their battle will shock the very foundations of the universe and unleash an epic clash of good and evil, where Goku’s courage faces Frieza’s ruthless power.
            </div>
    `;
        
        const existingPauseScreenDiv = document.querySelector('.st');
        if (existingPauseScreenDiv) {
            existingPauseScreenDiv.remove();
        }
        
        document.body.appendChild(pauseScreenDiv);
        pauseTimer(); // Pause the timer
    document.getElementById("resumeButton").addEventListener('mouseover', () => {
        cursound.currentTime = 0; // Reset sound to start
        cursound.play(); // Play the sound
    });
        document.getElementById("resumeButton").addEventListener("click", () => {
            pause = false; // Unpause the game
            counter = 0; // Reset counter if needed
            pauseScreenDiv.remove();

            isFiring = false; //
            gameover = false; //
            isFiring1 = false; //

            gokuImage.src = "img/goku/gokumoving.gif";
            resumeTimer(); // Resume the timer
            randomAction();

        });
}

function resetGame() {
    // Reset background
    document.body.style.backgroundImage = "url('newback.gif')";
    
    // Hide the video and remove it from the DOM
    const finishVideo = document.getElementById('finishVideo');
    finishVideo.style.display = 'none';
    finishVideo.pause(); // Pause the video
    finishVideo.currentTime = 0; // Reset to the beginning
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
    const gameOverDiv = document.createElement("div");
    gameOverDiv.className = "game-over";
    gameOverDiv.innerHTML = `
        <h1 style="font-family: myFont;">You Win!</h1>
                                <h2> youe score is ${score} </h2>
                            <form id="nameForm">

        <input type="text" id="userName"         maxlength="6" 
 placeholder="Enter Your Name" name="userName" required style="font-family: myFont;">
<button type="submit" style="font-family: myFont;">Submit</button>
    </form>
        <button id="restartButton" style="font-family: myFont;">Restart</button>
    `;
    // Before creating a new game over div, remove any existing one
const existingGameOverDiv = document.querySelector('.game-over');
if (existingGameOverDiv) {
existingGameOverDiv.remove();
}
    document.body.appendChild(gameOverDiv);

    // Restart functionality
    document.getElementById("restartButton").addEventListener('mouseover', () => {
        cursound.currentTime = 0; // Reset sound to start
        cursound.play(); // Play the sound
    });
    document.getElementById("restartButton").addEventListener("click", () => {
        location.reload(); // Reload the page to restart the game
    });
    let freizahealth = document.getElementsByClassName("freizahealth");
    document.getElementById('nameForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const userName = document.getElementById('userName').value;
    
        // Call your specific function here
        yourSpecificFunction(userName,score,sec);
    });
    // Loop through the collection and hide each element
    for (let i = 0; i < freizahealth.length; i++) {
        freizahealth[i].style.display = "none";
    }
}


// Define your function
function yourSpecificFunction(name,score,time) {
    fetch("http://localhost:8080", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name.toUpperCase(),
            score: score,
            time : time
        })
    }) .then(()=>{
        fetch("http://localhost:8080/")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            scores = JSON.stringify(data);
            displayScores(); // Moved this inside the previous then
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });});

    const Theform = document.getElementById("nameForm");
    Theform.remove();
}

const getUserInput = () => {
    const userInput = prompt("Please enter map number (0-3) (0 is defeault):");
    const fullscreenDiv = document.getElementById('fullscreenDiv');

if (userInput==1){
    fullscreenDiv.style.visibility = 'visible';
    let thingy = document.getElementsByClassName("full-screen-div")[0];

        const gridRows = 4;
        const gridCols = 4;

        const generateRandomMap = (rows, cols) => {
            const map = [];
            for (let i = 1; i <= 16; i++) {
                map.push(i);
            }
            return map;
        };

        const map = generateRandomMap(gridRows, gridCols);

        const drawmap = () => {
            for (let eachrow = 0; eachrow < gridRows; eachrow++) { 
                for (let eachcol = 0; eachcol < gridCols; eachcol++) {
                    let arrayIndex = eachrow * gridCols + eachcol;
                    if (arrayIndex >= map.length) break; 
                    let div = document.createElement("div");
                    div.className = "tile"; 
                        let img = document.createElement("img");
                        img.src = `/bg/1 (${(map[arrayIndex])}).png`;
                        div.appendChild(img);                      
                    thingy.appendChild(div);
                }
            }
        };

        drawmap();
    } else if (userInput==2){
        fullscreenDiv.style.visibility = 'visible';
        let thingy = document.getElementsByClassName("full-screen-div")[0];

        const gridRows = 4;
        const gridCols = 4;

        const generateRandomMap = (rows, cols) => {
            const map = [];
            for (let i = 1; i <= 16; i++) {
                map.push(i);
            }
            return map;
        };

        const map = generateRandomMap(gridRows, gridCols);

        const drawmap = () => {
            for (let eachrow = 0; eachrow < gridRows; eachrow++) { 
                for (let eachcol = 0; eachcol < gridCols; eachcol++) {
                    let arrayIndex = eachrow * gridCols + eachcol;
                    if (arrayIndex >= map.length) break; 
                    let div = document.createElement("div");
                    div.className = "tile"; 
                        let img = document.createElement("img");
                        img.src = `/bg2/1 (${(map[arrayIndex])}).jpg`;
                        div.appendChild(img);                      
                    thingy.appendChild(div);
                }
            }
        };

        drawmap();
    } else if (userInput==3){
        fullscreenDiv.style.visibility = 'visible';
        let thingy = document.getElementsByClassName("full-screen-div")[0];

        const gridRows = 4;
        const gridCols = 4;

        const generateRandomMap = (rows, cols) => {
            const map = [];
            for (let i = 1; i <= 16; i++) {
                map.push(i);
            }
            return map;
        };

        const map = generateRandomMap(gridRows, gridCols);

        const drawmap = () => {
            for (let eachrow = 0; eachrow < gridRows; eachrow++) { 
                for (let eachcol = 0; eachcol < gridCols; eachcol++) {
                    let arrayIndex = eachrow * gridCols + eachcol;
                    if (arrayIndex >= map.length) break; 
                    let div = document.createElement("div");
                    div.className = "tile"; 
                        let img = document.createElement("img");
                        img.src = `/bg3/${(map[arrayIndex])}.png`;
                        div.appendChild(img);                      
                    thingy.appendChild(div);
                }
            }
        };
        drawmap();
    }  else {
        return
    }  
};

document.addEventListener("DOMContentLoaded", () => {
    getUserInput();
})
