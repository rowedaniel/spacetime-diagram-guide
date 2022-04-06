
window.addEventListener("DOMContentLoaded", function(event) {
    
    updateAllPoints(
        function(i,n) { return 0 },
        function(i,n) { return i / (n-1); },
    );

    document.getElementById("v-slider").addEventListener("input", function(event) {
        updateAllPoints(
            function(i,n) { return 0; },
            function(i,n) { return i / (n-1); },
        );
    });

}, false);


