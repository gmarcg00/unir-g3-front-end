import { Component } from '@angular/core';
import { NgFor } from '@angular/common';  // Importar NgFor para usar *ngFor

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.css'],
  standalone: true,
  imports: [NgFor]  // Necesario para usar la directiva *ngFor
})
export class PreguntasFrecuentesComponent {
  // Lista de preguntas frecuentes y sus respuestas
  preguntasFrecuentes = [
    {
      pregunta: '¿Cómo puedo registrarme en la plataforma?',
      respuesta: 'Para registrarte, simplemente haz clic en el botón de "Registrarse" en la parte superior de la página e ingresa tus datos personales.'
    },
    {
      pregunta: '¿Cómo puedo encontrar un profesor cerca de mí?',
      respuesta: 'Puedes usar la herramienta de búsqueda ingresando tu ubicación y filtrando por la materia que deseas aprender.'
    },
    {
      pregunta: '¿Los profesores están calificados?',
      respuesta: 'Sí, todos los profesores en la plataforma pasan por un proceso de verificación y tienen un sistema de calificación basado en las valoraciones de los estudiantes.'
    },
    {
      pregunta: '¿Cómo me pongo en contacto con un profesor?',
      respuesta: 'Una vez que encuentres un profesor que te interese, puedes enviarle un mensaje directamente a través del chat interno de la plataforma.'
    },
    {
      pregunta: '¿Cuáles son los métodos de pago disponibles?',
      respuesta: 'Aceptamos pagos con tarjeta de crédito, débito y a través de PayPal para mayor comodidad y seguridad.'
    }
  ];
}


