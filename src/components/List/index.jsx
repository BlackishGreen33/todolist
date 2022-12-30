import React from 'react';
import Item from '../Item';

export default function List(props){
    const {todos, deleteTodo, completeTodo, editTodo, makeNewTodo} = props;
    return(
        <div style={{ display: 'block' }} className="main">
            {todos.map(todo => <Item key={todo.id} {...todo} deleteTodo={deleteTodo} completeTodo={completeTodo} editTodo={editTodo} makeNewTodo={makeNewTodo} />)}
        </div>
    );
}