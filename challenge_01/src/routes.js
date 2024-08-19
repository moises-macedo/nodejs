import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

export const routes = [
    {
        method: "POST",
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const { title, description } = req.body;
            if(!title || !description){
              return  res.writeHead(400).end();
            }
            const users = {
                id: randomUUID(),
                title,
                description,
                created_at: new Date().toISOString(),
                completed_at: null,
                updated_at: null,
            };

            return res.end(JSON.stringify(users));
        },
    },
];
