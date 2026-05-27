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
