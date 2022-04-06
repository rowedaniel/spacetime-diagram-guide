

let v = [
    [ 0.5 ],
    [ 0.5, 0.5 ]
];
function updateV(diagram_number, slider_number) {
    let diagram_id = diagram_number + 1;
    let slider_id = diagram_id + "-" + (slider_number+1);
    v[diagram_number][slider_number] = parseFloat(
        document.getElementById("v-slider"+slider_id).value
    );

    document.getElementById("v-display"+slider_id).innerHTML = v[diagram_number][slider_number].toFixed(2);
    updateAllPoints(
        function(i,n) { return [0, i / (n-1)]; },
        diagram_number
    );
}


function setPoints(PT, diagram) {
    let points = diagram.querySelectorAll(".point");
    const n = points.length
    for(let i=0; i<n; ++i) {
        let [x,ct] = PT(i,n);
        placePoint(points[i], x, ct);
    }
}

function updateAllPoints(PT, diagram_number)
{
    const diagram_id = "#diagram"+(diagram_number+1)+" .diagram";
    let diagrams = document.querySelectorAll(diagram_id);
    let PTs = [PT];
    for(let d=diagrams.length-1; d>=0; --d) {
        const PT_i = PTs.length-1;
        PTs.push(function(i,n) {
            let [x,ct] = PTs[PT_i](i,n);
            return getCoords(x,ct,v[diagram_number][PT_i]);
        });

        setPoints(PTs[PT_i], diagrams[d]);
    }

    // get the total velocity deformation
    let [x,ct] = PTs[PTs.length-2](1, 2);
    document.getElementById("final-v-"+(diagram_number+1)).innerHTML = (x/ct).toFixed(2);
}

window.addEventListener("DOMContentLoaded", function(event) {
    

    document.getElementById("v-slider1-1").addEventListener("input", function(event) {
        updateV(0,0);
    });
    updateV(0,0);

    document.getElementById("v-slider2-1").addEventListener("input", function(event) {
        updateV(1,0);
    });
    document.getElementById("v-slider2-2").addEventListener("input", function(event) {
        updateV(1, 1);
    });
    updateV(1,0);
    updateV(1,1);

});
