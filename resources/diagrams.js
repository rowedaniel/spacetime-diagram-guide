let currentPoint = 0;

let v = -0.5;
function updateV() {
    v = document.getElementById("v-slider").value;
    document.getElementById("v-display").innerHTML = v;
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

    let xP, ctP
    if(isK) {
        [xP, ctP] = getCoords(x,ct, v);
    } else {
        [xP, ctP] = getCoords(x,ct, -v);
    }
    document.getElementById("len-display").innerHTML = xP.toFixed(2);
    document.getElementById("time-display").innerHTML = ctP.toFixed(2);
    document.getElementById("spacetime-display-1").innerHTML = (ct*ct - xP*xP).toFixed(2);
    document.getElementById("spacetime-display-2").innerHTML = (ctP*ctP - xP*xP).toFixed(2);
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

            updatePoints(x, ct, currentPoint, isK);
            currentPoint = (currentPoint + 1) % 2;

        });
    }

    document.getElementById("v-slider").addEventListener("input", function(event) {
        updateV();
    });
    updateV();

});
