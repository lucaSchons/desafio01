import { useEffect, useState } from 'react';

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'


interface Task {
  id: string;
  title: string;
  isComplete: boolean;
  
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  useEffect(() => {
    console.log(tasks); 
  }, [tasks])

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    if(newTaskTitle != ''){
      
      setNewTaskTitle(newTaskTitle)
      
      const { v4: uuidv4 } = require('uuid');
      
      setTasks((prevTasks) => [...prevTasks, 
        {
          id: uuidv4(),
          title: newTaskTitle,
          isComplete: false,
      },]);
      

      
    }else{
      alert("Campo vazio não é permitido")
    }

  }

  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    tasks.map(task => {
      if(task.id == id && task.isComplete == false){
        const newList = tasks.filter((task) => task.isComplete = true);
        setTasks(newList);

      } else {
        const newList = tasks.filter((task) => task.isComplete = false);
        setTasks(newList);

      }
    })

  }

  function handleRemoveTask(id: string) {
    // Remova uma task da listagem pelo ID
    if(window.confirm('Tem certeza que você deseja excluir essa task?')){
        
      const newList = tasks.filter((task) => task.id !== id);
      setTasks(newList);
    
      
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => {
            return (
              <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
            );
            })}        
        </ul>
      </main>
    </section>
  )
}

function uuidv4() {
  throw new Error('Function not implemented.');
}
