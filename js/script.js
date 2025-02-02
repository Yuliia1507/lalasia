"use strict"


document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}
}

const icons = document.querySelectorAll('.icon-menu');
icons.forEach(icon => {
	icon.addEventListener('click', (event) => {
		icon.classList.toggle("active");
	});
});

const swiper = new Swiper(".product__swiper", {
	spaceBetween: 29,
	loop: true,
	loopedSlides: 9,        // Кількість слайдів для безшовного циклу
	centeredSlides: true,
	autoplay: true,
	navigation: {
		nextEl: ".button-next",
		prevEl: ".button-prev",
	},
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1.3,
			spaceBetween: 20
		},

		650: {
			slidesPerView: 2.1,
			spaceBetween: 15
		},
		1000: {
			slidesPerView: 3,
			spaceBetween: 15
		},
		1200: {
			slidesPerView: 3.5,
			spaceBetween: 29
		},
		1400: {
			slidesPerView: 4,
			spaceBetween: 29
		},

	},

});

document.addEventListener('scroll', function () {
	const header = document.querySelector('.header');
	if (window.scrollY > 0) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
});

document.addEventListener("DOMContentLoaded", function () {
	const counters = document.querySelectorAll('.item-counter__number'); // Вибираємо всі елементи лічильника

	function startCounting(counter) {
		const start = parseInt(counter.getAttribute('data-start'));
		const end = parseInt(counter.getAttribute('data-end'));
		const duration = 2000; // Тривалість анімації в мілісекундах
		const isPlusNeeded = counter.textContent.includes('+'); // Перевіряємо, чи є "+" в початковому значенні
		let current = start;
		const increment = (end - start) / (duration / 50); // Крок збільшення (кожні 50 мс)

		function updateCounter() {
			if (current < end) {
				current += increment;
				counter.textContent = Math.round(current); // Оновлюємо значення без "+"
				setTimeout(updateCounter, 50); // Повторюємо кожні 50 мс
			} else {
				// Якщо "+" потрібен, додаємо його, якщо ні — не додаємо
				counter.textContent = isPlusNeeded ? end + "+" : end;
			}
		}

		updateCounter(); // Запускаємо анімацію лічильника
	}

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					startCounting(entry.target); // Запускаємо анімацію
					observer.unobserve(entry.target); // Прибираємо спостереження після запуску
				}
			});
		},
		{
			threshold: 0.5, // Елемент має бути хоча б наполовину видимим
		}
	);

	counters.forEach(counter => {
		observer.observe(counter); // Додаємо спостереження для кожного лічильника
	});
});



// Знаходимо всі елементи рейтингу
const ratingElements = document.querySelectorAll('.slide-testimonials__rating');

// Проходимося по кожному елементу
ratingElements.forEach((ratingElement) => {
	// Отримуємо значення з data-атрибута
	const ratingValue = ratingElement.dataset.rating;

	// Знаходимо span і встановлюємо значення
	const ratingSpan = ratingElement.querySelector('.rating__value');
	if (ratingSpan) {
		ratingSpan.textContent = ratingValue;
	}
});


const testimonialsSwiper = new Swiper(".testimonials__swiper", {
	spaceBetween: 30,
	loop: true,
	loopedSlides: 6,
	slidesPerView: 3,
	autoplay: true,
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},


		600: {
			slidesPerView: 2,
			spaceBetween: 15
		},
		1000: {
			slidesPerView: 3,
			spaceBetween: 29
		},
		1400: {
			slidesPerView: 4,
			spaceBetween: 29
		},

	},

});


document.addEventListener("DOMContentLoaded", () => {
	const slides = document.querySelectorAll(".item-article");
	const prevButton = document.querySelector(".article__btn--prev");
	const nextButton = document.querySelector(".article__btn--next");

	let currentIndex = 0;

	function updateSlides(newIndex) {
		slides.forEach((slide, index) => {
			slide.classList.remove("active");
			if (index === newIndex) {
				slide.classList.add("active");
			}
		});
	}

	function showNextSlide() {
		currentIndex = (currentIndex + 1) % slides.length;
		updateSlides(currentIndex);
	}

	function showPrevSlide() {
		currentIndex = (currentIndex - 1 + slides.length) % slides.length;
		updateSlides(currentIndex);
	}

	if (nextButton) nextButton.addEventListener("click", showNextSlide);
	if (prevButton) prevButton.addEventListener("click", showPrevSlide);

	setInterval(showNextSlide, 5000);
});




