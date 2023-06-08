const Task = require('../models/tasks')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllTasks = async (req, res) => {
        const tasks = await Task.find({})
        res.status(StatusCodes.OK).json({length:tasks.length,tasks})
   
}
const getTask = async (req, res) => {
        const { maso: taskID } = req.params
        const task = await Task.findOne({_id: taskID})
        if (!task) {
            throw new NotFoundError(`item with id ${taskID} not found`)
        } 
        res.status(200).json({task})
    // console.log(req.params.maso) >>> output: 647426df240c33701836e438
    // res.json( {maso:req.params.maso} ) >>> output: {maso: 647426df240c33701836e438}
}
const createTask = async (req, res) => {
        const {name} = req.body
        if(!name) {
            throw new BadRequestError('Vui long nhap du truong thong tin')
        }
        const task = await Task.create(req.body)
        res.status(StatusCodes.CREATED).json({task})
}
const updateTask = async (req, res) => {
        const { maso: taskID } = req.params
        const {name} = req.body
        if(!name) {
            throw new BadRequestError('Vui long nhap du truong thong tin')
        }
        const task = await Task.findOneAndUpdate(
            {_id: taskID},
            req.body,
            {new:true,runValidators: true}
            )
        if (!task) {
            throw new NotFoundError(`task with id ${taskID} not found`)
        } 
        res.status(StatusCodes.OK).json({'updated':task})
}
const deleteTask = async (req, res) => {
        const { maso: taskID } = req.params
        const task = await Task.findOneAndDelete({_id: taskID})
        if (!task) {
            throw new NotFoundError(`task with id ${taskID} not found`)
        } 
        res.status(StatusCodes.OK).json({'deleted':task})
}
module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
}