import { parse } from "csv-parse";
import { createReadStream } from "node:fs";
import { PORT } from "../server.js";

const csvPath = new URL("./tasks.csv", import.meta.url);

const stream = createReadStream(csvPath);

const csv = parse({
    delimiter: ",",
    skipEmptyLines: true,
    fromLine: 2,
});

async function InitImportCsv() {
    const linesParse = stream.pipe(csv);

    for await (const line of linesParse) {
        const [title, description] = line;

        await fetch(`http://localhost:${PORT}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
            }),
        })
        console.log(line)
    }
}
InitImportCsv();
