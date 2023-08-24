const express = require('express')
const {checkSchema, validationResult} = require('express-validator')
const fs = require('fs')
const cors = require('cors')
const app = express()
const port = 5555

app.use(cors())
app.use(express.json())

const categorySchema = {
    name: {
        notEmpty : {
            errorMessage: 'Cannot be empty'
        }
    }
}

const expenseSchema = {
    title: {
        notEmpty: {
            errorMessage: 'Cannot be empty'
        }
    },
    date: {
        notEmpty: {
            errorMessage: 'Cannot be empty'
        }
    },
    amount: {
        notEmpty: {
            errorMessage: 'Cannot be empty'
        }
    },
    categoryId: {
        notEmpty: {
            errorMessage: 'Cannot be empty'
        },
        isLength: {
            options: { min: 13, max: 13},
            errorMessage: 'category id should be valid id'
        }  
    }
}

app.get('/api/categories', (req, res) => {
    fs.readFile('./db.json', 'utf-8', (err, db) => {
        if (err) {
            res.json(err)
        } else {
            const data = JSON.parse(db)
            res.json(data.categories)
        }
    })
})

app.post('/api/categories', checkSchema(categorySchema), (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    const body = req.body
    body._id = String(Number(new Date()))
    fs.readFile('./db.json', 'utf-8', (err, db) => {
        if (err) {
            res.json(err)
        } else {
            const data = JSON.parse(db)
            data.categories.push(body)
            console.log(data)

            fs.writeFile('./db.json', JSON.stringify(data), () => {
                res.json(body)
            })
        }
    })
})

app.get('/api/categories/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./db.json', 'utf-8', (err, db) => {
        if (err) {
            res.json(err)
        } else {
            const data = JSON.parse(db)
            const category = data.categories.find(cat => cat._id == id)
            if (category) {
                res.json(category)
            } else {
                res.json({})
            }
        }
    })
})

app.put('/api/categories/:id', checkSchema(categorySchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const id = req.params.id
    const body = req.body
    fs.readFile('./db.json', 'utf-8', (err, db) => {
        if (err) {
            res.json(err)
        } else {
            const data = JSON.parse(db)
            const category = data.categories.find(cat => cat._id == id)
            if (category) {
                Object.assign(category, body)
                fs.writeFile('./db.json', JSON.stringify(data), () => {
                    res.json(category)
                })
            } else {
                res.json({})
            }
        }
    })
})

app.delete('/api/categories/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./db.json', 'utf-8', (err, db) => {
        if (err) {
            res.json(err)
        } else {
            let data = JSON.parse(db)
            const category = data.categories.find(cat => cat._id == id)
            data.categories = data.categories.filter(cat => cat._id != id)
            fs.writeFile('./db.json', JSON.stringify(data), () => {
                res.json(category)
            })
        }
    })
})

app.get('/api/expenses', (req, res) => {
    fs.readFile('./db.json', 'utf-8', (err, db) => {
        if (err) {
            res.json(err)
        } else {
            const data = JSON.parse(db)
            res.json(data.expenses)
        }
    })
})

app.post('/api/expenses', checkSchema(expenseSchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body
    body._id = String(Number(new Date()))
    fs.readFile('./db.json', 'utf-8', (err, db) => {
        if (err) {
            res.json(err)
        } else {
            const data = JSON.parse(db)
            data.expenses.push(body)
            console.log(data)

            fs.writeFile('./db.json', JSON.stringify(data), () => {
                res.json(body)
            })
        }
    })
})

app.get('/api/expenses/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./db.json', 'utf-8', (err, db) => {
        if (err) {
            res.json(err)
        } else {
            const data = JSON.parse(db)
            const category = data.expenses.find(cat => cat._id == id)
            if (category) {
                res.json(category)
            } else {
                res.json({})
            }
        }
    })
})

app.put('/api/expenses/:id', checkSchema(expenseSchema), (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const id = req.params.id
    const body = req.body
    fs.readFile('./db.json', 'utf-8', (err, db) => {
        if (err) {
            res.json(err)
        } else {
            const data = JSON.parse(db)
            const category = data.expenses.find(cat => cat._id == id)
            if (category) {
                Object.assign(category, body)
                fs.writeFile('./db.json', JSON.stringify(data), () => {
                    res.json(category)
                })
            } else {
                res.json({})
            }
        }
    })
})

app.delete('/api/expenses/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./db.json', 'utf-8', (err, db) => {
        if (err) {
            res.json(err)
        } else {
            let data = JSON.parse(db)
            const category = data.expenses.find(cat => cat._id == id)
            data.expenses = data.expenses.filter(cat => cat._id != id)
            fs.writeFile('./db.json', JSON.stringify(data), () => {
                res.json(category)
            })
        }
    })
})


app.listen(port, () => {
    console.log('listening on port', port)
})