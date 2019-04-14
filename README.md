# Image Style Transfer Using ml5 library 
This project is an application of Image Style Transfer. It is largely based on work of reiinakano and yiningshi. It uses ml5, a TensorFlow machine learning library. This project is ongoing. Its current version can be seen here: https://krsmith7.github.io/  

## What is Image Style Transfer?  
Image Style Transfer uses machine learning to transfer the "style" (including color and texture) of one image onto a different, content image. This and the above-mentioned projects use pretrained convolutional neural networks for image recognition. For more in-depth reading on style transfer, you can reference this [academic paper](https://arxiv.org/abs/1508.06576) by Gatys, Ecker, Bethge, or check out these helpful articles [here](https://towardsdatascience.com/style-transfer-styling-images-with-convolutional-neural-networks-7d215b58f461) and [here](https://medium.com/data-science-group-iitr/artistic-style-transfer-with-convolutional-neural-network-7ce2476039fd).   

## Why ml5?
Many examples of image style transfer use [TensorFlow](https://www.tensorflow.org/), an open source machine learning library. [ml5.js](https://ml5js.org/) "aims to make machine learning approachable for a broad audience of artists, creative coders, and students. The library provides access to machine learning algorithms and models in the browser, building on top of TensorFlow.js". For my first iteration of this project, I chose to use ml5 for its ease of use and ability to run in browser.   

## What's next?
Future versions of this project may use TensorFlow.js directly (without ml5 library) or TensorFlow with Python.   
I also hope to train my own style image model using cloud tools such as Google Colab.   




