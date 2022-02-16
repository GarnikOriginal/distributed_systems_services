async function postImage(img, address)
{
    const response = await fetch(address, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type':  'application/json',//'multipart/form-data', //img.type
        },
        body: JSON.stringify('test'),
//        files: { 'image': img },
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
    }
}
function readFile(reader)
{
    var base64String;
    reader.onloadend = () => {
      // use a regex to remove data url part
      base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");

      console.log(base64String);
      return base64String;
    };

}
function loadFile(file){
    return new Promise(resolve=>{
        let reader = new FileReader()

        reader.onload = function(event) {
            let data = event.target.result
                .replace("data:", "")
                .replace(/^.+,/, "");
            resolve(data);
        }
        reader.readAsDataURL(file)
    })
}

async function imageFile(event,selectedFile)
{
    let formData = new FormData()
    formData.append('image', selectedFile)

    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = selectedFile;
    const yoloImg = document.querySelector('.yolo_image');
    yoloImg.replaceChildren(img); // это div, в котором будет отображаться содержимое.
    var base64String;
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(selectedFile);
//
//    const address = event.target.querySelector('.file_sendTo').value;
//    let data = await loadFile(selectedFile);
//    console.log(data);
//    return;


    var newBorder;
    try{
         //newBorder = await postImage(selectedFile, address);
         console.log(newBorder);
    }
    catch(error){
         console.log(error);
    }
    finally{
        var newBorder = {
          labels: [
            {
              class: 24,
              confidence: 0.33163750171661377,
              name: "backpack",
              xmax: 728,
              xmin: 32,
              ymax: 596,
              ymin: 275
            },
            {
              class: 26,
              confidence: 0.2580671012401581,
              name: "handbag",
              xmax: 418,
              xmin: 132,
              ymax: 397,
              ymin: 175
            }
          ]
        };
    }

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


    newBorder.labels.forEach( function(label){
      addNewRect(label);
    });

//    const getColor = function(str) {
//    // str = 0.33163750171661377
//     str+="";str=str.split(".").pop();
//     var arr = chunkSubstr(str,Math.floor(str.length/3));
//     return `rgb(${256/arr[0]*20000<<0}, ${256/arr[1]*20000<<0}, ${256/arr[2]*20000<<0})`;
//    }
//    const chunkSubstr = function (str, size) {
//      const numChunks = Math.ceil(str.length / size)
//      const chunks = new Array(numChunks)
//
//      for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
//        chunks[i] = str.substr(o, size)
//      }
//
//      return chunks
//    }
//
//    var yolo_image = document.querySelector('.yolo_image');
//    const getHash = function (str) {
//      var hash = 0;
//      var str = String(str);
//      if (str.length == 0) return hash;
//      for (i = 0; i < str.length; i++) {
//        char = str.charCodeAt(i);
//        hash = ((hash<<5)-hash)+char;
//        hash = hash & hash; // Convert to 32bit integer
//      }
//      return hash;
//    }
//    const addNewRect = function(obj) {
//      var id = 'rect'+getHash(JSON.stringify(obj));
//      var rect = document.createElement("div");
//      rect.innerHTML = "<h4 class='sign'>"+obj.name+"</h4>";
//      rect.classList.add('rect');
//      rect.id = id;
//      yolo_image.appendChild(rect);
//      return id;
//    };
//
//    const setCords = function(rect_id,label) {
//      var rect = document.querySelector("#"+rect_id);
//      var image = yolo_image.querySelector("img");
//      var width = (label.xmax-label.xmin);
//      var height = (label.ymax-label.ymin);
//      console.log(width,image.naturalWidth,(width / image.naturalWidth),(label.xmin / image.naturalWidth));
//
//      rect.style.width = (width / image.naturalWidth)*100 + '%';
//      rect.style.height = (height / image.naturalHeight)*100 + '%';
//
//      rect.style.left = (label.xmin / image.naturalWidth)*100 + '%';
//      rect.style.top = (label.ymin / image.naturalHeight)*100 + '%';
//
//      rect.style.borderColor = getColor(label.confidence);
//    }
//
//    newBorder.labels.forEach( function(label){
//      var rect_id = addNewRect(label);
//      setCords(rect_id,label);
//    });

}


function audioPlay(selectedFile) {
  // Create a blob that we can use as an src for our audio element
  const urlObj = URL.createObjectURL(selectedFile);
   // Create an audio element
  const audio = document.createElement("audio");
  // Clean up the URL Object after we are done with it
  audio.addEventListener("load", () => {
    URL.revokeObjectURL(urlObj);
  });
  // Append the audio element
   document.querySelector('.audio_classify').replaceChildren(audio);
  // Allow us to control the audio
  audio.controls = "true";
  // Set the src and start loading the audio from the file
  audio.src = urlObj;
}
async function audioFile(event, selectedFile)
{
    const address = event.target.querySelector('.file_sendTo').value;
    audioPlay(selectedFile);
    const arrayBuffer = await selectedFile.arrayBuffer();
    const audioContext = new AudioContext();
    await audioContext.decodeAudioData(arrayBuffer).then(function(decodedData) {
        const data = decodedData.getChannelData(0);
        // use the decoded data here
    });
//    alert(await analyze(audioBuffer));


//    let socket = new WebSocket(address);

//     {
//            'data': data,
//            'sr': rate,
//            'timestamp': i,
//     }

}

async function handleFileFormSubmit(event) {
    event.preventDefault();
    const selectedFile = event.target.querySelector('.file_input').files[0];
    if (typeof selectedFile === 'undefined'){
        return;
    }
    if (selectedFile.type.startsWith('image/') ){
        imageFile(event, selectedFile)
    }
    if (selectedFile.type.startsWith('audio/')){
        audioFile(event, selectedFile)
    }

}

function init(){
    const formNodes = document.querySelectorAll('.file_form');
    Array.from(formNodes).forEach( function(el) {el.addEventListener('submit', handleFileFormSubmit)});
}

init();