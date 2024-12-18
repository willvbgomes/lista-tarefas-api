import { prisma } from '../database/prisma'
import { setNewError } from '../utils'

export const getAllLists = async () =>
  await prisma.list.findMany({
    include: {
      tasks: {
        select: {
          id: true,
          description: true,
          isCompleted: true,
        },
      },
    },
  })

export const getListById = async (id: string) =>
  await prisma.list.findUnique({
    where: { id },
    include: {
      tasks: {
        select: {
          id: true,
          description: true,
          isCompleted: true,
        },
      },
    },
  })

export const createNewList = async (title: string) => {
  const newList = await prisma.list.create({
    data: {
      title,
    },
  })

  return newList
}

export const renameList = async (id: string, newTitle: string) => {
  const list = await prisma.list.findUnique({
    where: { id },
  })

  if (!list) {
    throw setNewError('List not found.', 404)
  }

  const renamedList = await prisma.list.update({
    where: { id },
    data: {
      title: newTitle,
    },
  })

  return renamedList
}

export const deleteList = async (id: string) => {
  const list = await prisma.list.findUnique({
    where: { id },
  })

  if (!list) {
    throw setNewError('List not found.', 404)
  }

  await prisma.list.delete({
    where: { id },
  })
}
