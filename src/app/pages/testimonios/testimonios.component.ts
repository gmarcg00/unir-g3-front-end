import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css'],
  imports: [CommonModule]
})
export class TestimoniosComponent {
  // Lista de testimonios que se muestran en el componente
  testimonios = [
    {
      nombre: 'Carlos Martínez',
      edad: 16,
      mensaje: 'Las clases de hechizos en Howards son increíbles. He aprendido tanto en tan poco tiempo. Los profesores son muy atentos y expertos en su campo.',
      ruta: '/images/estudiantes/fotor-ai-2024102610534.jpg',
      tiempo: '2 meses'
    },
    {
      nombre: 'Ana García',
      edad: 17,
      mensaje: 'Gracias a Howards, mis habilidades en pociones han mejorado significativamente. El profesor es excelente y siempre disponible para resolver dudas.',
      ruta: '/images/estudiantes/fotor-ai-20241026105215.jpg',
      tiempo: '1 año'
    },
    {
      nombre: 'Luis Fernández',
      edad: 15,
      mensaje: 'Lo que más me gusta de Howards es la calidad de la enseñanza en artes de defensa. Me siento mucho más seguro y preparado.',
      ruta: '/images/estudiantes/fotor-ai-20241026105333.jpg',
      tiempo: '8 meses'
    },
    {
      nombre: 'María López',
      edad: 23,
      mensaje: 'He contactado con varios profesores por el chat de Howards y la experiencia ha sido muy fluida. Muy recomendable.',
      ruta: '/images/estudiantes/fotor-ai-20241026105154.jpg',
      tiempo: '5 meses'
    },
    {
      nombre: 'Jorge Pérez',
      edad: 35,
      mensaje: 'Pude elegir un profesor particular en Howards que se ajustaba a mi horario y presupuesto. La plataforma es genial.',
      ruta: '/images/estudiantes/fotor-ai-20241026105255.jpg',
      tiempo: '7 meses'
    },
    {
      nombre: 'Lucía Ramírez',
      edad: 11,
      mensaje: 'Las clases de hechizos en grupo son muy dinámicas y divertidas. He aprendido mucho de mis compañeros y del profesor.',
      ruta: '/images/estudiantes/fotor-ai-20241026105400.jpg',
      tiempo: '9 meses'
    },
    {
      nombre: 'Pedro Asturias',
      edad: 16,
      mensaje: 'La calidad de la enseñanza en pociones es insuperable. Los profesores son muy dedicados y siempre dispuestos a ayudar.',
      ruta: '/images/estudiantes/fotor-ai-20241026105430.jpg',
      tiempo: '1 año y 2 meses'
    },
    {
      nombre: 'Elena Torres',
      edad: 15,
      mensaje: 'Las clases de artes de defensa en Howards me han dado mucha confianza. Los profesores son muy profesionales y atentos.',
      ruta: '/images/estudiantes/fotor-ai-20241026105500.jpg',
      tiempo: '3 meses'
    },
    {
      nombre: 'Miguel Hernández',
      edad: 17,
      mensaje: 'El contacto con los profesores es excelente. Siempre están disponibles para resolver cualquier duda que tenga.',
      ruta: '/images/estudiantes/fotor-ai-20241026105530.jpg',
      tiempo: '6 meses'
    },
    {
      nombre: 'Laura Gómez',
      edad: 16,
      mensaje: 'Las clases particulares de hechizos me han permitido avanzar a mi propio ritmo. Los profesores son muy pacientes y expertos.',
      ruta: '/images/estudiantes/fotor-ai-20241026105600.jpg',
      tiempo: '8 meses'
    },
    {
      nombre: 'Raúl Díaz',
      edad: 18,
      mensaje: 'Las clases en grupo de pociones son muy enriquecedoras. He aprendido mucho de mis compañeros y del profesor.',
      ruta: '/images/estudiantes/fotor-ai-20241026105630.jpg',
      tiempo: '2 semanas'
    },
    {
      nombre: 'Sara Ruiz',
      edad: 17,
      mensaje: 'La calidad de la enseñanza en artes de defensa es excelente. Me siento mucho más preparado y seguro.',
      ruta: '/images/estudiantes/fotor-ai-20241026105700.jpg',
      tiempo: '7 meses'
    },
    {
      nombre: 'David López',
      edad: 54,
      mensaje: 'El sistema de valoración de profesores me da mucha confianza para elegir al mejor. Muy recomendable.',
      ruta: '/images/estudiantes/fotor-ai-20241026105730.jpg',
      tiempo: '5 meses'
    }
  ];
}