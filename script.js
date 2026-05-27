console.log("BOOT SCRIPT LOADED");

/* =========================
   DOM ELEMENTS
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

});

const metabolism = document.getElementById("metabolism");
const atpLevel = document.getElementById("atpLevel");
const ribosomeState = document.getElementById("ribosomeState");
const repairPathway = document.getElementById("repairPathway");

const phage = document.getElementById("phage");
const ecoli = document.getElementById("ecoli");
const viralRNA = document.getElementById("viralRNA");

const simulationLog = document.getElementById("simulationLog");
const runBtn = document.getElementById("runBtn");

const secretSection = document.getElementById("secretSection");
const openArchiveBtn = document.getElementById("openArchiveBtn");

let infectionData = {
    injected: false,
    rnaInsideCell: false
};

/* =========================
   BOOT (SAFE)
========================= */

window.addEventListener("DOMContentLoaded", () => {

    console.log("DOM READY");

    if (!continueBtn || !bootScreen || !terminalSection) {
        console.error("BOOT ELEMENT MISSING");
        return;
    }

    continueBtn.addEventListener("click", () => {

        console.log("ENTER TERMINAL CLICKED");

        bootScreen.style.display = "none";
        terminalSection.classList.remove("hidden");

    });

});

/* =========================
   RESET
========================= */

function resetSimulation() {

    if (!ecoli || !viralRNA || !phage) return;

    ecoli.classList.remove(
        "successState",
        "failureState",
        "lysisState"
    );

    viralRNA.style.opacity = "0";
    viralRNA.style.width = "0px";

    phage.style.left = "-220px";
}

/* =========================
   PHAGE ATTACK
========================= */

function animatePhageAttack() {

    if (!phage) return;

    /* PHAGE MOVEMENT */
    phage.animate([
        {
            left: "-180px",
            top: "32%"
        },
        {
            left: "43%",
            top: "30%"
        }
    ], {
        duration: 3200,
        fill: "forwards",
        easing: "ease-in-out"
    });

    /* =========================
       CAMERA ZOOM IN (ADD HERE)
    ========================== */
    setTimeout(() => {

        const camera = document.getElementById("cameraLayer");
        if (camera) camera.classList.add("zoomedIn");

    }, 1200);

    /* =========================
       INJECTION SEQUENCE
    ========================== */
    setTimeout(() => {

        const needle = document.querySelector(".tailNeedle");

        if (needle) {
            needle.animate([
                { height: "50px" },
                { height: "110px" }
            ], {
                duration: 700,
                fill: "forwards",
                easing: "ease-out"
            });
        }

        if (ecoli) {

            infectionData.injected = true;

            setTimeout(() => {

               setTimeout(() => {

    infectionData.rnaInsideCell = true;

    viralRNA.style.opacity = "1";
    viralRNA.style.width = "140px";

    simulationLog.innerHTML += `
    <br><br>RNA TRANSFER COMPLETE:<br>
    Viral genome successfully injected into host cytoplasm.
    `;

    /* =========================
       VIRUS DISASSEMBLY (ADD HERE)
    ========================== */
    setTimeout(() => {

        const capsid = document.querySelector(".capsidGlass");
        const tail = document.querySelector(".tailSheath");
        const needle = document.querySelector(".tailNeedle");

        if (capsid) {
            capsid.style.transform = "translateY(-40px) scale(0.7)";
            capsid.style.opacity = "0.4";
        }

        if (tail) {
            tail.style.transform = "translateY(60px) rotate(20deg)";
            tail.style.opacity = "0.3";
        }

        if (needle) {
            needle.style.transform = "translateY(80px)";
            needle.style.opacity = "0.2";
        }

    }, 900);

}, 600);

    /* =========================
       CAMERA ZOOM OUT (ADD HERE)
    ========================== */
    setTimeout(() => {

        const camera = document.getElementById("cameraLayer");
        if (camera) camera.classList.remove("zoomedIn");

    }, 5000);
}

/* =========================
   MAIN SIMULATION
========================= */

if (runBtn) {

    runBtn.addEventListener("click", () => {

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

    if (mito) {
        mito.classList.add("mitochondriaFormed");
    }

    simulationLog.innerHTML = `
    STABLE INTEGRATION ACHIEVED<br><br>
    Viral RNA successfully integrated into bacterial nucleoid.<br>
    ATP reserves sufficient for phage replication.<br>
    Recombinant strain stabilized.<br><br>
    SYMBIOTIC SHIFT DETECTED: Mitochondrion formation initiated.
    `;

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

                simulationLog.innerHTML = `
                LYTIC CASCADE INITIATED<br><br>
                Uncontrolled phage replication detected.<br>
                Cell membrane rupture imminent.
                `;

            }, 4300);

            return;
        }

        /* LOW ATP */
        if (a === "low") {

            setTimeout(() => {

                if (ecoli) ecoli.classList.add("failureState");

                simulationLog.innerHTML = `
                DORMANT INFECTION DETECTED<br><br>
                ATP depletion prevents replication.
                Viral genome remains inactive.
                `;

            }, 4300);

            return;
        }

        /* DNA DAMAGE */
        if (d === "errorprone") {

            setTimeout(() => {

                if (ecoli) ecoli.classList.add("failureState");

                simulationLog.innerHTML = `
                GENOMIC INSTABILITY DETECTED<br><br>
                Error-prone DNA repair introduced lethal mutations.
                `;

            }, 4300);

            return;
        }

        /* DEFAULT FAILURE */
        setTimeout(() => {

            if (ecoli) ecoli.classList.add("failureState");

            simulationLog.innerHTML = `
            INFECTION FAILED<br><br>
            Host-cell environment incompatible with phage integration.
            `;

        }, 4300);

    });
}
