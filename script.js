// =================================================
// 1. ОГОЛОШЕННЯ ЗМІННИХ (Всі в одному місці)
// =================================================

// 1. Знаходимо елементи (Змінні)
// Шукаємо модальне вікно за його ID
const modal = document.getElementById("bookingModal"); // <--- ЦЕЙ РЯДОК РОБИТЬ modal ДОСТУПНИМ
// Шукаємо червону кнопку "Termin vereinbaren" за її класом
const btn = document.querySelector(".btn-primary"); 
// Шукаємо кнопку закриття "X"
const span = document.getElementsByClassName("close-btn")[0]; 
// Змінна форми
const bookingForm = document.getElementById("bookingForm");
// Змінна вмісту модального вікна
const modalContent = document.querySelector(".modal-content");

// =================================================
// 2-4. Функціонал модального вікна 
// =================================================

// 2. ФУНКЦІЯ ВІДКРИТТЯ
btn.onclick = function() {
  modal.style.display = "block";
}

// 3. ФУНКЦІЯ ЗАКРИТТЯ: Коли натискаємо на "X"
span.onclick = function() {
  modal.style.display = "none";
}

// 4. ФУНКЦІЯ ЗАКРИТТЯ: Коли натискаємо поза вікном
window.onclick = function(event) {
  if (event.target == modal) { // <--- ТУТ modal ПРАЦЮЄ, БО ОГОЛОШЕНИЙ ВИЩЕ
    modal.style.display = "none";
  }
}


//6. ФУНКЦІЯ ОБРОБКИ ВІДПРАВКИ ФОРМИ (AJAX/FETCH - ВИПРАВЛЕНО)
bookingForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // ✅ Зупиняємо стандартну відправку

    const form = event.target;
    const data = new FormData(form);
    
    // ВАЖЛИВО: Form action вже має містити Formspree URL.
    const formspreeUrl = form.action; 

    try {
        const response = await fetch(formspreeUrl, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json' // Formspree вимагає цей заголовок для AJAX
            }
        });

        if (response.ok) { // 200 OK
            // Успішне відправлення
            form.reset(); // Очищуємо форму
            
            // 7. ПОКАЗУЄМО ПОВІДОМЛЕННЯ ПРО УСПІХ
            modalContent.innerHTML = `
                <span class="close-btn" onclick="modal.style.display='none';">&times;</span> 
                <h2 style="color: var(--color-primary);">Vielen Dank!</h2>
                <p>Ihre Anfrage zur Fahrzeugaufbereitung wurde erfolgreich gesendet.</p>
                <p>Wir werden Sie in Kürze unter der angegebenen Telefonnummer kontaktieren, um den Termin zu bestätigen.</p>
                <button class="btn-primary" onclick="modal.style.display='none';" style="width: 100%;">OK</button>
            `;
            
            // Додатково оновлюємо обробник закриття для нової кнопки (ТЕПЕР ТІЛЬКИ ОДИН РАЗ)
           
           
        } else {
            // Помилка відправки (наприклад, помилка валідації на Formspree)
            alert("Beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.");
        }
    } catch (error) {
        console.error("Помилка відправки форми:", error);
        alert("Ein unerwarteter Fehler ist aufgetreten.");
    }
    
    // Додаємо клас .price-visible (якщо потрібно)
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        price.classList.add('price-visible');
    });
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