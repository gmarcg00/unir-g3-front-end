import { Component } from '@angular/core';
import { NgFor } from '@angular/common';  // Importar NgFor para usar *ngFor

@Component({
  selector: 'app-como-funciona',
  templateUrl: './como-funciona.component.html',
  styleUrls: ['./como-funciona.component.css'],
  standalone: true,
  imports: [NgFor]  // Necesario para usar la directiva *ngFor
})
export class ComoFuncionaComponent {
  // Lista de pasos que explican cómo funciona la plataforma
  pasosFuncionamiento = [
    {
      paso: '1. Registrarse en la plataforma',
      descripcion: 'Para empezar, regístrate haciendo clic en "Registrarse" en la parte superior de la página. Ingresa tus datos personales y completa el proceso de verificación.'
    },
    {
      paso: '2. Localizar un profesor',
      descripcion: 'Usa la herramienta de búsqueda para encontrar un profesor. Ingresa tu ubicación y selecciona la materia que deseas aprender para obtener una lista de profesores disponibles cerca de ti.'
    },
    {
      paso: '3. Hablar con el profesor a través del chat',
      descripcion: 'Una vez que hayas encontrado un profesor que te interese, puedes comunicarte con él directamente usando el chat interno de la plataforma para resolver dudas y organizar clases.'
    },
    {
      paso: '4. Buscar reseñas de los profesores',
      descripcion: 'Antes de seleccionar un profesor, puedes revisar las reseñas de otros estudiantes. Cada profesor tiene un perfil con reseñas que te ayudarán a tomar una decisión informada.'
    },
    {
      paso: '5. Añadir reseñas a los profesores',
      descripcion: 'Después de tomar clases, puedes añadir una reseña para el profesor. Esto ayuda a otros estudiantes a conocer mejor la calidad del servicio y la experiencia de aprendizaje.'
    }
  ];
}


