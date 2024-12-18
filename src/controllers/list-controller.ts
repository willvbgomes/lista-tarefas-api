import { Request, Response } from 'express'
import * as listModel from '../models/list-model'
import { handleError } from '../utils'

export const getLists = async (_req: Request, res: Response) => {
  try {
    const lists = await listModel.getAllLists()

    res.status(200).json(lists)
  } catch (error: unknown) {
    const { errorMessage, errorStatus } = handleError(error)

    res.status(errorStatus).json({ message: errorMessage })
  }
}

export const createList = async (req: Request, res: Response) => {
  const { title } = req.body

  try {
    const newList = await listModel.createNewList(title)

    res.status(201).json(newList)
  } catch (error: unknown) {
    const { errorMessage, errorStatus } = handleError(error)

    res.status(errorStatus).json({ message: errorMessage })
  }
}

export const updateList = async (req: Request, res: Response) => {
  const { listId } = req.params
  const { newTitle } = req.body

  try {
    const updatedList = await listModel.renameList(listId, newTitle)

    res.status(200).json(updatedList)
  } catch (error: unknown) {
    const { errorMessage, errorStatus } = handleError(error)

    res.status(errorStatus).json({ message: errorMessage })
  }
}

export const deleteList = async (req: Request, res: Response) => {
  const { listId } = req.params

  try {
    await listModel.deleteList(listId)

    res.status(200).json({ message: 'The list has been successfully deleted.' })
  } catch (error: unknown) {
    const { errorMessage, errorStatus } = handleError(error)

    res.status(errorStatus).json({ message: errorMessage })
  }
}
