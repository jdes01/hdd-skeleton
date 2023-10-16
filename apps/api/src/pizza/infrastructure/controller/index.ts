import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { CreatePizzaDTO, PizzaDTO } from '@hdd-skeleton/contracts';

import { PizzaError } from '../../domain/exception';
import { PizzaService } from '../service/pizza.service';

@Controller('pizza')
export class PizzaController {
    constructor(private readonly pizzaService: PizzaService) { }

    @Post()
    @HttpCode(200)
    async create(@Body(new ValidationPipe()) createPizzaDTO: CreatePizzaDTO) {
        const createdPizzaResult = await this.pizzaService.createPizza(createPizzaDTO);

        createdPizzaResult.mapErr<PizzaError>(
            (err) => {
                throw new HttpException(err.message, HttpStatus.CONFLICT);
            }
        );
    }

}
