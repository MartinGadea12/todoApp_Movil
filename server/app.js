import express from "express";

const app = express();
app.use(express.json());

import {
  getTasks,
  createTask,
  createUsers,
  completeTask,
  deleteTask,
  getTasksByID,
  getUsers,
  getUsersByID,
  updateTask,
} from "./database.js";

app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    if (!users) {
      res.status(404).send("No se encontraron usuarios");
      return;
    }
    res.status(200).send(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Error al obtener usuarios");
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await getTasks();
    if (!tasks) {
      res.status(404).send("No se encontraron tareas");
      return;
    }
    res.status(200).send(tasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).send("Error al obtener tareas");
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUsersByID(userId);
    console.log(userId);
    if (!user) {
      res.status(404).send(`Usuario con ID ${userId} no encontrado`);
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Error al obtener usuarios");
  }
});

app.get("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const user = await getTasksByID(taskId);
    console.log(taskId);
    if (!user) {
      res.status(404).send(`Usuario con ID ${taskId} no encontrado`);
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).send("Error al obtener tareas");
  }
});

app.post("/create/task", async (req, res) => {
  try {
    const { task_name, user_id } = req.body;

    if (!task_name || ! user_id) {
      return res.status(400).json({ error: "Datos obligatorios." });
    }
    const results = await createTask(task_name,  user_id);
    res
      .status(201)
      .json({
        message: "Tarea creada exitosamente.",
      });
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    res.status(500).json({ error: "Error al crear la tarea." });
  }
});

app.post("/create/user", async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: "Duser_id,ligatorios." });
    }
    const results = await createUsers(username, email);
    res
      .status(201)
      .json({
        message: "Usuario creado exitosamente.",
      });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear usuario." });
  }
});

app.put("/tasks/:id/completed", async (req, res) => {
  const taskId = req.params.id;

  try {
    await completeTask(taskId);
    res.status(200).json({
      message: `La tarea con ID ${taskId} ha sido marcada como completada.`,
    });
  } catch (error) {
    console.error("Error al marcar tarea como completada:", error);
    res.status(500).json({ error: "Error al marcar tarea como completada." });
  }
});

app.delete("/task/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    await deleteTask(taskId);
    res.status(200).json({ message: `La tarea con ID ${taskId} ha sido eliminada.` });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ error: "Error al eliminar tarea." });
  }
});


app.listen(8080, () => {
  console.log("server running on port 8080");
});