document.addEventListener('DOMContentLoaded', () => {
	const animation = document.querySelector('.animation');

	function updateAnimationPosition() {
		const windowWidth = window.innerWidth;
		const activeLink = document.querySelector('.menu__link.active');

		if (windowWidth >= 960) {
			if (activeLink) {
				const rect = activeLink.getBoundingClientRect();
				const headerRect = document.querySelector('header').getBoundingClientRect();

				// Використовуємо requestAnimationFrame для плавного оновлення позиції
				requestAnimationFrame(() => {
					animation.style.left = `${rect.left - headerRect.left}px`;
					animation.style.width = `${rect.width}px`; // Змінено для відповідності ширині посилання
					animation.classList.add('show');
				});
			} else {
				animation.classList.remove('show');
			}
		} else {
			animation.classList.remove('show');
		}
	}

	// Оновлюємо позицію після завантаження всіх ресурсів
	window.addEventListener('load', () => {
		setTimeout(updateAnimationPosition, 200); // Збільшена затримка для повного завантаження стилів та ресурсів
	});

	// Оновлюємо позицію при зміні розміру вікна
	window.addEventListener('resize', () => {
		requestAnimationFrame(updateAnimationPosition);
	});

	// Динамічне перемикання активного пункту меню
	document.querySelectorAll('.menu__link').forEach(link => {
		link.addEventListener('click', () => {
			document.querySelectorAll('.menu__link').forEach(l => l.classList.remove('active'));
			link.classList.add('active');

			// Використовуємо тайм-аут для коректного оновлення анімації
			setTimeout(updateAnimationPosition, 50);
		});
	});
});

// let arrow = document.getElementById("arrow");

// console.log(arrow.getTotalLength());

document.addEventListener('DOMContentLoaded', function () {
	const heroSwiper = new Swiper('.hero__swiper', {
		loop: true,
		autoplay: true,
		spaceBetween: 10,
		slidesPerView: 1,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: '.hero__button-next',
			prevEl: '.hero__button-prev',
		},
	});
});


document.addEventListener("DOMContentLoaded", () => {
	const sortBy = document.querySelector(".sort-by");

	// Тихо завершуємо виконання, якщо елемент не знайдено
	if (!sortBy) return;

	const dropdown = sortBy.querySelector(".sort-by__dropdown");
	const span = sortBy.querySelector("span");

	// Перевірка вкладених елементів
	if (!dropdown || !span) return;

	// Відкриття/закриття меню при кліку на "Sort by"
	sortBy.addEventListener("click", (e) => {
		e.stopPropagation(); // Запобігаємо закриттю при кліку на сам блок
		sortBy.classList.toggle("active");
	});

	// Вибір елемента з меню
	dropdown.addEventListener("click", (e) => {
		if (e.target.tagName === "LI") { // Перевіряємо, що клік саме по <li>
			const selectedValue = e.target.getAttribute("data-value");
			span.textContent = e.target.textContent; // Оновлення тексту заголовка
			sortBy.classList.remove("active"); // Закриваємо меню
			console.log("Selected:", selectedValue); // Лог для перевірки
		}
		e.stopPropagation(); // Запобігаємо виклику події закриття при кліку поза меню
	});

	// Закриття меню при кліку поза ним
	document.addEventListener("click", () => {
		sortBy.classList.remove("active");
	});
});



