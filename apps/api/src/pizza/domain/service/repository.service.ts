import { Pizza } from "../model/pizza";
import { PizzaId } from "../model/value_object";

export interface WorkspaceRepository {
    find(id: PizzaId): Promise<Pizza>;
    findAll(): Promise<Array<Pizza>>;
    save(pizza: Pizza): void;
}
