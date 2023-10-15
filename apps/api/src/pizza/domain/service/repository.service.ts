import { Pizza } from "../model/pizza";
import { PizzaId, PizzaName } from "../model/value_object";

export interface PizzaRepository {
    find(id: PizzaId): Promise<Pizza>;
    findByName(name: PizzaName): Promise<Pizza | null>;
    findAll(): Promise<Array<Pizza>>;
    save(pizza: Pizza): void;
}
