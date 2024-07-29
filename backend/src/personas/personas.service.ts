import { Injectable, Logger } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { paginationDto } from 'src/commun/pagination/pagination.dto';
import { NotFoundException } from '@nestjs/common';
import { validate as IsUuid } from 'uuid'



@Injectable()
export class PersonasService {
  
  private readonly logger = new Logger(
    'PersonasService'

  ) 
  constructor(
    @InjectRepository(Persona)
    private personasRepository: Repository<Persona>,
  ) { }
 async create(createPersonaDto: CreatePersonaDto) {
   try{
    const persona = this.personasRepository.create(createPersonaDto);
    await this.personasRepository.save(persona);

    return persona;
    

   }catch(error)
   {

      this.handleError(error);

   }
  }

  findAll(pagination:paginationDto) {
    try{
      const { limit=10, offset=0} = pagination;
      return this.personasRepository.find({
        take: limit,
        skip: offset,
      });
    } catch(error)
    {
      this.handleError(error);
    
  }}

  async findOne(term: string) {
    
    let persona: Persona;
    try {
      console.log(term);
      if (IsUuid(term)) {
        persona = await this.personasRepository.findOneBy({ id: term });
      } else {
        const queryBuilder = this.personasRepository.createQueryBuilder();
        persona = await queryBuilder
          .where('UPPER(title) =:title ', {
            title: term.toUpperCase(),
          }).getOne();
      }


      if (!persona) throw new NotFoundException(`Persona con ${term} no encontrada`);
      return persona;
  
    } catch (error) {
      console.log(error);
      this.handleError(error);

    }
  }

 async update(id: string, updatePersonaDto: UpdatePersonaDto) {
    try {
      const persona= await this.personasRepository.preload({
        id: id,
        ...updatePersonaDto,
      })
      if (!persona) throw new NotFoundException('Producto no encontrado');

      await this.personasRepository.save(persona);
      return persona;
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }

  }

 async remove(id:string) {
    try{
      const persona = await this.findOne(id);
      if (!persona) throw new NotFoundException(`Persona con  ${id} no encontrada`);
      await this.personasRepository.remove(persona) 
      return  'Persona eliminada';
    }catch(error){
      this.handleError(error);
    }
    }
  

  private handleError(error: Error) {
    this.logger.error(error.message, error.stack);
  }
}
