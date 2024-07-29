import { Module } from '@nestjs/common'; 
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonasModule } from './personas/personas.module';
import { CoommeModule } from './commun/coomme.module';


@Module({
  imports: [
    ConfigModule.forRoot(), //  configuracion de las variables de entorno
    TypeOrmModule.forRoot({ //  configuracion de la base de datos
     type: 'postgres',
     host:  process.env.DB_HOST,
     port: +process.env.DB_PORT,
     database: process.env.DB_NAME,
     username: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly define the entities: [] array)
     synchronize: true,  //  synchronize the database with the entities every time the application starts
    }), PersonasModule, CoommeModule
   ],
  
  controllers: [],
  providers: [],
})
export class AppModule {}
