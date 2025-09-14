let leafProgress = 0;
let leafOpened = false;
let sadhyaServed = false;

// 🌿 Manual leaf position (0% = top, 100% = bottom)
let leafStartTop = 25;  // Adjust this to move leaf vertically
let leafStartLeft = 30; // Adjust this to move leaf horizontally

const scrollBanner = document.querySelector('.scroll-banner');
const leafContainer = document.querySelector('.leaf-container');
const serveBtn = document.querySelector('.velumbu-btn');
const title = document.querySelector('.sadhya-title');
const sadhyaDiv = document.getElementById('sadhya-items');
const tooltipDiv = document.getElementById('tooltip');
const easterBanner = document.querySelector('.easter-banner');

// 🔧 Apply initial leaf position via CSS variables or direct style
leafContainer.style.setProperty('--leaf-top', `${leafStartTop}%`);
leafContainer.style.left = `${leafStartLeft}%`;  // Leaf moves left-right
leafContainer.style.transform = `translateX(-50%) scaleY(0)`; // Ensure initial transform

// 🌿 Leaf opening on scroll
window.addEventListener('wheel', (e) => {
  if (leafOpened) return;

  if (scrollBanner) scrollBanner.classList.add('hide');

  leafProgress += e.deltaY * 0.001;
  leafProgress = Math.min(Math.max(leafProgress, 0), 1);

  // Maintain translateX(-50%) while updating scaleY
  leafContainer.style.transform = `translateX(-50%) scaleY(${leafProgress})`;

  if (leafProgress >= 1) {
    leafOpened = true;
    serveBtn.classList.add('show');
  }
});

// 🍽 Serve Sadhya when button is clicked
serveBtn.addEventListener('click', () => {
  if (sadhyaServed) return;

  sadhyaServed = true;
  serveBtn.classList.remove('show');

  // 🔊 Play Onam song
  const audio = new Audio("assets/onamsong.mp3");
  audio.play();

  // 🎉 Show title
  title.classList.remove("hidden");
  title.classList.add("visible");

  // 🥣 Place each food item one by one
  sadhyaItems.forEach((item, index) => {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "sadhya-item";
      el.style.top = item.top;
      el.style.left = item.left;
      el.style.transform = "translate(-50%, -50%)";
      el.style.animation = `fadeIn 1s forwards`;
      el.style.animationDelay = `${index * 0.5}s`;

      // 🍛 Image element
      const img = document.createElement("img");
      img.src = "assets/images" + item.img;
      img.alt = item.name;
      img.className = "food-img";
      img.style.width = (item.width || 68) + "px";

      el.appendChild(img);

      el.addEventListener("mouseenter", () => showTooltip(item));
      el.addEventListener("mouseleave", () => hideTooltip());
      el.addEventListener("click", () => showTooltip(item));

      sadhyaDiv.appendChild(el);
    }, index * 500);
  });

  // 🎊 Easter Egg banner
  const totalTime = sadhyaItems.length * 500 + 500;
  setTimeout(() => {
    easterBanner.classList.remove("hidden");
    easterBanner.classList.add("show");

    setTimeout(() => {
      easterBanner.classList.remove("show");
      easterBanner.classList.add("hidden");
    }, 6000);
  }, totalTime);
});

// 🛠 Tooltip functions
function showTooltip(item) {
  tooltipDiv.innerHTML = `
    <img src="assets/images${item.popupImg}" class="tooltip-img" />
    <h3>${item.name}</h3>
    <p><b>Ingredients:</b> ${item.ingredients}</p>
    <p><b>Significance:</b> ${item.significance}</p>
    <button class="tooltip-close">Close</button>
  `;
  tooltipDiv.style.display = "block";
  tooltipDiv.querySelector(".tooltip-close").onclick = () => hideTooltip();

  // 🍌 Banana chip rain
  if (item.name === "Upperi (Banana Chips)") {
    triggerBananaRain();
  }
}

function hideTooltip() {
  tooltipDiv.style.display = "none";
}

// 🍌 Banana chips rain animation
function triggerBananaRain() {
  const totalChips = 80;

  for (let i = 0; i < totalChips; i++) {
    const chip = document.createElement("img");
    chip.src = "assets/images/bananachips.png";
    chip.className = "banana-chip";

    chip.style.left = `${Math.random() * 100}vw`;
    chip.style.top = `${-Math.random() * 20}px`;

    const size = 20 + Math.random() * 25;
    chip.style.width = `${size}px`;
    chip.style.height = "auto";

    const duration = 2 + Math.random() * 3;
    chip.style.animationDuration = `${duration}s`;

    chip.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(chip);
    setTimeout(() => chip.remove(), duration * 1000);
  }
}






