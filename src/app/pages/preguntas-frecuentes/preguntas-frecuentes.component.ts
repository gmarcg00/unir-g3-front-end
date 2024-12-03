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
      respuesta: 'Para registrarte, simplemente haz clic en el botón de "Registrarse" en la parte superior de la página e ingresa tus datos personales.',
      expanded: false
    },
    {
      pregunta: '¿Cómo puedo encontrar un profesor cerca de mí?',
      respuesta: 'Puedes usar la herramienta de búsqueda ingresando tu ubicación y filtrando por la materia que deseas aprender.',
      expanded: false
    },
    {
      pregunta: '¿Los profesores están calificados?',
      respuesta: 'Sí, todos los profesores en la plataforma pasan por un proceso de verificación y tienen un sistema de calificación basado en las valoraciones de los estudiantes.',
      expanded: false
    },
    {
      pregunta: '¿Cómo me pongo en contacto con un profesor?',
      respuesta: 'Una vez que encuentres un profesor que te interese, puedes enviarle un mensaje directamente a través del chat interno de la plataforma.',
      expanded: false
    },
    {
      pregunta: '¿Cuáles son los métodos de pago disponibles?',
      respuesta: 'Aceptamos pagos con tarjeta de crédito, débito y a través de PayPal para mayor comodidad y seguridad.',
      expanded: false
    },
    {
      pregunta: '¿Cómo puedo inscribirme en una clase de magia?',
      respuesta: 'Para inscribirte en una clase de magia, selecciona la clase que te interesa y sigue las instrucciones para completar tu inscripción.',
      expanded: false
    },
    {
      pregunta: '¿Qué materiales necesito para las clases?',
      respuesta: 'Los materiales necesarios para cada clase se especificarán en la descripción de la clase. Generalmente, necesitarás una varita mágica y algunos ingredientes básicos de pociones.',
      expanded: false
    },
    {
      pregunta: '¿Puedo elegir a mi profesor de magia?',
      respuesta: 'Sí, puedes elegir a tu profesor de magia basado en sus calificaciones y especialidades.',
      expanded: false
    },
    {
      pregunta: '¿Cómo se evalúa el progreso de los estudiantes?',
      respuesta: 'El progreso de los estudiantes se evalúa mediante exámenes prácticos y teóricos al final de cada módulo.',
      expanded: false
    },
    {
      pregunta: '¿Qué sucede si no puedo asistir a una clase programada?',
      respuesta: 'Si no puedes asistir a una clase programada, puedes reprogramarla o ver la grabación de la clase más tarde.',
      expanded: false
    },
    {
      pregunta: '¿Hay clases disponibles para todas las edades?',
      respuesta: 'Sí, ofrecemos clases para todas las edades, desde niños hasta adultos.',
      expanded: false
    },
    {
      pregunta: '¿Qué tipos de magia se enseñan en las clases?',
      respuesta: 'Enseñamos una variedad de tipos de magia, incluyendo encantamientos, pociones, defensa contra las artes oscuras y más.',
      expanded: false
    },
    {
      pregunta: '¿Las clases son individuales o en grupo?',
      respuesta: 'Ofrecemos tanto clases individuales como en grupo, dependiendo de tus preferencias.',
      expanded: false
    },
    {
      pregunta: '¿Cómo puedo obtener un reembolso si no estoy satisfecho con una clase?',
      respuesta: 'Si no estás satisfecho con una clase, puedes solicitar un reembolso dentro de los primeros 15 días después de la clase.',
      expanded: false
    },
    {
      pregunta: '¿Qué medidas de seguridad se toman durante las clases de magia?',
      respuesta: 'Tomamos muchas medidas de seguridad, incluyendo la supervisión constante por parte de los profesores y el uso de hechizos de protección.',
      expanded: false
    }
  ];
}


