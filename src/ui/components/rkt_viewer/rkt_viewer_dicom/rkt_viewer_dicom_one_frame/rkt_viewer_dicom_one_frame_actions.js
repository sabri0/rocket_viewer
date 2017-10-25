//Using global variables
const cornerstone = window.cornerstone;
//const cornerstoneTools = window.cornerstoneTools;
const cornerstoneWADOImageLoader = window.cornerstoneWADOImageLoader;

function loadLocalImage(url, display_image_function) {

    var imageId = cornerstoneWADOImageLoader.fileManager.add(url[0]);
    cornerstone.loadImage(imageId).then(
        display_image_function,
        function (err) {
            alert(err);
        });
}

function loadWADOImage(url, display_image_function) {

    var imageId = "wadouri:" + url + "?frame=0";

    try {

        cornerstone.loadAndCacheImage(imageId).then(
            display_image_function,
            function (err) {

                alert(err);

            });
    }
    catch (err) {
        alert(err);
    }
}

export function loadDicom(url, img_source, display_image_function) {

    if (img_source === "filesystem") {
        loadLocalImage(url, display_image_function);
    }
    else if (img_source === "wado") {
        loadWADOImage(url, display_image_function);
    }
}

export function getImageMetadata(image) {

    var imageMetadata = {};

    console.log(image);

    console.log(image.getImageData());
    console.log(image.data);

    var numFrames = image.data.intString('x00280008');
    var manufacturer = image.data.string('x00080070');
    var pixelSpacing = image.data.intString('x00280030');
    // pixelSpacing = rowPixelSpacing/columnPixelSpacing (both are values obtained by 
    // cornerstoneWADOImageLoader and saved in cornerstone image ["image" in this code]) 

    if (numFrames !== undefined) {

        imageMetadata["number_of_frames"] = numFrames;

    } else {

        imageMetadata["number_of_frames"] = 0;
    }

    imageMetadata["manufacturer"] = manufacturer;
    imageMetadata["pixel_spacing"] = pixelSpacing;

    return imageMetadata;
}