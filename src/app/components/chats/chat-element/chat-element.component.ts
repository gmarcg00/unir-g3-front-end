import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chat-element',
  standalone: true,
  imports: [],
  templateUrl: './chat-element.component.html',
  styleUrl: './chat-element.component.css'
})
export class ChatElementComponent {
  @Input() image: string = "";
  @Input() name: string = "";
  @Input() lastNames: string = "";
}
