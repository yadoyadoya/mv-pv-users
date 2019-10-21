import { Injectable } from "@angular/core";

@Injectable()

export class ParserService {
    public getData(data) {
        const myData = data
            .replace(/'/g, "")
            .replace(/"/g, "")
            .replace(/\n/g, ",")
            .split(",");

        return myData;
    }
}
