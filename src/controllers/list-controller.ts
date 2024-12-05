import { Request, Response } from 'express'
import * as listModel from '../models/list-model'
import { handleError } from '../utils'

export const getLists = (_req: Request, res: Response) => {
  try {
    const lists = listModel.getAllLists()

    res.status(200).json(lists)
  } catch (error: unknown) {
    const errorMessage = handleError(error)

    res.status(500).json({ message: errorMessage })
  }
}

export const createList = (req: Request, res: Response) => {
  const { title } = req.body

  try {
    const newList = listModel.createNewList(title)

    res.status(201).json(newList)
  } catch (error: unknown) {
    const errorMessage = handleError(error)

    res.status(500).json({ message: errorMessage })
  }
}

export const renameList = (req: Request, res: Response) => {
  const { listId } = req.params
  const { newTitle } = req.body

  try {
    const list = listModel.getListById(listId)

    if (!list) {
      res.status(404).json('List not found.')
      return
    }

    const renamedList = listModel.setNewTitle(list, newTitle)

    res.status(200).json(renamedList)
  } catch (error: unknown) {
    const errorMessage = handleError(error)

    res.status(500).json({ message: errorMessage })
  }
}

export const deleteList = (req: Request, res: Response) => {
  const { listId } = req.params

  try {
    const list = listModel.getListById(listId)

    if (!list) {
      res.status(404).json('List not found.')
      return
    }

    listModel.deleteList(list)

    res.status(200).json({ message: 'The list has been successfully deleted.' })
  } catch (error: unknown) {
    const errorMessage = handleError(error)

    res.status(500).json({ message: errorMessage })
  }
}
