document.addEventListener('DOMContentLoaded', function () {
    const totalImages = 16; // Total de imágenes requeridas
    const track = document.getElementById('carouselTrack');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    // Generar dinámicamente los slides y los indicadores para las 16 imágenes
    for (let i = 1; i <= totalImages; i++) {
        // Crear elemento slide
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        
        const img = document.createElement('img');
        img.src = `img/${i}.jpeg`;
        img.alt = `Recuerdo Aniversario ${i}`;
        
        // Imagen de respaldo por si falta alguna en la carpeta
        img.onerror = function() {
            this.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80';
        };
        
        slide.appendChild(img);
        track.appendChild(slide);

        // Crear indicador (punto de navegación)
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 1) indicator.classList.add('active');
        
        indicator.addEventListener('click', () => {
            currentIndex = i - 1;
            updateCarousel();
            resetAutoSlide();
        });
        
        indicatorsContainer.appendChild(indicator);
    }

    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    const slideCount = slides.length;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        indicators.forEach((ind, index) => {
            if (index === currentIndex) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Auto reproducción cada 4 segundos
    let autoSlide = setInterval(nextSlide, 4000);

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 4000);
    }
});
