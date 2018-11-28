function updateLocation(location) {
    console.log(location.value);
    
    $(document).ready(function() {
        socket.emit('location', location.value);
    })
}