let styles = {};
const models = ['la_muse', 'rain_princess', 'wave', 'scream', 'wreck', 'udnie'];
let contentImage;
let styleImage;
let resultImageData;
let resultImage;
let resultImageContainer;
let modelNum = 0;
let currentModel = 'wave';
let uploader;
let webCam = false;
let modelReady = false;
let video;
let start = false;
// let isLoading = false;
const exampleSection = document.getElementById("transfer-container");
const createSection = document.getElementById("create-transfer-container");
const button = document.getElementById("try-button");


function setup() {
  // Remove unneeded default p5 sketch canvas
  noCanvas();
  // Hide create-transfer section
  createSection.style.display = "none";
// Get starting images by id. elt refers to html element
  contentImage = select('#content-image').elt;
  styleImage = select('#style-image').elt;
// Load style models with ml5
  models.forEach(s => {
    styles[s] = new ml5.TransformNet('models/' + s + '/', modelLoaded);
  });
  // Upload image
  uploader = select('#uploader').elt;
  uploader.addEventListener('change', newContentImage);
  // Resulting Image Container
  resultImageContainer = createImg('images/questionmark.png', 'image');
  // Specify location so new img element is not not added to end of page by default
  resultImageContainer.parent('result-image-container');
  // Get permission for camera
  // getCameraAccess();
}

// When models are loaded
function modelLoaded() {
  modelNum++;
  if (modelNum >= models.length) {
    modelReady = true;
  // get ml prediction for selected content image
    // doTransfer(currentModel);
  }
}

// Method to use user camera
function useWebcam() {
  /// javascript webcam code
  // const constraints = {video: true};
  //
  // navigator.mediaDevices.getUserMedia(constraints)
  // .then(function(mediaStream) {
  //   video = document.querySelector('video');
  //   video.srcObject = mediaStream;
  //   video.onloadedmetadata = function(e) {
  //     video.play();
  //   };
  // })
  // .catch(function(err) { console.log(err.name + ": " + err.message);
  // });

/// p5 webcam code
  video = createCapture(VIDEO);
  video.size(250, 250);
  // Show video capture in place of content image
  select('#content-image').hide();
  video.parent('create-transfer-input-image');
}

// Function to predict resulting transfer image
function doTransfer(model) {
  // isLoading = true;

  if (!modelReady) return;

  console.log(`in doTransfer function. model: ${model}`);
  if (contentImage) {
    resultImageData = styles[model].predict(contentImage);
  }
// Convert prediction data array to image
  resultImage = ml5.array3DToImage(resultImageData);
  resultImageContainer.elt.src = resultImage.src;
  // isLoading = false;

  console.log("resultImage", resultImage);
}

// draw function runs continuously by default
function draw() {
  if (modelReady && start) {
    doTransfer(currentModel);
  }
}

function updateContentImage(ele) {
  if (ele.src) {
    contentImage.src = ele.src;
  }
}


function updateStyleImage(ele) {
  if (ele.src) {
    styleImage.src = ele.src;
    currentModel = ele.id;
  }
}

function uploadImage() {
  uploader.click();
}

// Set image uploaded from user as contentImage
function newContentImage() {
  if (uploader.files && uploader.files[0]) {
    let newImageUrl = window.URL.createObjectURL(uploader.files[0]);
    contentImage.src = newImageUrl;
    contentImage.style.width = '250px';
    contentImage.style.height = '250px';
  }
}

function enableTransfer() {
  start = true;
  doTransfer(currentModel);
  start = false;
}

// Remove example section when try button is clicked
function showTransfer(ele) {
  createSection.style.display = "flex";
  exampleSection.style.display = "none";
  button.style.display = "none";
}

function saveResultImage() {
//resultImage is object with src and style
// Change src for result image
  // resultImageUrl = window.URL.createObjectURL(resultImage);
  // resultImage.src = resultImageUrl;
  // console.log(resultImage.src);
  // return resultImage.src;
  // error: transfer.js:137 Uncaught TypeError: Failed to execute 'createObjectURL' on 'URL': No function was found that matched the signature provided.

  //
  console.log(resultImageContainer.elt);
  // <img src="data:image/png;base64,iVBOR...=" alt="image">
}


// don't have "this" in click handler on image. so is undefined earlier
// in function when make resultImage object, add an onclick with this?
