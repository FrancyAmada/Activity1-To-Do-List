import { TaskData } from "./task";



export const sortByCompleted = (tasks_array: Array<TaskData>) => {
    if (!tasks_array) {
        return tasks_array
    }
    return tasks_array.filter(data => data.completed)
}

export const sortByExpired = (tasks_array: Array<TaskData>) => {
    if (!tasks_array) {
        return tasks_array
    }
    return tasks_array.filter(data => data.expired && !data.completed)
}

export const sortByEarliest = (tasks_array: Array<TaskData>) => {
    if (!tasks_array) {
        return tasks_array
    }
    var sorted_array: Array<TaskData> = []
    for (let i = tasks_array.length - 1; i >= 0; i--) {
        sorted_array.push(tasks_array[i]);
    }
    return sorted_array
}