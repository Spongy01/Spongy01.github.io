const tagColors = {
  Ongoing: "bg-green-300 text-green-800",
  Hackathon: "bg-orange-300 text-orange-800",
  Collaboration: "bg-yellow-300 text-yellow-800",
  Revamping: "bg-blue-300 text-blue-800",
  // Add more tags and their corresponding colors here
};

const carouselContainer = document.getElementById("carousel-container");
let carouselItem = null;
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const carouselItems = document.getElementById("carousel-items");
const indicatorsContainer = document.getElementById("carousel-indicator");
const indicators = indicatorsContainer.children;
let totalSlides = 0
let currentIndex = 0;


document.addEventListener("DOMContentLoaded", function () {
  console.log("Inside event listener");
  fetch("scripts/projects.json")
    .then((response) => response.json())
    .then((projects) => {
      const carouselItems = document.getElementById("carousel-items");
      console.log("Fetched Projects:");
      console.log(projects);
      let first = true;

      totalSlides = projects.length;


      projects.forEach((project) => {
        
      
        const projectCard = document.createElement("div");
        projectCard.classList.add(
          "flex-shrink-0",
          "flex",
          "items-center",
          "justify-center",
          "w-4/5",
          "md:w-3/5",
          "lg:w-2/5",

        );
        if (first) {
          projectCard.style = "margin-left: 10%";
          projectCard.id = 'carousel-item';
          first = false;
        }
        const tagsHtml = project.tags
          .map((tag) => {
            const tagClass = tagColors[tag] || "bg-gray-300 text-gray-800"; // Default color if the tag is not found
            return `<p class="hidden md:block border hover:shadow-md rounded-2xl py-1 px-3 ${tagClass} font-medium">${tag}</p>`;
          })
          .join("");

        projectCard.innerHTML = `
        
        <div class="w-full bg-white hover:shadow-2xl overflow-hidden my-3 border-2 rounded-lg h-full border-slate-500">
            <div class="project-image">
              <img
                src="${project.image}"
                alt="${project.title}"
                class="w-full h-36 object-cover rounded-t-lg"
              />
            </div>
            <div class="project-title px-4 py-2">
              <div class='flex align-middle'>
              <a href="${project.link}" target = '_blank' class="font-semibold text-2xl text-teal-700">
                ${project.title}
              </a>  <i class=" ms-2 "><svg width="20px" height="20px"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.99991 11.9999H14.9999" stroke="#036672" stroke-width="1" stroke-linecap="round"/>
<path d="M9 18H8C4.68629 18 2 15.3137 2 12C2 8.68629 4.68629 6 8 6H9" stroke="#036672" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15 6H16C19.3137 6 22 8.68629 22 12M15 18H16C17.2267 18 18.3675 17.6318 19.3178 17" stroke="#036672" stroke-width="1.5" stroke-linecap="round"/>
</svg></i>
</div>
              
              <div
                class="project-tags flex flex-wrap justify-end space-x-2 mt-2"
              >
                ${tagsHtml}
              </div>
            </div>
            <div class="w-full h-0.5 bg-slate-500 my-2"></div>
            <div class="text-justify indent-6 project-description px-4 py-2 text-gray-700">
            ${project.description}
            </div>
            <div
              class="contact-info mt-2 px-4 py-2 flex justify-end text-gray-500"
            >
              <p class="text-sm">
                Have an idea or suggestion for improvement? Feel free to
                <a
                  href="mailto:aliasgarpadaria@gmail.com"
                  class="text-blue-500 hover:underline"
                  >reach out</a
                >
                or
                <a
                  href="${project.link}" target="_blank"
                  class="text-blue-500 hover:underline"
                  >raise an issue on GitHub!</a
                >
              </p>
            </div>

          </div>
        
        `;

        carouselItems.appendChild(projectCard);
      });

      // Start Initialziation for Carousel Navigation
      initializeCarouselNavigation();
    });
});


document.addEventListener('DOMContentLoaded', (event) => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('#navli');

    const observerOptions = {
      root: null, // relative to document viewport
      rootMargin: '0px',
      threshold: 0.5 // triggers when 50% of the section is in view
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("Inside Observer")
          const sectionIndex = Array.from(sections).indexOf(entry.target);
          navItems.forEach(item => item.classList.remove('text-teal-600'));
          navItems[sectionIndex].classList.add('text-teal-600');
        //   navItems[sectionIndex].innerText = entry.target.innerText;
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  });


function initializeCarouselNavigation() {
  
  const carouselItems = document.getElementById("carousel-items");
  const indicatorsContainer = document.getElementById("carousel-indicator");
  const totalSlides = carouselItems.children.length;

  // Create indicators
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    indicator.classList.add(
      "h-2",
      "w-2",
      "bg-gray-400",
      "rounded-full",
      "cursor-pointer",
      "hover:bg-gray-600"
    );
    indicator.dataset.index = i;
    indicatorsContainer.appendChild(indicator);
  }

  
  indicators[currentIndex].classList.add("bg-teal-800");
  carouselItem = document.getElementById("carousel-item");
  updateCarousel();
}

function updateCarousel() {

  const itemWidth = carouselItem.offsetWidth;
  console.log("Width of a carousel item:", itemWidth);
  carouselItems.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  Array.from(indicators).forEach((indicator, index) => {
    indicator.classList.toggle("bg-teal-800", index === currentIndex);
    indicator.classList.toggle("bg-gray-400", index !== currentIndex);
  });
}

prevButton.addEventListener("click", () => {
  // if(currentIndex==0) currentIndex = totalSlides-1;
  currentIndex = currentIndex - 1 < 0 ? totalSlides - 1 : currentIndex - 1;
  updateCarousel();
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
});

Array.from(indicators).forEach((indicator) => {
  indicator.addEventListener("click", () => {
    currentIndex = parseInt(indicator.dataset.index);
    updateCarousel();
  });
});

window.addEventListener("resize", updateCarousel);


// "description": "The Question Paper Generator is a Node.js application designed to automate the creation of exam question papers based on user-defined criteria. It accepts inputs such as total marks and (currently) difficulty distribution to generate customized question papers. I built this project while exploring Node.js and diving into development essentials like creating modular code, documenting effectively, and testing thoroughly. It supports easy integration of additional criteria and allows for the creation of papers from a diverse question bank, making it adaptable for various educational contexts."
