class TodosController {
  constructor() {
    this.initForm();
    this.renderTodos();
  }

  initForm() {
    const formEl = document.getElementById('todo-form');
    formEl.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const todoName = ev.target.elements['name'].value;
      this.postNewTodo(todoName);
    });
  }

  async renderTodos() {
    const todosEl = document.getElementById('todos');
    todosEl.innerHTML = '';
    const todos = await this.getTodos();
    todosEl.innerHTML = `
      ${todos
        .map(
          (todo) => `
            <div class="todo" id="todo-${todo.id}">
              <p contenteditable="true">${todo.name}</p>
              <input type="checkbox" />
            </div>
          `,
        )
        .reduce((acc, curr) => acc.concat(curr), '')}
    `;

    Array.from(todosEl.children).forEach((todo) => {
      const id = parseInt(todo.id.split('todo-')[1], 10);
      const textEl = todo.firstElementChild;
      const checkboxEl = todo.lastElementChild;

      checkboxEl.addEventListener('change', (ev) => {
        if (ev.target.checked) {
          this.deleteTodo(id);
        }
      });

      textEl.addEventListener('focusout', (ev) => {
        this.updateTodo(id, ev.target.innerText);
      });
    });
  }

  async getTodos() {
    const response = await fetch('/todos');
    const result = await response.json();
    return result.data;
  }

  async postNewTodo(name) {
    const response = await fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.status === 201) {
      this.renderTodos();
    }
  }

  async updateTodo(id, name) {
    await fetch(`/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
  }

  async deleteTodo(id) {
    const response = await fetch(`/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.status === 200) {
      this.renderTodos();
    }
  }
}

const todosController = new TodosController();
