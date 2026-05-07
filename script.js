// ==================== Theme Toggle ====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const isDarkMode = localStorage.getItem('dark-mode') === 'true';
if (isDarkMode) {
    body.classList.add('dark-mode');
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

const headerElement = document.querySelector('.header');
const heroDecoration = document.querySelector('.hero-decoration');

// ==================== Floating Elements Positioning ====================
function randomizeFloatingPositions() {
    const bears = document.querySelectorAll('.floating-bear');
    const icons = document.querySelectorAll('.floating-icon');
    
    bears.forEach(bear => {
        const randomTop = Math.random() * 80 + 5; // 5% to 85%
        const randomLeft = Math.random() * 90; // 0% to 90%
        bear.style.top = randomTop + '%';
        bear.style.left = randomLeft + '%';
    });
    
    icons.forEach(icon => {
        const randomTop = Math.random() * 80 + 5;
        const randomLeft = Math.random() * 90;
        icon.style.top = randomTop + '%';
        icon.style.left = randomLeft + '%';
    });
}

// Randomize on load
randomizeFloatingPositions();

// ==================== Particle Creation ====================
function createParticles(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.fontSize = '1.5rem';
        particle.style.opacity = '1';
        
        // Random emoji
        const emojis = ['✨', '💖', '⭐', '🎀', '💝'];
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (Math.PI * 2 * i) / count;
        const velocity = {
            x: Math.cos(angle) * 4,
            y: Math.sin(angle) * 4 - 3 // upward bias
        };
        
        let life = 1;
        let posX = x;
        let posY = y;
        
        const animateParticle = () => {
            life -= 0.02;
            posX += velocity.x;
            posY += velocity.y;
            velocity.y += 0.1; // gravity
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = Math.max(0, life);
            particle.style.transform = `scale(${life})`;
            
            if (life > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        };
        
        animateParticle();
    }
}

// ==================== Interactive Particle Effects ====================
document.addEventListener('click', (e) => {
    // Only create particles on card clicks during day time
    if (!body.classList.contains('dark-mode') && Math.random() > 0.5) {
        createParticles(e.clientX, e.clientY, 8);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Animated Progress Bars ====================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillFill = entry.target.querySelector('.skill-fill');
            const percentage = skillFill.getAttribute('data-percentage');
            skillFill.style.width = percentage + '%';
            
            // Create particles on skill animation
            const rect = entry.target.getBoundingClientRect();
            createParticles(rect.left + rect.width / 2, rect.top, 3);
            
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill elements
document.querySelectorAll('.skill').forEach(skill => {
    skillObserver.observe(skill);
});

// ==================== Study Tools Logic ====
const timerLabel = document.getElementById('timerLabel');
const timerModeLabel = document.getElementById('timerModeLabel');
const timerStartButton = document.getElementById('timerStart');
const timerPauseButton = document.getElementById('timerPause');
const timerResetButton = document.getElementById('timerReset');
const timerModeButtons = document.querySelectorAll('.timer-mode');
const sessionCountLabel = document.getElementById('sessionCount');
const progressCircle = document.querySelector('.progress-circle');
const noteForm = document.getElementById('noteForm');
const noteGrid = document.getElementById('noteGrid');
const noteColors = document.querySelectorAll('.note-color');
const taskForm = document.getElementById('deadlineForm');
const taskList = document.getElementById('taskList');

const studyTimerModes = {
    pomodoro: { label: 'Pomodoro', duration: 1500 },
    shortBreak: { label: 'Short Break', duration: 300 },
    longBreak: { label: 'Long Break', duration: 900 },
    stopwatch: { label: 'Stopwatch', duration: 0 }
};

const timerState = {
    mode: 'pomodoro',
    duration: studyTimerModes.pomodoro.duration,
    remaining: studyTimerModes.pomodoro.duration,
    elapsed: 0,
    intervalId: null,
    isRunning: false,
    sessionCount: parseInt(localStorage.getItem('studySessionCount') || '0', 10)
};

const noteState = {
    selectedColor: 'pink',
    notes: JSON.parse(localStorage.getItem('studyNotes') || '[]')
};

const taskState = {
    tasks: JSON.parse(localStorage.getItem('studyTasks') || '[]')
};

const circleRadius = 100;
const circleCircumference = 2 * Math.PI * circleRadius;
if (progressCircle) {
    progressCircle.style.strokeDasharray = circleCircumference;
    progressCircle.style.strokeDashoffset = circleCircumference;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsOnly = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secondsOnly).padStart(2, '0')}`;
}

function updateTimerRing() {
    if (!progressCircle) return;
    let percent = 1;
    if (timerState.duration > 0) {
        percent = timerState.remaining / timerState.duration;
    } else {
        percent = (timerState.elapsed % 60) / 60;
    }
    const offset = circleCircumference * (1 - percent);
    progressCircle.style.strokeDashoffset = offset;
}

function updateTimerUI() {
    if (timerState.mode === 'stopwatch') {
        timerLabel.textContent = formatTime(timerState.elapsed);
    } else {
        timerLabel.textContent = formatTime(timerState.remaining);
    }
    if (timerModeLabel) timerModeLabel.textContent = studyTimerModes[timerState.mode].label;
    if (sessionCountLabel) sessionCountLabel.textContent = timerState.sessionCount;
    updateTimerRing();
}

function setTimerMode(mode) {
    timerState.mode = mode;
    timerState.duration = studyTimerModes[mode].duration;
    timerState.remaining = timerState.duration;
    timerState.elapsed = 0;
    timerState.isRunning = false;
    clearInterval(timerState.intervalId);
    timerModeButtons.forEach(button => button.classList.toggle('active', button.dataset.mode === mode));
    updateTimerUI();
}

function startStudyTimer() {
    if (timerState.isRunning) return;
    timerState.isRunning = true;
    timerState.intervalId = setInterval(() => {
        if (timerState.mode === 'stopwatch') {
            timerState.elapsed += 1;
        } else {
            timerState.remaining -= 1;
            if (timerState.remaining <= 0) {
                timerState.remaining = 0;
                completeStudyTimer();
                return;
            }
        }
        updateTimerUI();
    }, 1000);
}

function pauseStudyTimer() {
    if (!timerState.isRunning) return;
    timerState.isRunning = false;
    clearInterval(timerState.intervalId);
}

function resetStudyTimer() {
    pauseStudyTimer();
    timerState.remaining = timerState.duration;
    timerState.elapsed = 0;
    updateTimerUI();
}

function completeStudyTimer() {
    pauseStudyTimer();
    if (timerState.mode === 'pomodoro') {
        timerState.sessionCount += 1;
        localStorage.setItem('studySessionCount', timerState.sessionCount);
    }
    updateTimerUI();
    notifyUser('Study Timer', `${studyTimerModes[timerState.mode].label} đã kết thúc!`);
}

function requestNotificationPermission() {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function notifyUser(title, body) {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
        new Notification(title, { body });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(title, { body });
            }
        });
    }
}

function saveNotes() {
    localStorage.setItem('studyNotes', JSON.stringify(noteState.notes));
}

function saveTasks() {
    localStorage.setItem('studyTasks', JSON.stringify(taskState.tasks));
}

function renderNotes() {
    if (!noteGrid) return;
    noteGrid.innerHTML = '';

    if (!noteState.notes.length) {
        noteGrid.innerHTML = '<p class="empty-state">Chưa có ghi chú nào. Hãy tạo note đầu tiên.</p>';
        return;
    }

    const sortedNotes = noteState.notes.slice().sort((a, b) => {
        if (a.pinned !== b.pinned) return b.pinned - a.pinned;
        return b.updatedAt - a.updatedAt;
    });

    sortedNotes.forEach(note => {
        const card = document.createElement('div');
        card.className = `note-card note-${note.color}`;
        if (note.pinned) card.classList.add('pinned');
        card.dataset.id = note.id;

        const titleElement = document.createElement('div');
        titleElement.className = 'note-title';
        titleElement.contentEditable = 'true';
        titleElement.dataset.field = 'title';
        titleElement.textContent = note.title || 'Ghi chú mới';

        const bodyElement = document.createElement('div');
        bodyElement.className = 'note-body';
        bodyElement.contentEditable = 'true';
        bodyElement.dataset.field = 'content';
        bodyElement.textContent = note.content || 'Nội dung note...';

        const pinButton = document.createElement('button');
        pinButton.type = 'button';
        pinButton.className = 'note-pin';
        pinButton.dataset.id = note.id;
        pinButton.textContent = note.pinned ? '📌' : '📍';

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'note-delete';
        deleteButton.dataset.id = note.id;
        deleteButton.textContent = '🗑️';

        const actions = document.createElement('div');
        actions.className = 'note-actions';
        actions.append(pinButton, deleteButton);

        const header = document.createElement('div');
        header.className = 'note-card-header';
        header.append(titleElement, actions);

        const meta = document.createElement('div');
        meta.className = 'note-meta';
        meta.textContent = `Updated ${new Date(note.updatedAt).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}`;

        card.append(header, bodyElement, meta);
        noteGrid.appendChild(card);
    });
}

function addNote(event) {
    event.preventDefault();
    const titleInput = document.getElementById('noteTitle');
    const contentInput = document.getElementById('noteContent');
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title && !content) return;

    noteState.notes.push({
        id: `note-${Date.now()}`,
        title: title || 'Ghi chú mới',
        content: content || '',
        color: noteState.selectedColor,
        pinned: false,
        updatedAt: Date.now()
    });

    saveNotes();
    renderNotes();
    titleInput.value = '';
    contentInput.value = '';
}

function updateNoteField(noteId, field, value) {
    const note = noteState.notes.find(item => item.id === noteId);
    if (!note) return;
    note[field] = value.trim() || (field === 'title' ? 'Ghi chú mới' : '');
    note.updatedAt = Date.now();
    saveNotes();
    const card = document.querySelector(`.note-card[data-id="${noteId}"]`);
    if (card) {
        const meta = card.querySelector('.note-meta');
        if (meta) {
            meta.textContent = `Updated ${new Date(note.updatedAt).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}`;
        }
    }
}

function toggleNotePin(noteId) {
    const note = noteState.notes.find(item => item.id === noteId);
    if (!note) return;
    note.pinned = !note.pinned;
    note.updatedAt = Date.now();
    saveNotes();
    renderNotes();
}

function deleteNote(noteId) {
    noteState.notes = noteState.notes.filter(note => note.id !== noteId);
    saveNotes();
    renderNotes();
}

function setSelectedNoteColor(color) {
    noteState.selectedColor = color;
    noteColors.forEach(button => button.classList.toggle('selected', button.dataset.color === color));
}

function formatTaskDate(timestamp) {
    return new Date(timestamp).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
}

function getTaskUrgency(task) {
    if (task.completed) return 'done';
    const diff = task.due - Date.now();
    if (diff <= 0) return 'overdue';
    if (diff <= 3600000) return 'high';
    if (diff <= 86400000) return 'medium';
    return 'low';
}

function renderTasks() {
    if (!taskList) return;
    taskList.innerHTML = '';

    if (!taskState.tasks.length) {
        taskList.innerHTML = '<p class="empty-state">Chưa có deadline nào.</p>';
        return;
    }

    const sortedTasks = taskState.tasks.slice().sort((a, b) => a.completed - b.completed || a.due - b.due);

    sortedTasks.forEach(task => {
        const urgency = getTaskUrgency(task);
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${urgency}`;

        const checkboxLabel = document.createElement('label');
        checkboxLabel.className = 'task-checkbox-wrapper';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.dataset.id = task.id;
        checkbox.checked = task.completed;
        checkboxLabel.appendChild(checkbox);

        const details = document.createElement('div');
        details.className = 'task-details';
        const title = document.createElement('span');
        title.className = 'task-title';
        title.textContent = task.title;
        const meta = document.createElement('span');
        meta.className = 'task-meta';
        meta.textContent = `${formatTaskDate(task.due)} • Nhắc trước ${task.notifyBefore} phút`;
        details.append(title, meta);

        const action = document.createElement('div');
        action.className = 'task-action';
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'task-delete';
        deleteButton.dataset.id = task.id;
        deleteButton.textContent = '✕';
        action.appendChild(deleteButton);

        taskItem.append(checkboxLabel, details, action);
        taskList.appendChild(taskItem);
    });
}

