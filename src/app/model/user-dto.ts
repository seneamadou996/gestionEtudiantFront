/* tslint:disable */
/* eslint-disable */
import { AddressDto } from './address-dto';
import { RoleDto } from './role-dto';
import { SchoolDto } from './school-dto';
export interface UserDto {
  addessDto?: AddressDto;
  birthDay?: string;
  email?: string;
  numberTel?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  password?: string;
  photo?: string;
  rolesDtos?: Array<RoleDto>;
  schoolDto?: SchoolDto;
  username?: string;
}
