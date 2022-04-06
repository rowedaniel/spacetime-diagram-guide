
let lastX = [0,0];
let lastCt = [0,0];
let currentPoint = -1;
let lastK = [0,0];

let v = -0.5;
function updateV() {
    v = document.getElementById("v-slider").value;
    document.getElementById("v-display").innerHTML = v;
    for(let i=0; i<lastX.length; ++i) {
        updatePoints(lastX[i], lastCt[i], i, lastK[currentPoint]);
    }
}

function updatePoints(x,ct, i, isK)
{
    let q1 = "a";
    let q2 = "b";
    if(isK) {
        q1 = "b";
        q2 = "a";
    }
    let aPoints = document.querySelectorAll("#diagram1" + q1 + " .special.point");
    let bPoints = document.querySelectorAll("#diagram1" + q2 + " .special.point");

    placePoint(aPoints[i], x, ct);
    updatePoint(bPoints[i], x, ct, v, isK);

    const o_pt = (currentPoint+1)%2;
    let w=-v;
    if(isK) {
        w *= -1;
    }
    let Ax, Act, Bx, Bct;
    let AxP, ActP, BxP, BctP;

    [Ax, Act]  = [x, ct];
    [AxP,ActP] = getCoords(x,ct, w);

    [Bx,Bct]   = [lastX[o_pt],lastCt[o_pt]];
    [BxP,BctP] = getCoords(lastX[o_pt],lastCt[o_pt], w);

    x_diff = -Ax+Bx;
    ct_diff = -Act+Bct;

    xP_diff = -AxP+BxP;
    ctP_diff = -ActP+BctP;

    if(isK) {
        let tmp = [x_diff, ct_diff];
        [x_diff, ct_diff] = [xP_diff, ctP_diff];
        [xP_diff, ctP_diff] = tmp;
    }
    

    document.getElementById("len-display").innerHTML = x_diff.toFixed(2);
    document.getElementById("time-display").innerHTML = ct_diff.toFixed(2);
    document.getElementById("spacetime-display-1").innerHTML = (ct_diff*ct_diff - x_diff*x_diff).toFixed(2);

    document.getElementById("len-display-p").innerHTML = xP_diff.toFixed(2);
    document.getElementById("time-display-p").innerHTML = ctP_diff.toFixed(2);
    document.getElementById("spacetime-display-2").innerHTML = (ctP_diff*ctP_diff - xP_diff*xP_diff).toFixed(2);
}

window.addEventListener("DOMContentLoaded", function(event) {
    

    document.getElementById("v-slider").addEventListener("input", function(event) {
        updateV();
    });
    updateV();

});


window.addEventListener("DOMContentLoaded", function(event) {

    for(let obj of document.querySelectorAll("#diagram1 .point-cloud")) {

        let point = obj.querySelector(".point");

        let otherSelector = "diagram1a";
        let isK = true;
        if(obj.parentElement.id === "diagram1a") {
            otherSelector = "diagram1b";
            isK = false;
        }
        otherSelector = "#" + otherSelector + " .point";
        let otherPoint = document.querySelector(otherSelector);
        const width = getWidth(obj) * GRID_SIZE;
        const height = getHeight(obj) * GRID_SIZE;

        obj.addEventListener("mousemove", function(event) {
            let rect = obj.getBoundingClientRect();
            let x = (event.clientX - rect.left - GRID_SIZE) / width;
            let ct = 1 - (-GRID_SIZE + event.clientY - rect.top) / height;

            placePoint(point, x, ct);
            updatePoint(otherPoint, x, ct, v, isK);

        });
        obj.addEventListener("click", function(event) {
            let rect = obj.getBoundingClientRect();
            let x = (event.clientX - rect.left - GRID_SIZE) / width;
            let ct = 1 - (-GRID_SIZE + event.clientY - rect.top) / height;

            currentPoint = (currentPoint + 1) % 2;
            lastX[currentPoint] = x;
            lastCt[currentPoint] = ct;
            lastK[currentPoint] = isK;
            const opt = (currentPoint+1)%2;
            if(isK != lastK[opt]) {
                let w = -v;
                if(!isK) { w *= -1; }
                // flip the other point too, so both are either K or K'
                [lastX[opt], lastCt[opt]] = getCoords(lastX[opt], lastCt[opt], w);
            }

            updatePoints(x, ct, currentPoint, isK);


        });
    }

    document.getElementById("v-slider").addEventListener("input", function(event) {
        updateV();
    });
    updateV();

});
