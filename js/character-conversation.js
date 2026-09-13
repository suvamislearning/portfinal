document.addEventListener('DOMContentLoaded', () => {
  const character = document.querySelector('.character-container');
  const conversation = document.querySelector('.character-conversation');

  if (!character || !conversation) return;

  const lines = [
    'Hey there! Welcome to Suvam’s portfolio 👋',
    'I’m Suvam, a passionate web developer who enjoys turning ideas into modern digital experiences ✨',
    'I build clean, responsive, and interactive websites that work smoothly across phones, tablets, and desktops 💻',
    'My main skills include HTML, CSS, JavaScript, React, Node.js, Python, PHP, C++, and Figma 🛠️',
    'I also care about visual design, performance, accessibility, and creating interfaces that are easy to use 🎨',
    'Feel free to explore my portfolio and discover what I can build 🚀'
  ];
  let lineIndex = 0;
  let conversationActive = false;
  let startClickTimer;
  let typingTimer;
  let transitionTimer;
  let isTransitioning = false;

  const endConversation = () => {
    window.clearInterval(typingTimer);
    window.clearTimeout(transitionTimer);
    conversation.classList.remove('is-visible');
    conversation.classList.remove('is-fading');
    conversation.textContent = '';
    character.classList.remove('is-speaking');
    conversationActive = false;
    lineIndex = 0;
    isTransitioning = false;
  };

  const showCurrentLine = () => {
    if (lineIndex >= lines.length) {
      endConversation();
      return;
    }

    window.clearInterval(typingTimer);
    conversation.innerHTML = '<span class="conversation-text"></span><span class="conversation-cursor" aria-hidden="true"></span>';
    conversation.classList.add('is-visible');
    conversation.classList.remove('is-new-line');
    character.classList.remove('is-speaking');
    void conversation.offsetWidth;
    conversation.classList.add('is-new-line');
    character.classList.add('is-speaking');

    const text = conversation.querySelector('.conversation-text');
    let characterIndex = 0;
    typingTimer = window.setInterval(() => {
      text.textContent += lines[lineIndex][characterIndex];
      characterIndex += 1;

      if (characterIndex >= lines[lineIndex].length) {
        window.clearInterval(typingTimer);
      }
    }, 24);
  };

  const startConversation = () => {
    window.clearTimeout(startClickTimer);
    lineIndex = 0;
    conversationActive = true;
    character.classList.add('is-speaking');
    showCurrentLine();
  };

  const advanceConversation = () => {
    if (!conversationActive || isTransitioning) return;

    character.classList.remove('is-clicked');
    void character.offsetWidth;
    character.classList.add('is-clicked');

    isTransitioning = true;
    conversation.classList.add('is-fading');

    if (lineIndex >= lines.length - 1) {
      transitionTimer = window.setTimeout(endConversation, 260);
      return;
    }

    lineIndex += 1;
    transitionTimer = window.setTimeout(() => {
      conversation.classList.remove('is-fading');
      isTransitioning = false;
      showCurrentLine();
    }, 260);
  };

  character.addEventListener('click', () => {
    if (conversationActive) {
      advanceConversation();
      return;
    }

    if (startClickTimer) {
      window.clearTimeout(startClickTimer);
      startClickTimer = undefined;
      startConversation();
      return;
    }

    startClickTimer = window.setTimeout(() => {
      startClickTimer = undefined;
    }, 280);
  });

  character.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (conversationActive) {
        advanceConversation();
      } else {
        startConversation();
      }
    }
  });
});
