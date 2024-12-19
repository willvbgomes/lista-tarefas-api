import { prisma } from '../database/prisma'
import { setNewError } from '../utils'
import { getListById } from './list-model'

export const createNewTask = async (listId: string, description: string) => {
  const list = await getListById(listId)

  if (!list) {
    throw setNewError('List not found.', 404)
  }

  const newTask = await prisma.$transaction(async prisma => {
    const task = await prisma.task.create({
      data: {
        description,
        listId,
      },
    })

    await prisma.list.update({
      where: { id: listId },
      data: {
        totalTasks: { increment: 1 },
      },
    })

    return task
  })

  return newTask
}

export const toggleTask = async (listId: string, taskId: string) => {
  const list = await getListById(listId)

  if (!list) {
    throw setNewError('List not found.', 404)
  }

  const updatedTask = prisma.$transaction(async prisma => {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    })

    if (!task) {
      throw setNewError('Task not found.', 404)
    }

    const toggledTask = prisma.task.update({
      where: { id: taskId },
      data: {
        isCompleted: !task?.isCompleted,
      },
    })

    return toggledTask
  })

  return updatedTask
}

export const deleteTask = async (listId: string, taskId: string) => {
  const list = await getListById(listId)

  if (!list) {
    throw setNewError('List not found.', 404)
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId },
  })

  if (!task) {
    throw setNewError('Task not found.', 404)
  }

  await prisma.$transaction(async prisma => {
    await prisma.task.delete({
      where: { id: taskId },
    })

    await prisma.list.update({
      where: { id: listId },
      data: {
        totalTasks: { decrement: 1 },
      },
    })
  })
}
