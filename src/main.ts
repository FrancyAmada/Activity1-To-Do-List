import './style.css'
import { TaskData, createTask, addTaskToList} from './task.ts'
import { saveTasks, loadTasks } from './storage.ts'
import { getCurrentDateTime } from './date_format.ts'
import { sortByCompleted, sortByEarliest, sortByExpired } from './sorting.ts'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = /*html*/ `
  <div class="to_do_list">
    <h1>To Do List</h1>
    <div class="input_field">
      <div>
        <input type="text" id="task_info_input">
        <button id="add_task">Add</button>
      </div>
      <div>
        Deadline
        <input type="date" id="deadline_date_input">
        <input type="time" id="deadline_time_input">
      </div>
    </div>
    <div class="sortMenuDiv">
      Sort By
      <select name="sort" id="sortmenu" class="sortMenu">
        <option value="oldest">Oldest</option>
        <option value="earliest">Earliest</option>
        <option value="completed">Completed</option>
        <option value="expired">Expired</option>
      </select>
      <button id="sort_tasks" class="sort_button">Sort</button>
    </div>
    <ul id="tasks" class="no_bullets">
    </ul>
  </div>
`

const setupToDoListManager = () => {
  const app_list = document.querySelector<HTMLUListElement>('#tasks')!
  const sort_selection = document.querySelector<HTMLSelectElement>('#sortmenu')!
  var tasks_array: Array<TaskData> = []
  var display_tasks_array: Array<TaskData> = []

  const loadTasksFromStorage = () => {
    var loaded_tasks = loadTasks()
    console.log(loaded_tasks)
    if (loaded_tasks) {
      tasks_array = loaded_tasks
      display_tasks_array = loaded_tasks
      display_tasks_array.forEach(taskData => {
        addTaskToList(taskData, app_list, tasks_array)
      })
    }
  }

  const sortTasks = (sort_option: string) => {
    app_list.innerHTML = ''
    switch (sort_option) {
      case 'oldest':
        display_tasks_array = tasks_array
        break
      case 'earliest':
        display_tasks_array = sortByEarliest(tasks_array)
        break
      case 'completed':
        display_tasks_array = sortByCompleted(tasks_array)
        break
      case 'expired':
        display_tasks_array = sortByExpired(tasks_array)
        break
      
    }
    display_tasks_array.forEach(taskData => {
      addTaskToList(taskData, app_list, tasks_array)
    })
  }

  const setupSorter = (sort_button: HTMLButtonElement) => {
    sort_button.addEventListener('click', () => sortTasks(sort_selection.value))
  }

  const setupTaskInput = (input_field: HTMLInputElement, deadline_input: HTMLInputElement, deadline_time: HTMLInputElement, add_task_button: HTMLButtonElement) => {
    const input_field_element = input_field

    const add_task = (new_task_info: string, deadline_date: string, deadline_time: string) => {
      console.log(deadline_date, deadline_time)
      if (new_task_info == '') {
        alert("Task Input is empty!")
        return -1
      } else if (deadline_date == '') {
        alert("Deadline Date is not set!")
        return -1
      } else if (deadline_time == '') {
        alert("Deadline Time is not set!")
        return -1
      }
      
      var current_date_time = getCurrentDateTime()
      let new_task_data: TaskData = createTask(new_task_info, current_date_time[0], current_date_time[1], deadline_date, deadline_time)
      tasks_array.push(new_task_data)
      
      sortTasks(sort_selection.value)
      input_field_element.value = ''
      saveTasks(tasks_array)
    }
    
    add_task_button.addEventListener('click', () => add_task(input_field_element.value, deadline_input.value, deadline_time.value))
  }

  // saveTasks(tasks_array)
  loadTasksFromStorage()
  setupSorter(document.querySelector<HTMLButtonElement>('#sort_tasks')!)
  setupTaskInput(document.querySelector<HTMLInputElement>('#task_info_input')!, document.querySelector<HTMLInputElement>('#deadline_date_input')!, document.querySelector<HTMLInputElement>('#deadline_time_input')!, document.querySelector<HTMLButtonElement>('#add_task')!)
}

setupToDoListManager()