import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntas-frecuentes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.css']
})
export class PreguntasFrecuentesComponent {
  preguntasFrecuentes = [
    {
      pregunta: '¿Cómo puedo encontrar un profesor en mi zona?',
      respuesta: 'Nuestro portal te permite buscar profesores según tu ubicación. Solo tienes que ingresar tu ciudad o código postal en el buscador y te mostraremos los profesores más cercanos a ti.'
    },
    {
      pregunta: '¿Los profesores están verificados?',
      respuesta: 'Sí, todos los profesores en nuestra plataforma pasan por un proceso de verificación para asegurar su idoneidad y experiencia.'
    },
    {
      pregunta: '¿Qué tipo de clases se ofrecen?',
      respuesta: 'Ofrecemos una variedad de clases, desde materias académicas como matemáticas e inglés hasta lecciones de música, deportes, y mucho más.'
    },
    {
      pregunta: '¿Cómo se realizan los pagos?',
      respuesta: 'Los pagos se realizan de manera segura a través de nuestra plataforma. Aceptamos tarjetas de crédito, débito y otros métodos de pago seguros.'
    },
    {
      pregunta: '¿Puedo ver las reseñas de otros estudiantes?',
      respuesta: 'Sí, cada profesor tiene un perfil donde podrás ver las reseñas y calificaciones de otros estudiantes que han tomado clases con ellos.'
    }
  ];
}

