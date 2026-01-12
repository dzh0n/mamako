$(document).ready(function () {

    wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true
    })
    wow.init();


    $(".mask-phone").mask("+ 7 (A00) 000 - 00 - 00", {
        clearIfNotMatch: true,
        'translation': {A: {pattern: /[1,2,3,4,5,6,9]/}, 0: {pattern: /[0-9]/}}
    });

    // Product Gallery Swiper
    if (document.querySelector('.product-gallery__thumbs') && document.querySelector('.product-gallery__main')) {
        const thumbsSwiper = new Swiper('.product-gallery__thumbs', {
            spaceBetween: 12,
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesProgress: true,
            direction: 'vertical',
        });

        const mainSwiper = new Swiper('.product-gallery__main', {
            spaceBetween: 0,
            thumbs: {
                swiper: thumbsSwiper,
            },
            on: {
                init: function() {
                    updateProductGalleryProgress(this.activeIndex, this.slides.length);
                },
                slideChange: function() {
                    updateProductGalleryProgress(this.activeIndex, this.slides.length);
                }
            }
        });

        // Update progress bar manually
        function updateProductGalleryProgress(activeIndex, totalSlides) {
            const progressBar = document.querySelector('.product-gallery__progress-bar');
            if (progressBar) {
                const progress = ((activeIndex + 1) / totalSlides) * 100;
                progressBar.style.width = progress + '%';
            }
        }
    }

    // Section Mom Accordion
    const accordionHeaders = document.querySelectorAll('.section-mom__accordion-header');
    accordionHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            const item = this.closest('.section-mom__accordion-item');
            const content = item.querySelector('.section-mom__accordion-content');
            const isActive = this.classList.contains('active');
            
            // Закрываем все аккордеоны
            accordionHeaders.forEach(function(h) {
                h.classList.remove('active');
                h.closest('.section-mom__accordion-item').querySelector('.section-mom__accordion-content').classList.remove('active');
            });
            
            // Открываем текущий, если он был закрыт
            if (!isActive) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });

    // Doctor Section Swiper
    if (document.querySelector('.section-doctor__main')) {
        let doctorSwiper;
        
        // Initialize thumbs swiper first
        const thumbsSwiper = new Swiper('.section-doctor__thumbs-swiper', {
            slidesPerView: 'auto',
            centeredSlides: true,            
            spaceBetween: 12,
            slideToClickedSlide: true,
            watchSlidesProgress: true,
            freeMode: false,
            loop: false,
            initialSlide: 2,
            on: {
                init: function() {
                    // Центрируем третий слайд при инициализации
                    this.slideTo(2, 0);
                }
            }
        });

        // Initialize main swiper
        doctorSwiper = new Swiper('.section-doctor__main', {
            spaceBetween: 0,
            slidesPerView: 1,
            speed: 500,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            initialSlide: 2,
            thumbs: {
                swiper: thumbsSwiper,
            },
            on: {
                slideChange: function() {
                    const activeIdx = this.activeIndex;
                    updateDoctorProgress(activeIdx, this.slides.length);
                    // Синхронизируем позицию миниатюр с основным слайдером и центрируем активный
                    if (thumbsSwiper && thumbsSwiper.slideTo) {
                        // Используем небольшую задержку для гарантированного центрирования
                        setTimeout(function() {
                            thumbsSwiper.slideTo(activeIdx, 300);
                        }, 50);
                    }
                }
            }
        });

        // Добавляем обработчик свайпа миниатюр после инициализации обоих слайдеров
        thumbsSwiper.on('slideChange', function() {
            // Синхронизируем основной слайдер при свайпе миниатюр
            if (doctorSwiper && doctorSwiper.slideTo) {
                doctorSwiper.slideTo(this.activeIndex, 500);
            }
            // Принудительно центрируем активный слайд
            if (this.slideTo) {
                this.slideTo(this.activeIndex, 0);
            }
        });

        // Обработчик для принудительного центрирования при любом изменении
        thumbsSwiper.on('transitionEnd', function() {
            // Убеждаемся, что активный слайд по центру после завершения анимации
            if (this.activeIndex !== undefined) {
                this.slideTo(this.activeIndex, 0);
            }
        });

        // Update progress bar
        function updateDoctorProgress(activeIndex, totalSlides) {
            const progressBar = document.querySelector('.section-doctor__progress-bar');
            if (progressBar) {
                const progress = ((activeIndex + 1) / totalSlides) * 100;
                progressBar.style.width = progress + '%';
            }
        }

        // Click on thumbnails
        const thumbItems = document.querySelectorAll('.section-doctor__thumb-item');
        thumbItems.forEach(function(item) {
            item.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'), 10);
                doctorSwiper.slideTo(slideIndex);
            });
        });

        // Initialize - центрируем третий слайд
        setTimeout(function() {
            if (thumbsSwiper && thumbsSwiper.slideTo) {
                thumbsSwiper.slideTo(2, 0);
            }
            updateDoctorProgress(2, doctorSwiper.slides.length);
        }, 100);
    }

    // Instruction Section Swiper
    if (document.querySelector('.section-instruction__slider')) {
        const instructionSwiper = new Swiper('.section-instruction__slider', {
            slidesPerView: 1.1,
            spaceBetween: 12,
            speed: 500,
            breakpoints: {
                768: {
                    slidesPerView: 1.2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                },
                1280: {
                    slidesPerView: 4.5,
                    spaceBetween: 20,
                }
            },
            on: {
                init: function() {
                    updateInstructionPagination(this.activeIndex + 1, this.slides.length);
                },
                slideChange: function() {
                    updateInstructionPagination(this.activeIndex + 1, this.slides.length);
                }
            }
        });

        // Update pagination manually
        function updateInstructionPagination(current, total) {
            const currentEl = document.querySelector('.section-instruction__pagination-current');
            const totalEl = document.querySelector('.section-instruction__pagination-total');
            if (currentEl) {
                currentEl.textContent = current;
            }
            if (totalEl) {
                totalEl.textContent = total;
            }
        }
    }

    // Reviews Section - Parallax effect for photos (mouse + scroll)
    const reviewsSection = document.querySelector('.section-reviews');
    const reviewsPhotos = document.querySelector('.section-reviews__photos');
    if (reviewsSection && reviewsPhotos) {
        const photos = reviewsPhotos.querySelectorAll('.section-reviews__photo');
        let mouseOffset = { x: 0, y: 0 };
        
        // Mouse movement effect
        reviewsSection.addEventListener('mousemove', function(e) {
            const rect = reviewsSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / centerX;
            const moveY = (y - centerY) / centerY;
            
            mouseOffset.x = moveX;
            mouseOffset.y = moveY;
            
            updatePhotoTransforms();
        });
        
        reviewsSection.addEventListener('mouseleave', function() {
            mouseOffset.x = 0;
            mouseOffset.y = 0;
            updatePhotoTransforms();
        });
        
        // Scroll effect
        function updateScrollEffect() {
            const rect = reviewsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            
            // Вычисляем позицию секции относительно viewport (0 = секция вверху экрана, 1 = внизу)
            const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
            
            // Применяем эффект скролла
            photos.forEach(function(photo, index) {
                const scrollIntensity = 20 + (index * 3); // Разная интенсивность для каждой фотографии
                const scrollOffsetY = (scrollProgress - 0.5) * scrollIntensity;
                
                // Сохраняем смещение от скролла в data-атрибут
                photo.setAttribute('data-scroll-y', scrollOffsetY);
                
                updatePhotoTransforms();
            });
        }
        
        // Функция для применения обоих эффектов
        function updatePhotoTransforms() {
            photos.forEach(function(photo, index) {
                const mouseIntensity = 15 + (index * 2);
                const mouseOffsetX = mouseOffset.x * mouseIntensity;
                const mouseOffsetY = mouseOffset.y * mouseIntensity;
                
                const scrollOffsetY = parseFloat(photo.getAttribute('data-scroll-y')) || 0;
                
                const totalX = mouseOffsetX;
                const totalY = mouseOffsetY + scrollOffsetY;
                
                photo.style.transform = `translate(${totalX}px, ${totalY}px)`;
            });
        }
        
        // Инициализация при загрузке
        updateScrollEffect();
        
        // Обновление при скролле
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                updateScrollEffect();
            }, 10);
        }, { passive: true });
        
        // Обновление при изменении размера окна
        window.addEventListener('resize', function() {
            updateScrollEffect();
        });
    }

    // Reviews Section Swiper
    if (document.querySelector('.section-reviews__slider')) {
        const reviewsSwiper = new Swiper('.section-reviews__slider', {
            slidesPerView: 1.1,
            spaceBetween: 12,
            speed: 500,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                }
            }
        });
    }

    // Journal Articles & Videos Swiper (mobile only)
    function initJournalSwipers() {
        if (window.innerWidth <= 768) {
            // Articles Swiper
            const articlesGrid = document.querySelector('.section-journal__articles-grid.swiper');
            if (articlesGrid && !articlesGrid.swiper) {
                new Swiper('.section-journal__articles-grid.swiper', {
                    slidesPerView: 1.1,
                    spaceBetween: 12,
                    freeMode: false,
                });
            }

            // Videos Swiper
            const videosGrid = document.querySelector('.section-journal__videos-grid.swiper');
            if (videosGrid && !videosGrid.swiper) {
                new Swiper('.section-journal__videos-grid.swiper', {
                    slidesPerView: 1.1,
                    spaceBetween: 12,
                    freeMode: false,
                });
            }
        } else {
            // Destroy swipers on desktop
            const articlesGrid = document.querySelector('.section-journal__articles-grid.swiper');
            if (articlesGrid && articlesGrid.swiper) {
                articlesGrid.swiper.destroy(true, true);
            }
            const videosGrid = document.querySelector('.section-journal__videos-grid.swiper');
            if (videosGrid && videosGrid.swiper) {
                videosGrid.swiper.destroy(true, true);
            }
        }
    }

    // Benefits Grid Swiper (mobile only)
    function initBenefitsSwiper() {
        if (window.innerWidth <= 768) {
            const benefitsGrid = document.querySelector('.section-mom__benefits-grid.swiper');
            if (benefitsGrid && !benefitsGrid.swiper) {
                // Function to equalize card heights
                function equalizeCardHeights() {
                    const slides = benefitsGrid.querySelectorAll('.swiper-slide');
                    if (slides.length === 0) return;

                    // Reset heights
                    slides.forEach(function(slide) {
                        const card = slide.querySelector('.section-mom__benefit-card');
                        if (card) {
                            card.style.height = 'auto';
                        }
                    });

                    // Use setTimeout to ensure DOM is updated
                    setTimeout(function() {
                        // Find max height
                        let maxHeight = 0;
                        slides.forEach(function(slide) {
                            const card = slide.querySelector('.section-mom__benefit-card');
                            if (card) {
                                const height = card.offsetHeight;
                                if (height > maxHeight) {
                                    maxHeight = height;
                                }
                            }
                        });

                        // Apply max height to all cards
                        slides.forEach(function(slide) {
                            const card = slide.querySelector('.section-mom__benefit-card');
                            if (card && maxHeight > 0) {
                                card.style.height = maxHeight + 'px';
                            }
                        });
                    }, 10);
                }

                const benefitsSwiper = new Swiper('.section-mom__benefits-grid.swiper', {
                    slidesPerView: 2.1,
                    spaceBetween: 12,
                    freeMode: false,
                    on: {
                        init: function() {
                            setTimeout(equalizeCardHeights, 50);
                        },
                        slideChange: function() {
                            equalizeCardHeights();
                        },
                        resize: function() {
                            equalizeCardHeights();
                        }
                    }
                });
            }
        } else {
            // Destroy swiper on desktop
            const benefitsGrid = document.querySelector('.section-mom__benefits-grid.swiper');
            if (benefitsGrid && benefitsGrid.swiper) {
                benefitsGrid.swiper.destroy(true, true);
                // Reset card heights
                const cards = benefitsGrid.querySelectorAll('.section-mom__benefit-card');
                cards.forEach(function(card) {
                    card.style.height = '';
                });
            }
        }
    }

    // Initialize on load
    initJournalSwipers();
    initBenefitsSwiper();

    // Reinitialize on resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initJournalSwipers();
            initBenefitsSwiper();
        }, 250);
    });

});