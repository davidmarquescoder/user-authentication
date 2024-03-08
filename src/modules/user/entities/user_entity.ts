interface UserEntity {
    _id?: string | null | unknown;
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    phone: string;
    image?: string | null | undefined;
  }
  
export default UserEntity;