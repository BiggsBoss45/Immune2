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
   BOOT SYSTEM
========================= */

window.addEventListener("DOMContentLoaded", () => {

    const continueBtn = document.getElementById("continueBtn");
    const bootScreen = document.getElementById("bootScreen");
    const terminalSection = document.getElementById("terminalSection");

    continueBtn?.addEventListener("click", () => {
        bootScreen.style.display = "none";
        terminalSection.classList.remove("hidden");

        initSimulation();
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
   RESET SIMULATION
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

    document.querySelectorAll(".fadeOut").forEach(el => {
        el.classList.remove("fadeOut");
        el.style.opacity = "";
        el.style.transform = "";
    });
}

/* =========================
   PHAGE ATTACK SEQUENCE
========================= */

function animatePhageAttack() {

    if (!phage) return;

    /* MOVE PHAGE */
    phage.animate([
        { left: "-180px", top: "32%" },
        { left: "43%", top: "30%" }
    ], {
        duration: 3200,
        fill: "forwards",
        easing: "ease-in-out"
    });

    /* CAMERA ZOOM IN */
    setTimeout(() => {
        cameraLayer?.classList.add("zoomedIn");
    }, 1200);

    /* INJECTION EVENT */
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

        /* RNA RELEASE */
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

            /* CAPSIDS DISASSEMBLE */
            setTimeout(() => {

                document.querySelector(".capsidGlass")?.classList.add("fadeOut");
                document.querySelector(".tailSheath")?.classList.add("fadeOut");
                document.querySelector(".tailNeedle")?.classList.add("fadeOut");

            }, 900);

        }, 600);

    }, 3300);

    /* CAMERA ZOOM OUT */
    setTimeout(() => {
        cameraLayer?.classList.remove("zoomedIn");
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

    secretSection?.classList.add("hidden");

    animatePhageAttack();

    /* SUCCESS PATH */
    if (
        m === "respiration" &&
        a === "high" &&
        r === "active" &&
        d === "recombinational"
    ) {
        setTimeout(() => {

            ecoli?.classList.add("successState");

            const mito = document.getElementById("mitochondrion");
            mito?.classList.add("mitochondriaFormed");

            if (simulationLog) {
                simulationLog.innerHTML = `
                STABLE INTEGRATION ACHIEVED<br><br>
                SYMBIOTIC SHIFT DETECTED
                `;
            }

            setTimeout(() => {
                secretSection?.classList.remove("hidden");
            }, 2500);

        }, 4300);

        return;
    }

    /* LYSIS */
    if (a === "high" && r === "active") {
        setTimeout(() => ecoli?.classList.add("lysisState"), 4300);
        return;
    }

    /* LOW ATP */
    if (a === "low") {
        setTimeout(() => ecoli?.classList.add("failureState"), 4300);
        return;
    }

    /* DNA DAMAGE */
    if (d === "errorprone") {
        setTimeout(() => ecoli?.classList.add("failureState"), 4300);
        return;
    }

    /* DEFAULT FAILURE */
    setTimeout(() => ecoli?.classList.add("failureState"), 4300);
}
