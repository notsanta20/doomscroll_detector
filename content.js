(() => {
  const SCROLL_THRESHOLD = 10000; // 10k pixels
  const TIME_LIMIT = 1000 * 60 * 5; //5 min

  let scrollDistance = 0;
  let scrollLimit = 0;
  let timer = null;
  let isModalOpen = false;
  let modal;

  // load scroll intensity from storage and update scroll limit
  chrome.storage.local.get(["scrollIntensity"], (result) => {
    const value = result.scrollIntensity | 1;
    scrollLimit = SCROLL_THRESHOLD * value;
  });

  // listen scroll intensity change and update scroll limit
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "updateThreshold") {
      const newThreshold = request.value;
      scrollLimit = SCROLL_THRESHOLD * newThreshold;
    }
  });

  // listen scroll
  window.onscroll = () => {
    scrollDistance += window.scrollY % scrollLimit;
    console.log(scrollDistance + " " + scrollLimit);

    if (scrollDistance > scrollLimit) {
      //show modal only once per threshold
      if (!isModalOpen) {
        showModal();
      }
    }
  };

  setTimer();

  function setTimer() {
    if (timer) {
      clearTimeout(timer);
    } else {
      timer = setTimeout(() => {
        if (!isModalOpen) {
          showModal();
        }
      }, TIME_LIMIT);
    }
  }

  // reset scroll values
  function reset() {
    isModalOpen = false;
    scrollDistance = 0;
  }

  //get modal and insert into body
  function showModal() {
    isModalOpen = true;
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    window.scrollTo(0, window.scrollY);

    const roast = getRandomRoast();
    modal = createModal(roast);

    body.append(modal);
  }

  //create modal
  function createModal(message) {
    const mainContainer = document.createElement("div");
    const container = document.createElement("div");
    const btnContainer = document.createElement("div");
    const txt = document.createElement("p");
    const closeBtn = document.createElement("button");
    const resetBtn = document.createElement("button");

    mainContainer.classList.add("modal-main-container");

    container.classList.add("modal-container");

    txt.classList.add("modal-txt");
    txt.textContent = message;

    btnContainer.classList.add("modal-btn-container");

    resetBtn.classList.add("modal-reset-btn");
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener("click", () => {
      const body = document.querySelector("body");
      body.removeChild(modal);
      body.style.overflow = "visible";
      reset();
    });

    closeBtn.classList.add("modal-close-btn");
    closeBtn.textContent = "Touch grass";
    closeBtn.addEventListener("click", () => {
      window.location.href = getRandomWebsite();
    });

    btnContainer.appendChild(resetBtn);
    btnContainer.appendChild(closeBtn);
    container.appendChild(txt);
    container.appendChild(btnContainer);
    mainContainer.appendChild(container);

    return mainContainer;
  }

  //get random roast
  function getRandomRoast() {
    const roast = [
      "“Even your thumb is begging you to stop. Your brain gave up 10 minutes ago.”",
      "Your thumb is putting in more work than your ambitions.",
      "At this point, your screen time should pay rent.",
      "Another reel? Bold of you to assume you have a future.",
      "Your brain just filed an HR complaint against you.",
      "You’re not scrolling — you’re training for Olympic procrastination.",
      "Even your WiFi is tired of your life choices.",
      "You’ve seen this exact meme five times… and still didn’t stop.",
      "Your productivity is somewhere crying in a corner.",
      "Keep scrolling… your goals aren’t going anywhere. Literally.",
      "Congrats, you’ve unlocked the ‘Zero Discipline’ achievement.",
      "If dopamine had legs, it would walk out on you right now.",
      "You didn’t choose doomscrolling. Doomscrolling chose you.",
      "Your screen is glowing brighter than your future.",
      "This scroll won’t fix your life, champ.",
      "Touch grass. Or at least touch the lock button.",
      "Even your phone is judging you silently.",
      "You’re just one more reel away from full-time clown status.",
    ];

    const random_roast = Math.floor(Math.random() * roast.length);

    return roast[random_roast];
  }

  //get random website
  function getRandomWebsite() {
    const websites = [
      "https://www.window-swap.com/",
      "https://pointerpointer.com/",
      "https://donothingfor2minutes.org/",
      "https://www.pixelthoughts.co/",
      "https://neal.fun/",
      "http://weavesilk.com/",
    ];

    const random_website = Math.floor(Math.random() * websites.length);

    return websites[random_website];
  }
})();
