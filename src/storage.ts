import { TaskData } from './task.ts'


export const saveTasks = (tasks_data: Array<TaskData>) => {
    // console.log(JSON.stringify(Array.from(tasks_data.entries())))
    console.log("SAVED: ", tasks_data)
    localStorage.setItem('tasks', JSON.stringify(tasks_data))
    // window.location.reload()
}

export const loadTasks = () => {
    var stored_tasks: string | null = localStorage.getItem('tasks')
    console.log("LOADED: ", stored_tasks)
    
    if (!stored_tasks) return []

    var parsed_tasks_data = JSON.parse(stored_tasks)
    var parsed_tasks_array: Array<TaskData> = []

    parsed_tasks_data.forEach((item: { info: any; creation_date: any; creation_time: any; deadline_date: any; deadline_time: any; completed: any; expired: any; id: any }) => {
        if (!item) {
            return
        }
        var data: TaskData = {
            info: item.info,
            creation_date: item.creation_date,
            creation_time: item.creation_time,
            deadline_date: item.deadline_date,
            deadline_time: item.deadline_time,
            completed: item.completed,
            expired: item.expired,
            id: item.id,
        }
        parsed_tasks_array.push(data)
    })

    return parsed_tasks_array
}