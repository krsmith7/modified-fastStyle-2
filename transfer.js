let styles = {};
let models = ['la_muse', 'rain_princess', 'wave', 'scream', 'wreck', 'udnie'];
let contentImage, styleImage;
let resultImageData;
let resultImage;
let modelNum = 0;
let currentModel = 'wave';
let uploader;
let webCam = false;
let modelReady = false;
let video;
let start = false;
let isLoading = true;


function setup() {
  // Remove unneeded default p5 sketch canvas
  noCanvas();

// Get starting images by id. elt refers to html element
  contentImage = select('#content-image').elt;
  styleImage = select('#style-image').elt;

// Load style models with ml5
// ml5 doc:
// style1 = ml5.styleTransfer('models/wave', modelLoaded);
  models.forEach(s => {
    styles[s] = new ml5.TransformNet('models/' + s + '/', modelLoaded);
  });

  // Upload image
  uploader = select('#uploader').elt;
  uploader.addEventListener('change', newContentImage);

  // Resulting Image Container
  resultImageContainer = createImg('images/loading.gif', 'image');
  // Specify location so new img element is not added to end of page by default
  resultImageContainer.parent('result-image-container');

  // Get permission for camera
  // getCameraAccess();
}

// Method to use user camera
// function getCameraAccess() {
// // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
//   navigator.mediaDevices.getUserMedia(constraints)
// }
