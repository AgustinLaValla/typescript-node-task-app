import { Router, Request, Response } from 'express';
import { Document } from 'mongoose'
import Task from '../models/Task';
import _ from 'underscore';

class TaskRoutes {

    public router: Router;

    constructor() { 
        this.router = Router();
        this.routes();
    }

    getCreateTasks(req: Request, res: Response) { 
        res.render('tasks/create');
    }

    async postTask(req: Request, res: Response): Promise<void> { 
        const { title, description } = req.body;
        const newTask = new Task({title, description});
        await newTask.save();
        res.redirect('/tasks/list');
    }

    
    async getList(req: Request, res: Response) {
        const tasks = await Task.find()
        const tasksDocuments = tasks.map((task) => {
            return { 
                title: task['title'],
                description: task['description'],
                _id: task['_id']
            }
        });
        res.render('tasks/list', {tasks: tasksDocuments})
    }
    
    async editTask(req:Request, res:Response): Promise<void> {
        let taskArray = [];
        const { id } = req.params; 
        const task = await Task.findById(id);
        taskArray.push(task);
        res.render('tasks/edit', { task: taskArray.map(task => task.toJSON()) });
    }

    async updateTask(req:Request, res: Response): Promise<void> {
        const { body } = req;
        const { id } = req.params;
        await Task.findByIdAndUpdate(id, body);
        res.redirect('/tasks/list');
     }

    async deleteTask(req: Request, res: Response) { 
        const { id } = req.params;
        await Task.findByIdAndRemove(id);
        res.redirect('/tasks/list')
    }

    routes() { 
        this.router.route('/create').get(this.getCreateTasks)
                                    .post(this.postTask);
        this.router.route('/list').get(this.getList);
        this.router.route('/edit/:id').get(this.editTask)
                                      .post(this.updateTask)
        this.router.route('/delete/:id').get(this.deleteTask)
    }
}

const taskRoutes = new TaskRoutes();
export default taskRoutes.router;