export type UserRole = 'Admin' | 'Engineer' | 'Intern';

export interface UserDto {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  age: number;
  role: UserRole;
}
