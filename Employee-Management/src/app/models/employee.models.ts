export interface Employee {
    name: string;
    company: string;
    email: string;
    contact: string;
    designation: string;
    profilePicture: string;
    isEdit?: boolean;
  }
  
  export const DESIGNATIONS = [
    'Software Developer',
    'Senior Software Developer',
    'Quality Assurance',
    'Technical Lead',
    'Manager'
  ];
  export const AVATARS = [
    '/assets/avatars/avatar_one.jpg',
    '/assets/avatars/avatar_two.jpg'
  ]