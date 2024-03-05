const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
const styleSwitcher = document.querySelector(".style-switcher");

const closeStyleSwitcher = () => {
    if (styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open");
    }
};

styleSwitcherToggle.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevents the click event from propagating to the document
    styleSwitcher.classList.toggle("open");
});

document.addEventListener("click", (event) => {
    const isClickInsideStyleSwitcher = styleSwitcher.contains(event.target);
    const isClickOnToggle = styleSwitcherToggle.contains(event.target);

    if (!isClickInsideStyleSwitcher && !isClickOnToggle) {
        closeStyleSwitcher();
    }
});

// Theme Color
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color){
   alternateStyles.forEach((style) => {
         if(color === style.getAttribute("title")){
              style.removeAttribute("disabled");
         }else{
              style.setAttribute("disabled", "true");
         }
    })
}

// Theme Light and Dark
const dayNight = document.querySelector('.day-night');

dayNight.addEventListener('click', () => {
  dayNight.querySelector('i').classList.toggle('fa-sun');
  dayNight.querySelector('i').classList.toggle('fa-moon');
  document.body.classList.toggle('dark');
  
  // Store the user's preference in localStorage
  const preference = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('preference', preference);
  localStorage.setItem('timestamp', new Date().getTime());
});

document.addEventListener('DOMContentLoaded', function() {
  themeMode();
});

function themeMode() {
  // Retrieve the user's preference and timestamp from localStorage
  const preference = localStorage.getItem('preference');
  const timestamp = localStorage.getItem('timestamp');

  // Determine if the stored preference is more than two hours old
  const now = new Date().getTime();
  const twoHoursInMs = 2 * 60 * 60 * 1000;
  const isOldPreference = timestamp && (now - timestamp > twoHoursInMs);

  if (!preference || isOldPreference) {
    // Determine the local time
    const hour = new Date().getHours();

    // Update the page layout based on the local time
    if (hour < 18) {
      document.body.classList.remove('dark');
      dayNight.querySelector('i').classList.add('fa-moon');
      dayNight.querySelector('i').classList.remove('fa-sun');
    } else {
      document.body.classList.add('dark');
      dayNight.querySelector('i').classList.remove('fa-moon');
      dayNight.querySelector('i').classList.add('fa-sun');
    }

    // Store the current preference and timestamp in localStorage
    localStorage.setItem('preference', hour < 18 ? 'light' : 'dark');
    localStorage.setItem('timestamp', now);
  } else {
    // Use the stored preference to update the page layout
    if (preference === 'light') {
      document.body.classList.remove('dark');
      dayNight.querySelector('i').classList.add('fa-moon');
      dayNight.querySelector('i').classList.remove('fa-sun');
    } else {
      document.body.classList.add('dark');
      dayNight.querySelector('i').classList.remove('fa-moon');
      dayNight.querySelector('i').classList.add('fa-sun');
    }
  }
}


  


window.addEventListener("load", () => {
   if(document.body.classList.contains("dark")){
       dayNight.querySelector("i").classList.add("fa-sun");
   }
   else{
       dayNight.querySelector("i").classList.add("fa-moon");
    }
})