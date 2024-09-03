

export class Task {
    info: string;
    completed: boolean;
    app_list: HTMLUListElement;
    list_item: HTMLLIElement

    constructor(info: string, app_list: HTMLUListElement) {
        this.info = info;
        this.completed = false;
        this.app_list = app_list
        this.list_item = this.createListItem(info)
    }

    removeTask = () => {
        this.app_list.removeChild(this.list_item)
    }

    updateTask = () => {
        this.completed = !this.completed
        if (!this.completed) {
            const content = this.list_item.getElementsByClassName('task completed').item(0)!
            content.setAttribute("class", "task")
        } else {
            const content = this.list_item.getElementsByClassName('task').item(0)!
            content.setAttribute("class", "task completed")
        }
    }

    setupButtons = (check_button: HTMLButtonElement, delete_button: HTMLButtonElement) => {
        check_button.addEventListener('click', () => this.updateTask())
        delete_button.addEventListener('click', () => this.removeTask())
    }

    createListItem = (info: string) => {
        const li = document.createElement("li")
        const content = document.createElement("div")
        const info_text_element = document.createElement("p")
        const check_button = document.createElement("button")
        const delete_button = document.createElement("button")

        li.setAttribute("id", info.replace(/\s+/g, ''))
        content.setAttribute("class", "task")
        info_text_element.setAttribute("class", "taskInfo")
        check_button.setAttribute("class", "taskCompletionButton")
        delete_button.setAttribute("class", "delete")
        
        delete_button.textContent = "Delete"
        info_text_element.textContent = info

        check_button.appendChild(info_text_element)
        content.appendChild(check_button)
        content.appendChild(delete_button)
        li.appendChild(content)

        this.setupButtons(check_button, delete_button)
        return li
    }
}


export const createTask = (task_info: string, app_list: HTMLUListElement) => {
    app_list.appendChild(new Task(task_info, app_list).list_item)
}

