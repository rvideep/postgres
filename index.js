const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.json());

//get data
app.get("/task", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
});


//create data
app.post("/task", async(req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo);
    } catch (error) {
        console.error(error.message);
    }
});

//update data
app.put("/task/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("data updated successfully");
    } catch (error) {
        console.error(error.message);
    }
});

// delete data
app.delete("/task/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const delTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("data deleted successfully");
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(3000, () => {
    console.log("sever started at port 3000");
});