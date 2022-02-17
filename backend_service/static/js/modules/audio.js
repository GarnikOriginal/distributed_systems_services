export async function audioFile(event, selectedFile)
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

function audioPlay(selectedFile) {
  const urlObj = URL.createObjectURL(selectedFile);
  const audio = document.createElement("audio");
  audio.addEventListener("load", () => {
    URL.revokeObjectURL(urlObj);
  });
  document.querySelector('.audio_classify').replaceChildren(audio);
  audio.controls = "true";
  audio.src = urlObj;
}
