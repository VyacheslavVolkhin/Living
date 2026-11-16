document.addEventListener("DOMContentLoaded", function() {

	//fancybox
	Fancybox.bind("[data-fancybox]", {
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

	document.addEventListener('click', function(e) {
		const tglBtn = e.target.closest('.js-btn-tgl');
		if (tglBtn) {
			tglBtn.classList.contains('active') ? tglBtn.classList.remove('active') : tglBtn.classList.add('active')
			e.preventDefault()
			return false
		}

		const addBtn = e.target.closest('.js-btn-add');
		if (addBtn) {
			if (!addBtn.classList.contains('active')) {
				addBtn.classList.add('active');
				e.preventDefault()
				return false
			}
		}

		const tglOneBtn = e.target.closest('.js-btn-tgl-one');
		if (tglOneBtn) {
			e.preventDefault();
			let toggleButtonsWrap = tglOneBtn.closest('.js-toggle-buttons');

			if (tglOneBtn.classList.contains('active')) {
				tglOneBtn.classList.remove('active');
			} else {
				toggleButtonsWrap.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
					btn.classList.remove('active');
				});
				tglOneBtn.classList.add('active');
			}
			return false;
		}
	});


	// filter actions
	document.addEventListener('click', function(event) {
		if (event.target.closest('.js-filter-open')) {
			document.body.classList.add("filter-show");
			event.preventDefault();
		}
		if (event.target.closest('.js-filter-close')) {
			document.body.classList.remove("filter-show");
			event.preventDefault();
		}
	});

	//mask phone
	let telInputs = document.querySelectorAll('input[type="tel"]:not(.frm-field-phone input[type="tel"])');
	if (telInputs.length > 0) {
		let im = new Inputmask("+7 (999) 999-99-99");
		im.mask(telInputs);
	}

	document.addEventListener('input', function(event) {
		if (event.target.matches('input[type="tel"]') && !event.target.closest('.frm-field-phone')) {
			const phoneContainer = event.target.closest('.frm-field-input');
			if (phoneContainer) {
				const digits = event.target.value.replace(/\D/g, '');
				const isValid = digits.length === 11;
				updateValidationClass(phoneContainer, isValid);
			}
		}
	});

	document.addEventListener('input', function(event) {
		if (event.target.matches('input[type="email"]')) {
			const emailContainer = event.target.closest('.frm-field-input');
			if (emailContainer) {
				const email = event.target.value.trim();
				const isValid = validateEmail(email);
				updateValidationClass(emailContainer, isValid);
			}
		}
	});

	document.addEventListener('blur', function(event) {
		if (event.target.matches('input[type="email"]')) {
			const emailContainer = event.target.closest('.frm-field-input');
			if (emailContainer) {
				const email = event.target.value.trim();
				const isValid = validateEmail(email);
				updateValidationClass(emailContainer, isValid);
			}
		}
	}, true);

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
	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('search-show')
		document.querySelectorAll('.js-popup-wrap').forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		document.querySelectorAll('.js-btn-popup-toggle').forEach(element => {
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
	function popupElementsContentPositionClass() {
		const wrapEl = document.querySelector('.wrap')
		const wrapWidth = wrapEl ? wrapEl.offsetWidth : 0
		document.querySelectorAll('.js-popup-wrap').forEach(element => {
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

	document.addEventListener('click', function(e) {
		const toggleBtn = e.target.closest('.js-btn-popup-toggle');
		if (toggleBtn) {
			popupElementsClear()
			if (toggleBtn.classList.contains('active')) {
				toggleBtn.classList.remove('active')
			} else {
				popupElementsClose()
				toggleBtn.classList.add('active')
				if (toggleBtn.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (toggleBtn.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (toggleBtn.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			return false
		}

		const closeBtn = e.target.closest('.js-btn-popup-close');
		if (closeBtn) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			return false;
		}

		if (!e.target.closest('.js-popup-block') && !e.target.closest('.js-btn-popup-toggle')) {
			popupElementsClear()
			popupElementsClose()
		}
	});

	document.addEventListener('click', function(e) {
		const selectItem = e.target.closest('.js-popup-select .js-popup-block li a');
		if (selectItem) {
			const currentSelect = selectItem.closest('.js-popup-select');
			currentSelect.closest('.js-popup-wrap').classList.add('select-active');

			if (currentSelect.querySelector('.js-popup-block .active')) {
				currentSelect.querySelector('.js-popup-block .active').classList.remove('active');
			}

			selectItem.classList.add('active');

			let popupElementActive = currentSelect.querySelector('.js-popup-block .active').innerHTML;
			let popupElementButton = currentSelect.querySelector('.js-btn-popup-toggle');
			popupElementButton.innerHTML = '';
			popupElementButton.insertAdjacentHTML('beforeend', popupElementActive);

			popupElementsClear();
			popupElementsClose();

			if (!selectItem.closest('.js-tabs-nav')) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
		}
	});

	//js tabs
	function tabsActiveStart() {
		document.querySelectorAll('.js-tab-block').forEach(block => {
			if (block.classList.contains('active')) {
				block.classList.remove('active')
			}
		})
		document.querySelectorAll('.js-tabs-nav').forEach(nav => {
			let tabsNavElements = nav.querySelectorAll('[data-tab]')
			for (let iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					document.querySelectorAll('.js-tab-block').forEach(block => {
						if (block.dataset.tab.toString().split(' ').indexOf(tabsNavElementActive) > -1) {
							block.classList.add('active')
						}
					})
				}
			}
		})
	}

	document.addEventListener('click', function(e) {
		const tabTitle = e.target.closest('.js-tab-title');
		if (tabTitle) {
			tabTitle.classList.toggle('active')
			e.preventDefault()
			return false
		}

		const tabNav = e.target.closest('.js-tabs-nav');
		if (tabNav && e.target.closest('[data-tab]')) {
			let tabsNavElements = tabNav.querySelector('[data-tab].active')
			tabsNavElements ? tabsNavElements.classList.remove('active') : false
			e.target.closest('[data-tab]').classList.add('active')
			tabsActiveStart()
			e.preventDefault()
			return false
		}

		const activateBtn = e.target.closest('[data-tab-activate]');
		if (activateBtn) {
			const targetTab = activateBtn.dataset.tabActivate
			const targetButton = document.querySelector(`[data-tab="${targetTab}"]`)
			if (targetButton) {
				targetButton.click()
			}
			return false
		}
	});

	tabsActiveStart()


	// Popups
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
			document.querySelectorAll('.popup-outer-box').forEach(el => el.classList.remove("active"));
			const popupCurrent = openButton.getAttribute("data-popup");
			const popupElement = document.querySelector(`.popup-outer-box[id="${popupCurrent}"]`);
			if (popupElement) {
				popupElement.classList.add("active");
			}
			const timerValue = openButton.getAttribute("data-popup-timer");
			if (timerValue) {
				const timerMs = parseInt(timerValue);
				if (!isNaN(timerMs) && timerMs > 0) {
					popupTimer = setTimeout(function() {
						document.body.classList.remove("popup-open");
						document.body.classList.remove("popup-open-scroll");
						if (popupElement) popupElement.classList.remove("active");
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
			document.querySelectorAll('.popup-outer-box').forEach(el => el.classList.remove("active"));
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


		swiperEl.addEventListener("click", (e) => {
			const nextBtn = e.target.closest(".slider-button-next");
			const prevBtn = e.target.closest(".slider-button-prev");

			if (nextBtn) {
				e.preventDefault();

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

		const slidesWithLimit = swiperEl.querySelectorAll('.swiper-slide[data-count-active]');

		slidesWithLimit.forEach((slide) => {
		const limit = parseInt(slide.dataset.countActive, 10);
		const checkboxes = slide.querySelectorAll('input[type="checkbox"]');
		const nextBtn = slide.querySelector('.slider-button-next');

		if (!checkboxes.length || !nextBtn) return;

		const update = () => {
			const count = slide.querySelectorAll('input[type="checkbox"]:checked').length;
			nextBtn.classList.toggle('is-active', count <= limit);
		};

		slide.addEventListener('change', (e) => {
			if (e.target.matches('input[type="checkbox"]')) update();
		});

		update();
		});

	});
	function updateProgress(swiper, valueEl) {
		if (!valueEl) return;

		const progress = swiper.progress;
		const percentage = Math.round(progress * 100);

		valueEl.textContent = percentage + '%';
	}


	//sort field
	const sortBlocks = document.querySelectorAll('.frm-field-select.js-popup-wrap');

	sortBlocks.forEach(function (block) {
	  const popupBtn = block.querySelector('.btn-popup');
	  const popupBtnTitle = block.querySelector('.btn-popup .button-title');
	  const radioInputs = block.querySelectorAll('input[name="filter-sort"]');

	  function updatePopupTitle() {
		const checked = block.querySelector('input[name="filter-sort"]:checked');
		if (checked) {
		  const label = block.querySelector('label[for="' + checked.id + '"] .button-title');
		  if (label && popupBtnTitle) {
			popupBtnTitle.textContent = label.textContent.trim();
		  }
		}
	  }

	  if (!block.querySelector('input[name="filter-sort"]:checked') && radioInputs.length) {
		radioInputs[0].checked = true;
	  }

	  updatePopupTitle();

	  radioInputs.forEach(function (input) {
		input.addEventListener('change', function () {
		  updatePopupTitle();
		  if (popupBtn) {
			popupBtn.classList.remove('active');
		  }
		});
	  });
	});


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