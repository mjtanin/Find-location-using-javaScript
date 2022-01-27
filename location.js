(function($){
    $(document).ready(function(){

        // var $locationText = $('.elementor-element-7fd791f p');
        var $locationText;

        
        // Check for geolocation browser support and execute success method
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            geoLocationSuccess,
            geoLocationError,
            { timeout: 10000 }
          );
        } else {
          alert("your browser doesn't support geolocation");
        }
        function geoLocationSuccess(pos) {
          // get user lat,long
          var myLat = pos.coords.latitude,
            myLng = pos.coords.longitude,
            loadingTimeout;
        
          var loading = function () {
              if($locationText){
                  $locationText.text("fetching...");
              }
          };
        
          loadingTimeout = setTimeout(loading, 600);
        
          var request = $.get(
            "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
              myLat +
              "&lon=" +
              myLng
          )
            .done(function (data) {
              if (loadingTimeout) {
                clearTimeout(loadingTimeout);
                loadingTimeout = null;
                if($locationText){
                    $locationText.text(data.display_name);
                }
                console.log(data.display_name);
              }
            })
            .fail(function () {
              // handle error
            });
        }
        
        function geoLocationError(error) {
          var errors = {
            1: "Permission denied",
            2: "Position unavailable",
            3: "Request timeout"
          };
          alert("Error: " + errors[error.code]);
        }
    });


})(jQuery);    
