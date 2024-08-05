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
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }
    select(table, search) {
        let data = this.#database[table] ?? [];

        if (search.name || search.email) {
            data = data.filter((row) =>
                Object.entries(search).some(([key, value]) =>
                    row[key].toLowerCase().includes(value.toLowerCase())
                )
            )
        }
        return data
    }
    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#persist();
            return this.#database[table].push(data);
        }
        this.#persist();
        return (this.#database[table] = [data]);
    }
    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(
            (row) => row.id === id
        );

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            return this.#persist();
        }

        return JSON.stringify("USER NOT FOUD");
    }
    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(
            (row) => row.id === id
        );

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data };
            return this.#persist();
        }

        return JSON.stringify("USER NOT FOUD");
    }
    filterById(table, id) {
        const rowIndex = this.#database[table].findIndex(
            (row) => row.id === id
        );

        if (rowIndex > -1) {
            return this.#database[table][rowIndex];
        }
        return JSON.stringify("USER NOT FOUD");
    }
}
