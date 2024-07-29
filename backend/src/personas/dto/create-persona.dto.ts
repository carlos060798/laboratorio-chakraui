import { 
    IsString, 
    MinLength,
    IsArray,
    IsOptional
} from 'class-validator';

export class CreatePersonaDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)

    description: string;

    @IsString()
    @MinLength(1)
    image: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    categoria: string[]
}
