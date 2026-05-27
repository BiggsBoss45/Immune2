console.log("BOOT SCRIPT LOADED");

/* =========================
   DOM ELEMENTS
========================= */

const continueBtn = document.getElementById("continueBtn");
const bootScreen = document.getElementById("bootScreen");
const terminalSection = document.getElementById("terminalSection");

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
   BOOT
========================= */

window.addEventListener("DOMContentLoaded", () => {

    continueBtn.addEventListener("click", () => {
        bootScreen.style.display = "none";
        terminalSection.classList.remove("hidden");
    });

});

/* =========================
   RESET
========================= */

function resetSimulation() {

    if (!ecoli || !viralRNA || !phage) return;

    ecoli.classList.remove("successState", "failureState", "lysisState");

    viralRNA.style.opacity = "0";
    viralRNA.style.width = "0px";

    phage.style.left = "-220px";
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

            viralRNA.style.opacity = "1";
            viralRNA.style.width = "140px";

            simulationLog.innerHTML += `
            <br><br>RNA TRANSFER COMPLETE:<br>
            Viral genome successfully injected into host cytoplasm.
            `;

            /* DISASSEMBLY */
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

    }, 3300);

    /* ZOOM OUT */
    setTimeout(() => {
        const camera = document.getElementById("cameraLayer");
        if (camera) camera.classList.remove("zoomedIn");
    }, 5000);
}

/* =========================
   MAIN SIMULATION
========================= */

runBtn.addEventListener("click", () => {

    resetSimulation();

    const m = metabolism?.value;
    const a = atpLevel?.value;
    const r = ribosomeState?.value;
    const d = repairPathway?.value;

    secretSection?.classList.add("hidden");

    animatePhageAttack();

    if (
        m === "respiration" &&
        a === "high" &&
        r === "active" &&
        d === "recombinational"
    ) {

        setTimeout(() => {

            ecoli?.classList.add("successState");

            const mito = document.getElementById("mitochondrion");
            if (mito) mito.classList.add("mitochondriaFormed");

            simulationLog.innerHTML = `
            STABLE INTEGRATION ACHIEVED<br><br>
            SYMBIOTIC SHIFT DETECTED: Mitochondrion formation initiated.
            `;

            setTimeout(() => {
                secretSection?.classList.remove("hidden");
            }, 2500);

        }, 4300);

        return;
    }

    if (a === "high" && r === "active") {
        setTimeout(() => {
            ecoli?.classList.add("lysisState");
        }, 4300);
        return;
    }

    if (a === "low") {
        setTimeout(() => {
            ecoli?.classList.add("failureState");
        }, 4300);
        return;
    }

    if (d === "errorprone") {
        setTimeout(() => {
            ecoli?.classList.add("failureState");
        }, 4300);
        return;
    }

    setTimeout(() => {
        ecoli?.classList.add("failureState");
    }, 4300);
});
