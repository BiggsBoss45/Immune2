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

/* volume balancing */

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

    continueBtn?.addEventListener("click", () => {
        bootScreen.style.display = "none";
        terminalSection.classList.remove("hidden");

        initSimulation();

       /* BUTTON CLICK AUDIO */

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

        clickSound.currentTime = 0;

        clickSound.play();

    });

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

function animateRNAInsideCell() {

    const rna = document.getElementById("rnaParticle");
    const cell = document.getElementById("ecoli");

    if (!rna || !cell) return;

    /* start at injection point */
    rna.style.opacity = "1";
    rna.style.left = "55%";
    rna.style.top = "45%";

    rna.animate([
        { transform: "translate(0px, 0px) scale(1)" },
        { transform: "translate(-40px, 20px) scale(1.2)" },
        { transform: "translate(80px, -30px) scale(0.9)" },
        { transform: "translate(20px, 60px) scale(1.1)" },
        { transform: "translate(120px, 10px) scale(0.8)" }
    ], {
        duration: 2200,
        easing: "ease-in-out",
        fill: "forwards"
    });

    /* fade out at end (integration moment) */
    setTimeout(() => {
        rna.style.opacity = "0";
    }, 2100);
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
       animateRNAInsideCell();

        /* RNA RELEASE */
        setTimeout(() => {

            infectionData.rnaInsideCell = true;
           injectSound.currentTime = 0;
           injectSound.play();

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

    /* SUCCESS */
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

            simulationLog.innerHTML = `
            STABLE INTEGRATION ACHIEVED<br><br>
            SYMBIOTIC SHIFT DETECTED
            `;

            setTimeout(() => {
                secretSection?.classList.remove("hidden");
            }, 2500);

        }, 4300);

        return;
    }

    /* LYSIS */
    if (a === "high" && r === "active") {

        setTimeout(() => {

            ecoli?.classList.add("lysisState");

            lysisSound.currentTime = 0;
            lysisSound.play();

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

            ecoli?.classList.add("failureState");

            failureSound.currentTime = 0;
            failureSound.play();

            simulationLog.innerHTML = `
            DORMANT INFECTION DETECTED<br><br>
            ATP depletion prevents replication.<br>
            Viral genome remains inactive.
            `;

        }, 4300);

        return;
    }

    /* DNA DAMAGE */
    if (d === "errorprone") {

        setTimeout(() => {

            ecoli?.classList.add("failureState");

            failureSound.currentTime = 0;
            failureSound.play();

            simulationLog.innerHTML = `
            GENOMIC INSTABILITY DETECTED<br><br>
            Error-prone DNA repair caused lethal mutations.
            `;

        }, 4300);

        return;
    }

    /* DEFAULT FAILURE */
    setTimeout(() => {

        ecoli?.classList.add("failureState");

        failureSound.currentTime = 0;
        failureSound.play();

        simulationLog.innerHTML = `
        INFECTION FAILED<br><br>
        Host-cell environment incompatible with phage integration.
        `;

    }, 4300);
}