function addTask(event) {
    event.preventDefault();
    const titleInput = document.getElementById('taskTitle');
    const dateInput = document.getElementById('taskDate');
    const timeInput = document.getElementById('taskTime');
    const notifyInput = document.getElementById('notifyBefore');

    const title = titleInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;
    const notifyBefore = parseInt(notifyInput.value, 10);

    if (!title || !date || !time) return;

    const dueTime = new Date(`${date}T${time}:00`).getTime();
    if (Number.isNaN(dueTime)) return;

    taskState.tasks.push({
        id: `task-${Date.now()}`,
        title,
        due: dueTime,
        notifyBefore,
        completed: false,
        notified: false
    });

    saveTasks();
    renderTasks();
    titleInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
    notifyInput.value = '15';
    requestNotificationPermission();
}

function setTaskComplete(taskId, completed) {
    const task = taskState.tasks.find(item => item.id === taskId);
    if (!task) return;
    task.completed = completed;
    saveTasks();
    renderTasks();
}

function removeTask(taskId) {
    taskState.tasks = taskState.tasks.filter(item => item.id !== taskId);
    saveTasks();
    renderTasks();
}

function checkDeadlines() {
    const now = Date.now();
    taskState.tasks.forEach(task => {
        if (task.completed || task.notified) return;
        const notifyAt = task.due - task.notifyBefore * 60000;
        if (now >= notifyAt) {
            task.notified = true;
            notifyUser('Deadline Reminder', `Task "${task.title}" sắp đến hạn.`);
        }
    });
    saveTasks();
    renderTasks();
}

