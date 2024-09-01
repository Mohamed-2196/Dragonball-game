const bullet = document.querySelector("#bullet");
const goku = document.querySelector("#goku");
goku.style.position = 'absolute'; 
goku.style.left = goku.style.left || '0px';
goku.style.top = goku.style.top || '600px';

let firedbullet_left = 0;
let bulletInterval; // Declare a variable to hold the interval ID

window.addEventListener("keypress", function(e) {
    switch (e.key) {
        case "a":
            goku.style.left = `${parseInt(goku.style.left) - 15}px`;
            break;
        case "d":
            goku.style.left = `${parseInt(goku.style.left) + 15}px`;
            break;
        case "w":
            goku.style.top = `${parseInt(goku.style.top) - 15}px`;
            break;
        case "s":
            goku.style.top = `${parseInt(goku.style.top) + 15}px`;
            break;
        case " ":
            const goku_loc = goku.getBoundingClientRect();   
            const gokuImage = goku.querySelector("img");   
            bullet.style.left = goku_loc.x + 30 + goku_loc.width / 2 + "px";
            bullet.style.top = goku_loc.y +45+ "px";

            firedbullet_left = goku_loc.x + 80;
            // Clear any existing intervals before starting a new one
            if (bulletInterval) {
                clearInterval(bulletInterval);
            }
            bulletInterval = setInterval(fireBullet, 60);

            gokuImage.src = "gokukame2.gif";
            setTimeout(() => {
                gokuImage.src = "goku.gif";
            }, 500);
            bullet.style.display = "block";
            break;  // Add break statement here to prevent falling through
        default:
            break;
    }
});

function fireBullet() {
    firedbullet_left += 10;
    bullet.style.left = firedbullet_left + "px";

    // Optionally stop the interval when the bullet goes off-screen
    if (firedbullet_left < 0) {
        clearInterval(bulletInterval);
        bullet.style.display = "none"; // Hide the bullet when it goes off-screen
    }
}