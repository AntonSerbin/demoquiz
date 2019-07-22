let pauseCounter = false;
let startTimer=false;
let sec = tasks[0].duration;
let endTime=false;
let currentTask=0;
let backButtonPressed =false;
let stopMinusSecond = false;
let startedAdditionalTimer = false;
if (typeof(lang)!="string") lang="rus";

const buttonCloseRules =document.querySelector(".buttonMenuRules");
const rulesTotallWindow = document.querySelector("#rulesTotallWindow");
const parrent = document.querySelector(".parrent");
const timerTable = document.querySelector(".timerTable");
const buttonPause = document.querySelector("#buttonPause");
const buttonPauseImage = document.querySelector("#buttonPauseImage");
const buttonBackTask = document.querySelector("#buttonBackTask");
const buttonForwardTask = document.querySelector("#buttonForwardTask");
const finalTotalWindow =document.querySelector("#finalTotalWindow");
const numberOfTaskP = document.querySelector("#numberOfTaskP");
const buttonAnswers = document.querySelector("#buttonAnswers");
const buttonAnswersHidden = document.querySelector("#buttonAnswersHidden");
const textFinalWindow = document.querySelector("#textFinalWindow");
const header = document.querySelector("header");

//кнопка на выход в главное меню
document.querySelector("#headerLogo").addEventListener("click",()=>history.back())


buttonCloseRules.addEventListener("click",()=>startTask());
buttonAnswersHidden.addEventListener("click", ()=>startAnswers());
buttonAnswers.addEventListener("click", ()=>{
	if(startedAdditionalTimer) stopMinusSecond=true;
	taskOrAnswer = "secAnswer";
	startAnswers();
});

function startTask() {
	saveLocalData({taskName:true});//записываем в локал
	header.classList.add("headerMainTask");
	// buttonAnswersHidden.style.display = "block"; //показываем клавишу ОТВЕТЫ
	rulesTotallWindow.style.visibility="hidden"; //убираем окно с правилами
	parrent.style.visibility = "visible"; //показываем блок с уровнями
	pauseCounter=false;
	taskOrAnswer = "secTask"; //устанавливаем переменную ответы или вопросы
	if (!tasks[0].taskOrAnswer) sec=tasks[0].duration 
		else sec = tasks[0].taskOrAnswer;
	video = setVideo(tasks[0].video);
	//старт таймера
	if (startTimer===false) {
		startTimer=true;
		numberOfTaskP.innerHTML=`№${currentTask+1}/${tasks.length}`;
		if (typeof(sec)=="NaN") sec=18;
		minusSecond(taskOrAnswer);
		if (tasks[currentTask].formatAnswer!=undefined) numberOfTaskP.innerHTML+=`<br><br>Формат ответа:<br>${tasks[currentTask].formatAnswer}`;
	}
};


function startAnswers(){
	startTimer = false; endTime=false;
	currentTask=0;
	header.classList.add("headerMainTask");
	rulesTotallWindow.style.visibility="hidden"; //убираем окно с правилами
	finalTotalWindow.style.visibility="hidden";
	parrent.style.visibility = "visible";
	numberOfTaskP.innerHTML=`№${currentTask+1}/${tasks.length}<br>Ответ: ${tasks[currentTask].answer}`;
	pauseCounter=false;
	video = setVideo(tasks[0].video);
	taskOrAnswer = "secAnswer";

	//старт таймера ответы
	if (startTimer===false) {
		taskOrAnswer = "secAnswer";
		sec=tasks[0][taskOrAnswer];
		startTimer=true;
		minusSecond(taskOrAnswer);
	}
}

