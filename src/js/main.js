
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