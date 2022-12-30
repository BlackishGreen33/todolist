import React from 'react';

export default function Item(props){
    const {content, id, completed, editing, flag} = props;
    function handleDelete(id){props.deleteTodo(id);}
    function handleCompleted(id){
        return (e) => {
            props.completeTodo(id, e.target.checked);
        };
    }
    function beEditing(id){props.editTodo(id);}
    function handleEdit(id){
        return (e) => {
            const { keyCode, target, type } = e
            if(type === 'keyup'){
                if(keyCode === 13)
                    props.makeNewTodo(id, target.value);
            }
            if(type === 'blur' && target.value !== 'on')
                props.makeNewTodo(id, target.value);
        }
    }

    
    return(
        <ul className="todo-list">
            <li onBlur={handleEdit(id)} onKeyUp={handleEdit(id)} className={editing ? 'editing' : completed ? 'completed' : ''} style={{ display: flag ? 'block' : 'none' }} >
                <div onDoubleClick={() => beEditing(id)} className='view'>
                    <input className='toggle' type='checkbox' onChange={handleCompleted(id)} checked={completed} />
                    <label>{content}</label>
                    <button onClick={() => handleDelete(id)} className='destroy'></button>
                </div>
                <input className='edit' />
            </li>
        </ul>
    );
}