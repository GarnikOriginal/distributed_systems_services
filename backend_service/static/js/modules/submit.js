import {loadImage} from "./image.js"
import {audioFile} from "./audio.js"

export async function submitFileHandler(event) {
    event.preventDefault();
    const selectedFile = event.target.querySelector('.file_input').files[0];
    if (typeof selectedFile === 'undefined'){
        return;
    }
    if (selectedFile.type.startsWith('image/') ){
        loadImage(event, selectedFile)
    }
    if (selectedFile.type.startsWith('audio/')){
        audioFile(event, selectedFile)
    }
}
