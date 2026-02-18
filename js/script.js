const form = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const todoList = document.getElementById("todoList");
const filter = document.getElementById("filter");
const deleteAllBtn = document.getElementById("deleteAll");

let todos = [];

form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (taskInput.value === "" || dateInput.value === "") {
        alert("Semua field harus diisi!");
        return;
    }

    const todo = {
        id: Date.now(),
        task: taskInput.value,
        date: dateInput.value,
        completed: false
    };

    todos.push(todo);
    renderTodos();
    form.reset();
});

function renderTodos() {
    todoList.innerHTML = "";

    const filteredTodos = todos.filter(todo => {
        if (filter.value === "completed") return todo.completed;
        if (filter.value === "pending") return !todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="${todo.completed ? 'completed' : ''}">${todo.task}</td>
            <td>${todo.date}</td>
            <td>${todo.completed ? 'Selesai' : 'Belum'}</td>
            <td>
                <button onclick="toggleStatus(${todo.id})">✔</button>
                <button onclick="deleteTodo(${todo.id})">❌</button>
            </td>
        `;

        todoList.appendChild(row);
    });
}

function toggleStatus(id) {
    todos = todos.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

deleteAllBtn.addEventListener("click", function() {
    todos = [];
    renderTodos();
});


filter.addEventListener("change", renderTodos);
