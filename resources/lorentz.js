
window.addEventListener("DOMContentLoaded", function(event) {

    for(let obj of document.querySelectorAll("#diagram4 .point-cloud")) {

        let point = obj.querySelector(".point");

        let otherSelector = "diagram4a";
        let isK = false;
        if(obj.parentElement.id === "diagram4a") {
            otherSelector = "diagram4b";
            isK = true;
        }
        otherSelector = "#" + otherSelector + " .point";
        let otherPoint = document.querySelector(otherSelector);
        const width = getWidth(obj) * GRID_SIZE;
        const height = getHeight(obj) * GRID_SIZE;
        console.log("width,height:", width, height);

        obj.addEventListener("mousemove", function(event) {
            let rect = obj.getBoundingClientRect();
            let x = (event.clientX - rect.left - GRID_SIZE) / width;
            let ct = 1 - (-GRID_SIZE + event.clientY - rect.top) / height;
            console.log("AAAAAAAAAAAAAAAAA", x, ct);

            let v = parseFloat(document.getElementById("v-slider").value);

            placePoint(point, x, ct);
            updatePoint(otherPoint, x, ct, v, isK);
        });
    }

    document.getElementById("v-slider").addEventListener("change", function(event) {
        document.getElementById("v-display").innerHTML = this.value;
    });
    document.getElementById("v-display").innerHTML = document.getElementById("v-slider").value;

});
