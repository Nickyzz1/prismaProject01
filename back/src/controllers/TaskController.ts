import { Request, Response, NextFunction, json } from 'express';
import {ITask} from '../model/task.ts';
import mongoose from 'mongoose';
 export const createTask = async (req: Request, res: Response): Promise<void> => {
  
export const createTask = (taskData : ITask)  => { 
  try {
    const {title, description, completed, createdAt, updatedAt } = req.body;

    const newTask = new ITask({title, description, completed, createdAt, updatedAt });
    await newTask.save();

    res.status(201).send(`tarefa criada com sucesso!`);

  } catch (error) {
   
    res.status(500).send( `Internal server error ${error}`);
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await ITask.find(); // Encontrar todos os usuários no banco de dados
        res.status(200).json(tasks); // Retorna os usuários como resposta
    } catch (error) {
      res.status(404).send('Not found')
    }
  };
  
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId = req.params.id; 
  
      const deleteTask = await ITask.findByIdAndDelete(taskId); // Exclui o usuário pelo ID
  
      if (!deleteTask) {
        res.status(404).send("Usuário não encontrado.");
      }
  
      res.status(200).send(`Usuário ${taskId} excluído com sucesso!`);
    } catch (error) {
      res.status(500).send('Internal server error')
    }
};

export const updateTask = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params; 
  const { title, description, completed } = req.body; 

  console.log('ID recebido na requisição:', id); 

  try {
    const updatedTask = await ITask.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id), // Aqui usamos o ObjectId corretamente
      {
        $set: {
          title: title || undefined, 
          description: description || undefined, 
          completed: completed !== undefined ? completed : undefined, 
          updatedAt: new Date() 
        }
      },
      { new: true } 
    );

    console.log('Tarefa atualizada:', updatedTask); 

    if (!updatedTask) {
      return res.status(404).send('Tarefa não encontrada');
    }

    return res.status(200).send("Atualizado com sucesso!");

  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error); 
    return res.status(500).send('Erro ao atualizar tarefa');
  }
};


