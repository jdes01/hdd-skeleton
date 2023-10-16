import {
    Body,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    Logger,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { CreatePizzaDTO } from '@hdd-skeleton/contracts';

import { PizzaError } from '../../domain/exception';
import { PizzaService } from '../service/pizza.service';

@Controller('pizza')
export class PizzaController {
    constructor(private readonly pizzaService: PizzaService) { }

    @Post()
    @HttpCode(200)
    async create(@Body(new ValidationPipe()) createPizzaDTO: CreatePizzaDTO) {

        Logger.log(createPizzaDTO.name)

        const createdPizzaResult = await this.pizzaService.createPizza(createPizzaDTO);

        createdPizzaResult.mapErr<PizzaError>(
            (err) => {
                throw new HttpException(err.message, HttpStatus.CONFLICT);
            }
        );
    }

}
