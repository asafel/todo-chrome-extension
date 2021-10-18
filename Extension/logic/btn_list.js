let taskData = [
    {
        text: 'Task test 1',
        completed: false,
        id: 1
    },
    {
        text: 'Task test 2',
        completed: true,
        id: 2
    }
]

const renderTasks = () => {
    const list = document.querySelector('#task-list-container');
    list.innerHTML = '';

    taskData
        .sort((x, y) => (x.completed === y.completed) ? 0 : x.completed ? 1 : -1)
        .forEach((task) => {
            const node = getTaskElement(task);
            list.append(node);
        })
};

const addNewTask = (text) => {
    taskData.push({
        text,
        completed: false,
        id: Date.now()
    })
    renderTasks();
}

const deleteTask = (taskId) => {
    taskData = taskData.filter((task) => task.id !== taskId);
    renderTasks();
};

const updateTask = (taskId, newText) => {
    // TODO: create update text logic
};

const completeTask = (taskId) => {
    const index = taskData.findIndex(task => task.id === taskId)
    if (index === -1) {
        return;
    }
    taskData[index].completed = !taskData[index].completed;
    renderTasks();
};

// This function creates a new task element for appending it to the list of tasks
const getTaskElement = (task) => {
    const { text, completed, id } = task;

    const node = document.createElement('div');
    node.setAttribute('class', `task-item ${completed ? 'done' : ''}`);
    node.setAttribute('data-key', id);

    // complete task side part
    const leftNode = document.createElement('div');
    leftNode.className = 'left-side-task';

    const checked = document.createElement('span');
    checked.className = 'material-icons';
    checked.style = 'cursor: pointer';
    checked.innerHTML = completed ? 'radio_button_checked' : 'radio_button_unchecked';
    checked.addEventListener('click', () => {
        console.log('completing! id: ', id)
        completeTask(id);
    })
    leftNode.appendChild(checked);

    const textSpan = document.createElement('span');
    textSpan.style = 'margin-left: 10px';
    textSpan.className = 'text-task';
    textSpan.innerHTML = text;
    leftNode.appendChild(textSpan);

    node.appendChild(leftNode);

    // Delete task side part
    const rightNode = document.createElement('div');
    rightNode.className = 'right-side-task';

    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'material-icons';
    deleteIcon.style = 'cursor: pointer';
    deleteIcon.innerHTML = 'delete';
    deleteIcon.addEventListener('click', () => {
        console.log('deleting! id: ', id)
        deleteTask(id);
    })

    rightNode.appendChild(deleteIcon);
    node.appendChild(rightNode);

    return node;
}

renderTasks();

// Add task event:
const form = document.querySelector('.task-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.querySelector('.task-todo-input');

    const text = input.value.trim();
    if (text !== '') {
        addNewTask(text);
        input.value = '';
        input.focus();
    }

    console.log(taskData);
});