function minusSecond(taskOrAnswer){

		startTimer= true;
		if (stopMinusSecond==true) {
			taskOrAnswer = "secAnswer";
			startedAdditionalTimer=false;	
			pauseCounter===false;
			stopMinusSecond=false;
			return};

		if (pauseCounter===true) video.pause();

		if (pauseCounter===false) {
				if (video.paused&&tasks.length>currentTask) video.play();
				timerTable.innerHTML = `${addZero(Math.floor(sec/60))}:${addZero(sec%60)}`;
				if (tasks.length==currentTask) {
					textFinalWindow.innerHTML = `У Вас есть ${sec} секунд, чтоб завершить уровень`;//добавляем счетчик секунд для сбора бланков по центру экрана
					startedAdditionalTimer=true;
					taskOrAnswer = "secAnswer";
				};
				sec-- ;//если не пауза то вычитаем секунду

				if (sec<=0) {endTime=true;startedAdditionalTimer=false};
		};

		if (!endTime) setTimeout(()=>minusSecond(taskOrAnswer),1000);

		//окончиние таймера1
	   	if (endTime) {

			video.pause();
	   		currentTask++;
			endTime=false;


	   		if (tasks.length==currentTask) {//собрать бланки
				sec = pauseAfterTask;
	   			timerTable.innerHTML = "";
	   			finalTotalWindow.style.visibility = "visible";
	   			if (parrent.querySelector("video"))  parrent.querySelector("video").remove();

				if 	(taskOrAnswer != "secAnswer") textFinalWindow.innerHTML = `У Вас есть ${sec} секунд, чтоб завершить уровень`;
				if 	(taskOrAnswer == "secAnswer") {
		   			currentTask++;
		   			timerTable.innerHTML = "";
		   			textFinalWindow.innerHTML = "Для выходна в основное меню нажмите соответсвующую клавишу";
		   			taskOrAnswer = "secAnswer";

		   			return;
		   			//окончание всего уровня
				};

				// taskOrAnswer = "secAnswer";
				setTimeout(()=>minusSecond(taskOrAnswer),1000);
	   		};
	   		if (tasks.length+1==currentTask) {//окончание всего уровня
	   			// finalTotalWindow.style.display = "block";
	   			parrent.visibility="hidden";
	   			finalTotalWindow.style.visibility = "visible";
	   			timerTable.innerHTML = "";
	   			numberOfTaskP.innerHTML = ``;
	   			textFinalWindow.innerHTML = "Для выходна в основное меню нажмите соответсвующую клавишу.";
		   		taskOrAnswer = "secAnswer";

	   			return
	   		}; //окончание всего уровня

			if (tasks.length>currentTask) {
				video = setVideo(tasks[currentTask].video);
				if (tasks[currentTask][taskOrAnswer] == undefined) sec= tasks[currentTask].duration
				 else sec=tasks[currentTask][taskOrAnswer];
				if 	(taskOrAnswer == "secAnswer") numberOfTaskP.innerHTML=`№${currentTask+1}/${tasks.length}<br>Ответ: ${tasks[currentTask].answer}`;
				if 	(taskOrAnswer != "secAnswer") numberOfTaskP.innerHTML=`№${currentTask+1}/${tasks.length}`;
				setTimeout(()=>minusSecond(taskOrAnswer),1000);
				return;
			};

		return;
			// video.pause();

		};

};


//функция добавляет 0 в циферблат при однозначном числе
function addZero (num){ return ('0'+num).slice(-2)};

//Функции загрузки для LocalStorage
const loadLocalData = () => {
  try {
    const loacalData = localStorage.getItem(taskName);
    if (loacalData === null) {
      return undefined;
    }
    return JSON.parse(loacalData);
  } catch (err) {
    return undefined;
  }
};
//Функции сохранения для LocalStorage
const saveLocalData = (data) => {
  try {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem(taskName, dataJSON);
  } catch (err) {
    console.log('save state error: ', err);
  }
};

//добовляем клавишу ответы для второго просмотра
if ((loadLocalData()==undefined)||(loadLocalData().taskName!=true)) {
	buttonAnswersHidden.style.display = "none";
}
//меню управления 


function setPause(){
	  	if (!pauseCounter) {
	  		buttonPauseImage.src = "../engine/play-button.png";
	  		video.pause();	
	  	}
  		else {
  			buttonPauseImage.src = "../engine/pause-button.png";
  			video.play();	
  		};
	    return pauseCounter=!pauseCounter;	
};
//делаем паузу по клику
buttonPause.addEventListener("click",setPause);
//делаем паузу по пробелу
document.addEventListener("keydown", (e)=>{if(e.keyCode == 32) setPause()}, false);
		
function returnTaskButton(){
	  	if (currentTask!=0&&backButtonPressed==false&&endTime==false) {
		  	endTime=true;
	  		currentTask--; 
	  		currentTask--; 		
		};
}

function forwardTaskButton(){
	if (currentTask!=tasks.length+1&&sec!=0) sec=0;
}
	buttonBackTask.addEventListener("click",returnTaskButton);
	buttonForwardTask.addEventListener("click",forwardTaskButton);


// подключаем видео
function setVideo(link) {
  var x = document.createElement("VIDEO");
    if (x.canPlayType("video/mp4")) {
      x.setAttribute("src",link+".mp4");
    } else {
      x.setAttribute("src",link+".avi");
    }
 x.setAttribute("autoplay", true);
 x.controls = false;

 if (parrent.querySelector("video")) parrent.querySelector("video").remove();
 parrent.appendChild(x);
 return x;
 // } ;
};
