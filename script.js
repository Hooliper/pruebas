// Variables para las columnas y tarjetas
const columns = document.querySelectorAll('.column');
const cards = document.querySelectorAll('.card');

// Al cargar la página, recuperar el estado guardado desde localStorage
document.addEventListener('DOMContentLoaded', () => {
    loadSavedState(); // Cargar las posiciones de las tarjetas guardadas
});

// Añadir los manejadores de eventos a las tarjetas
cards.forEach(card => {
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
});

// Añadir los manejadores de eventos a las columnas
columns.forEach(column => {
    column.addEventListener('dragover', handleDragOver);
    column.addEventListener('dragenter', handleDragEnter);
    column.addEventListener('dragleave', handleDragLeave);
    column.addEventListener('drop', handleDrop);
});

// Función para cuando el arrastre comienza
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.classList.add('dragging');
}

// Función para cuando el arrastre termina
function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

// Función para permitir que se pueda soltar
function handleDragOver(e) {
    e.preventDefault();
    if (e.target.classList.contains('column')) {
        e.target.classList.add('drag-over');
    }
}

// Función para manejar la entrada del arrastre en la columna
function handleDragEnter(e) {
    e.preventDefault();
    if (e.target.classList.contains('column')) {
        e.target.classList.add('drag-over');
    }
}

// Función para manejar cuando el arrastre sale de la columna
function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
}

// Función para manejar cuando se suelta una tarjeta en la columna
function handleDrop(e) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const draggedCard = document.getElementById(draggedId);
    const targetColumn = e.target;

    // Verifica si el destino es una columna válida y no una tarjeta
    if (targetColumn.classList.contains('column') && targetColumn !== draggedCard.parentElement) {
        targetColumn.appendChild(draggedCard);

        // Guardar el nuevo estado de las tarjetas
        saveState();
    }

    targetColumn.classList.remove('drag-over');
}

// Función para guardar el estado en localStorage
function saveState() {
    const columnStates = {};

    columns.forEach(column => {
        const cardIds = Array.from(column.children).map(card => card.id);
        columnStates[column.id] = cardIds;
    });

    localStorage.setItem('columnState', JSON.stringify(columnStates));
}

// Función para cargar el estado desde localStorage
function loadSavedState() {
    const savedState = localStorage.getItem('columnState');

    if (savedState) {
        const columnStates = JSON.parse(savedState);

        // Restaurar las tarjetas en sus posiciones guardadas
        for (let columnId in columnStates) {
            const column = document.getElementById(columnId);
            const savedCardIds = columnStates[columnId];

            savedCardIds.forEach(cardId => {
                const card = document.getElementById(cardId);
                if (card) {
                    column.appendChild(card);
                }
            });
        }
    }
}

// Agregar un evento para guardar el título cuando el usuario termine de editarlo
document.querySelectorAll('.column-title').forEach(title => {
    title.addEventListener('blur', (e) => {
        saveColumnTitle(e.target.id, e.target.textContent);
    });
});

// Función para guardar el título en localStorage
function saveColumnTitle(columnId, title) {
    let savedTitles = JSON.parse(localStorage.getItem('columnTitles')) || {};
    savedTitles[columnId] = title;
    localStorage.setItem('columnTitles', JSON.stringify(savedTitles));
}

// Función para cargar los títulos guardados al iniciar la página
function loadColumnTitles() {
    const savedTitles = JSON.parse(localStorage.getItem('columnTitles'));
    if (savedTitles) {
        Object.keys(savedTitles).forEach(columnId => {
            const columnTitle = document.getElementById(columnId).querySelector('.column-title');
            if (columnTitle) {
                columnTitle.textContent = savedTitles[columnId];
            }
        });
    }
}

// Llamar a la función para cargar los títulos al cargar la página
document.addEventListener('DOMContentLoaded', loadColumnTitles);

document.querySelectorAll('.column-title').forEach(title => {
    title.addEventListener('blur', (e) => {
        saveColumnTitle(e.target.id, e.target.textContent);
    });
    // Hacer que el título se ajuste a su contenido
    title.addEventListener('input', (e) => {
        e.target.style.height = 'auto'; // Restablece la altura para permitir que se ajuste
        e.target.style.height = (e.target.scrollHeight) + 'px'; // Ajusta la altura según el contenido
    });
});
