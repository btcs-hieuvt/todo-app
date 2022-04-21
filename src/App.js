import { useEffect, useState } from 'react';
import './App.css';
import Footer from './Component/Footer.jsx';
import Header from './Component/Header.jsx';
import TodoLists from './Component/TodoLists.jsx';

import audioMeme from './assets/audio/meme.mp3'

function App() {
  // const storageTodoList = JSON.parse(localStorage.getItem('TodoList'))

  const [todolist ,setTodolist] =useState(()=>{
    const storageTodoList = JSON.parse(localStorage.getItem('TodoList'))
    return storageTodoList
  } )
  const [idTodoEdit ,setIdTodoEdit] = useState('')
  const [statusBtn ,setStatusBtn] = useState('All')
 

 function saveLocalStorage(newTodoList){
  const jsonTodoList =JSON.stringify(newTodoList)
  localStorage.setItem('TodoList',jsonTodoList )

 }
  // them todo
  function addTodo(todo ={}){

    const newTodoList =[...todolist]
    newTodoList.push(todo)
    setTodolist(newTodoList)

    saveLocalStorage(newTodoList)
    
  }
  // xoa todo
  function onTodoClick(todo ={}){
   
    const  indexTodo = todolist.findIndex(x => x.id === todo.id)
    if(indexTodo<0) return ;

    const newTodoList = [...todolist]
    newTodoList.splice(indexTodo,1)
     setTodolist(newTodoList)

     saveLocalStorage(newTodoList)
  }
  //sua Todo

  function getIdEditTodo (id = ''){
        console.log('edit todo co ID la:',id)
        setIdTodoEdit(id)
  }
  function onEditTodo(todo={},index = -1){
      if(index >=0){
        const newTodoList = [...todolist]
        newTodoList.splice(index,1,todo)
        setTodolist(newTodoList)
        getIdEditTodo('')

        saveLocalStorage(newTodoList)
      }
  }
  // danh dau hoan thanh todo

  function markCompleted (id= ''){
    const completedTodo =[...todolist].map(todo => {
        if(todo.id === id) {
           todo.isCompleted = !todo.isCompleted
        }
        return todo
    })
    
    setTodolist(completedTodo)
    saveLocalStorage(completedTodo)
   
  } 
 

  // filter button (All ,Active ,completed)
 function filterByStatus (todolist , statusBtn ){
      switch (statusBtn) {
        case 'Active':
            return todolist.filter(todo => !todo.isCompleted)
        case 'Completed':
            return todolist.filter(todo => todo.isCompleted)
        default :
           return todolist
      }
 }
 function setStatusFilter (statusBtn){
    setStatusBtn(statusBtn)
 }
 // clear all todo completed
 function clearCompleted () {
  const clearTodo=filterByStatus(todolist,'Active')
   setTodolist(clearTodo)

   saveLocalStorage(clearTodo)
 }
 // hoan thanh todo app 
  const completedAll = todolist.every(todo => todo.isCompleted === true)
 useEffect(()=>{
    const audio = document.getElementById('Audio')
  
    
    if(completedAll){
        audio.play()
    }

    
 },[todolist,completedAll])

 useEffect(()=>{
        const done = document.getElementById('done')
        if(completedAll){
            done.style.display='block'

        }else{
          done.style.display='none'
        }
 },[todolist,completedAll])

  return (
    <div className='w-[100vw] h-[100vh] bg-[#f5f5f5]'>
      <div className="mx-[auto] w-[550px] ">
        
        <Header 
          addTodo ={addTodo} 
          todolist={todolist}
        
         />
        <TodoLists 
          todolist ={filterByStatus(todolist,statusBtn)} 
          onTodoClick={onTodoClick} 
          getIdEditTodo={getIdEditTodo}
          idTodoEdit= {idTodoEdit}
          onEditTodo={onEditTodo}
          markCompleted ={markCompleted}
        
          />
          {todolist.length === 0 ? ""  :
               <Footer   
                  setStatusFilter={setStatusFilter}
                  statusBtn={statusBtn}
                  clearCompleted={clearCompleted}
                  numOfTodos ={todolist.length}
                  numOfTodoLeft={filterByStatus(todolist,'Active').length}
               />
           }
        
      </div>
      <audio  src={audioMeme}  id='Audio'> </audio>
      <p 
        id ='done'
        className='text-[#5cef63] font-bold text-[24px] text-center w-[100%] mt-[20px]'
      >Hết việc để làm rồi</p>
    </div>

  );
}

export default App;
