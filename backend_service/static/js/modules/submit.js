import {loadImage} from "./image.js"
import {loadAudio} from "./audio.js"

export async function submitFileHandler(event) {
    event.preventDefault();
    const selectedFile = event.target.querySelector('.file_input').files[0];
    const buttons = document.querySelectorAll('.btn');
    const res_cont = document.querySelector('.result');
    const yolo_cont = document.querySelector('.yolo_image-container');
    const audio_cont = document.querySelector('.audio_classify-container');
    Array.from(buttons).forEach( function(el) {el.disabled = true;});
    const type =  event.target.id;
    if (typeof selectedFile === 'undefined'){
        alert('Файл не выбран!!');
    }
    else if (selectedFile.size > 8*1204*1024*20)
    {
        alert('Файл слишком большой! Выберите файл меньше 20Mb!');
    }
    else if (selectedFile.type.startsWith('image/') && type === 'YOLO' ){
        res_cont.hidden = false;
        audio_cont.hidden = true;
        yolo_cont.hidden = false;
        await loadImage(event, selectedFile);
    }
    else if (selectedFile.type.startsWith('audio/') && type === 'AUDIO'){
        res_cont.hidden = false;
        audio_cont.hidden = false;
        yolo_cont.hidden = true;
        await loadAudio(event, selectedFile);
    }
    else {
        alert('Неверный тип файла!');
    }
    Array.from(buttons).forEach( function(el) {el.disabled = false;});

}
