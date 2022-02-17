export async function loadImage(event, selectedFile)
{
    var yolo_service_address = "http://localhost:9000/predict"
    let formData = new FormData()
    formData.append('image', selectedFile)

    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = selectedFile;
    const yoloImg = document.querySelector('.yolo_image');
    yoloImg.replaceChildren(img);
    var base64String;
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(selectedFile);

    var newBorder;
    try{
         newBorder = await postImage(formData, selectedFile, yolo_service_address);
         drawBounds(newBorder);
    }
    catch(error){
         console.log(error);
    }
    finally{
        console.log("Cant upload image")
    }
}

async function postImage(formData, img, address)
{
    const response = await fetch(address, {
        method: 'POST',
        files: img,
        body: formData
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
    }
}

function drawBounds(bounds){
    var yolo_image = document.querySelector('.yolo_image');

    const getColor = function(val) {
      var r = (1-val)*256;
      var g = val*256;
      return `rgb(${r},${g},0)`;
    };

    const addNewRect = function(label) {
      var rect = document.createElement("div");
      rect.innerHTML = "<span class='sign'>"+label.name+"</span>";
      rect.classList.add('rect');

      var image = yolo_image.querySelector("img");
      var width = (label.xmax-label.xmin);
      var height = (label.ymax-label.ymin);
      var imageWidth = image.naturalWidth?image.naturalWidth:1000;
      var imageHeight = image.naturalHeight?image.naturalHeight:1000;

      rect.style.width = (width / imageWidth)*100 + '%';
      rect.style.height = (height / imageHeight)*100 + '%';

      rect.style.left = (label.xmin / imageWidth)*100 + '%';
      rect.style.top = (label.ymin / imageHeight)*100 + '%';

      rect.style.borderColor = getColor(label.confidence);
      yolo_image.appendChild(rect);
    };


    bounds.labels.forEach( function(label){
      addNewRect(label);
    });
}