document.addEventListener('DOMContentLoaded', function () {
	const itemsPerPage = 9; // Кількість елементів на сторінці
	let currentPage = 1;
	const items = document.querySelectorAll('.total-product__item');
	const paginationLinks = document.querySelectorAll('.pagination__link');
	const productWrap = document.querySelector('.total-product__wrap'); // Контейнер продуктів
	const prevArrow = document.querySelector('.pagination__arrow--prev');
	const nextArrow = document.querySelector('.pagination__arrow--next');

	// Перевірка наявності необхідних елементів
	if (!productWrap || items.length === 0 || paginationLinks.length === 0) {
		return;
	}

	// Оновлення видимості продуктів та активного елементу пагінації
	function updatePagination(page) {
		const start = (page - 1) * itemsPerPage;
		const end = page * itemsPerPage;

		// Показуємо тільки продукти поточної сторінки
		items.forEach((item, index) => {
			if (index >= start && index < end) {
				item.classList.add('visible');
			} else {
				item.classList.remove('visible');
			}
		});

		// Оновлюємо активний стан для посилань пагінації
		paginationLinks.forEach(link => {
			link.classList.remove('active');
			if (parseInt(link.textContent) === page) {
				link.classList.add('active');
			}
		});

		// Оновлюємо доступність кнопок-стрілок
		prevArrow.disabled = page === 1;
		nextArrow.disabled = page === Math.ceil(items.length / itemsPerPage);
	}

	// Обробка кліку по стрілках
	prevArrow?.addEventListener('click', function () {
		if (currentPage > 1) {
			currentPage--;
			updatePagination(currentPage);
			scrollToTop();
		}
	});

	nextArrow?.addEventListener('click', function () {
		if (currentPage < Math.ceil(items.length / itemsPerPage)) {
			currentPage++;
			updatePagination(currentPage);
			scrollToTop();
		}
	});

	// Обробка кліку по посиланнях пагінації
	paginationLinks.forEach(link => {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			currentPage = parseInt(link.textContent);
			updatePagination(currentPage);
			scrollToTop();
		});
	});

	// Функція плавної прокрутки до контейнера продуктів
	function scrollToTop() {
		const headerHeight = document.querySelector('.header')?.offsetHeight || 0; // Висота фіксованого хедера
		window.scrollTo({
			top: productWrap.offsetTop - headerHeight - 100, // Відступ на висоту хедера і додатковий простір
			behavior: 'smooth' // Плавна прокрутка
		});
	}

	// Ініціалізація
	updatePagination(currentPage);
});




document.addEventListener('DOMContentLoaded', () => {
	const articles = document.querySelectorAll('.topics__info');
	const loadMoreButton = document.querySelector('.topics__button');
	const navLinks = document.querySelectorAll('.header-topics__link');
	let visibleCount = 3; // Початкове число видимих статей для кожної категорії
	let allVisible = false; // Чи всі статті відображені
	let currentCategory = 'All'; // Поточна категорія

	// Функція для оновлення видимих статей
	const updateArticlesVisibility = () => {
		let visibleArticles = 0;
		let totalArticlesInCategory = 0; // Лічильник статей в поточній категорії

		articles.forEach((article, index) => {
			const articleCategory = article.getAttribute('data-category').trim().toLowerCase();

			if (
				currentCategory === 'All' || // Якщо категорія "All", показуємо всі
				articleCategory === currentCategory.toLowerCase() // Якщо категорія статті збігається з поточною
			) {
				totalArticlesInCategory++; // Збільшуємо лічильник для поточної категорії

				if (visibleArticles < visibleCount) {
					article.style.display = 'flex';
					visibleArticles++;
				} else {
					article.style.display = 'none';
				}
			} else {
				article.style.display = 'none';
			}
		});

		// Оновлення стану кнопки
		const hiddenArticles = Array.from(articles).filter(
			(article) =>
				(article.getAttribute('data-category').trim().toLowerCase() === currentCategory.toLowerCase() ||
					currentCategory === 'All') &&
				article.style.display === 'none'
		);

		// Якщо кнопка існує, оновлюємо її стан
		if (loadMoreButton) {
			// Якщо кількість статей в категорії менше 3, приховуємо кнопку
			if (totalArticlesInCategory < 3) {
				loadMoreButton.style.display = 'none';
			} else {
				// Оновлення тексту кнопки в залежності від стану видимих статей
				if (hiddenArticles.length > 0) {
					loadMoreButton.textContent = 'Load more';
					allVisible = false;
				} else {
					loadMoreButton.textContent = 'Hide all';
					allVisible = true;
				}
				loadMoreButton.style.display = 'block'; // Показуємо кнопку, якщо статей 3 або більше
			}
		}
	};

	// Ініціалізація: показуємо перші три статті для кожної категорії
	updateArticlesVisibility();

	// Обробник кнопки "Load more" або "Hide all"
	if (loadMoreButton) {
		loadMoreButton.addEventListener('click', () => {
			if (allVisible) {
				// Ховаємо всі статті, крім перших трьох
				visibleCount = 3;
				allVisible = false;
				updateArticlesVisibility();
			} else {
				// Показуємо один новий елемент
				visibleCount++;
				updateArticlesVisibility();
			}
		});
	}

	// Обробник для посилань категорій
	navLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const category = link.textContent.trim();

			if (category.toLowerCase() !== currentCategory.toLowerCase()) {
				currentCategory = category;
				visibleCount = 3; // Початково показуємо по 3 статті для нової категорії
				allVisible = false;

				// Змінюємо активний клас
				navLinks.forEach((link) => link.classList.remove('active'));
				link.classList.add('active');

				// Оновлюємо видимість статей
				updateArticlesVisibility();
			}
		});
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const video = document.getElementById("videoPlayer");
	const playButton = document.querySelector(".video__button");

	// Перевіряємо наявність елементів
	if (!video || !playButton) return;

	// При кліку на кнопку "Play"
	playButton.addEventListener("click", () => {
		video.play(); // Запускаємо відео
		playButton.style.opacity = "0"; // Приховуємо кнопку
		playButton.style.pointerEvents = "none"; // Вимикаємо кліки по кнопці
	});

	// Показуємо кнопку при паузі
	video.addEventListener("pause", () => {
		playButton.style.opacity = "1";
		playButton.style.pointerEvents = "auto";
	});

	// При відтворенні приховуємо кнопку
	video.addEventListener("play", () => {
		playButton.style.opacity = "0";
		playButton.style.pointerEvents = "none";
	});
});




