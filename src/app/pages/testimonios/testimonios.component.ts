import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {TestimonyCardComponent} from "../../components/testimony-card/testimony-card.component";

@Component({
  selector: 'app-testimonios',
  standalone: true,
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css'],
  imports: [CommonModule, TestimonyCardComponent]
})
export class TestimoniosComponent {
  testimonios = [
    {
      nombre: 'Carlos Martínez',
      edad: 16,
      mensaje: 'Las clases de hechizos en Howards son increíbles. He aprendido tanto en tan poco tiempo. Los profesores son muy atentos y expertos en su campo.',
      ruta: '/images/estudiantes/fotor-ai-2024102610534.jpg'
    },
    {
      nombre: 'Ana García',
      edad: 17,
      mensaje: 'Gracias a Howards, mis habilidades en pociones han mejorado significativamente. El profesor es excelente y siempre disponible para resolver dudas.',
      ruta: '/images/estudiantes/fotor-ai-20241026105215.jpg'
    },
    {
      nombre: 'Luis Fernández',
      edad: 15,
      mensaje: 'Lo que más me gusta de Howards es la calidad de la enseñanza en artes de defensa. Me siento mucho más seguro y preparado.',
      ruta: '/images/estudiantes/fotor-ai-20241026105333.jpg'
    },
    {
      nombre: 'María López',
      edad: 23,
      mensaje: 'He contactado con varios profesores por el chat de Howards y la experiencia ha sido muy fluida. Muy recomendable.',
      ruta: '/images/estudiantes/fotor-ai-20241026105154.jpg'
    },
    {
      nombre: 'Jorge Pérez',
      edad: 35,
      mensaje: 'Pude elegir un profesor particular en Howards que se ajustaba a mi horario y presupuesto. La plataforma es genial.',
      ruta: '/images/estudiantes/fotor-ai-20241026105255.jpg'
    }
  ];
}
