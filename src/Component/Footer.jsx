import React from 'react'

const Buttons = (props) => {
    const {title ,isActive ,link ,onClick} = props
    return (
        <>
            <li 
                className={`inline-block  px-[7px] mx-[3px] text-[14px] transition-all
                            ${isActive ? 'border-[1px] border-[#af2f2f33]' : ''}
                `}
            >
                <a
                     href={`${isActive  ? link : ''}`}
                    className=''
                    onClick={onClick}
                >

                   {title}
                </a>
            </li>
        </>

    )

}

export default function Footer(props) {

    const {setStatusFilter,statusBtn,numOfTodoLeft,numOfTodos,clearCompleted}=props

    const listBtn = [
        {
            title : 'All',
            isActive: statusBtn === 'All',
            link:'#/',
            onClick: () => {setStatusFilter('All') },
        },
        {
            title : 'Active',
            isActive: statusBtn === 'Active',
            link:'#/active',
            onClick: () => {setStatusFilter('Active') },
        },
        {
            title : 'Completed',
            isActive: statusBtn === 'Completed',
            link:'#/completed',
            onClick: () => {setStatusFilter('Completed')},
        }
        ]
    return (
        <div className='w-[100%] bg-[#fff] flex px-[15px] py-[10px] text-[#777] drop-shadow-md' >
            <div className='w-[30%]'>
                <span>{numOfTodoLeft}</span>
                <span className='mx-[2px]'>{numOfTodoLeft >=1 ? 'items' : 'item'}</span>
                <span>left</span>
            </div>
            <ul className=' grow'>
                {
                    listBtn.map((btn)=>(
                        <Buttons 
                            key={btn.title} {...btn}
                           
                        />
                    ))
                }
                
                
            </ul>
            <div>
                 {numOfTodos > numOfTodoLeft &&   <button onClick={clearCompleted}>Clear Completed</button>}  
            </div>

        </div>
    )
}
