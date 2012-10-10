

document.addEventListener("deviceready", onDeviceReady, false);
 
function id(element) {
    return document.getElementById(element);
}

var pictureSource;
var destinationType;

function onDeviceReady() {
	// Set up enumerations to save typing.
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
	id("capturePhotoButton").addEventListener("click", capturePhoto);
	id("capturePhotoEditButton").addEventListener("click", capturePhotoEdit);
	id("getPhotoFromLibraryButton").addEventListener("click", getPhotoFromLibrary);
	id("getPhotoFromAlbumButton").addEventListener("click", getPhotoFromAlbum);
}

function onPhotoDataSuccess(imageData) {
    var smallImage = id('smallImage'),
    largeImage = id('largeImage');
    largeImage.style.display = 'none';
    smallImage.style.display = 'block';

    // Show the captured photo.
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onPhotoURISuccess(imageURI) {
    var smallImage = id('smallImage'),
    largeImage = id('largeImage');
    largeImage.style.display = 'block';
    smallImage.style.display = 'none';
     
    // Show the captured photo.
    largeImage.src = imageURI;
}

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string.
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URL
    });
}

function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string. 
    // The allowEdit property has no effect on Android devices.
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL
    });
}

function getPhotoFromLibrary() {
    // On Android devices, pictureSource.PHOTOLIBRARY and
    // pictureSource.SAVEDPHOTOALBUM display the same photo album.
    getPhoto(pictureSource.PHOTOLIBRARY);         
}
 
function getPhotoFromAlbum() {
    // On Android devices, pictureSource.PHOTOLIBRARY and
    // pictureSource.SAVEDPHOTOALBUM display the same photo album.
    getPhoto(pictureSource.SAVEDPHOTOALBUM)
}

function getPhoto(source) {
    // Retrieve image file location from specified source.
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

function onFail(message) {
    alert('Failed! Error: ' + message);
}