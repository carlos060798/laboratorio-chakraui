import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Persona {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
     title: string;

    @Column({
        type: 'text',
        
    })

    description: string;
     
    @Column('text', )
    image: string;
  

    @Column('text',{
        array: true
    })
    categoria: string[];  

   



   
 

}
