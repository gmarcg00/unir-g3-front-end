import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css']
})
export class TestimoniosComponent {
  testimonios = [
    {
      nombre: 'María López',
      comentario: 'Este portal me ayudó a encontrar el profesor perfecto para mis clases de matemáticas. Muy recomendado.',
      fecha: '10 de octubre de 2024'
    },
    {
      nombre: 'Carlos García',
      comentario: 'La búsqueda de profesores es rápida y sencilla. He mejorado mucho gracias a los profesores que encontré aquí.',
      fecha: '15 de septiembre de 2024'
    },
    {
      nombre: 'Ana Fernández',
      comentario: 'Me encanta la variedad de opciones que ofrece este portal. Siempre hay alguien disponible cuando lo necesito.',
      fecha: '22 de agosto de 2024'
    },
    {
      nombre: 'Luis Martínez',
      comentario: 'El proceso de inscripción fue muy fácil y he encontrado un profesor excelente para inglés.',
      fecha: '30 de julio de 2024'
    },
    {
      nombre: 'Elena Rodríguez',
      comentario: 'Gracias a este portal, he podido mejorar mis habilidades en programación con un profesor muy paciente.',
      fecha: '5 de junio de 2024'
    }
  ];
}
