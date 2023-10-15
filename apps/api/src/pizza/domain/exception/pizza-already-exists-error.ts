import { PizzaId } from '../model/value_object';
import { PizzaError } from './pizza-error';

export class PizzaAlreadyExistsError extends PizzaError {
    public static withId(id: PizzaId): PizzaAlreadyExistsError {
        return new PizzaAlreadyExistsError(
            `Pizza with id ${id.value} already exists`,
        );
    }
}
