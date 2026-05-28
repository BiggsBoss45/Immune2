alert("JS LOADED");
console.log("BOOT SCRIPT LOADED");

/* =========================
   GLOBAL STATE
========================= */

let metabolism, atpLevel, ribosomeState, repairPathway;
let phage, ecoli, viralRNA;
let simulationLog, runBtn;
let secretSection;
let cameraLayer;

let infectionData = {
    injected: false,
    rnaInsideCell: false
};

/* =========================
   AUDIO SYSTEM
========================= */

const clickSound = new Audio("click.mp3");
const injectSound = new Audio("inject.mp3");
const lysisSound = new Audio("lysis.mp3");
const failureSound = new Audio("failure.mp3");
const mitoSound = new Audio("mitochondria.mp3");

clickSound.volume = 0.35;
injectSound.volume = 0.6;
lysisSound.volume = 0.8;
failureSound.volume = 0.45;
mitoSound.volume = 0.7;

/* =========================
   BOOT SYSTEM
========================= */

window.addEventListener("DOMContentLoaded", () => {

    const continueBtn = document.getElementById("continueBtn");
    const bootScreen = document.getElementById("bootScreen");
    const terminalSection = document.getElementById("terminalSection");

    if (!continueBtn || !bootScreen || !terminalSection) return;

    continueBtn.addEventListener("click", () => {
        bootScreen.style.display = "none";
        terminalSection.classList.remove("hidden");
        initSimulation();
    });

    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });
});

/* =========================
   INIT SIMULATION
========================= */

function initSimulation() {

    metabolism = document.getElementById("metabolism");
    atpLevel = document.getElementById("atpLevel");
    ribosomeState = document.getElementById("ribosomeState");
    repairPathway = document.getElementById("repairPathway");

    phage = document.getElementById("phage");
    ecoli = document.getElementById("ecoli");
    viralRNA = document.getElementById("viralRNA");

    simulationLog = document.getElementById("simulationLog");
    runBtn = document.getElementById("runBtn");
    secretSection = document.getElementById("secretSection");
    cameraLayer = document.getElementById("cameraLayer");

    runBtn?.addEventListener("click", runSimulation);
}

/* =========================
   RESET
========================= */

function resetSimulation() {

    infectionData.injected = false;
    infectionData.rnaInsideCell = false;

    ecoli?.classList.remove("successState", "failureState", "lysisState");

    if (viralRNA) {
        viralRNA.style.opacity = "0";
        viralRNA.style.width = "0px";
    }

    if (phage) {
        phage.style.left = "-220px";
    }
}

/* =========================
   PHAGE ANIMATION (UNCHANGED)
========================= */

function animatePhageAttack() {

    if (!phage) return;

    phage.animate([
        { left: "-180px", top: "32%" },
        { left: "43%", top: "30%" }
    ], {
        duration: 3200,
        fill: "forwards",
        easing: "ease-in-out"
    });

    setTimeout(() => {
        cameraLayer?.classList.add("zoomedIn");
    }, 1200);

    setTimeout(() => {

        const needle = document.querySelector(".tailNeedle");

        needle?.animate([
            { height: "50px" },
            { height: "110px" }
        ], {
            duration: 700,
            fill: "forwards"
        });

        infectionData.injected = true;

        setTimeout(() => {
            infectionData.rnaInsideCell = true;
            injectSound.currentTime = 0;
            injectSound.play();

        }, 600);

    }, 3300);

    setTimeout(() => {
        cameraLayer?.classList.remove("zoomedIn");
    }, 5000);
}

/* =========================
   MAIN LOGIC
========================= */

function runSimulation() {

    resetSimulation();

    const m = metabolism?.value;
    const a = atpLevel?.value;
    const r = ribosomeState?.value;
    const d = repairPathway?.value;

    animatePhageAttack();

    /* =========================
       SUCCESS PATH
    ========================== */

    if (
        m === "respiration" &&
        a === "high" &&
        r === "active" &&
        d === "recombinational"
    ) {

        setTimeout(() => {

            ecoli?.classList.add("successState");

            const mito = document.getElementById("mitochondrion");

            if (mito) {
                mito.classList.remove("mitochondriaFormed");
                void mito.offsetWidth;
                mito.classList.add("mitochondriaFormed");

                mitoSound.currentTime = 0;
                mitoSound.play();
            }

            simulationLog.innerHTML = "SYMBIOTIC SHIFT DETECTED";

        }, 4300);

        setTimeout(() => {
            localStorage.setItem("phase3Result", "correct");
            window.location.href = "recovered-image.html";
        }, 6500);

        return;
    }

    /* =========================
       FAILURE PATHS
    ========================== */

    let result = "wrong";

    setTimeout(() => {

        ecoli?.classList.add("failureState");

        failureSound.currentTime = 0;
        failureSound.play();

        simulationLog.innerHTML = "INFECTION FAILED";

    }, 4300);

    setTimeout(() => {
        localStorage.setItem("phase3Result", result);
        window.location.href = "recovered-image.html";
    }, 6500);
}
