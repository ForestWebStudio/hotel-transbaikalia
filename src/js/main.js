 // Селекты класический
  function select() {
    var time = 300,
        trigger = null;
    $('.select__trigger').on('click', function () {
      var drop = $(this).siblings('.select__drop');
      trigger = $(this);
      trigger.toggleClass('active');
      drop.fadeToggle(time);


      $(document).mouseup(function (e) {
        if (!trigger.is(e.target)
          && trigger.has(e.target).length === 0
          && !drop.is(e.target)
          && drop.has(e.target).length === 0) {
          trigger.removeClass('active');
          drop.fadeOut(time);
        }
      });


      $('body').on('change', '.select__drop input', function () {
        console.log(trigger);
        if ($(this).is(':checked')) {
          trigger.find('span').text($(this).siblings('label').text());
          trigger.find('span').css('color', '#087868')
        }
        trigger.removeClass('active');
        drop.fadeOut(time);
      });



    })
  }
  select();


//scroll
(function ($) {
  $(window).on('load', function () {
    $('.select__scroll').mCustomScrollbar({
      theme: "dark",
    });
  });
})(jQuery); 




//select choice of people
function selectchoice() {
  let time = 2
  let timeChildren = 0
  const js__popupuserNone = document.querySelector('.js__popup-userNone');
  const js__popupuserblock = document.querySelector('.js__popup-userblock');
  const js__popupColor = document.querySelector('.js__popup-color');

  function openClose() {
    const js__click = document.querySelector('.js__click');
    const js__popuppeople = document.querySelector('.js__popup-people');



    js__click.addEventListener('click', () => {
      js__popuppeople.classList.toggle('open')
      js__click.classList.toggle('open');
    })

    js__popuppeople.addEventListener('click', (e) => {
      e.stopPropagation();
    })

    document.addEventListener('click', (e) => {
      js__popuppeople.classList.remove('open')
      js__click.classList.remove('open');
    })
  }

  function adults() {
    const js__popupPlus = document.querySelector(".js__popup-plus");
    const js__popupAppend = document.querySelector(".js__popup-append");
    const js__popupMinus = document.querySelector(".js__popup-minus");
    const js__popupNumber = document.querySelector(".js__popup-number");
    const js__popupInputDate = document.querySelector(".js__popupInputDate");





    for (let i = 0; i < 2; i++) {
      const img = document.createElement('img');
      img.src = 'img/popup__people-green.svg'
      img.classList.add('js__popup-imgGreen')
      js__popupAppend.append(img);
    }

    for (let i = 3; i < 5; i++) {
      const img = document.createElement('img');
      img.src = 'img/popup__people.svg'
      img.classList.add('js__popup-img')
      js__popupAppend.append(img);
    }

    function minusPeople() {
      const js__popupImgGreen = js__popupAppend.querySelectorAll(".js__popup-imgGreen");

      if (js__popupImgGreen.length > 1) {
        js__popupAppend.removeChild(js__popupImgGreen[1]);
        const img = document.createElement('img');
        img.src = 'img/popup__people.svg'
        img.classList.add('js__popup-img')
        js__popupAppend.append(img);

        numberMinus()
      }
    }

    function numberMinus() {
      time--
      if (time > 1) {
        js__popupInputDate.innerHTML = `${time} взрослых`
        js__popupNumber.innerHTML = ` Взрослые: ${time}`
      } else {
        js__popupInputDate.innerHTML = `${time} взрослый`
        js__popupNumber.innerHTML = ` Взрослый: ${time}`
      }
    }

    function plusPeople() {
      const js__popupImgGreen = js__popupAppend.querySelectorAll(".js__popup-imgGreen");
      const js__popupImg = js__popupAppend.querySelector(".js__popup-img");
      if (js__popupImgGreen.length < 4) {
        const img = document.createElement('img');
        img.src = 'img/popup__people-green.svg'
        img.classList.add('js__popup-imgGreen')
        js__popupAppend.prepend(img);
        js__popupAppend.removeChild(js__popupImg);

        numberPlus();
      }
    }

    function numberPlus() {
      time++
      if (time > 1) {
        js__popupInputDate.innerHTML = `${time} взрослых`
        js__popupNumber.innerHTML = ` Взрослые: ${time}`
      } else {
        js__popupInputDate.innerHTML = `${time} взрослый`
        js__popupNumber.innerHTML = ` Взрослый: ${time}`
      }
    }


    js__popupMinus.addEventListener("click", function () {
      minusPeople();
    });

    js__popupPlus.addEventListener("click", function () {
      plusPeople();
      js__popupuserNone.style.display = 'block'
      js__popupuserblock.style.display = 'none'
      js__popupColor.style.color = '#087868'
    });
  }

  function children() {
    const js__popupPlus = document.querySelector(".js__popup-plusChildren");
    const js__popupAppend = document.querySelector(".js__popup-appendChildren");
    const js__popupMinus = document.querySelector(".js__popup-minusChildren");
    const js__popup__children = document.querySelector(".js__popup__children");
    const js__popupNumber = document.querySelector(".js__popup-numberChildren");





    for (let i = 0; i < 4; i++) {
      const img = document.createElement('img');
      img.src = 'img/popup__people.svg'
      img.classList.add('js__popup-img')
      js__popupAppend.append(img);
    }

    function numberPlus() {
      timeChildren++

      if (timeChildren > 1) {
        js__popup__children.innerHTML = `- ${timeChildren} дети`
        js__popupNumber.innerHTML = `Дети: ${timeChildren}`
      } else {
        js__popup__children.innerHTML = `- ${timeChildren} ребенок`
        js__popupNumber.innerHTML = `Ребенок: ${timeChildren}`
      }
    }

    function numberMinus() {
      timeChildren--

      if (timeChildren > 1) {
        js__popup__children.innerHTML = `- ${timeChildren} дети`
        js__popupNumber.innerHTML = `Дети: ${timeChildren}`
      } else {
        js__popup__children.innerHTML = `- ${timeChildren} ребенок`
        js__popupNumber.innerHTML = `Ребенок: ${timeChildren}`
      }
    }

    function minusPeople() {
      const js__popupImgGreen = js__popupAppend.querySelectorAll(".js__popup-imgGreen");
      const js__popupselect = document.querySelector(".select");
      if (js__popupImgGreen.length > 0) {
        js__popupAppend.removeChild(js__popupImgGreen[0]);
        const img = document.createElement('img');
        img.src = 'img/popup__people.svg'
        img.classList.add('js__popup-img')
        js__popupAppend.append(img);

        numberMinus()

        document.querySelector('.js__popup-opendselect').removeChild(js__popupselect);
        js__popupselect.classList = 'js__popup-select'
        document.querySelector('.js__popup-selectremove').appendChild(js__popupselect);
        console.log(document.querySelector('.js__popup-selectremove'));
      }
    }


    function plusPeople() {
      const js__popupImgGreen = js__popupAppend.querySelectorAll(".js__popup-imgGreen");
      const js__popupImg = js__popupAppend.querySelector(".js__popup-img");
      const js__popupselect = document.querySelector(".js__popup-select");
      if (js__popupImgGreen.length < 4) {
        const img = document.createElement('img');
        img.src = 'img/popup__people-green.svg'
        img.classList.add('js__popup-imgGreen')
        js__popupAppend.prepend(img);
        js__popupAppend.removeChild(js__popupImg);

        numberPlus();
        document.querySelector('.js__popup-opendselect').appendChild(js__popupselect);
        js__popupselect.classList = 'select'
      }
    }

    js__popupMinus.addEventListener("click", function () {
      minusPeople();
    });

    js__popupPlus.addEventListener("click", function () {
      plusPeople();
      js__popupuserNone.style.display = 'block'
      js__popupuserblock.style.display = 'none'
      js__popupColor.style.color = '#087868'
    });
  }

  function init1() {
    openClose()
    adults()
    children();
  }

  init1()

}

