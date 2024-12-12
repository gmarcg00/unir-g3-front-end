import {Component, inject} from '@angular/core';
import {ChatElementComponent} from "../../components/chats/chat-element/chat-element.component";
import {MessageComponent} from "../../components/chats/message/message.component";
import {ChatsService} from "../../services/chats.service";
import {AuthService} from "../../services/auth.service";
import {IChatInfoResponse} from "../../interfaces/iChatInfoResponse";
import Swal from "sweetalert2";
import {NgForOf} from "@angular/common";
import {IMessageInfoResponse} from "../../interfaces/iMessageInfoResponse";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    ChatElementComponent,
    MessageComponent,
    NgForOf
  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {

  chatsService = inject(ChatsService);
  authService = inject(AuthService);
  chats: IChatInfoResponse [] = [];
  messages: IMessageInfoResponse [] = [];

  userId: number | null = 0;
  actualChatImage: string = "";
  actualChatName: string = "";
  actualChatLastNames: string = "";

  ngOnInit(): void {
    this.getUserId();
    this.getChats();
  }

  getChats():void {
    this.chatsService.getChats(this.authService.getToken())
      .then((response) => this.chats = response.data)
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  }

  getMessages(chatId: number): void{
    this.chatsService.getChatMessages(this.authService.getToken(), chatId)
      .then((response) => this.messages = response.data)
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  }

  getUserId(): void{
    const token = this.authService.getTokenPayload();
    if(token) this.userId = token.id;
  }

  sendMessage(chatId: number, content: string): void {
    this.chatsService.sendMessage(this.authService.getToken(), chatId, content, this.userId)
      .then(() => this.getMessages(chatId))
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  }

  setActualChat(chatId: number, name: string, lastNames: string, image:string): void {
    this.actualChatName = name;
    this.actualChatLastNames = lastNames;
    this.actualChatImage = image;
    this.getMessages(chatId);
  }

}
