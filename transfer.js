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


}
