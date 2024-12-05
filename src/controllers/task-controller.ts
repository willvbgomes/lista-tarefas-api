import { Request, Response } from 'express'
import { getListById } from '../models/list-model'
import * as taskModel from '../models/task-model'
import { handleError } from '../utils'

export const getTasks = (req: Request, res: Response) => {
  const { listId } = req.params

  try {
    const list = getListById(listId)

    if (!list) {
      res.status(404).json({ message: 'List not found.' })
      return
    }

    const tasks = taskModel.getAllTasks(list)

    res.status(200).json(tasks)
  } catch (error) {
    const errorMessage = handleError(error)

    res.status(500).json({ message: errorMessage })
  }
}

export const createTask = (req: Request, res: Response) => {
  const { listId } = req.params
  const taskBody = req.body

  try {
    const list = getListById(listId)

    if (!list) {
      res.status(404).json({ message: 'List not found.' })
      return
    }

    const task = taskModel.createNewTask(list, taskBody)

    res.status(201).json(task)
  } catch (error) {
    const errorMessage = handleError(error)

    res.status(500).json({ message: errorMessage })
  }
}

export const updateTask = (req: Request, res: Response) => {
  const { listId, taskId } = req.params

  try {
    const list = getListById(listId)

    if (!list) {
      res.status(404).json({ message: 'List not found.' })
      return
    }

    const task = taskModel.getTaskById(list, taskId)

    if (!task) {
      res.status(404).json({ message: 'Task not found.' })
      return
    }

    taskModel.toggleTask(task)

    res.status(200).json(task)
  } catch (error) {
    const errorMessage = handleError(error)

    res.status(500).json({ message: errorMessage })
  }
}

export const deleteTask = (req: Request, res: Response) => {
  const { listId, taskId } = req.params

  try {
    const list = getListById(listId)

    if (!list) {
      res.status(404).json({ message: 'List not found.' })
      return
    }

    const task = taskModel.getTaskById(list, taskId)

    if (!task) {
      res.status(404).json({ message: 'Task not found.' })
      return
    }

    taskModel.deleteTask(list, task)

    res.status(200).json({ message: 'The task has been successfully deleted.' })
  } catch (error) {
    const errorMessage = handleError(error)

    res.status(500).json({ message: errorMessage })
  }
}
