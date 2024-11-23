// Variables de las tarjetas y formulario
const cards = document.querySelectorAll('.card');
const slideForm = document.getElementById('slide-form');
const closeFormBtn = document.getElementById('close-form-btn');
const addVisitBtn = document.getElementById('add-visit-btn');
const visitsTable = document.getElementById('visits-table').getElementsByTagName('tbody')[0];

// Función para abrir el formulario y cargar los datos de la tarjeta
cards.forEach(card => {
    card.addEventListener('click', () => {
        const companyName = card.querySelector('.company-name').textContent;
        const supplierName = card.querySelector('.supplier-name').textContent;
        const budgetAmount = card.querySelector('.budget-amount').textContent;

        // Cargar los valores al formulario
        document.getElementById('company-name').value = companyName;
        document.getElementById('supplier').value = supplierName;
        document.getElementById('budget-value').value = budgetAmount.replace('USD', '').trim();

        // Abrir el formulario
        slideForm.classList.add('open');
    });
});

// Función para cerrar el formulario
closeFormBtn.addEventListener('click', () => {
    slideForm.classList.remove('open');
});

// Función para agregar una fila de visita
addVisitBtn.addEventListener('click', () => {
    const visitDate = prompt('Ingrese la fecha de la visita (YYYY-MM-DD):');
    const visitComment = prompt('Ingrese el comentario de la visita:');

    if (visitDate && visitComment) {
        const newRow = visitsTable.insertRow();
        const dateCell = newRow.insertCell(0);
        const commentCell = newRow.insertCell(1);

        dateCell.textContent = visitDate;
        commentCell.textContent = visitComment;
    } else {
        alert('Por favor ingrese todos los datos de la visita.');
    }
});

// Variables del formulario y tabla
const saveCommentBtn = document.getElementById('save-comment-btn');
const commentText = document.getElementById('comment-text');
const commentsTable = document.getElementById('comments-table').getElementsByTagName('tbody')[0];

// Función para agregar un comentario
saveCommentBtn.addEventListener('click', () => {
    const comment = commentText.value.trim();
    
    if (comment) {
        const newRow = commentsTable.insertRow();
        const dateCell = newRow.insertCell(0);
        const commentCell = newRow.insertCell(1);
        
        const currentDate = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
        
        dateCell.textContent = currentDate;
        commentCell.textContent = comment;

        // Limpiar el textarea después de agregar el comentario
        commentText.value = '';
    } else {
        alert('Por favor, ingrese un comentario antes de guardar.');
    }
});
