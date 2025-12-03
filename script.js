// 1. Знаходимо елементи (Змінні)
// Шукаємо модальне вікно за його ID, яке ми додали в HTML
const modal = document.getElementById("bookingModal"); 
// Шукаємо червону кнопку "Termin vereinbaren" за її класом
const btn = document.querySelector(".btn-primary"); 
// Шукаємо кнопку закриття "X"
const span = document.getElementsByClassName("close-btn")[0]; 

// 2. ФУНКЦІЯ ВІДКРИТТЯ: Коли натискаємо на кнопку
btn.onclick = function() {
  modal.style.display = "block"; // Робимо модальне вікно видимим
}

// 3. ФУНКЦІЯ ЗАКРИТТЯ: Коли натискаємо на "X"
span.onclick = function() {
  modal.style.display = "none"; // Ховаємо модальне вікно
}

// 4. ФУНКЦІЯ ЗАКРИТТЯ: Коли натискаємо поза вікном
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// 5. Знаходимо елементи форми
const bookingForm = document.getElementById("bookingForm");
const modalContent = document.querySelector(".modal-content");
// 6. ФУНКЦІЯ ОБРОБКИ ВІДПРАВКИ ФОРМИ
bookingForm.addEventListener('submit', function(event) {
    event.preventDefault(); // ✅ Запобігаємо стандартній відправці форми (перезавантаженню сторінки)

    // Імітація надсилання даних (тут має бути код для відправки на сервер)
    console.log("Formulardaten werden gesendet...");
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        price.classList.add('price-visible');
    });
    // 7. ЗАКРИВАЄМО ФОРМУ ТА ПОКАЗУЄМО ПОВІДОМЛЕННЯ
    // Очищуємо вміст модального вікна
    modalContent.innerHTML = `
        <span class="close-btn" onclick="modal.style.display='none';">&times;</span> 
        <h2 style="color: var(--color-primary);">Vielen Dank!</h2>
        <p>Ihre Anfrage zur Fahrzeugaufbereitung wurde erfolgreich gesendet.</p>
        <p>Wir werden Sie in Kürze unter der angegebenen Telefonnummer kontaktieren, um den Termin zu bestätigen.</p>
        <button class="btn-primary" onclick="modal.style.display='none';" style="width: 100%;">OK</button>
    `;
    
    // Перевіряємо, чи існує кнопка закриття після заміни HTML
    const newCloseBtn = modalContent.querySelector(".close-btn");
    if (newCloseBtn) {
        newCloseBtn.onclick = function() {
            modal.style.display = "none";
        };
    }
});
// =================================================
// 8. ПЛАВНИЙ СКРОЛІНГ (Smooth Scrolling)
// =================================================

// Знаходимо всі посилання, які починаються з '#'
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        
        // 1. Перевіряємо, чи є це посилання лише на "#" (наприклад, на модальне вікно)
        if (this.getAttribute('href') === '#') {
            return; // Якщо просто "#", нічого не робимо
        }
        
        // 2. Запобігаємо стандартній поведінці (стрибку)
        e.preventDefault();

        // 3. Знаходимо цільовий елемент за атрибутом href
        const targetElement = document.querySelector(this.getAttribute('href'));

        if (targetElement) {
            // 4. Виконуємо плавний скролінг до цього елемента
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth' // ✅ Це ключова властивість!
            });
        }
    });
});
// 9. З'ЯВЛЕННЯ ЕЛЕМЕНТІВ ПРИ СКРОЛІНГУ (Fade-in on Scroll)
// =================================================

// Знаходимо всі елементи з класом 'fade-in'
const fadeElements = document.querySelectorAll('.fade-in');

// Функція, яка перевіряє, чи елемент у зоні видимості
function checkVisibility() {
    // Встановлюємо "точку" (trigger point) - 80% висоти вікна
    const triggerBottom = window.innerHeight * 0.8; 

    fadeElements.forEach(element => {
        // Отримуємо позицію верхнього краю елемента відносно вікна
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            // Якщо верхня частина елемента піднялася вище 80% висоти вікна, робимо його видимим
            element.classList.add('visible');
        } 
        // Примітка: Ми не додаємо 'else', щоб елемент не зникав при скролінгу назад
    });
}

// 1. Додаємо слухача подій на скролінг та зміну розміру вікна
window.addEventListener('scroll', checkVisibility);
window.addEventListener('resize', checkVisibility);

// 2. Викликаємо функцію один раз при завантаженні сторінки, щоб показати видимі елементи
checkVisibility();