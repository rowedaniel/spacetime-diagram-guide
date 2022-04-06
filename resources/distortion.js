
let v = -0.5;
function updateV() {
    v = document.getElementById("v-slider").value;
    document.getElementById("v-display").innerHTML = v;
}

function updateAllPoints(X, CT)
{
    console.log("in updateAllPoints");
    let aPoints = document.querySelectorAll("#diagram1a .point");
    let bPoints = document.querySelectorAll("#diagram1b .point");
    const n = aPoints.length;
    for(let i=0; i<n; ++i) {
        let x = X(i,n);
        let ct = CT(i,n);
        placePoint(aPoints[i], x, ct);
        updatePoint(bPoints[i], x, ct, v, true);
    }

    let [xP, ctP] = getCoords(X((n-1), n), CT((n-1), n), -v);
    document.getElementById("len-display").innerHTML = xP.toFixed(2);
    document.getElementById("time-display").innerHTML = ctP.toFixed(2);
    document.getElementById("spacetime-display-1").innerHTML = (0*0 - 1*1).toFixed(2);
    document.getElementById("spacetime-display-2").innerHTML = (ctP*ctP - xP*xP).toFixed(2);
}

window.addEventListener("DOMContentLoaded", function(event) {
    

    document.getElementById("v-slider").addEventListener("input", function(event) {
        updateV();
    });
    updateV();

});
