import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from 'src/common/enums/roles.enum';

export class GetUserResponseDto {
  @ApiProperty({ example: 'DanielaMendozaA' })
  term: string;

  @ApiProperty({ example: 'daniela@gmail.com' })
  email: string;

  @ApiProperty({ example: 'DanielaMendozaA' })
  userName: string;

  @ApiProperty({ example: 'regular_client', enum: UserRoleEnum})
  role: UserRoleEnum;
}