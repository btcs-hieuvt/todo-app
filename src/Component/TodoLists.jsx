import React from 'react'
import Todo from './Todo.jsx'

function TodoLists(props) {
    const {todolist ,onTodoClick,getIdEditTodo,idTodoEdit,onEditTodo,markCompleted} = props
  return (
    <div>
        
        <ul>
            {
                todolist.map((todo,index) => (
                        <Todo 
                          key={todo.id} {...{todo}}
                           onTodoClick={onTodoClick} 
                           getIdEditTodo={getIdEditTodo}
                           idTodoEdit={idTodoEdit}
                           onEditTodo={onEditTodo}
                           index={index}
                           markCompleted={markCompleted}

                           />
                           
                ))
            }
            
        
        </ul>
        
    </div>
  )
}

export default TodoLists