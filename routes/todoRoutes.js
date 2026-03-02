const HyperExpress = require('hyper-express');
const todo_api_router = new HyperExpress.Router()
const { v4: uuidv4 } = require('uuid');

// const repository = require("../database/mongodb/repository");
// const Todo = repository("Todo")
const todoList = [
    {
        id: 1,      
        title: "Todo 1"
    },
    {
        id: 2,  
        title: "Todo 2"
    },
]

todo_api_router.route('/todos').post(async (request, response) => {
    const {title } = await request.json();
    const id = uuidv4()
    const todo = {id, title}
    todoList.push(todo)
    // response.sendSSE(todo, 'add-todo')
    response.json(todo);

}).get(async (request, response) => {
    // const todoList = await Todo.getAll()
    const todos = [...todoList]
    return response.json(todos)
})

todo_api_router.route('/todo/:id').get(async (request, response) => {
    let id = request.path_parameters.id;
    // const todo = await Todo.GetById(id)
    const todo = todoList.find(t => t.id === id)
    return response.json({...todo})
}).put(async (request, response) => {
    // let id = request.path_parameters.id;
    // let body = await request.json();
    // const UpdatedData = await Todo.Update(body, id)
    return response.json({message: "Todo updated successfully"})
}).delete( async (request, response) => {
    // let id = request.path_parameters.id;
    // const result = await Todo.remove(id)
    return response.json({message: "Todo deleted successfully"})
})

module.exports = todo_api_router