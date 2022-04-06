window.addEventListener("DOMContentLoaded", function(event) {
    
    updateAllPoints(
        function(i,n) { return i / (n-1); },
        function(i,n) { return 0 },
    );

    document.getElementById("v-slider").addEventListener("input", function(event) {
        updateAllPoints(
            function(i,n) { return i / (n-1); },
            function(i,n) { return 0; },
        );
    });

});
