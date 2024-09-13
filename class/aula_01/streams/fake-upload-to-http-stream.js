import { Readable } from "node:stream";

class OneToHuandredStream extends Readable {
    index = 1;
    _read() {
        const i = this.index++;
        const buf = Buffer.from(String(i));

        setTimeout(() => {
            if (i > 10) {
                return this.push(null);
            }

            return this.push(buf);
        }, 1000);
    }
}

fetch("http://localhost:3334", {
    method: "POST",
    body: new OneToHuandredStream(),
    duplex: "half",
})
    .then((res) => res.text())
    .then((data) => console.log(data));
