import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { CreatePizzaDTO, GetAllPizzasDTO, PizzaDTO } from '@hdd-skeleton/contracts';
import { Err, Ok, Result } from 'neverthrow';

import { CreatePizzaCommand } from '../../application/command/create-pizza.command';
import { PizzaAlreadyExistsError, PizzaError } from '../../domain/exception';
import { GetPizzaByNameQuery } from '../../application/query/get-pizza-by-name.query';
import { PizzaName } from '../../domain/model/value_object';
import { GetPizzasQuery } from '../../application/query/get-pizzas.query';

@Injectable()
export class PizzaService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async createPizza(payload: CreatePizzaDTO): Promise<Result<null, PizzaError>> {

        const foundPizza = await this.queryBus.execute<IQuery, Array<PizzaDTO> | null>(new GetPizzaByNameQuery(payload.name));

        if (foundPizza.length !== 0) {
            return new Err(PizzaAlreadyExistsError.withName(PizzaName.fromString(payload.name)))
        }

        this.commandBus.execute<ICommand, Result<null, PizzaError>>(new CreatePizzaCommand(payload.name));

        return new Ok(null)
    }


    async getPizzas(_: GetAllPizzasDTO): Promise<Array<PizzaDTO>> {

        return await this.queryBus.execute<IQuery, Array<PizzaDTO> | null>(new GetPizzasQuery());
    }

}
