import { Module, NestModule } from '@nestjs/common';


@Module({
    imports: [],
})
export class AppModule implements NestModule {
    configure() {
    }
}
