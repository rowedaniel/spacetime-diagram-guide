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
