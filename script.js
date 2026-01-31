

const section = document.querySelector('.scroll-section');
const cards = [...document.querySelectorAll('.card')];
const manymore = document.querySelector('.manymore');

const center = Math.floor(cards.length / 2);

// RESET ALL
cards.forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'scale(.7)';
});

// Show center initially
cards[center].style.opacity = 1;
cards[center].style.transform = 'scale(1)';

window.addEventListener('scroll', () => {

  const start = section.offsetTop;
  const end = start + section.offsetHeight - window.innerHeight;

  let progress = (window.scrollY - start) / (end - start);
  progress = Math.max(0, Math.min(1, progress));

  let step = Math.floor(progress * (center + 1));

  cards.forEach((card, i) => {

    if (Math.abs(i - center) <= step) {
      card.style.opacity = 1;
      card.style.transform = 'scale(1)';
    } else {
      card.style.opacity = 0;
      card.style.transform = 'scale(.7)';
    }

  });

  if (step >= center) {
    manymore.style.opacity = 1;
    manymore.style.transform = 'scale(1)';
  } else {
    manymore.style.opacity = 0;
    manymore.style.transform = 'scale(.9)';
  }

});


