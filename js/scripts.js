document.addEventListener("DOMContentLoaded", function() {

	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
		backFocus: false,
  		placeFocusBack: false,
		Carousel: {
			Thumbs: {
				type: "classic",
				Carousel: {
					center: (ref) => {
						return (
						!ref.isVertical() || ref.getTotalSlideDim() > ref.getViewportDim()
						);
					},
					vertical: false,
					breakpoints: {
						"(min-width: 1024px)": {
						vertical: true,
						},
					},
				},
			},
		},
	});

	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	let buttonsTglOne = document.querySelectorAll('.js-btn-tgl-one');
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			e.preventDefault()
			return false
		})
	}
	for (i = 0;i < addButtons.length;i++) {
		addButtons[i].addEventListener('click', function(e) {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				e.preventDefault()
				return false
			}
		})
	}
	buttonsTglOne.forEach(function(button) {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			let toggleButtonsWrap = this.closest('.js-toggle-buttons');
	
			if (this.classList.contains('active')) {
				this.classList.remove('active');
			} else {
				toggleButtonsWrap.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
					btn.classList.remove('active');
				});
				this.classList.add('active');
			}
			return false;
		});
	});


	// filter actions
	const filterButtonOpen = document.querySelector('.js-filter-open');
	const filterButtonClose = document.querySelector('.js-filter-close');
	if (filterButtonOpen) {
		filterButtonOpen.addEventListener("click", function(event) {
				document.body.classList.add("filter-show");
				event.preventDefault();
		})
	}
	if (filterButtonClose) {
		filterButtonClose.addEventListener("click", function(event) {
				document.body.classList.remove("filter-show");
				event.preventDefault();
		})
	}

	//mask phone
	let telInputs = document.querySelectorAll('input[type="tel"]:not(.frm-field-phone input[type="tel"])');
	if (telInputs.length > 0) {
		let im = new Inputmask("+7 (999) 999-99-99");
		im.mask(telInputs);
	}
    const phoneInput = document.querySelector('input[type="tel"]');
	const emailInput = document.querySelector('input[type="email"]');
    if (phoneInput) {
        const phoneContainer = phoneInput.closest('.frm-field-input');

        phoneInput.addEventListener('input', function() {
            const digits = this.value.replace(/\D/g, '');
            const isValid = digits.length === 11;
            updateValidationClass(phoneContainer, isValid);
        });
    }
    if (emailInput) {
        const emailContainer = emailInput.closest('.frm-field-input');
        
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            const isValid = validateEmail(email);
            
            updateValidationClass(emailContainer, isValid);
        });
        
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            const isValid = validateEmail(email);
            
            updateValidationClass(emailContainer, isValid);
        });
    }
	function updateValidationClass(container, isValid) {
		const input = container.querySelector('input');
		const hasValue = input.value.trim().length > 0;
		const isAutofilled = input.matches(':-webkit-autofill');
		const shouldBeVerified = isValid || isAutofilled;
		if (shouldBeVerified) {
			container.classList.add('inp-verify');
			container.classList.remove('inp-error');
			if (isAutofilled) {
				container.classList.add('inp-autofilled');
			} else {
				container.classList.remove('inp-autofilled');
			}
		} else {
			container.classList.remove('inp-verify', 'inp-autofilled');
			
			if (hasValue) {
				container.classList.add('inp-error');
			} else {
				container.classList.remove('inp-error');
			}
		}
	}
    function validateEmail(email) {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


	

	

	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')

	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		//document.body.classList.remove('filter-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (window.innerWidth < 1024) {
				if (!element.closest('.no-close-mobile') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}

			} else if  (window.innerWidth > 1023) {
				if (!element.closest('.no-close-desktop') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}
			} else {
				if (!element.closest('.no-close')) {
					element.classList.remove('active')
				}
			}
			
		})
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')

			// select phone country
			// function updatePhoneInputPlaceholder(selectElement) {
			// 	const phoneFieldWrapper = selectElement.closest('.frm-field-phone');
				
			// 	if (phoneFieldWrapper) {
			// 		const activeButton = selectElement.querySelector('.js-popup-block .active');
					
			// 		if (activeButton) {
			// 			const placeholderElement = activeButton.querySelector('.button-placeholder');
						
			// 			if (placeholderElement) {
			// 				const phoneInput = phoneFieldWrapper.querySelector('.form-input');
							
			// 				if (phoneInput) {
			// 					phoneInput.placeholder = placeholderElement.textContent;
			// 				}
			// 			}
			// 		}
			// 	}
			// }
			
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)

				//updatePhoneInputPlaceholder(element);
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					const currentSelect = this.closest('.js-popup-select');
					
					currentSelect.closest('.js-popup-wrap').classList.add('select-active');
					
					if (currentSelect.querySelector('.js-popup-block .active')) {
						currentSelect.querySelector('.js-popup-block .active').classList.remove('active');
					}
					
					this.classList.add('active');
					
					let popupElementActive = currentSelect.querySelector('.js-popup-block .active').innerHTML;
					let popupElementButton = currentSelect.querySelector('.js-btn-popup-toggle');
					popupElementButton.innerHTML = '';
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive);
					
					// updatePhoneInputPlaceholder(currentSelect);
					
					popupElementsClear();
					popupElementsClose();
					
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault();
						e.stopPropagation();
						return false;
					}
				});
			}
		}
	})
	function popupElementsContentPositionClass() {
		const wrapEl = document.querySelector('.wrap')
		const wrapWidth = wrapEl ? wrapEl.offsetWidth : 0
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (let i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			return false
		})
	}
	for (let i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block') && !event.target.closest('.js-btn-popup-toggle')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (let i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						return false
					}
				})
			}
		}
	})


	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav')
	const tabsBlocks = document.querySelectorAll('.js-tab-block')
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
	const tabsButtonContent = document.querySelectorAll('.js-tab-content')
	const tabActivateButtons = document.querySelectorAll('[data-tab-activate]')
	function tabsActiveStart() {
		for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
			if (tabsBlocks[iTab].classList.contains('active')) {
				tabsBlocks[iTab].classList.remove('active')
			}
		}
		for (i = 0; i < tabsNav.length; i++) {
			let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
			for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					for (j = 0; j < tabsBlocks.length; j++) {
						if (tabsBlocks[j].dataset.tab.toString().split(' ').indexOf(tabsNavElementActive) > -1) {
							tabsBlocks[j].classList.add('active')
						}
					}
				}
			}
		}
		
	}
	for (i = 0; i < tabsButtonTitle.length; i++) {
		tabsButtonTitle[i].addEventListener('click', function (e) {
			this.classList.toggle('active')
			e.preventDefault()
			//e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < tabsNav.length; i++) {
		tabsNav[i].addEventListener('click', function (e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active')
				tabsNavElements ? tabsNavElements.classList.remove('active') : false
				e.target.closest('[data-tab]').classList.add('active')
				tabsActiveStart()
				e.preventDefault()
				//e.stopPropagation()
				return false
			}
		})
	}
	for (i = 0; i < tabActivateButtons.length; i++) {
		tabActivateButtons[i].addEventListener('click', function (e) {
			//e.preventDefault()
			const targetTab = this.dataset.tabActivate
			const targetButton = document.querySelector(`[data-tab="${targetTab}"]`)
			if (targetButton) {
				targetButton.click()
			}
			return false
		})
	}
	tabsActiveStart()




	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box');
	let popupTimer = null;
	
	document.addEventListener("click", function(e) {
		const openButton = e.target.closest(".js-popup-open");
		if (openButton) {
			document.querySelector(".popup-outer-box")?.classList.remove("active");
			document.body.classList.add("popup-open");
			if (popupTimer) {
				clearTimeout(popupTimer);
				popupTimer = null;
			}
			for (let i = 0; i < popupsList.length; i++) {
				popupsList[i].classList.remove("active");
			}
			popupCurrent = openButton.getAttribute("data-popup");
			const popupElement = document.querySelector(`.popup-outer-box[id="${popupCurrent}"]`);
			popupElement.classList.add("active");
			const timerValue = openButton.getAttribute("data-popup-timer");
			if (timerValue) {
				const timerMs = parseInt(timerValue);
				if (!isNaN(timerMs) && timerMs > 0) {
					popupTimer = setTimeout(function() {
						document.body.classList.remove("popup-open");
						document.body.classList.remove("popup-open-scroll");
						popupElement.classList.remove("active");
						popupTimer = null;
					}, timerMs);
				}
			}
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		const closeButton = e.target.closest(".js-popup-close");
		if (closeButton) {
			if (popupTimer) {
				clearTimeout(popupTimer);
				popupTimer = null;
			}
			document.body.classList.remove("popup-open");
			for (let i = 0; i < popupsList.length; i++) {
				popupsList[i].classList.remove("active");
			}
			e.preventDefault();
			e.stopPropagation();
		}
	});
	window.openPopupMessage = function(selector) {
		const popupElement = document.querySelector(selector);
		if (!popupElement) return;
		document.body.classList.add('popup-open');
		popupElement.classList.add('active');
	};
	window.closePopup = function(popupId) {
		if (popupTimer) {
			clearTimeout(popupTimer);
			popupTimer = null;
		}
		const popupElement = document.querySelector(`.popup-outer-box[id="${popupId}"]`);
		if (popupElement) {
			popupElement.classList.remove("active");
		}
		const activePopups = document.querySelectorAll('.popup-outer-box.active');
		if (activePopups.length === 0) {
			document.body.classList.remove("popup-open");
			document.body.classList.remove("popup-open-scroll");
		}
	};

	// open popup 
	//openPopupMessage('#popup-callback');

	// close popup
	//closePopup('popup-callback');

	// document.querySelectorAll(".popup-outer-box").forEach(function (element) {
	// 	element.addEventListener("click", function (event) {
	// 		if (!event.target.closest(".popup-box")) {
	// 		if (popupTimer) {
	// 			clearTimeout(popupTimer);
	// 			popupTimer = null;
	// 		}
			
	// 		document.body.classList.remove("popup-open");
	// 		document.body.classList.remove("popup-open-scroll");
	// 		document.querySelectorAll(".popup-outer-box").forEach(function (e) {
	// 			e.classList.remove("active");
	// 		});
	// 		return false;
	// 		}
	// 	});
	// });

	//slider
	const sliderstiles = document.querySelectorAll(".slider-tiles");
	
	sliderstiles.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-tiles-pagination");
		const nextEl = container.querySelector(".button-slider-tiles-next");
		const prevEl = container.querySelector(".button-slider-tiles-prev");
	
		if (!swiperEl) return;
		const hasAutoHeight = container.dataset.height === "auto";
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			autoHeight: hasAutoHeight,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
				//type: 'progressbar',
				// renderBullet: function (index, className) {
				// 	const slideEl = this.slides[index];
				// 	const title = slideEl?.getAttribute("data-title") || index + 1;
				// 	return `<span class="${className}">${title}</span>`;
				// },
			},
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
		});
	});


	//timer
	const endDate = new Date('2026-12-29T00:00:00').getTime();
	const countdownEl = document.getElementById("countdown");

	if (countdownEl) {
		const x = setInterval(function() {
			const now = new Date().getTime();
			const distance = endDate - now;
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			if (distance < 0) {
				clearInterval(x);
				countdownEl.innerHTML = "Акция завершилась";
				return;
			}

			const zero = ' section-zero';
			countdownEl.innerHTML =
				'<span class="timer-section' + (days === 0 ? zero : '') + '"><span class="timer-section-value">' + days +
				'</span><span class="timer-section-title">д.</span></span>' +
				'<span class="timer-section' + (hours === 0 ? zero : '') + '"><span class="timer-section-value">' + hours +
				'</span><span class="timer-section-title">ч.</span></span>' +
				'<span class="timer-section' + (minutes === 0 ? zero : '') + '"><span class="timer-section-value">' + minutes +
				'</span><span class="timer-section-title">мин.</span></span>' +
				'<span class="timer-section' + (seconds === 0 ? zero : '') + '"><span class="timer-section-value">' + seconds +
				'</span><span class="timer-section-title">сек.</span></span>';
		}, 1000);
	}


	//slider photos thumbs preview
	document.querySelectorAll('.tiles-thumbs-slider-box').forEach(function(container) {
		const thumbsEl = container.querySelector('.slider-photos-thumbs .swiper');
		const mainEl = container.querySelector('.slider-photos-main .swiper');
		const nextMBtn = container.querySelector('.button-slider-photos-main-next');
		const prevMBtn = container.querySelector('.button-slider-photos-main-prev');
		const nextTBtn = container.querySelector('.button-slider-photos-thumbs-next');
		const prevTBtn = container.querySelector('.button-slider-photos-thumbs-prev');
		const mainPag = container.querySelector('.slider-photos-main-pagination');
	
		const swiperPhotosPreview = new Swiper(thumbsEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			threshold: 5,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			freeMode: false,
			navigation: {
				nextEl: nextTBtn,
				prevEl: prevTBtn,
			},
			breakpoints: {
				1024: {
				},
			},
		});
		const swiperPhotosMain = new Swiper(mainEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			threshold: 5,
			freeMode: false,
			watchSlidesProgress: true,
			navigation: {
				nextEl: nextMBtn,
				prevEl: prevMBtn,
			},
			pagination: {
				el: mainPag,
				clickable: true,
			},
			thumbs: {
				swiper: swiperPhotosPreview,
			},
		});
	});


	
	//slider test
	const sliderstest = document.querySelectorAll(".slider-test");

	sliderstest.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-test-pagination");
		const nextEl = container.querySelector(".button-slider-test-next");
		const prevEl = container.querySelector(".button-slider-test-prev");
		const valueEl = container.querySelector(".slider-pagination-value");

		if (!swiperEl) return;

		const swiper = new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: false,
				type: 'progressbar',
			},
			autoplay: false,
			navigation: false,
			simulateTouch: false,
			allowTouchMove: false,
			mousewheel: false,
			keyboard: {
				enabled: false,
			},
			on: {
				init: function() {
					updateProgress(this, valueEl);
				},
				slideChange: function() {
					updateProgress(this, valueEl);
				},
				progress: function(swiper, progress) {
					updateProgress(swiper, valueEl);
				}
			},
		});


		// Делегирование кликов: ловим клики по кнопкам внутри слайдов
		swiperEl.addEventListener("click", (e) => {
			const nextBtn = e.target.closest(".slider-button-next");
			const prevBtn = e.target.closest(".slider-button-prev");
		
			if (nextBtn) {
				e.preventDefault();
		
				// Проверяем, последний ли это слайд
				const isLastSlide = swiper.activeIndex === swiper.slides.length - 1;
		
				if (isLastSlide) {
					const pageFull = document.querySelector(".page-full");
					if (pageFull) pageFull.classList.add("results-active");
				} else {
					swiper.slideNext();
				}
			}
		
			if (prevBtn) {
				e.preventDefault();
				swiper.slidePrev();
			}
		});

		// === Проверка чекбоксов для слайдов с data-count-active ===
		const slidesWithLimit = swiperEl.querySelectorAll('.swiper-slide[data-count-active]');

		slidesWithLimit.forEach((slide) => {
		const limit = parseInt(slide.dataset.countActive, 10);
		const checkboxes = slide.querySelectorAll('input[type="checkbox"]');
		const nextBtn = slide.querySelector('.slider-button-next');

		if (!checkboxes.length || !nextBtn) return;

		const update = () => {
			const count = slide.querySelectorAll('input[type="checkbox"]:checked').length;
			// "строго больше трёх" → count > limit
			nextBtn.classList.toggle('is-active', count <= limit);
		};

		// делегирование change внутри слайда
		slide.addEventListener('change', (e) => {
			if (e.target.matches('input[type="checkbox"]')) update();
		});

		update(); // начальное состояние
		});

	});
	function updateProgress(swiper, valueEl) {
		if (!valueEl) return;
		
		const progress = swiper.progress;
		// Преобразуем в проценты (от 0 до 100)
		const percentage = Math.round(progress * 100);
		
		// Выводим процент
		valueEl.textContent = percentage + '%';
	}
	
	
})


//frm field-input
function checkInputFields() {
	const formInputs = document.querySelectorAll('.frm-field-input .form-input');
  
	formInputs.forEach(inputField => {
	  const frmFieldInput = inputField.closest('.frm-field-input');
  
	  if (inputField.value.trim() !== '') {
		frmFieldInput.classList.add('inp-active');
	  }
	});
  }
document.addEventListener('input', function(event) {
	if (event.target.closest('.frm-field-input') && event.target.classList.contains('form-input')) {
	  const inputField = event.target;
	  const frmFieldInput = inputField.closest('.frm-field-input');
  
	  if (inputField.value.length > 0) {
		frmFieldInput.classList.add('inp-active');
	  } else {
		frmFieldInput.classList.remove('inp-active');
	  }
	}
  });
  document.addEventListener('DOMContentLoaded', function() {
	checkInputFields();
  });
  