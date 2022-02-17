var all_track_data = [];
var all_instruments = [];
var tracklines = document.querySelector('.tracklines');
var timeline = document.querySelector('.timeline');
var instr_names = ["Hi-hat","Saxophone","Clarinet","Flute","Snare drum","Double bass","Electric piano",
"Trumpet","Acoustic guitar","Tambourine","Violin","Bass_drum"];

export async function loadAudio(event, selectedFile)
{
    const address = event.target.querySelector('.file_sendTo').value;
    audioPlay(selectedFile);
    tracklines.innerHTML = '<div class="timeline"></div>';
    timeline = document.querySelector('.timeline');
    all_track_data = [];
    all_instruments = [];

    const arrayBuffer = await selectedFile.arrayBuffer();
    const audioContext = new AudioContext();

    await audioContext.decodeAudioData(arrayBuffer).then(function(decodedData) {
        var data = new Array(decodedData.numberOfChannels);
        for (var i = 0; i < data.length; i++) {
          data[i] = decodedData.getChannelData(i);
        }
        const rate = decodedData.sampleRate;
        let socket = new WebSocket(address);

        socket.onopen = function(e) {
              for (var i = 0; i < Math.trunc(decodedData.length / rate); i++){
                   var tmp = new Array(decodedData.numberOfChannels);
                   for (var j = 0; j < tmp.length; j++) {
                      tmp[j] = data[j].slice(rate * i, rate * (i + 1));
                   }

                  var data_res = [];
                  for (var j = 0; j < tmp.length; j++) {
                      var arr = [];
                      for (var k=0; k<tmp[j].length; k++) arr[k] = tmp[j][k];
                      data_res[j]=arr;
                  }

                  socket.send(JSON.stringify({
                    data: data_res,
                    sr: rate,
                    timestamp: i
                  }));
              }


        };

        socket.onmessage = function(event) {
          addData(JSON.parse(event.data));
          console.log(`[message] Данные получены с сервера: ${event.data}`);
          if( JSON.parse(event.data).timestamp === Math.trunc(decodedData.length / rate)  - 1)
            socket.close();
        };

        socket.onclose = function(event) {
          if (event.wasClean) {
            console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
          } else {
            // например, сервер убил процесс или сеть недоступна
            // обычно в этом случае event.code 1006
            alert('[close] Соединение прервано');
          }
        };

        socket.onerror = function(error) {
          alert(`[error] ${error.message}`);
        };
    });

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

function renderData(data) {
      if (data.rendered) return;
      all_track_data[data.timestamp]['rendered'] = true;

      var time_block = document.createElement("div");
      time_block.classList.add('timeblock');
      time_block.style.order = data.timestamp;
      if (data.timestamp % 10 === 0) time_block.classList.add('timeblock_active');
      time_block.title = data.timestamp+'s';
      timeline.appendChild(time_block);

      if (all_instruments.length === 0) {
        data.instruments.forEach( function(isActive,index) {
          var trackline = document.createElement("div");
          trackline.classList.add('trackline');
          trackline.title = instr_names[index];
          tracklines.appendChild(trackline);
          all_instruments[index] = trackline;
        });
      }

      data.instruments.forEach( function(isActive,index) {
        var track_block = document.createElement("div");
        track_block.classList.add('trackblock');
        track_block.style.order = data.timestamp;
        if (isActive) {
          track_block.classList.add('trackblock_active');
          if (!all_instruments[index].classList.contains('trackline_active')) all_instruments[index].classList.add('trackline_active');
        }
        all_instruments[index].appendChild(track_block);
      });
}

function checkTrack() {
      all_track_data.forEach( function(data) {
        renderData(data);
      });
}
function addData(data) {
      if (!all_track_data[data.timestamp]) {
        all_track_data[data.timestamp] = {
          timestamp: data.timestamp,
          rendered: false,
          instruments: data.prediction,
        };
        checkTrack();
      }
}
