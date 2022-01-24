

const backButton = document.querySelector('#backButton');








/*
window.addEventListener('keydown', (e) => {
  
  if (e.key === "$") {
    e.preventDefault();
    page2.classList.remove('hidden');
  }

});
*/


backButton.addEventListener('click', () => {
  page2.classList.add('hidden');
});







