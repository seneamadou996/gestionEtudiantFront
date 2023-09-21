/* tslint:disable */
/* eslint-disable */
import { AddressDto } from './address-dto';
import { UserDto } from './user-dto';
export interface SchoolDto {
  addressDto?: AddressDto;
  id?: number;
  name?: string;
  numberTel?: string;
  photo?: string;
  slogan?: string;
  userDtos?: Array<UserDto>;
}
