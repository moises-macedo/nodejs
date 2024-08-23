import fs from "node:fs/promises";

const databasePath = new URL("db.json", import.meta.url);

export class Database {
    #database = {};

    constructor() {
        fs.readFile(databasePath, "utf-8")
            .then((data) => (this.#database = JSON.parse(data)))
            .catch(() => {
                this.#persist();
            });
    }
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database, null, 2));
    }
    select() {
        return this.#database ?? [];
    }
    filterById(id) {
        const task = this.#database.find((row) => row.id === id);

        if (task) {
            return task;
        }

        return JSON.stringify("TASK NOT FOUND")
    }
    insert(data) {
        if (Array.isArray(this.#database)) {
            this.#database.push(data);
        } else {
            this.#database = [data];
        }
        return this.#persist();
    }
    update(id, title, description) {
        const task = this.#database.find((row) => row.id === id);

        if (task) {
            this.#database.map((el) => {
                if (el.id === task.id) {
                    el.title = title;
                    el.description = description;
                    el.updated_at = new Date().toISOString();
                }
                return this.#persist();
            });
        }

        return JSON.stringify("TASK NOT FOUND")
    }
    complete(id) {
        const task = this.#database.find((row) => row.id === id);
        if (task) {
            this.#database.map((el) => {
                if (el.id === task.id) {
                    el.completed_at = new Date().toISOString();
                }
                return this.#persist();
            });
        }
        return JSON.stringify("TASK NOT FOUND");
    }
    delete(task) {
        const tasks = this.#database;

        if (tasks) {
            tasks.splice(tasks.indexOf(task), 1);
            return this.#persist();
        }

        return JSON.stringify("TASK NOT FOUND")
    }

    filterById(id) {
        const task = this.#database.find((row) => row.id === id);

        if (task) {
            return task;
        }

        return JSON.stringify("TASK NOT FOUND")
    }
}