function initializeStudyTools() {
    setTimerMode(timerState.mode);
    renderTasks();
    renderNotes();
    setSelectedNoteColor(noteState.selectedColor);
    requestNotificationPermission();
}

if (timerModeButtons.length) {
    timerModeButtons.forEach(button => {
        button.addEventListener('click', () => setTimerMode(button.dataset.mode));
    });
}

if (timerStartButton) timerStartButton.addEventListener('click', startStudyTimer);
if (timerPauseButton) timerPauseButton.addEventListener('click', pauseStudyTimer);
if (timerResetButton) timerResetButton.addEventListener('click', resetStudyTimer);

if (noteForm) noteForm.addEventListener('submit', addNote);
if (taskForm) taskForm.addEventListener('submit', addTask);
if (noteColors.length) {
    noteColors.forEach(button => {
        button.addEventListener('click', () => setSelectedNoteColor(button.dataset.color));
    });
}

if (taskList) {
    taskList.addEventListener('click', event => {
        const target = event.target;
        if (target.matches('.task-delete')) {
            removeTask(target.dataset.id);
        }
    });
    taskList.addEventListener('change', event => {
        const target = event.target;
        if (target.matches('.task-checkbox')) {
            setTaskComplete(target.dataset.id, target.checked);
        }
    });
}

