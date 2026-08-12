import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class ThreadsDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Matches(/^[^.&]*$/, {
    message: 'Threads topic tag cannot contain periods or ampersands',
  })
  topic_tag?: string;
}