selectchoice()





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
const main = document.querySelector('.main');
const mainFooter = document.querySelector('.main-footer');
const headerTabletBtn = document.querySelector('.header__tablet-btn');
const tablet = document.querySelector('.tablet')

menuBtn.addEventListener('click', () => {
  menuList.classList.toggle('active')
  menuBtn.classList.toggle('active')
  main.classList.toggle('active');
  mainFooter.classList.toggle('active');
})

// left menu btn


headerTabletBtn.addEventListener('click', () => {
  tablet.classList.toggle('active')
  headerTabletBtn.classList.toggle('active')
  main.classList.toggle('active');
  mainFooter.classList.toggle('active');
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
const newsSwiper = new Swiper(".news__items", {
  slidesPerView: 3,
  spaceBetween: 20,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".news-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".news-btn__next",
    prevEl: ".news-btn__prev",
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 0
    },
    // when window width is >= 767px
    767: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 1499px
    1499: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});

// trust slider
const trustSwiper = new Swiper(".trust__items", {
  slidesPerView: 5,
  spaceBetween: 0,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".trust__pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".trust__btn-next",
    prevEl: ".trust__btn-prev",
  },
  autoplay: {
    delay: 2000,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 0
    },
    // when window width is >= 767px
    767: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    // when window width is >= 1499px
    1499: {
      slidesPerView: 5,
      spaceBetween: 20
    }
  }
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

        const popupCurent = document.querySelector(`[data-popup="${popup__name}"]`);
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

        if (popupContent) {
            popupContent.addEventListener('click', (e) => {
                e.stopPropagation();
            })
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




$(function () {
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
        if (input) {
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
        if (inst._prevOnSelectValue) {
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

});




// hero slider

const heroSwiper = new Swiper(".hero__items", {
  slidesPerView: 1,
  spaceBetween: 0,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  autoplay: {
    delay: 4000,
  },
  navigation: {
    nextEl: ".hero__btn-next",
    prevEl: ".hero__btn-prev",
  },
});

// Обрезка текста у новостей

Ellipsis({
  ellipsis: '…',
  debounce: 300,
  responsive: true,
  className: '.news__item h4',
  lines: 3,
  portrait: null,
  break_word: false
});

Ellipsis({
  ellipsis: '…',
  debounce: 300,
  responsive: true,
  className: '.news__item p',
  lines: 5,
  portrait: null,
  break_word: false
});


// анимация
AOS.init();


new AirDatepicker('#booking-from')
new AirDatepicker('#booking-to')

// niceselect

$(document).ready(function () {
    $('select').niceSelect();
});

const quests = document.querySelector('.booking__quests input')
const questsModal = document.querySelector('.quests')

quests.addEventListener('click', () => {
    questsModal.classList.toggle('active')
})
