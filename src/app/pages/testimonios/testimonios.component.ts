import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css'],
  imports:[CommonModule]
})
export class TestimoniosComponent {
  // Lista de testimonios que se muestran en el componente
  testimonios = [
    {
      nombre: 'Carlos Martínez',
      mensaje: 'La plataforma me ha permitido encontrar al mejor profesor para mejorar mi inglés rápidamente. Muy intuitiva y fácil de usar.',
      ruta: '/images/estudiantes/fotor-ai-2024102610534.jpg'
    },
    {
      nombre: 'Ana García',
      mensaje: 'Gracias a esta página he podido aprender matemáticas con un profesor excelente que vive cerca de mí.',
      ruta: '/images/estudiantes/fotor-ai-20241026105215.jpg'
    },
    {
      nombre: 'Luis Fernández',
      mensaje: 'Lo que más me gusta es el sistema de valoración de profesores, me da mucha confianza para elegir al mejor.',
      ruta: '/images/estudiantes/fotor-ai-20241026105333.jpg'
    },
    {
      nombre: 'María López',
      mensaje: 'He contactado con varios profesores por el chat y la experiencia ha sido muy fluida. Muy recomendable.',
      ruta: '/images/estudiantes/fotor-ai-20241026105154.jpg'
    },
    {
      nombre: 'Jorge Pérez',
      mensaje: 'Pude elegir un profesor particular que se ajustaba a mi horario y presupuesto. La plataforma es genial.',
      ruta: '/images/estudiantes/fotor-ai-20241026105255.jpg'
    }
  ];
}
