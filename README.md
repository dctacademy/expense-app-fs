## APIs :
**base url - http://localhost:5555**

### Category Resource

| Method | Endpoint                 | Query Params      | Body  | Description                                                           | Response                                       |
|--------|--------------------------|-------------------|-------|-----------------------------------------------------------------------|------------------------------------------------|
| GET    | /api/categories            | -                 | -     | Retrieves the list of all categories                                    | JSON array of categories       |
| POST   | /api/categories            | -                 | name  | Creates a new category | JSON object of the newly created category       |
| GET    | /api/categories/:id        | -                 | -     | Retrieves a category based on the provided ID                          | JSON object of the specific category            |
| PUT    | /api/categories/:id        | - | name    | Updates the category's value | Updated JSON category object        |
| DELETE | /api/categories/:id        | -                 | -     | Deletes a category based on the provided ID                            | JSON object of the deleted category              |

### Expense Resource

| Method | Endpoint                 | Query Params      | Body  | Description                                                           | Response                                       |
|--------|--------------------------|-------------------|-------|-----------------------------------------------------------------------|------------------------------------------------|
| GET    | /api/expenses            | -                 | -     | Retrieves the list of all expenses                                    | JSON array of expenses       |
| POST   | /api/expenses            | -                 | title, amount,date, categoryId  | Creates a new expense | JSON object of the newly created expense       |
| GET    | /api/expenses/:id        | -                 | -     | Retrieves a expense based on the provided ID                          | JSON object of the specific expense            |
| PUT    | /api/expenses/:id        | - | title, amount,date, categoryId    | Updates the expense's value | Updated JSON expense object        |
| DELETE | /api/expenses/:id        | -                 | -     | Deletes a expense based on the provided ID                            | JSON object of the deleted expense              |
