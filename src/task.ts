

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

    updateTask = (check_box: HTMLInputElement) => {
        this.completed = !this.completed
        if (!this.completed) {
            check_box.checked = false
            const content = this.list_item.getElementsByClassName('task completed').item(0)!
            content.setAttribute("class", "task")
        } else {
            check_box.checked = true
            const content = this.list_item.getElementsByClassName('task').item(0)!
            content.setAttribute("class", "task completed")
        }
    }

    setupButtons = (task_content: HTMLDivElement, delete_button: HTMLButtonElement, check_box: HTMLInputElement) => {
        const check_box_element = check_box

        task_content.addEventListener('click', () => this.updateTask(check_box_element))
        delete_button.addEventListener('click', () => this.removeTask())
    }

    createListItem = (info: string) => {
        const li = document.createElement("li")
        const content = document.createElement("div")
        const check_box = document.createElement("input")
        const info_text_element = document.createElement("p")
        const delete_button = document.createElement("button")

        li.setAttribute("id", info.replace(/\s+/g, ''))
        content.setAttribute("class", "task")
        check_box.setAttribute("type", "checkbox")
        info_text_element.setAttribute("class", "taskInfo")
        delete_button.setAttribute("class", "delete")
        
        delete_button.textContent = "Delete"
        info_text_element.textContent = info

        content.appendChild(check_box)
        content.appendChild(info_text_element)
        content.appendChild(delete_button)
        li.appendChild(content)

        this.setupButtons(content, delete_button, check_box)
        return li
    }
}


export const createTask = (task_info: string, app_list: HTMLUListElement) => {
    app_list.appendChild(new Task(task_info, app_list).list_item)
}

