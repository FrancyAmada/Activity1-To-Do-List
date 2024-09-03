import './style.css'
import { createTask } from './task.ts'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="to_do_list">
    <h1>To Do List</h1>
    <div class="input_field">
      <input type="text" id="task_info_input">
      <button id="add_task">Add</button>
    </div>
    <ul id="tasks" class="no_bullets">
    </ul>
  </div>
`

const setupToDoListManager = () => {
  const app_list = document.querySelector<HTMLUListElement>('#tasks')!

  const setupTaskInput = (input_field: HTMLInputElement, add_task_button: HTMLButtonElement) => {
    const input_field_element = input_field

    const add_task = (new_task_info: string) => {
      if (new_task_info == '') {
        alert("Text input is empty!")
        return -1
      }
      createTask(new_task_info, app_list)
      input_field_element.value = ''
    }
    
    add_task_button.addEventListener('click', () => add_task(input_field_element.value))
  }

  setupTaskInput(document.querySelector<HTMLInputElement>('#task_info_input')!, document.querySelector<HTMLButtonElement>('#add_task')!)

}

setupToDoListManager()