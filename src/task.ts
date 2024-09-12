
import { saveTasks } from './storage.ts'
import { getCurrentDateTime } from './date_format.ts';

export type TaskData = {
    info: string;
    creation_date: string;
    creation_time: string;
    deadline_date: string;
    deadline_time: string;
    completed: boolean;
    expired: boolean;
    id: string;
}

export class Task {
    info: string;
    completed: boolean;
    expired: boolean;
    id: string;
    task_data: TaskData;
    tasks_array: Array<TaskData>;
    app_list: HTMLUListElement;
    list_item: HTMLLIElement;

    constructor(data: TaskData, app_list: HTMLUListElement, tasks_array: Array<TaskData>) {
        this.info = data.info;
        this.completed = data.completed;
        this.expired = data.expired;
        this.id = data.id;
        this.task_data = data
        this.tasks_array = tasks_array
        this.app_list = app_list;
        this.list_item = this.createListItem(data.info);
    }

    removeTask = () => {
        delete this.tasks_array[this.tasks_array.indexOf(this.task_data)]
        this.app_list.removeChild(this.list_item)
        saveTasks(this.tasks_array)
    }

    updateTask = (check_box: HTMLInputElement) => {
        var current_date_time = getCurrentDateTime()
        this.expired = checkExpiry(current_date_time[0], current_date_time[1], this.task_data.deadline_date, this.task_data.deadline_time)
        this.task_data.expired = this.expired

        if (!this.list_item) {
            return -1
        }

        if (!this.expired) {
            this.completed = !this.completed
            if (!this.completed) {
                check_box.checked = false
                this.list_item.setAttribute("class", "task")
            } else {
                check_box.checked = true
                this.list_item.setAttribute("class", "task completed")

            }
            this.task_data.completed = this.completed
        } else if (!this.completed) {
            check_box.checked = false
            this.list_item.setAttribute("class", "task expired")
        }
        
        this.tasks_array[this.tasks_array.indexOf(this.task_data)] = this.task_data
        saveTasks(this.tasks_array)
    }

    setupButtons = (task_li_element: HTMLLIElement, delete_button: HTMLButtonElement, check_box: HTMLInputElement) => {
        const check_box_element = check_box
        task_li_element.addEventListener('click', () => this.updateTask(check_box_element))
        delete_button.addEventListener('click', () => this.removeTask())
    }

    createListItem = (info: string) => {
        const li = document.createElement("li")
        const check_box = document.createElement("input")
        const info_text_element = document.createElement("p")
        const dates_div = document.createElement("div")
        const delete_button = document.createElement("button")

        li.setAttribute("id", this.id)
        if (!this.completed) {
            check_box.checked = false
            if (!this.expired) {
                li.setAttribute("class", "task")
            } else {
                check_box.checked = false
                li.setAttribute("class", "task expired")
            }
        } else {
            check_box.checked = true
            li.setAttribute("class", "task completed")
        }
        
        check_box.setAttribute("type", "checkbox")
        info_text_element.setAttribute("class", "taskInfo")
        dates_div.setAttribute("class", "task_date_content")
        delete_button.setAttribute("class", "delete")
        
        delete_button.textContent = "Delete"
        info_text_element.textContent = info
        dates_div.innerHTML = /*html*/ `
        <div class="date_time_separator">
            <div><p class="taskDateInfo">Created on:</p></div>
            <div>
                <p class="taskDateInfo">${this.task_data.creation_date}</p>
                <p class="taskDateInfo">${this.task_data.creation_time}</p>
            </div>
        </div>
        <div class="date_time_separator">
            <div><p class="taskDateInfo">Deadline:</p></div>
            <div>
                <p class="taskDateInfo">${this.task_data.deadline_date}</p>
                <p class="taskDateInfo">${this.task_data.deadline_time}</p>
            </div>
        </div>
        `

        li.appendChild(check_box)
        li.appendChild(info_text_element)
        li.appendChild(dates_div)
        li.appendChild(delete_button)

        this.setupButtons(li, delete_button, check_box)
        return li
    }
}


export const addTaskToList = (task_data: TaskData, app_list: HTMLUListElement, tasks_array: Array<TaskData>) => {
    app_list.appendChild(new Task(task_data, app_list, tasks_array).list_item)
}

const checkExpiry = (current_date: string, current_time: string, task_deadline_date: string, task_deadline_time: string) => {
    if (current_date === task_deadline_date) {
        var separated_current_time = current_time.split(":")
        var current_hour = Number(separated_current_time[0])
        var current_minutes = Number(separated_current_time[1])
        var separated_deadline_time = task_deadline_time.split(":")
        var deadline_hour = Number(separated_deadline_time[0])
        var deadline_minutes = Number(separated_deadline_time[1])
        if (current_hour >= deadline_hour) {
            if (current_minutes >= deadline_minutes) {
                return true
            } else {
                return false
            }
        }
    }
    else {
        var date_current = new Date(current_date)
        var date_deadline = new Date(task_deadline_date)
        if (date_current.getTime() > date_deadline.getTime()) {
            return true
        }
    }
    return false
}

export const createTask = (task_info: string, creation_date: string, creation_time: string, task_deadline_date: string, task_deadline_time: string) => {
    var new_task: TaskData = {
        info: task_info,
        creation_date: creation_date,
        creation_time: creation_time,
        deadline_date: task_deadline_date,
        deadline_time: task_deadline_time,
        expired: checkExpiry(creation_date, creation_time, task_deadline_date, task_deadline_time),
        completed: false,
        id: task_info.replace(/\s+/g, ''),
    }
    return new_task
}
