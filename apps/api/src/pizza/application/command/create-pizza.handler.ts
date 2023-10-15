import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreatePizzaCommand } from './create-pizza.command';

import { Pizza } from '../../domain/model';
import {
    PizzaId,
    PizzaName,
} from '../../domain/model/value_object';

import { PizzaRepository } from '../../domain/service';

@CommandHandler(CreatePizzaCommand)
export class CreatePizzaHandler implements ICommandHandler<CreatePizzaCommand> {

    constructor(
        @InjectAggregateRepository(Pizza)
        private readonly pizzaRepository: PizzaRepository,
    ) { }

    async execute(command: CreatePizzaCommand) {

        const id = PizzaId.generate();
        const name = PizzaName.fromString(command.name);

        const pizza = Pizza.add(id, name);

        this.pizzaRepository.save(pizza);
    }
}
