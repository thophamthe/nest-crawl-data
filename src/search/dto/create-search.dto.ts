import { IsInt, Min, IsNotEmpty } from 'class-validator';
export class CreateSearchDto {
  @IsNotEmpty()
  @Min(0)
  province: number;

  @IsInt()
  @Min(0)
  district: number;

  @IsInt()
  @Min(0)
  ward: number;

  @IsInt()
  @Min(0)
  price: number;

  @IsNotEmpty()
  source: string;
}
