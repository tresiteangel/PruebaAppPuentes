

document.addEventListener("deviceready", onDeviceReady, false);
 
function id(element) {
    return document.getElementById(element);
}

function onDeviceReady() {
	cameraApp = new cameraApp();
    cameraApp.run();
}



function cameraApp(){}

cameraApp.prototype={
    _pictureSource:null,
    
    _destinationType:null,
    
    run:function(){
        var that=this;
	    that._pictureSource = navigator.camera.PictureSourceType;
	    that._destinationType = navigator.camera.DestinationType;
	    id("capturePhotoButton").addEventListener("click", that._capturePhoto);
	    id("capturePhotoEditButton").addEventListener("click", that._capturePhotoEdit);
	    id("getPhotoFromLibraryButton").addEventListener("click", that._getPhotoFromLibrary);
	    id("getPhotoFromAlbumButton").addEventListener("click", that._getPhotoFromAlbum);
    },
    
    _capturePhoto:function() {
        // Take picture using device camera and retrieve image as base64-encoded string.
        navigator.camera.getPicture(cameraApp._onPhotoDataSuccess, cameraApp._onFail, {
            quality: 50,
            destinationType: cameraApp._destinationType.DATA_URL
        });
    },
    
    _capturePhotoEdit:function() {
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string. 
        // The allowEdit property has no effect on Android devices.
        navigator.camera.getPicture(cameraApp._onPhotoDataSuccess, cameraApp._onFail, {
            quality: 20, allowEdit: true,
            destinationType: cameraApp._destinationType.DATA_URL
        });
    },
    
    _getPhotoFromLibrary:function() {
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        cameraApp._getPhoto(cameraApp._pictureSource.PHOTOLIBRARY);         
    },
    
    _getPhotoFromAlbum:function() {
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        cameraApp._getPhoto(cameraApp._pictureSource.SAVEDPHOTOALBUM)
    },
    
    _getPhoto:function(source) {
        // Retrieve image file location from specified source.
        navigator.camera.getPicture(cameraApp._onPhotoURISuccess, cameraApp._onFail, {
            quality: 50,
            destinationType: cameraApp._destinationType.FILE_URI,
            sourceType: source
        });
    },
    
    _onPhotoDataSuccess:function(imageData) {
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';
    
        // Show the captured photo.
        smallImage.src = "data:image/jpeg;base64," + imageData;
    },
    
    _onPhotoURISuccess:function(imageURI) {
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';
         
        // Show the captured photo.
        smallImage.src = imageURI;
    },
    
    _onFail:function(message) {
        alert('Failed! Error: ' + message);
    }
}