$( "#datepicker" ).datepicker();
$( "#datepicker1" ).datepicker();


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

