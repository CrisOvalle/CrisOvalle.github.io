const themeButton = document.getElementById("dark-mode-btn");
const form = document.getElementById("form");
const submit = document.getElementById("submit");
const signatures = document.getElementById("signatures");
const modal = document.getElementById("playlistModal");
const span = document.getElementsByClassName("close")[0];
const motion = document.getElementById("motion-btn");
let signatureCount = 0;

let closed = true;

let revealableContainers = document.querySelectorAll(".revealable")

let animation = {
  "revealDistance": 150,
  "initialOpacity": 0,
  "transitionDelay": 0,
  "transitionDuration": '2s',
  "transitionProperty": 'all',
  "transitionTimingFunction": 'ease'
}

function reduceMotion() {
  motion.classList.toggle("toggled");
  animation.transitionDuration = "0.5s";
  animation.transitionTimingFunction = "ease-in";
  animation.revealDistance = 50;
  animation.transitionProperty = "none";

  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionTimingFunction = animation.transitionTimingFunction;
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
    revealableContainers[i].style.transitionProperty = animation.transitionProperty;
    //revealableContainers[i].style.revealDistance = animation.revealDistance;
  }
}


function reveal() {
  for (let i = 0; i < revealableContainers.length; i++) {
    //console.log("a")
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add("active");
      /* add the active class to the revealableContainer's classlist */
    } else {
      revealableContainers[i].classList.remove("active");
      /* remove the active class to the revealableContainer's classlist */
    }
  }
}

window.addEventListener("scroll", reveal);


const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  themeButton.classList.toggle("toggled");
}

themeButton.addEventListener("click", toggleDarkMode);
motion.addEventListener("click", reduceMotion);

const validateForm = () => {
  event.preventDefault();

  let containsErrors = false;

  var petitionInputs = document.getElementById("form").elements;

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    }

    else if (i === 1) {
      let email = document.getElementById('email').value;
      if (!email.includes('\.') || !email.includes('@')) {
        containsErrors = true;
        petitionInputs[i].classList.add('error');
      }
      else {
        petitionInputs[i].classList.remove('error');
      }
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }

  if (!containsErrors) {
    addSignature();
    for (let i = 0; i < petitionInputs.length - 1; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}



const addSignature = () => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  let signature = document.createElement("p");
  signature.textContent = name + " supports this.";
  signatures.appendChild(signature);
  signatureCount += 1;
  document.getElementById("signature-count").textContent = signatureCount;

  let s = "Thank you " + name + " for signing the petition!"
  let r = "We'll reach out at " + email + " with more information! (But not really we're not there yet...!)"
  openModal(s, r);
}

submit.addEventListener('click', validateForm);



function openModal(mess, r) {
  modal.style.display = "block";
  let message = document.getElementById("playlist-title");
  let reach = document.getElementById("playlist-creator")
  message.innerText = mess;
  reach.innerText = r;
  closed = false
  bookMovement();
  setTimeout(() => {
    //console.log("bye")
    closeModal();
  }, 4000);
}

function bookMovement() {
  let booklist = document.querySelectorAll(".bookImg");

  for (let i = 0; i < booklist.length; i++) {
    let book = booklist[i];
    let bookPos = 0;
    let bookRot = 0;
    let id = setInterval(frame, 50);

    function frame() {
      if (bookRot >= 360) {
        clearInterval(id);
      } else {
        bookPos+= 5;
        bookRot+= 5;
        book.style.rotate = bookRot + 'deg';
        book.style.top = bookPos + 'px';
      }
    }
    
  }
}



function closeModal() {
  modal.style.display = "none";
  closed = true;
}

span.onclick = function() {
  closed = true;
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


