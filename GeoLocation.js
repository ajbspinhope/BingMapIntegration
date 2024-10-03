// Function to get Geo Location
function RetrieveGeoLocation(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();  // Get the form context

    var findMyLocationOptionSetValue = formContext.getAttribute("ajb_findmylocation").getValue();

    if (findMyLocationOptionSetValue != 748250000)
    {
      //Clear the value and exit
      formContext.getAttribute("ajb_latitude").setValue(null);
      formContext.getAttribute("ajb_longitude").setValue(null);
      return;
    }

    if (navigator.geolocation) {
        // Geolocation is supported
        navigator.geolocation.getCurrentPosition(function(position) {
            // Pass both position and executionContext to showPosition
            showPosition(position, executionContext);
        }, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// Function to display the position
function showPosition(position, executionContext) {
    var formContext = executionContext.getFormContext();  // Get the form context

    const latitude = position.coords.latitude;
    formContext.getAttribute("ajb_latitude").setValue(latitude);  // Set the latitude

    const longitude = position.coords.longitude;
    formContext.getAttribute("ajb_longitude").setValue(longitude);  // Set the longitude (assuming there's a longitude field)
}

// Function to handle errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}
