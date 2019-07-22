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
const header = document.querySelector("header");

//кнопка на выход в главное меню
document.querySelector("#headerLogo").addEventListener("click",()=>history.back())


buttonCloseRules.addEventListener("click",()=>startTask());
buttonAnswers.addEventListener("click", ()=>startAnswers());
buttonAnswersHidden.addEventListener("click", ()=>startAnswers());

function startTask() {
	saveLocalData({taskName:true});//записываем в локал
	header.classList.add("headerMainTask");
	buttonAnswersHidden.style.display = "block"; //показываем клавишу ОТВЕТЫ
	rulesTotallWindow.style.visibility="hidden"; //убираем окно с правилами
	parrent.style.visibility = "visible"; //показываем блок с уровнями
	pauseCounter=false;
	taskOrAnswer = "secTask"; //устанавливаем переменную ответы или вопросы
	parrent.style.background = `url(${tasks[currentTask].pict}) no-repeat center center`;
	parrent.style.backgroundSize  = `contain`;
	sec=tasks[0].secTask;
	//старт таймера
	if (startTimer===false) {
		minusSecond(taskOrAnswer);
		startTimer=true;
		numberOfTaskP.innerHTML=`№${currentTask+1}/${tasks.length}`;
		// if (tasks[currentTask].formatAnswer!=undefined) numberOfTaskP.innerHTML+=`<br><br>Формат ответа:<br>${tasks[currentTask].formatAnswer}`;
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
	if(lang=="eng") numberOfTaskP.innerHTML=`№${currentTask+1}/${tasks.length}<br>Answer: ${tasks[currentTask].answer}`;


	pauseCounter=false;

	//старт таймера ответы
	if (startTimer===false) {
		parrent.style.background = `url(${tasks[currentTask].pict}) no-repeat center center`;
		parrent.style.backgroundSize = 'contain';
		taskOrAnswer = "secAnswer";
		sec=tasks[0][taskOrAnswer];
		startTimer=true;
		minusSecond(taskOrAnswer);
	}
}




function minusSecond(taskOrAnswer){
		startTimer= true;
		if (pauseCounter===false) {
				timerTable.innerHTML = `${addZero(Math.floor(sec/60))}:${addZero(sec%60)}`;
				if (tasks.length==currentTask) {
					textFinalWindow.innerHTML = `У вас есть ${sec} секунд, чтоб завершить уровень`;
					if (lang=="eng") textFinalWindow.innerHTML = `You have ${sec} seconds, to finish level`;
					};
				sec-- ;//если не пауза то вычитаем секунду
				if (sec<=-1) endTime=true;
		};
				
		if (!endTime) setTimeout(()=>minusSecond(taskOrAnswer),1000);

		//окончиние таймера, переключаем
	   	if (endTime) {
			endTime=false;
	   		currentTask++; 
			//у вас есть время собрать собрать бланки
	   		if (tasks.length==currentTask&&taskOrAnswer == "secTask") {
				sec = pauseAfterTask;
				if 	(taskOrAnswer != "secAnswer") {
					finalTotalWindow.style.visibility="visible";
					parrent.style.visibility="hidden";
				}
				return};

			//окончание всего уровня по ходу с заданий - собрать бланки, или окончание для сразу ответы
		   	if (tasks.length+1==currentTask) {
		   		finalTotalWindow.style.visibility="visible";
		   		parrent.style.visibility="hidden";
		   		currentTask++;
		   		numberOfTaskP.innerHTML = ``;
		   		textFinalWindow.innerHTML = "Соберите бланки с ответами и передайте их на проверку";
		   		if (lang=="eng") textFinalWindow.innerHTML = "Collect answer forms and submit them for review.";
		   		if (taskOrAnswer == "secAnswer") textFinalWindow.innerHTML = "Для выходна в основное меню нажмите соответсвующую клавишу.";
		   		if (taskOrAnswer == "secAnswer"&&lang=="eng") textFinalWindow.innerHTML = "To exit to the main menu, press the corresponding key.";

		   		return
		   	}; 

			//окончание всего уровня после ответов и после здачи бланков
			if 	(tasks.length+1==currentTask&&taskOrAnswer == "secAnswer") {
				timerTable.innerHTML = "";
				numberOfTaskP.innerHTML = ``;
					currentTask++;
				   			textFinalWindow.innerHTML = "Для выходна в основное меню нажмите соответсвующую клавишу";
				   			if (lang=="eng") textFinalWindow.innerHTML = "To exit to the main menu, press the corresponding key.";
							finalTotalWindow.style.visibility="visible";
				   			return
				   		};

			//следующее задание
			if (tasks.length>currentTask) {
				if (tasks[currentTask][taskOrAnswer] == undefined) sec= tasks[0][taskOrAnswer]
				 else sec=tasks[currentTask][taskOrAnswer];
				parrent.style.background = `url(${tasks[currentTask].pict}) no-repeat center center`;
				parrent.style.backgroundSize = 'contain';
				endTime=false;
				if 	(taskOrAnswer == "secAnswer") numberOfTaskP.innerHTML=`№${currentTask+1}/${tasks.length}<br>Ответ: ${tasks[currentTask].answer}`;
				if 	(taskOrAnswer == "secAnswer"&&lang=="eng") numberOfTaskP.innerHTML=`№${currentTask+1}/${tasks.length}<br>Answer: ${tasks[currentTask].answer}`;
				if 	(taskOrAnswer != "secAnswer") numberOfTaskP.innerHTML=`№${currentTask+1}/${tasks.length}`;
				if (taskOrAnswer != "secAnswer"&&tasks[currentTask].formatAnswer!=undefined) numberOfTaskP.innerHTML+=`<br><br>Формат ответа:<br>${tasks[currentTask].formatAnswer}`;
				if (lang=="eng"&&taskOrAnswer != "secAnswer"&&tasks[currentTask].formatAnswer!=undefined) numberOfTaskP.innerHTML+=`<br><br>Format of the answer:<br>${tasks[currentTask].formatAnswer}`;

	
			};
			minusSecond(taskOrAnswer);
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
//делаем паузу по клику
buttonPause.addEventListener("click",setPause);
//делаем паузу по пробелу
document.addEventListener("keydown", (e)=>{if(e.keyCode == 32) setPause()}, false);


function returnTaskButton(){
	  	if (currentTask!=0) {
		  	endTime=true;
		  	if (typeof tasks[currentTask-1].secTask != "number") sec= tasks[0].secTask
	  			else sec=tasks[currentTask-1].secTask;
	  		currentTask--; 
	  		currentTask--; 
		};
};		
buttonBackTask.addEventListener("click",returnTaskButton);

function forwardTaskButton(){
	if (currentTask!=tasks.length+1) sec=0;}

buttonForwardTask.addEventListener("click", forwardTaskButton);

