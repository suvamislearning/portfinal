/* Portfolio chatbot demo: answers common questions without a backend. */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('chatbot-toggle');
  const panel = document.getElementById('chatbot-panel');
  const close = document.getElementById('chatbot-close');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messages = document.getElementById('chatbot-messages');

  if (!toggle || !panel || !close || !form || !input || !messages) return;

  const addMessage = (text, type, options = {}) => {
    const message = document.createElement('div');
    message.className = `chatbot-message chatbot-message-${type}`;
    const messageText = document.createElement('span');
    messageText.textContent = text;
    message.appendChild(messageText);

    if (options.showContact) {
      const contactButton = document.createElement('button');
      contactButton.className = 'chatbot-contact-button';
      contactButton.type = 'button';
      contactButton.textContent = 'Contact Suvam';
      contactButton.addEventListener('click', () => {
        document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
        window.setTimeout(() => document.getElementById('contact-name')?.focus(), 500);
        setOpen(false);
      });
      message.appendChild(contactButton);
    }

    if (options.showProjects) {
      const projectsButton = document.createElement('button');
      projectsButton.className = 'chatbot-contact-button';
      projectsButton.type = 'button';
      projectsButton.textContent = 'View Projects';
      projectsButton.addEventListener('click', () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      });
      message.appendChild(projectsButton);
    }

    if (options.showSkills) {
      const skillsButton = document.createElement('button');
      skillsButton.className = 'chatbot-contact-button';
      skillsButton.type = 'button';
      skillsButton.textContent = 'View Skills';
      skillsButton.addEventListener('click', () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
      });
      message.appendChild(skillsButton);
    }

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const getReply = (question) => {
    const normalized = question.toLowerCase();

    if (/\b(skill|skills|technology|tech|stack|know|use)\b/.test(normalized)) {
      return {
        text: 'Suvam builds with a versatile mix of frontend, backend, and design technologies. His toolkit includes HTML, CSS, JavaScript, React, Node.js, Python, C++, PHP, and Figma. Explore the skills section below to see his strengths in more detail.',
        showSkills: true
      };
    }
    if (/\b(available|availability|hire|freelance|job|work together|start)\b/.test(normalized)) {
      return {
        text: 'Suvam is available at the moment for selected web projects and engineering opportunities. Press the button below to get in touch.',
        showContact: true
      };
    }
    if (/\b(project|projects|portfolio|built|case stud)\b/.test(normalized)) {
      return {
        text: 'Suvam turns bold ideas into real, engaging digital experiences. He combines thoughtful design, smooth interactions, and reliable technology to bring each concept to life. Explore the projects below to see how ideas become polished products.',
        showProjects: true
      };
    }
    if (/\b(contact|email|reach|mail)\b/.test(normalized)) {
      return 'You can reach Suvam at suvamislearning@gmail.com, or use the Connect section to send a project message.';
    }
    if (/\b(experience|background|about|who)\b/.test(normalized)) {
      return 'Suvam is a web developer focused on fast, interactive, and visually engaging digital experiences, from responsive interfaces to scalable web applications.';
    }
    if (/\b(resume|cv|qualification)\b/.test(normalized)) {
      return 'You can preview and download Suvam\u2019s resume using the Download Resume button in the top navigation.';
    }
    if (/\b(hello|hi|hey)\b/.test(normalized)) {
      return 'Hey! What would you like to know about Suvam\u2019s work?';
    }

    return 'I can help with skills, projects, experience, availability, contact details, or the resume. Try asking one of those!';
  };

  const setOpen = (isOpen) => {
    panel.hidden = !isOpen;
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close portfolio chatbot' : 'Open portfolio chatbot');
    if (isOpen) input.focus();
  };

  toggle.addEventListener('click', () => setOpen(panel.hidden));
  close.addEventListener('click', () => setOpen(false));

  const askQuestion = (question) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;
    addMessage(trimmedQuestion, 'user');
    input.value = '';
    window.setTimeout(() => {
      const reply = getReply(trimmedQuestion);
      const replyText = typeof reply === 'string' ? reply : reply.text;
      addMessage(replyText, 'bot', typeof reply === 'string' ? {} : reply);
    }, 350);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    askQuestion(input.value);
  });

  document.querySelectorAll('.chatbot-suggestion').forEach((suggestion) => {
    suggestion.addEventListener('click', () => askQuestion(suggestion.dataset.question || ''));
  });
});
