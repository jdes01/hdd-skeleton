import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { CreatePizzaDTO, PizzaDTO } from '@hdd-skeleton/contracts';
import { Err, Result } from 'neverthrow';

import { CreatePizzaCommand } from '../../application/command/create-pizza.command';
import { PizzaAlreadyExistsError, PizzaError } from '../../domain/exception';
import { GetPizzaByNameQuery } from '../../application/query/get-pizza-by-name.query';
import { PizzaName } from '../../domain/model/value_object';

@Injectable()
export class PizzaService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async createPizza(payload: CreatePizzaDTO): Promise<Result<null, PizzaError>> {

        const foundPizza = this.queryBus.execute<IQuery, PizzaDTO | null>(new GetPizzaByNameQuery(payload.name));

        if (foundPizza !== null) {
            return new Err(PizzaAlreadyExistsError.withName(PizzaName.fromString(payload.name)))
        }

        this.commandBus.execute<ICommand, Result<null, PizzaError>>(new CreatePizzaCommand(payload.name));
    }

}
