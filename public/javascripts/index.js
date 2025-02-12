let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const wrapper = document.getElementById('carouselWrapper');

if (items.length > 0) {
  document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  });
}

document.getElementById('hamburger').addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
  });
  