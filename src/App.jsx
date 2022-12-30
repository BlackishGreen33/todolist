import React, {useState, useEffect} from 'react';
import Input from './components/Input';
import List from './components/List';
import Filter from './components/Filter';
import './App.css';


export default function App(){
    const useSemiPersistentState = (key, initialState) => {
        const initTodo = JSON.parse(initialState)
        const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) || initTodo);
        useEffect(() => {
            localStorage.setItem(key, JSON.stringify(value));
        }, [value, key]);
        return [value, setValue];
    };

    const [todos, setTodos] = useSemiPersistentState("todoList", JSON.stringify([]))
    function storage(newTodos){
        localStorage.setItem("todoList", JSON.stringify(newTodos));
        setTodos(newTodos);
    }


    // Basic Functions
    function addTodo(todo){storage([todo, ...todos]);}
    function deleteTodo(id){storage(todos.filter(todo => todo.id !== id));}
    function completeTodo(id, completed){
        const set = todos.map(todo => {
            if(todo.id === id) return{...todo, completed};
            else return todo;
        })
        storage(set);
    }
    function editTodo(id){
        setTodos(todos.map(todo => {
            if(id === todo.id) todo.editing = true;
            return todo;
        }));
    }


    // Function Key
    function completeAllTodos(completed){
        const set = todos.map(todo => {return{...todo, completed};});
        storage(set);
    }
    function clearAllCompleted(){
        const set = todos.filter(todo => {return !todo.completed;});
        storage(set);
    }    
    function makeNewTodo(id, value){
        const set = todos.map(todo => {
            if(todo.id === id){
                todo.content = value;
                todo.editing = false;
                return todo;
            }
            else return todo;
        })
        storage(set);
    }


    // Selecter*3
    function selectAll(){
        const set = todos.map(todo => {
            todo.flag = true;
            return todo;
        })
        storage(set);
    }
    function selectActive(){
        selectAll()
        const set = todos.map(todo => {
            if(todo.completed === true){
                todo.flag = false;
                return todo;
            }
            else return todo;
        })
        setTodos(set);
    }
    function selectCompleted(){
        selectAll()
        const set = todos.map((todo) => {
            if(todo.completed === false){
                todo.flag = false;
                return todo;
            }
            else return todo;
        })
        setTodos(set);
    }


    return (
        <div>
            <div className="todoapp">
                <Input todos={todos} addTodo={addTodo} completeAllTodos={completeAllTodos} />
                <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} editTodo={editTodo} makeNewTodo={makeNewTodo} />
                <Filter todos={todos} clearAllCompleted={clearAllCompleted} selectAll={selectAll} selectActive={selectActive} selectCompleted={selectCompleted} />
            </div>
        </div>
    );
}