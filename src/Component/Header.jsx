import React, { useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'

function Header(props) {

    const [text, setText] = useState('')
    const { addTodo, todolist} = props

    function onAddTodo(e) {
        // console.log(e.key)

        if (e.key === 'Enter' && text.trim()) {

            addTodo({
                id: new Date().valueOf(),
                title: text,
                isCompleted: false
            })
            setText('')
        }
    }
    return (
        <div>
            <h1
                className='text-center text-[100px] text-[#af2f2f26]'
            >
                Todos
            </h1>
            <div className='border-b-[1px] border-[#c6c6c66b] relative' >
                
                <input
                    type="text"
                    className='
                       w-[100%] py-[16px] pl-[60px] pr-[16px] text-[24px] placeholder:italic  shadow-lg
                        rounded-sm focus:outline-none font-[600] text-[#4d4d4d] 
                    '
                    placeholder='What needs to be done ?'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => onAddTodo(e)}
                />
                {
                    todolist.length === 0
                        ?
                        ''
                        :
                 
                            <AiOutlineDown
                                 className={`absolute bottom-[20px] left-[10px] text-[22px]
                                            text-[#c6c6c66b]    
                                 `}
                            />
                }


            </div>


        </div>
    )
}

export default Header