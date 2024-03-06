import mysql from "mysql2";

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MartinGadea1996",
  database: "todoapp",
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
    return;
  }
  console.log("Conexión exitosa a la base de datos MySQL");
});

export async function getUsers() {
  try {
    const results = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    return results;
  } catch (error) {
    throw error;
  }
}

export async function getTasks() {
  try {
    const results = await new Promise((resolve, reject) => {
      connection.query("SELECT * FROM tasks", (error, results) => {
        if (error) {
          reject(error);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
    return results;
  } catch (error) {
    throw error;
  }
}

export async function getUsersByID(user_id) {
  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE user_id = ?",
        [user_id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            if (results.length = 0) {
              console.log("El usuario con ID " + user_id + " no existe.");
            }
            resolve(results[0]);
          }
        }
      );
    });
    return results;
  } catch (error) {
    throw error;
  }
}

export async function getTasksByID(task_id) {
  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM tasks WHERE task_id = ${task_id}`,
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            if ((results.length = 0)) {
              console.log("La tarea con ID " + task_id + " no existe.");
            }
            resolve(results[0]);
          }
        }
      );
    });
    return results;
  } catch (error) {
    throw error;
  }
}

export async function createTask(task_name, user_id) {
  try {
    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO tasks (task_name, user_id) VALUES (?, ?)",
        [task_name, user_id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
}

export async function createUsers(username, email) {
  try {
    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO users (username, email) VALUES (?, ?)",
        [username, email],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
}


export async function completeTask(taskId) {
  try {
    await new Promise((resolve, reject) => {
      connection.query(
        `UPDATE tasks SET status = true WHERE task_id = ${taskId}`,
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
            console.log(`La tarea con ID ${taskId} ha sido completada.`);
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
}

export async function deleteTask(task_Id) {
  try {
    await new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM tasks WHERE task_id = ${task_Id}`,
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
            console.log(`La tarea con ID ${task_Id} ha sido eliminada.`);
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
}

export async function updateTask(task_name, task_Id) {
  try {
    await new Promise((resolve, reject) => {
      connection.query(
        `UPDATE tasks
        SET task_name = ${task_name}, WHERE task_id = ${task_Id};`,
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
            console.log(`La tarea con ID ${task_Id} ha sido modificada.`);
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
}
