import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class ThreadsDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Matches(/^[^.&]*$/, {
    message: 'Threads topic tag cannot contain periods or ampersands',
  })
  topic_tag?: string;

  @IsOptional()
  @IsBoolean()
  poll_enabled?: boolean;

  @ValidateIf((o) => o.poll_enabled)
  @IsString()
  @IsNotEmpty({
    message: 'Threads polls require at least two options.',
  })
  @Matches(/\S/, {
    message: 'Threads polls require at least two options.',
  })
  poll_option_a?: string;

  @ValidateIf((o) => o.poll_enabled)
  @IsString()
  @IsNotEmpty({
    message: 'Threads polls require at least two options.',
  })
  @Matches(/\S/, {
    message: 'Threads polls require at least two options.',
  })
  poll_option_b?: string;

  @IsOptional()
  @IsString()
  poll_option_c?: string;

  @IsOptional()
  @IsString()
  poll_option_d?: string;
}
