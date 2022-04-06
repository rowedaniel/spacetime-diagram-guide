const GRID_SIZE = 2 * 16; // px
let ANIMATION_SPEED = 10;


window.addEventListener("DOMContentLoaded", function(event) {
    for(let obj of document.querySelectorAll(".diagram .axis")) {
        let obj_height;
        if(obj.classList.contains("time")){
            obj_height = obj.offsetHeight;
        } else {
            obj_height = obj.offsetWidth;
        }
        const height = Math.floor(obj_height / GRID_SIZE) - 1;
        for(let i = 0; i <= height; ++i) {
            let txt = document.createElement("p");
            txt.innerHTML = (i / height).toFixed(2);
            if(obj.classList.contains("time")){
                obj.insertBefore(txt, obj.firstChild);
            } else {
                obj.appendChild(txt);
            }

        }
    }



    for(let obj of document.querySelectorAll(".anim-speed")) {
        obj.addEventListener("change", function(event) {
            ANIMATION_SPEED = obj.value;
            for(let slider of document.querySelectorAll(".anim-speed")) {
                if(slider.value !== obj.value) {
                    slider.value = obj.value;
                }
            }
            
        });
    }
});


function playAnimation(diagram_sel) {
    for(let diagram of document.querySelectorAll(diagram_sel + " .graph-animate"))
    {
        if(diagram.classList.contains("playing")) {
            diagram.classList.remove("playing");
        }


        diagram.style.animationDuration = diagram.parentElement.offsetHeight / GRID_SIZE / ANIMATION_SPEED + "s";
        diagram.style.animationDelay = diagram.parentElement.offsetTop / GRID_SIZE / ANIMATION_SPEED + "s";
        diagram.classList.add("playing");
    }

}


function getCoords(x_p, ct_p, v_over_c) {
    const lorentz_coeff = 1 / Math.sqrt(1 - v_over_c*v_over_c);
    return [(x_p + ct_p * v_over_c) * lorentz_coeff, (ct_p + x_p * v_over_c) * lorentz_coeff];
}

function getWidth(obj) {
    return Math.floor(obj.offsetHeight/GRID_SIZE) - 5;
}
function getHeight(obj) {
    return Math.floor(obj.offsetWidth/GRID_SIZE)  - 5;
}



function placePoint(point, x, ct) {
    const width  = getWidth(point.parentElement);
    const height = getHeight(point.parentElement);
    let left   = (x  * height + 1)       * GRID_SIZE;
    let bottom = (ct * height + (5-1/2)) * GRID_SIZE;
    /*
    console.log("height:",height);
    console.log("x,ct:", x, ct);
    console.log("left,bottom:", left, bottom);
    */
    point.style.left = left + "px";
    point.style.bottom = bottom + "px";
}

function updatePoint(point, x, ct, v_over_c, isK) {
    let xP,ctP;
    if(isK) {
        [xP,ctP] = getCoords(x, ct, v_over_c);
    } else {
        [xP,ctP] = getCoords(x, ct, -v_over_c);
    }
    placePoint(point, xP, ctP);
}

