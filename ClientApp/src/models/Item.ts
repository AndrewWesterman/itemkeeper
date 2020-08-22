export class Item {
    id?: number;
    name: string;
    cost: number;

    constructor(name: string, cost: number, id?: number) {
        this.id = id;
        this.name = name;
        this.cost = cost;
    }
}
