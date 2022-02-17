import {submitFileHandler} from "./modules/submit.js"

function init(){
    const formNodes = document.querySelectorAll('.file_form');
    Array.from(formNodes).forEach( function(el) {el.addEventListener('submit', submitFileHandler)});
}

init();