import { Router } from 'express'
import * as listController from '../controllers/list-controller'
import * as taskController from '../controllers/task-controller'

const router = Router()

router.get('/lists', listController.getLists)
router.post('/lists', listController.createList)
router.patch('/lists/:listId', listController.renameList)
router.delete('/lists/:listId', listController.deleteList)

router.get('/lists/:listId/tasks', taskController.getTasks)
router.post('/lists/:listId/tasks', taskController.createTask)
router.patch('/lists/:listId/tasks/:taskId', taskController.updateTask)
router.delete('/lists/:listId/tasks/:taskId', taskController.deleteTask)

export { router }
