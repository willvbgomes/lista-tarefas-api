import { Request, Response } from 'express'
import { getListById } from '../models/list-model'
import * as taskModel from '../models/task-model'
import { handleError } from '../utils'

export const getTasks = async (req: Request, res: Response) => {
  const { listId } = req.params

  try {
    const list = await getListById(listId)

    if (!list) {
      res.status(404).json({ message: 'List not found.' })
      return
    }

    res.status(200).json(list.tasks)
  } catch (error: unknown) {
    const { errorMessage, errorStatus } = handleError(error)

    res.status(errorStatus).json({ message: errorMessage })
  }
}

export const createTask = async (req: Request, res: Response) => {
  const { listId } = req.params
  const { description } = req.body

  try {
    const task = await taskModel.createNewTask(listId, description)

    res.status(201).json(task)
  } catch (error: unknown) {
    const { errorMessage, errorStatus } = handleError(error)

    res.status(errorStatus).json({ message: errorMessage })
  }
}

export const updateTask = async (req: Request, res: Response) => {
  const { listId, taskId } = req.params

  try {
    const task = await taskModel.toggleTask(listId, taskId)

    res.status(200).json(task)
  } catch (error: unknown) {
    const { errorMessage, errorStatus } = handleError(error)

    res.status(errorStatus).json({ message: errorMessage })
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  const { listId, taskId } = req.params

  try {
    await taskModel.deleteTask(listId, taskId)

    res.status(200).json({ message: 'The task has been successfully deleted.' })
  } catch (error: unknown) {
    const { errorMessage, errorStatus } = handleError(error)

    res.status(errorStatus).json({ message: errorMessage })
  }
}
