//задания на уровень
let taskName = "quiz26";
const pauseAfterTask = 30; //sec пауза после уровня на подумать

const tasks = [
 	task1 = {task:``,
			// secTask: 4,
			video:"./video/01",
			secAnswer:18,
			answer:"Ю.Лоза / Роллинг Стоунз"
		}
]			

function durationVideo(link,idx) {
  var x = document.createElement("VIDEO");
    if (x.canPlayType("video/mp4")) {
      x.setAttribute("src",link+".mp4");
    } else {
      x.setAttribute("src",link+".avi");
    }
 x.onloadedmetadata = function() {
	tasks[idx]["duration"]=Math.round(x.duration);
 } ;
};


tasks.forEach((item,i)=>{durationVideo(item.video,i)});

