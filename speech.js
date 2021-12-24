const btn = document.querySelector('.btn');
const mySpeech = document.querySelector('.my-speech');
const assiRespond = document.querySelector('.assistant-reponse');
const content = document.querySelector('.content');
const mic = document.querySelector('.mic')
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition ;
const recognition = new SpeechRecognition();
const myStyle = 'my msg  msg w-auto h-auto p-3  bg-gray-800 text-white rounded-md relative  ';
const msgton = new Audio("messageton.mp3");
const assoStyle = ' asso  msg p-3  w-auto h-auto  text-gray-800 bg-gray-100 rounded-md relative ';
const oldlistItem = document.getElementsByClassName('msg');
const today = new Date();




recognition.onstart = ()=>{
   content.innerHTML = "";
    console.log(' speech recognition start... ')
    mic.classList='animate-ping'; 
}

recognition.onspeechend = ()=>{
    mic.classList='animate-none';
    
    
}

recognition.onresult =(event)=>{
    //
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    
    listItem = createNewMessageElement("Me",transcript,myStyle);
    content.appendChild(listItem)
    
    setTimeout(assospeak(transcript), 5000);
    
}
btn.addEventListener('click', ()=>{
    recognition.start();
})
function assospeak(message){
    const speech = new SpeechSynthesisUtterance();
    
    
    if(message.includes('how are you' )|| message.includes('are you fine') || message.includes('hi')|| message.includes('hello')||message.includes('whatsup')){
        speech.text = 'iam fine';
    }
    else if(message.includes('who are you' )|| message.includes('what is your name') || message.includes('what your name is')){
        speech.text = 'My name is Asso';
    }
    else if (message.includes("what time is it")|| message.includes("time")|| message.includes("what is the time")){
            if(today.getHours() >= 12){
                speech.text = today.getHours() + ":"+ today.getMinutes() +" PM";
            }
            else if(today.getHours() >= 12){
                speech.text = today.getHours() + ":"+ today.getMinutes() +" AM";
            }
    }
    else if (message.includes("what is my name")|| message.includes("do you know my name")|| message.includes("who I am")){
        speech.text = " you are Abdeli bebane ";
   }
   else if (message.includes("date")|| message.includes("what is the date")|| message.includes(" what is the date today ")){
    speech.text = taskDate(Date());
   }
   else {
    speech.text = "idont understand what you mean ";
   }
   
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
     setTimeout(listItem = createNewMessageElement("Asso",speech.text,assoStyle),4000) ;
    content.appendChild(listItem);

    window.speechSynthesis.speak(speech);
}




var createNewMessageElement = function(speaker,sp,style,divst) {
	// create List Item
  var div = document.createElement("div");

  var listItem = document.createElement("li");
  // input checkbox
  
  // label
  var h1 = document.createElement("h1");
  //speech as p
  var speech = document.createElement("p");
  
  
  
  //Each element needs modified 
  
  

  speech.innerText= sp ;
  listItem.className = style;
  h1.innerText = speaker;
  h1.className = ' p-2 rounded-lg bg-200 ';
  div.className =  "square" ;
  
  // Each element needs appending
  listItem.appendChild(h1);
  listItem.appendChild(speech);
  
 listItem.appendChild(div);

	return listItem;
}

function taskDate(dateMilli) {
    var d = (new Date(dateMilli) + '').split(' ');
    d[2] = d[2] + ',';

    return [d[0], d[1], d[2], d[3]].join(' ');
}

