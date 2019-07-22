    var updownElem = document.getElementById('updown');
    var pageYLabel = 0;

  var innerHeight = document.documentElement.clientHeight;
  var listOfTasksHight= document.querySelector(".listOfTasks").clientHeight;

    var scroll = window.scrollY;

console.log(document.documentElement.scrollHeight, document.documentElement.clientHeight);

//старотвая позиция скроллинговой кнопки
if (document.documentElement.scrollHeight!=document.documentElement.clientHeight) {
    	updownElem.style.display="block";
    	updownElem.className="down";
    	console.log(document.documentElement.scrollHeight, document.documentElement.clientHeight);
};
//убрать-показать скроллинговой кнопки при изменении масштаба
window.onresize = function(){
if (document.documentElement.scrollHeight!=document.documentElement.clientHeight) {
      updownElem.style.display="block";
      updownElem.className="down";
      console.log(document.documentElement.scrollHeight, document.documentElement.clientHeight);
}
else
  updownElem.style.display="none";
};

//скроллинговая кнопка
window.addEventListener("scroll", function (event) {

     console.log("scrollHeight,scrollTop,clientHeight", document.documentElement.scrollHeight, document.documentElement.scrollTop, document.documentElement.clientHeight);
     console.log(document.documentElement.scrollHeight,document.documentElement.scrollTop+document.documentElement.clientHeight)
    if (document.documentElement.scrollHeight<1+document.documentElement.scrollTop+document.documentElement.clientHeight) {
    	updownElem.style.display="block";
    	updownElem.className="up";
    	console.log('updownElem.className',updownElem)
    	};

    if (document.documentElement.scrollTop==0) {
    	updownElem.className="down";
    	console.log('updownElem.className',updownElem)

    };
		});


updownElem.onclick = function() {
  switch (this.className) {
    case 'up':
      window.scrollTo(0, 0);
      this.className = 'down';
      break;

    case 'down':
      window.scrollTo(0, document.documentElement.scrollHeight);
      this.className = 'up';
  }

}