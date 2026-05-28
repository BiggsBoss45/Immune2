console.log("BOOT SCRIPT LOADED");

/* =========================
   BOOT SYSTEM
========================= */

window.addEventListener("DOMContentLoaded", () => {

    console.log("DOM READY");

    const continueBtn = document.getElementById("continueBtn");
    const bootScreen = document.getElementById("bootScreen");
    const terminalSection = document.getElementById("terminalSection");

    if (!continueBtn || !bootScreen || !terminalSection) {
        console.error("BOOT ELEMENT MISSING");
        return;
    }

    continueBtn.addEventListener("click", () => {
        console.log("ENTER TERMINAL CLICKED");

        bootScreen.style.display = "none";
        terminalSection.classList.remove("hidden");
    });

    initSimulation();
});

/* =========================
   ELEMENTS (SIMULATION)
========================= */

let metabolism, atpLevel, ribosomeState, repairPathway;
let phage, ecoli, viralRNA;
let simulationLog, runBtn;
let secretSection, openArchiveBtn;

let infectionData = {
    injected: false,
    rnaInsideCell: false
};

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
    openArchiveBtn = document.getElementById("openArchiveBtn");

    if (runBtn) {
        runBtn.addEventListener("click", runSimulation);
    }
}

/* =========================
   RESET
========================= */

function resetSimulation() {

    if (!ecoli || !viralRNA || !phage) return;

    ecoli.classList.remove("successState", "failureState", "lysisState");

    viralRNA.style.opacity = "0";
    viralRNA.style.width = "0px";

    phage.style.left = "-220px";

    infectionData.injected = false;
    infectionData.rnaInsideCell = false;
}

/* =========================
   PHAGE ATTACK
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

    /* ZOOM IN */
    setTimeout(() => {
        const camera = document.getElementById("cameraLayer");
        if (camera) camera.classList.add("zoomedIn");
    }, 1200);

    /* INJECTION */
    setTimeout(() => {

        const needle = document.querySelector(".tailNeedle");

        if (needle) {
            needle.animate([
                { height: "50px" },
                { height: "110px" }
            ], {
                duration: 700,
                fill: "forwards"
            });
        }

        infectionData.injected = true;

        setTimeout(() => {

            infectionData.rnaInsideCell = true;

            if (viralRNA) {
                viralRNA.style.opacity = "1";
                viralRNA.style.width = "140px";
            }

            if (simulationLog) {
                simulationLog.innerHTML += `
                <br><br>RNA TRANSFER COMPLETE:<br>
                Viral genome successfully injected into host cytoplasm.
                `;
            }

            /* DISASSEMBLY */
            setTimeout(() => {

    const capsid = document.querySelector(".capsidGlass");
    const tail = document.querySelector(".tailSheath");
    const needle = document.querySelector(".tailNeedle");

    if (capsid) {
        capsid.style.transform = "translateY(-40px) scale(0.6)";
        capsid.style.opacity = "0";
    }

    if (tail) {
        tail.style.transform = "translateY(60px) rotate(20deg)";
        tail.style.opacity = "0";
    }

    if (needle) {
        needle.style.transform = "translateY(80px)";
        needle.style.opacity = "0";
    }

}, 900);

    /* ZOOM OUT */
    setTimeout(() => {
        const camera = document.getElementById("cameraLayer");
        if (camera) camera.classList.remove("zoomedIn");
    }, 5000);
}

/* =========================
   RUN SIMULATION
========================= */

function runSimulation() {

    resetSimulation();

    const m = metabolism?.value;
    const a = atpLevel?.value;
    const r = ribosomeState?.value;
    const d = repairPathway?.value;

    if (secretSection) {
        secretSection.classList.add("hidden");
    }

    animatePhageAttack();

    /* SUCCESS */
    if (
        m === "respiration" &&
        a === "high" &&
        r === "active" &&
        d === "recombinational"
    ) {

        setTimeout(() => {

            if (ecoli) ecoli.classList.add("successState");

            const mito = document.getElementById("mitochondrion");
            if (mito) mito.classList.add("mitochondriaFormed");

            if (simulationLog) {
                simulationLog.innerHTML = `
                STABLE INTEGRATION ACHIEVED<br><br>
                SYMBIOTIC SHIFT DETECTED
                `;
            }

            setTimeout(() => {
                if (secretSection) {
                    secretSection.classList.remove("hidden");
                }
            }, 2500);

        }, 4300);

        return;
    }

    /* LYSIS */
    if (a === "high" && r === "active") {
        setTimeout(() => {
            if (ecoli) ecoli.classList.add("lysisState");
        }, 4300);
        return;
    }

    /* LOW ATP */
    if (a === "low") {
        setTimeout(() => {
            if (ecoli) ecoli.classList.add("failureState");
        }, 4300);
        return;
    }

    /* DNA DAMAGE */
    if (d === "errorprone") {
        setTimeout(() => {
            if (ecoli) ecoli.classList.add("failureState");
        }, 4300);
        return;
    }

    /* DEFAULT */
    setTimeout(() => {
        if (ecoli) ecoli.classList.add("failureState");
    }, 4300);
}
