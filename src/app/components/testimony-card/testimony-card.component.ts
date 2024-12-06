import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-testimony-card',
  standalone: true,
  imports: [],
  templateUrl: './testimony-card.component.html',
  styleUrl: './testimony-card.component.css'
})
export class TestimonyCardComponent {
  @Input() image: string = "";
  @Input() name: string = "";
  @Input() content: string = "";
}
