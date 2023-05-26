const express = require('express')
const todoModel = require('../models/todo')
const auth = require('../auth/verify-token')

const router = express.Router()

router.post('/', auth, async (req, res) => {
    try {
        const { title, description } = req.body

        const todo = new todoModel({
            title,
            description,
            userId: req.user.userId,
        });

        await todo.save();

        res.status(201).json({ message: 'Todo created successfully', data: todo})

    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const userId = req.user.userId
        const todos = await todoModel.find({userId})

        res.status(200).json({ message: 'Get all todo successfully', data: todos})

    } catch (e) {
        res.status(500).json({ message : e.message })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const userId = req.user.userId
        const todoId = req.params.id

        const todoDetails = await todoModel.findOne({_id: todoId, userId})

        if (!todoDetails) {
            res.status(404).json({ message: 'Todo not found' })
        }

        res.status(200).json({ message: 'Get detail todo successfully', data: todoDetails})

    } catch (e) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        const { title, description } = req.body

        const userId = req.user.userId
        const todoId = req.params.id
        const updateTodo = await todoModel.findOne({ _id: todoId, userId })

        if (!updateTodo) {
            return res.status(404).json({ message: 'Todo not found' })
        }

        updateTodo.title = title
        updateTodo.description = description
        await updateTodo.save()

        res.status(200).json({ message: 'Todo updated successfully', data: updateTodo})
        
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const userId = req.user.userId
        const todoId = req.params.id

        const todo = await todoModel.findOneAndDelete({ _id: todoId, userId })
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' })
        }

        res.status(200).json({ message: 'Todo deleted successfully'})

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        const userId = req.user.userId

        const todo = await todoModel.deleteMany({ userId })
        if (!todo) {
            return res.status(409).json({ message: 'Todo failed to delete'})
        }

        res.status(200).json({ message: 'All Todo deleted successfully' })

    } catch (e) {
        res.status(500).json({ message: 'Internal server error' })
    }
})
module.exports = router