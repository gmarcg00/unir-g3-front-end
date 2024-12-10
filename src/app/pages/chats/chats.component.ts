import {Component, Input} from '@angular/core';
import {ChatElementComponent} from "../../components/chats/chat-element/chat-element.component";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    ChatElementComponent
  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {

}
