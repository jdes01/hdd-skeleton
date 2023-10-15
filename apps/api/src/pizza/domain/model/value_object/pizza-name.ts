import { ValueObject } from '@hdd-skeleton/common';

export class PizzaName extends ValueObject<{ value: string }> {
    public static fromString(name: string): PizzaName {
        return new PizzaName({ value: name });
    }

    get value() {
        return this.props.value;
    }
}
