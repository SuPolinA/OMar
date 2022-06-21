(function(){
    'use strict';
    function trackScroll(){
     var scrolled=window.pageYOffset;
     var coords=document.documentElement.clientHeight;
     if(scrolled>coords){
         goTopBtn.classList.add('app');
     }
     if(scrolled<coords){
         goTopBtn.classList.remove('app');
     }
 }
   function backToTop(){
       if(window.pageYOffset>0){
           window.scrollBy(0,-80);
           setTimeout(backToTop,0);
       }
   }

var goTopBtn = document.querySelector('.app');
 window.addEventListener('scroll',trackScroll);
 goTopBtn.addEventListener('click',backToTop);
});

function validateForm(){
    var x=document.forms["form"]["email"].value;
    if (x!=document.forms["form"]["email"].value){
        alert("Адрес электронной почты должен содержать @");
        return false;
    }
};

$('.cont1').cont1({
    heightStyle:'content'
});


function tip (tipOn, event) {
	var tipText = document.getElementById("theTip"); // id соответствует, указанному в "непонятная фраза";
	var tipOn = document.getElementById("tipOn"); // id подсказки;
	tipOn.appendChild(tipText);
    if (document.addEventListener) {
		tipOn.addEventListener("mouseover",showTip,true);
		tipOn.addEventListener("mouseout",hideTip,true);
	};
    else if (document.attachEvent) {
		tipOn.setCapture();
		tipOn.attachEvent("onmouseover", showTip);
		tipOn.attachEvent("onmouseout", hideTip);
	};

	if (event.stopPropagation) event.stopPropagation();
	else event.cancelBubble=true;

	if (event.preventDefault) event.preventDefault();
	else event.returnValue=false;
    function showTip (e) {
		if (!e) e = window.event;
		tipText.style.display = "block";
		tipText.style.left = e.clientX;//положение подсказки по оси X, в данном случае совпадает с положением курсора
		tipText.style.top = e.clientY + 5 + "px";//положение подсказки по оси Y. Задан отступ от курсора в 5 px.
		tipOn.style.cursor = "help";//при наведении на фразу рядом с курсором появляется знак вопроса
	}

	function hideTip (e) {
		if (!e) e = window.event;
		tipText.style.display = "none";
        if (document.removeEventListener) {

			document.removeEventListener("mouseover", showTip, true);
			document.removeEventListener("mouseout", hideTip, true);

		} else if (document.detachEvent) {

			tipOn.detachEvent("onlosecapture", showTip);
			tipOn.detachEvent("onmouseover", showTip);
			tipOn.detachEvent("onmouseout", hideTip);
			tipOn.releaseCapture();

		}

		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;
	}
};

let tooltipElem;
document.onmouseover = function(event) {
    let target = event.target;
    // если у нас есть подсказка...
    let tooltipHtml = target.dataset.tooltip;
    if (!tooltipHtml) return;
    // ...создадим элемент для подсказки
    tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = tooltipHtml;
    document.body.append(tooltipElem);
  // спозиционируем его сверху от аннотируемого элемента (top-center)
  let coords = target.getBoundingClientRect();
  let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 0; // не заезжать за левый край окна
  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
    top = coords.top + target.offsetHeight + 5;
  }
  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';
};
document.onmouseout = function(e) {
  if (tooltipElem) {
    tooltipElem.remove();
    tooltipElem = null;
  }
};