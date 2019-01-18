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
let isLoading = true;
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
// ml5 doc: style1 = ml5.styleTransfer('models/wave', modelLoaded);
  models.forEach(s => {
    styles[s] = new ml5.TransformNet('models/' + s + '/', modelLoaded);
  });

  // Upload image
  uploader = select('#uploader').elt;
  uploader.addEventListener('change', newContentImage);

  // Resulting Image Container
  resultImageContainer = createImg('images/loading.gif', 'image');
  // Specify location so new img element is not not added to end of page by default
  resultImageContainer.parent('result-image-container');

  // Get permission for camera
  // getCameraAccess();
}

// Method to use user camera
// function getCameraAccess() {
// // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
//   navigator.mediaDevices.getUserMedia(constraints)
// }


// When models are loaded
function modelLoaded() {
  modelNum++;
  if (modelNum >= models.length) {
    modelReady = true;
  // get ml prediction for selected content image
    // doTransfer(currentModel);
  }
}

// Function to predict resulting transfer image
function doTransfer(model) {
  isLoading = true;

  if (!modelReady) return;

  console.log(`in doTransfer function. model: ${model}`);
  if (contentImage) {
    resultImageData = styles[model].predict(contentImage);
  }
// Convert prediction data array to image
  resultImage = ml5.array3DToImage(resultImageData);
  resultImageContainer.elt.src = resultImage.src;
  isLoading = false;
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
    // doTransfer(currentModel);
  }
}


function updateStyleImage(ele) {
  if (ele.src) {
    styleImage.src = ele.src;
    currentModel = ele.id;
  }
  // if (currentModel) {
  //   doTransfer(currentModel);
  // }
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
function showTransfer() {
  createSection.style.display = "flex";
  exampleSection.style.display = "none";
  button.style.display = "none";
}