const titleElement = document.querySelector(".cta__title"); // Перевірте, щоб клас був правильним

if (titleElement) { // Перевірка на наявність елемента
	const text = titleElement.textContent.trim(); // Отримуємо текст з елемента
	titleElement.textContent = ''; // Очищаємо текст

	const speed = 100; // Швидкість друку в мілісекундах
	let i = 0;

	function typeWriter() {
		if (i < text.length) {
			titleElement.textContent += text.charAt(i); // Додаємо по одному символу
			i++;
			setTimeout(typeWriter, speed); // Викликаємо рекурсивно
		}
	}

	// Опції для Intersection Observer
	const options = {
		threshold: 0.5 // Спрацьовує, коли елемент буде на 50% видимий
	};

	// Створення нового спостерігача
	const typingObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				typeWriter(); // Почати анімацію друку при видимості елемента
				typingObserver.unobserve(entry.target); // Зупинити спостереження після початку анімації
			}
		});
	}, options);

	// Спостерігаємо за елементом
	typingObserver.observe(titleElement);
}

document.addEventListener('DOMContentLoaded', () => {
	const title = document.querySelector('.hero__title');
	const text = document.querySelector('.hero__text');

	// Перевірка наявності елементів
	if (title) {
		setTimeout(() => {
			title.classList.add('visible');
		}, 300);
	}

	if (text) {
		setTimeout(() => {
			text.classList.add('visible');
		}, 1000);
	}
});

document.addEventListener('DOMContentLoaded', () => {
	const image = document.querySelector('.hero__image img');

	// Перевірка наявності елемента
	if (image) {
		setTimeout(() => {
			image.classList.add('visible');
		}, 500); // Картинка з'являється через 0.5 секунди
	}
});

document.addEventListener('DOMContentLoaded', () => {
	const image = document.querySelector('.hero__image img');
	const searchBar = document.querySelector('.hero__search-bar');

	// Перевірка наявності елементів
	if (image) {
		setTimeout(() => {
			image.classList.add('visible');
		}, 300); // Картинка з'являється через 0.3 секунди
	}

	if (searchBar) {
		setTimeout(() => {
			searchBar.classList.add('visible');
		}, 1400); // Пошук з'являється через 1.4 секунди
	}
});


document.addEventListener("DOMContentLoaded", function () {
	const hiddenElements = document.querySelectorAll('.title, .label,.article__info, .benefits__item,.benefits__text, .service__item, .portfolio__right, .portfolio__item, .news__info, .topics__info, .mission__item, .team__item, .team__text, .hero__video, .our-product__left-img, .our-product__right-img, .hero__info');

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.2 });

	hiddenElements.forEach(element => {
		observer.observe(element);
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const items = document.querySelectorAll('.total-product__item');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('active');
			}
		});
	});

	items.forEach(item => observer.observe(item));
});
