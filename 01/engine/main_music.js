let pauseCounter = false;
let startTimer=false;
let sec = tasks[0].secTask;
let endTime=false;
let audio;
let currentTask=0;
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

//кнопка на выход в главное меню
document.querySelector("#headerLogo").addEventListener("click",()=>history.back())


buttonCloseRules.addEventListener("click",()=>startTask());
buttonAnswers.addEventListener("click", ()=>startAnswers());
buttonAnswersHidden.addEventListener("click", ()=>startAnswers());

function startTask() {
	saveLocalData({taskName:true});//записываем в локал
	buttonAnswersHidden.style.display = "block";
	rulesTotallWindow.style.visibility="hidden";
	parrent.style.visibility = "visible";
	pauseCounter=false;
	taskOrAnswer = "secTask";

	//старт таймера
	if (startTimer===false) {
		audio = new Audio(tasks[0].audio);
		sec=tasks[0].secTask;
		audio.play();
		minusSecond(taskOrAnswer);
		startTimer=true;
		numberOfTaskP.innerHTML=`Задание ${currentTask+1} из ${tasks.length}`;
		if (lang=="eng") numberOfTaskP.innerHTML=`Task number ${currentTask+1} from ${tasks.length}`;
	}
};


function startAnswers(){

	startTimer = false; endTime=false;
	currentTask=0;
	   			finalTotalWindow.style.display = "none";
	rulesTotallWindow.style.visibility="hidden"
	parrent.style.visibility = "visible";
	numberOfTaskP.innerHTML=`Задание ${currentTask+1} из ${tasks.length}<br>Ответ: ${tasks[currentTask].answer}`;
	if (lang=="eng") numberOfTaskP.innerHTML=`Task number ${currentTask+1} from ${tasks.length}<br>Answer: ${tasks[currentTask].answer}`;
	pauseCounter=false;

	//старт таймера
	if (startTimer===false) {
		audio = new Audio(tasks[0].audio);
		taskOrAnswer = "secAnswer";
		sec=tasks[0][taskOrAnswer];
		audio.play();
		startTimer=true;
		minusSecond(taskOrAnswer);
	}
}



function minusSecond(taskOrAnswer){
		startTimer= true;
		if (pauseCounter===true) audio.pause();
		if (pauseCounter===false) {
				if (audio.paused&&tasks.length>currentTask) audio.play();
				timerTable.innerHTML = `${addZero(Math.floor(sec/60))}:${addZero(sec%60)}`;
				if (tasks.length==currentTask) numberOfTaskP.innerHTML = `У Вас есть ${sec} секунд, чтоб завершить уровень`;//добавляем счетчик секунд для сбора бланков по центру экрана
				if (tasks.length==currentTask&&lang=="eng") numberOfTaskP.innerHTML = `You have ${sec} seconds to finish level`;//добавляем счетчик секунд для сбора бланков по центру экрана

				sec-- ;//если не пауза то вычитаем секунду
				if (sec<=-1) endTime=true;
		};
				
		if (!endTime) setTimeout(()=>minusSecond(taskOrAnswer),1000);

		//окончиние таймера1
	   	if (endTime) {
			audio.pause();
	   		currentTask++;

	   		if (tasks.length+1==currentTask) {//окончание всего уровня
	   			finalTotalWindow.style.display = "block";
	   			timerTable.innerHTML = "";
	   			numberOfTaskP.innerHTML = ``;
	   			return}; //окончание всего уровня

	   		if (tasks.length==currentTask) {//собрать бланки
			sec = pauseAfterTask;
			if 	(taskOrAnswer != "secAnswer") numberOfTaskP.innerHTML = `У Вас есть ${sec} секунд, чтоб завершить уровень`;
			if 	(taskOrAnswer == "secAnswer") {
	   			timerTable.innerHTML = "";
	   			numberOfTaskP.innerHTML = ``;
	   			currentTask++;
	   			finalTotalWindow.style.display = "block";
	   			textFinalWindow.innerHTML = "Для выхода в основное меню нажмите соответсвующую клавишу";
	   			if (lang="eng") textFinalWindow.innerHTML = "To exit to the main menu, press the corresponding key.";
	   			//окончание всего уровня
	   			return
	   		};

			endTime=false;
			// audio.pause();
			minusSecond(taskOrAnswer);

			}; 

			if (tasks.length>currentTask) {
				audio = new Audio(tasks[currentTask].audio);

				if (tasks[currentTask][taskOrAnswer] == undefined) sec= tasks[0][taskOrAnswer]
				 else sec=tasks[currentTask][taskOrAnswer];
				audio.play();
				endTime=false;
					if 	(taskOrAnswer == "secAnswer") numberOfTaskP.innerHTML=`Задание ${currentTask+1} из ${tasks.length}<br>Ответ: ${tasks[currentTask].answer}`;
					if 	(taskOrAnswer != "secAnswer") numberOfTaskP.innerHTML=`Задание ${currentTask+1} из ${tasks.length}`;
					if 	(taskOrAnswer == "secAnswer"&&lang=="eng") numberOfTaskP.innerHTML=`Task number ${currentTask+1} from ${tasks.length}<br>Answer: ${tasks[currentTask].answer}`;
					if 	(taskOrAnswer != "secAnswer"&&lang=="eng") numberOfTaskP.innerHTML=`Task number ${currentTask+1} from ${tasks.length}`;
					
					minusSecond(taskOrAnswer);
			};
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
	  if (!pauseCounter) buttonPauseImage.src = "../engine/play-button.png";
  		else buttonPauseImage.src = "../engine/pause-button.png";
	return pauseCounter=!pauseCounter;
};
function returnTaskButton(){
	  	if (currentTask!=0&&pauseCounter==false) {

	  		console.log('tasks[currentTask]',tasks[currentTask]);
	  		if (typeof tasks[currentTask].secTask != "number") sec= tasks[0].secTask
	  			else sec=tasks[currentTask].secTask;
	  				  	endTime=true;
	  		currentTask--; 
	  		currentTask--; 
		}
};
function forwardTaskButton(){
	if (currentTask!=tasks.length+1&&pauseCounter==false) sec=0;
};
	buttonPause.addEventListener("click",setPause);
	document.addEventListener("keydown", (e)=>{if(e.keyCode == 32) setPause()}, false);
	buttonBackTask.addEventListener("click",returnTaskButton);
	buttonForwardTask.addEventListener("click",forwardTaskButton);
	