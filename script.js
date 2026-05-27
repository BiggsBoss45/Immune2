const continueBtn = document.getElementById("continueBtn");
const bootScreen = document.getElementById("bootScreen");
const terminalSection = document.getElementById("terminalSection");

const submitBtn = document.getElementById("submitBtn");
const terminalInput = document.getElementById("terminalInput");
const responseBox = document.getElementById("responseBox");
const secretSection = document.getElementById("secretSection");

const downloadBtn = document.getElementById("downloadBtn");

/* =========================
   BOOT SEQUENCE
========================= */

continueBtn.addEventListener("click", () => {

    bootScreen.style.display = "none";
    terminalSection.classList.remove("hidden");

});

/* =========================
   PHASE 3 VALIDATION
========================= */

const correctSequence = "OMEGA-13";

submitBtn.addEventListener("click", () => {

    const value = terminalInput.value
    .trim()
    .toUpperCase();


    if(value === correctSequence){

        responseBox.innerHTML = `
        ACCESS GRANTED<br><br>
        Sequence integrity confirmed.<br>
        Unlocking archive...
        `;

        secretSection.classList.remove("hidden");

    }

    else{

        responseBox.innerHTML = `
        ERROR: INVALID SEQUENCE<br><br>
        Reconstruction mismatch detected.
        `;
    }
});

/* =========================
   FINAL FILE
========================= */

downloadBtn.addEventListener("click", () => {

    window.location.href = "finalfile.html";

});

/* =========================
   INFECTION ANIMATION
========================= */

const virus = document.getElementById("virus");
const rna = document.getElementById("rna");
const cell = document.getElementById("cell");

function startInfection(){

    /* VIRUS MOVES TO CELL */

    virus.animate([
        {
            left:"-120px"
        },
        {
            left:"42%"
        }
    ], {
        duration:3000,
        fill:"forwards"
    });


    /* RNA INJECTION */

    setTimeout(() => {

        rna.style.opacity = "1";

        rna.animate([
            {
                width:"0px"
            },
            {
                width:"140px"
            }
        ], {
            duration:1500,
            fill:"forwards"
        });

        cell.classList.add("infected");

    }, 3000);


    /* DNA INTEGRATION */

    setTimeout(() => {

        cell.classList.add("integrated");

    }, 5000);
}

/* =========================
   CELL LYSIS
========================= */

function triggerLysis(){

    cell.classList.add("lysis");

    setTimeout(() => {

        alert("CELL MEMBRANE FAILURE DETECTED");

    }, 900);
}

/* =========================
   SECRET COMBINATIONS
========================= */

submitBtn.addEventListener("click", () => {

    const value = terminalInput.value
    .trim()
    .toUpperCase();


    /* BAD ENDING */

    if(value === "LYSIS-7"){

        responseBox.innerHTML = `
        MUTATION PATHWAY DETECTED<br><br>
        CELLULAR COLLAPSE INITIATED
        `;

        triggerLysis();

        return;
    }


    /* GOOD ENDING */

    if(value === correctSequence){

        responseBox.innerHTML = `
        ACCESS GRANTED<br><br>
        Viral integration stabilized.<br>
        Unlocking archive...
        `;

        startInfection();

        setTimeout(() => {
            secretSection.classList.remove("hidden");
        }, 6500);
    }
});
