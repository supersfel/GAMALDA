import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BlockDto {
  @IsString()
  title: string;

  @IsString()
  manager: string;

  @IsNumber()
  progress: number;

  @IsNumber()
  importance: number;

  @IsNumber()
  bgColor: number;

  @IsString()
  start: string;

  @IsString()
  end: string;

  @IsNumber()
  col: number;

  @IsString({ each: true })
  subTitle: string[];

  @IsNumber()
  blockId: number;

  @IsNumber()
  projectId: number;
}
