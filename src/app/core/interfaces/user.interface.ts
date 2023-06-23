export interface User {
    id: number;
    nombre: string;
    apellido: string;
    telefono: number;
    rut: string;
    fechaNacimiento: string;
    direccion: Direccion;
    activo: number;
  }
  
  export interface Direccion {
    calle: string;
    numero: number;
    comuna?: string;
    nombre?: string;
  }
  