import { IsString } from 'class-validator';

export class AddMessageDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  author: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  body: string;
}
