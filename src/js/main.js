// lang btns
const langBtns = document.querySelectorAll('.lang__list-item');

langBtns.forEach(langBtn => {
    langBtn.addEventListener('click', () => {
        langBtns.forEach(item => {
            item.classList.remove('active');
        })
        langBtn.classList.add('active');
    });
})

// mobaile menu btn
const menuBtn = document.querySelector('.header__menu-btn');
const menuList = document.querySelector('.header__inner');

menuBtn.addEventListener('click', () => {
    menuList.classList.toggle('active')
    menuBtn.classList.toggle('active')
})



//map
function init() {
    let map = new ymaps.Map('contacts__map', {
        center: [52.01422807206773, 113.50540599999987],
        zoom: 17
    })

    let placemark = new ymaps.Placemark([52.0142413122434, 113.50536308465566], {}, {
        iconLayout: 'default#image',
        iconImageHref: '../img/marker.png',
        iconImageSize: [62, 74],
        iconImageOffset: [-35, -80]
    })

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

    map.geoObjects.add(placemark)
}


ymaps.ready(init);

// left menu btn
const headerTabletBtn = document.querySelector('.header__tablet-btn');
const tablet = document.querySelector('.tablet')

headerTabletBtn.addEventListener('click', () => {
    tablet.classList.toggle('active')
    headerTabletBtn.classList.toggle('active')
})


//room slider
const room__swiper = new Swiper('.room__swiper-container', {
    // Optional parameters
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 3000,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    // Navigation arrows
    navigation: {
        nextEl: '.room__swiper-button-next',
        prevEl: '.room__swiper-button-prev',
    }

});

const body = document.querySelector('body')

if (body.clientWidth <= 570) {
    room__swiper.autoplay.start()
} else {
    room__swiper.autoplay.stop()
}


//news slider
const swiper = new Swiper(".news__items", {
    slidesPerView: 3,
    spaceBetween: 20,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


//popup
const js__popupClick = document.querySelectorAll('.popup__click');
const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px'; //Получили ширину scrolla




for (let i = 0; i < js__popupClick.length; i++) {
  js__popupClick[i].addEventListener('click', (e) => {
    e.stopPropagation();
    const popup__name = js__popupClick[i].dataset.modal;

    const popupCurent = document.querySelector(`[data-popup="${popup__name}"]`);
    const calendar = document.querySelectorAll('.datepicker')
    const popupContent = popupCurent.querySelector('.js__popup-content');
    const popup__close = popupCurent.querySelector('.popup__close');
    

    add(popupCurent, body);

    function popupRemove() {
      remove(popupCurent);

      setTimeout(() => {
        remove(body);
        body.style.paddingRight = '0px';
      }, 400);
    }


    document.addEventListener('click', (e) => {
      popupRemove();
    });

    popup__close.addEventListener('click', () => {
      popupRemove();
    });


    if (popupContent) {
      popupContent.addEventListener('click', (e) => {
        e.stopPropagation();
     })

     for (let i = 0; i < calendar.length; i++) {
      calendar[i].addEventListener('click', (e) => {
        e.stopPropagation();
      })
     }
    }

    body.style.paddingRight = lockPaddingValue;

  })
};



function add(...js__popupAdd) {
  for (let i = 0; i < js__popupAdd.length; i++) {
    js__popupAdd[i].classList.add('open');
  }
}

function remove(...js__popupRemove) {
  for (let i = 0; i < js__popupRemove.length; i++) {
    js__popupRemove[i].classList.remove('open');
  }
}



$(function() {
  const js__label = document.querySelectorAll('.js__label');

  
  js__label.forEach(function (js__label) {
    const input = js__label.querySelector('.calendar');
    const popup__calendar = js__label.querySelector('.popup__calendar');
    const js__calendarcheck = js__label.querySelector('.js__calendar-check');


      js__label.addEventListener('click', () => {
        js__label.classList.add('open')
      })

      document.addEventListener('click', function (e) {
        if (!js__label.contains(e.target)) {
          js__label.classList.remove('open')
          if(input) {
            input.classList.remove('active');
          }
          popup__calendar.style.display = 'block';
          js__calendarcheck.style.display = 'none';
        }
      });
   
 
 
  



  /*$.fn.datepicker.language['en'] =  {
          days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          daysShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
          daysMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
          months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
          monthsShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          today: 'Today',
          clear: 'Clear',
          dateFormat: 'yyyy/dd/mm',
          timeFormat: 'hh:ii',
          firstDay: 0
      };*/

  $(input).datepicker({
    // multipleDates: 2,
    // multipleDatesSeparator: ' - ',
    // minDate: new Date(),
    language: 'ru',
    // dateFormat: 'yyyy-mm-dd',
    // firstDay: 0,
    /*toggleSelected: false,
    range: true,
    timepicker: true,
    minHours: 9,
    maxHours: 17,
    minutesStep: 5,*/
    // view: 'months',
    clearButton: false,
    onSelect(formattedDate, date, inst) {
      inst.hide();
      if(inst._prevOnSelectValue) {
          input.classList.add('active');
          popup__calendar.style.display = 'none';
          js__calendarcheck.style.display = 'block';
      } 
      // alert(date);
    },
    altField: $('#alt'),
    altFieldDateFormat: 'yyyy-mm-dd',
    position: 'bottom left'
  });
})



/* 
//количество гостей
const js__click = document.querySelector('.js__click');
const js__popuppeople = document.querySelector('.js__popup-people');
const js__popuplus = document.querySelector('.js__popup-plus');
const js__popupAppend = document.querySelector('.js__popup-append');
const img = document.createElement('img');






js__click.addEventListener('click', () => {
  js__popuppeople.classList.toggle('open')
})

js__popuplus.addEventListener('click', () => {
 
}) */



});



