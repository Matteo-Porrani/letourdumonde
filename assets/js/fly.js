

const plane = document.querySelector('.plane');
const planeShadow = document.querySelector('.plane__shadow');



let pTop = window.innerHeight;
let pLeft = 0;

function fly() {

  plane.style.display = 'block';
  planeShadow.style.display = 'block';

  const timer = setInterval(function() {

    if (pTop <= -100) {
      clearInterval(timer);
      console.log('landed!');

      // prepares next fly
      pTop = window.innerHeight;
      pLeft = 0;
      plane.style.left = `${pLeft}px`;
      plane.style.top = `${pTop}px`;
  
      planeShadow.style.left = `${pLeft + 40}px`;
      planeShadow.style.top = `${pTop + 80}px`;
  
      return;
    }

    pLeft += 16;
    pTop -= 16;

    plane.style.left = `${pLeft}px`;
    plane.style.top = `${pTop}px`;

    planeShadow.style.left = `${pLeft + 40}px`;
    planeShadow.style.top = `${pTop + 80}px`;


  }, 15);


}