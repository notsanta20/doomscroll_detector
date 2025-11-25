(() => {
  const SCROLL_THRESHOLD = 1000;
  let scrollLimit = SCROLL_THRESHOLD * 1;
  let scroll = window.scrollY;
  let count = 0;
  let modal;

  //listen for new website id and scroll input
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, webId, value } = obj;

    if (type === "NEW") {
      console.log(webId);
    }

    if (type === "SCROLL") {
      scrollLimit = SCROLL_THRESHOLD * value;
    }
  });

  //listen for scroll
  window.onscroll = () => {
    scroll = window.scrollY;

    if (scroll > scrollLimit) {
      //show modal only once per threshold
      count++;
      if (count == 1) {
        showModal();
      }
    }
  };

  //get modal and insert into body
  function showModal() {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    window.scrollTo(0, scroll);

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

    mainContainer.style.backgroundColor = "rgba(50, 50, 50, 0.65)";
    mainContainer.style.width = "100vw";
    mainContainer.style.height = "100vh";
    mainContainer.style.position = "fixed";
    mainContainer.style.left = "0";
    mainContainer.style.top = "0";
    mainContainer.style.zIndex = "99";

    container.style.position = "fixed";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.gap = "15px";
    container.style.width = "350px";
    container.style.height = "150px";
    container.style.backgroundColor = "black";
    container.style.color = "white";
    container.style.padding = "25px";
    container.style.borderRadius = "15px";
    container.style.left = "50%";
    container.style.top = "50%";
    container.style.transform = "translate(-50%, -50%)";
    container.style.fontWeight = "bold";
    container.style.boxShadow = "5px 5px 25px rgb(0,0,0,0.75)";

    txt.style.flex = "auto";
    txt.style.display = "flex";
    txt.style.textAlign = "center";
    txt.style.fontSize = "1rem";
    txt.style.alignItems = "center";
    txt.textContent = message;

    btnContainer.style.display = "grid";
    btnContainer.style.gridTemplateColumns = "1fr 1fr";
    btnContainer.style.gap = "15px";

    resetBtn.style.padding = "0px 15px";
    resetBtn.style.color = "white";
    resetBtn.style.backgroundColor = "#e9564a";
    resetBtn.style.borderRadius = "8px";
    resetBtn.style.fontSize = "1rem";
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener("click", () => {
      const body = document.querySelector("body");
      scrollLimit *= 2;
      count = 0;
      body.removeChild(modal);
      body.style.overflow = "visible";
    });

    closeBtn.style.padding = "0px 15px";
    closeBtn.style.color = "black";
    closeBtn.style.backgroundColor = "#90EE90";
    closeBtn.style.borderRadius = "8px";
    closeBtn.style.fontSize = "1rem";
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
