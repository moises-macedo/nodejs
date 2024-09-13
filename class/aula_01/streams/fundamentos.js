import { Readable, Writable, Transform } from "node:stream";

class OneToHuandredStrem extends Readable {
    index = 1;
    _read() {
        const i = this.index++;
        const buf = Buffer.from(String(i));

        setTimeout(() => {
            if (i > 100) {
                return this.push(null);
            }

            return this.push(buf);
        }, 1000);
    }
}

class InverseNumber extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1;
        callback(null, Buffer.from(String(transformed)));
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        const result = Number(chunk.toString()) * 10;
        console.log(result);
        callback();
    }
}



new OneToHuandredStrem().pipe(new InverseNumber()).pipe(new MultiplyByTenStream());
