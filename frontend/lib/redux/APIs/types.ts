import { User } from "next-auth";
// export interface User {
//     id?: string
// name?: string | null
// email?: string | null
// image?: string | null
//   }

export interface CreateUserDto extends User {}
