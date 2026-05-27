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

/* =========================
   BOOT
========================= */

continueBtn.addEventListener("click", () => {

    bootScreen.style.display = "none";
    terminalSection.classList.remove("hidden");

});

/* =========================
   RESET
========================= */

function resetSimulation(){

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

function animatePhageAttack(){

    phage.animate([
        {
            left:"-220px"
        },
        {
            left:"22%"
        }
    ], {
        duration:2600,
        fill:"forwards"
    });


    setTimeout(() => {

        viralRNA.style.opacity = "1";

        viralRNA.animate([
            {
                width:"0px"
            },
            {
                width:"220px"
            }
        ], {
            duration:1400,
            fill:"forwards"
        });

    }, 2700);
}

/* =========================
   MAIN SIMULATION
========================= */

runBtn.addEventListener("click", () => {

    resetSimulation();

    const m = metabolism.value;
    const a = atpLevel.value;
    const r = ribosomeState.value;
    const d = repairPathway.value;

    secretSection.classList.add("hidden");

    animatePhageAttack();


    /* SUCCESS */

    if(
        m === "respiration" &&
        a === "high" &&
        r === "active" &&
        d === "recombinational"
    ){

        setTimeout(() => {

            ecoli.classList.add("successState");

            simulationLog.innerHTML = `
            STABLE INTEGRATION ACHIEVED<br><br>
            Viral RNA successfully integrated into bacterial nucleoid.<br>
            ATP reserves sufficient for phage replication.<br>
            Recombinant strain stabilized.
            `;

            setTimeout(() => {
                secretSection.classList.remove("hidden");
            }, 2500);

        }, 4300);

        return;
    }


    /* LYSIS */

    if(
        a === "high" &&
        r === "active"
    ){

        setTimeout(() => {

            ecoli.classList.add("lysisState");

            simulationLog.innerHTML = `
            LYTIC CASCADE INITIATED<br><br>
            Uncontrolled phage replication detected.<br>
            Cell membrane rupture imminent.
            `;

        }, 4300);

        return;
    }


    /* LOW ATP */

    if(a === "low"){

        setTimeout(() => {

            ecoli.classList.add("failureState");

            simulationLog.innerHTML = `
            DORMANT INFECTION DETECTED<br><br>
            ATP depletion prevents replication.
            Viral genome remains inactive.
            `;

        }, 4300);

        return;
    }


    /* DNA DAMAGE */

    if(d === "errorprone"){

        setTimeout(() => {

            ecoli.classList.add("failureState");

            simulationLog.innerHTML = `
            GENOMIC INSTABILITY DETECTED<br><br>
            Error-prone DNA repair introduced lethal mutations.
            `;

        }, 4300);

        return;
    }


    /* DEFAULT FAILURE */

    setTimeout(() => {

        ecoli.classList.add("failureState");

        simulationLog.innerHTML = `
        INFECTION FAILED<br><br>
        Host-cell environment incompatible with phage integration.
        `;

    }, 4300);

});