if (noteGrid) {
    noteGrid.addEventListener('click', event => {
        const target = event.target;
        if (target.matches('.note-pin')) {
            toggleNotePin(target.dataset.id);
        }
        if (target.matches('.note-delete')) {
            deleteNote(target.dataset.id);
        }
    });

    let noteSaveTimeout;
    noteGrid.addEventListener('input', event => {
        const target = event.target;
        if (!target.matches('[contenteditable]')) return;
        const noteCard = target.closest('.note-card');
        if (!noteCard) return;
        const noteId = noteCard.dataset.id;
        const field = target.dataset.field;
        clearTimeout(noteSaveTimeout);
        noteSaveTimeout = setTimeout(() => {
            updateNoteField(noteId, field, target.innerText);
        }, 500);
    });

    noteGrid.addEventListener('blur', event => {
        const target = event.target;
        if (!target.matches('[contenteditable]')) return;
        const noteCard = target.closest('.note-card');
        if (!noteCard) return;
        const noteId = noteCard.dataset.id;
        const field = target.dataset.field;
        updateNoteField(noteId, field, target.innerText);
    }, true);
}

setInterval(checkDeadlines, 15000);


// ==================== Fade-In on Scroll ====================
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

// Add fade-in-scroll class to elements that should animate
document.querySelectorAll('.hero-content, .section-title, .section-intro, .about-card, .skill, .project-card, .tool-card, .experience-card, .contact-info-card').forEach(element => {
    element.classList.add('fade-in-scroll');
    fadeInObserver.observe(element);
});

// ==================== Navbar Active Link ====================
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    updateHeaderState();
    updateHeroParallax();

    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

function updateHeaderState() {
    if (window.pageYOffset > 60) {
        headerElement.classList.add('scrolled');
    } else {
        headerElement.classList.remove('scrolled');
    }
}

function updateHeroParallax() {
    if (!heroDecoration) return;
    const offset = window.pageYOffset * 0.12;
    heroDecoration.style.transform = `translateY(calc(-50% + ${offset}px))`;
}

// ==================== Floating Elements Animation Variation ====================
function addAnimationVariation() {
    const bears = document.querySelectorAll('.floating-bear');
    bears.forEach((bear, index) => {
        const variations = ['float', 'floatSlow', 'floatMedium'];
        const randomVariation = variations[index % variations.length];
        
        // Add random animation duration
        const duration = 5 + Math.random() * 3;
        bear.style.animationDuration = duration + 's';
    });
}

addAnimationVariation();

// ==================== Staggered Animation ====================
window.addEventListener('load', () => {
    updateHeaderState();
    updateHeroParallax();
    initializeStudyTools();

    // Add animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease-out';
    }
    
    // Animate floating orbs
    const orbs = document.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
        orb.style.animationDelay = (index * 0.3) + 's';
    });
});
