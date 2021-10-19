const serverUrl = 'http://localhost:3000';
let taskData = [];

const renderTasks = () => {
    const list = document.querySelector('#task-list-container');
    list.innerHTML = '';

    taskData
        .sort((x, y) => (x.completed === y.completed) ? 0 : x.completed ? 1 : -1)
        .forEach((task) => {
            const node = getTaskElement(task);
            list.append(node);
        });
};

const addNewTask = (text) => {
    const newTask = {
        text,
        completed: false,
        id: Date.now()
    };

    fetch(serverUrl, {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => {
            taskData.push(newTask)
            renderTasks();
        })
        .catch((err) => {
            console.log('Could not create task', err);
        })
}

const deleteTask = (taskId) => {
    fetch(serverUrl, {
        method: 'DELETE',
        body: JSON.stringify({ taskId }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => {
            taskData = taskData.filter((task) => task.id !== taskId);
            renderTasks();
        })
        .catch((err) => {
            console.log('Could not delete task', err);
        })
};

const updateTask = (taskId, newText) => {
    // TODO: create update text logic
};

const completeTask = (task) => {
    const index = taskData.findIndex(data => data.id === task.id)
    if (index === -1) {
        return;
    }
    const newTask = { ...task, completed: !taskData[index].completed };
    fetch(serverUrl, {
        method: 'PUT',
        body: JSON.stringify(newTask),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => {
            taskData[index].completed = !taskData[index].completed;
            renderTasks();
        })
        .catch((err) => {
            console.log('Could not update task', err);
        });
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

    const completedCircle = document.createElement('span');
    completedCircle.className = 'material-icons';
    completedCircle.style = 'cursor: pointer';
    completedCircle.innerHTML = completed ? 'radio_button_checked' : 'radio_button_unchecked';
    completedCircle.addEventListener('click', () => completeTask(task));
    leftNode.appendChild(completedCircle);

    // TODO: Update the text span to be a text input for updting it later (static at the moment)
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
    deleteIcon.addEventListener('click', () => deleteTask(id))

    const editIcon = document.createElement('span');
    editIcon.className = 'material-icons';
    editIcon.style = 'cursor: pointer';
    editIcon.innerHTML = 'edit';
    editIcon.addEventListener('click', () => console.log('editing! id: ', id));

    rightNode.appendChild(editIcon);
    rightNode.appendChild(deleteIcon);
    node.appendChild(rightNode);

    return node;
}

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
});

const getTaskDataFromServer = () => {
    fetch(serverUrl)
        .then(res => res.json())
        .then((data) => {
            taskData = data;
            renderTasks();
        })
        .catch((error) => {
            console.log('Error getting data from server:', error);
        })
};

getTaskDataFromServer();
