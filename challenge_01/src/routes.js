import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";
import { Database } from "./database.js";
const tasks = [];
const database = new Database();
export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const tasks = database.select();
            return res.end(JSON.stringify(tasks));
        },
    },
    {
        method: "POST",
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.writeHead(400).end();
            }
            const task = {
                id: randomUUID(),
                title,
                description,
                created_at: new Date().toISOString(),
                completed_at: null,
                updated_at: null,
            };
            database.insert(task);
            return res.writeHead(201).end();
        },
    },
    {
        method: "PUT",
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { title, description } = req.body;

            const { id } = req.params;
            if (!title || !description) {
                return res.writeHead(400).end();
            }
            const task = database.filterById(id);

            if (typeof task === "string") {
                return res.writeHead(404, task).end();
            }
            if (task.completed_at !== null) {
                return res.writeHead(400, "Task already completed").end();
            }
            database.update(id, title, description);
            return res.end(JSON.stringify(task));
        },
    },
    {
        method: "DELETE",
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params;

            const task = database.filterById(id);
            if (!task) {
                return res.writeHead(404, "Task not Found").end();
            }
            database.delete(task);

            return res.writeHead(200).end();
        },
    },
    {
        method: "PATCH",
        path: buildRoutePath("/tasks/:id/complete"),
        handler: (req, res) => {
            const { id } = req.params;

            const task = database.filterById(id);

            if (typeof task === "string") {
                return res.writeHead(404, task).end();
            }
            if (task.completed_at !== null) {
                return res.writeHead(400, "Task already completed").end();
            }
            database.complete(id);

            return res.writeHead(200).end();
        },
    },
];
