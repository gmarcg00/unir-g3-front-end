import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {ChatElementComponent} from "../../components/chats/chat-element/chat-element.component";
import {MessageComponent} from "../../components/chats/message/message.component";
import {ChatsService} from "../../services/chats.service";
import {AuthService} from "../../services/auth.service";
import {IChatInfoResponse} from "../../interfaces/iChatInfoResponse";
import Swal from "sweetalert2";
import {NgForOf, NgIf} from "@angular/common";
import {IMessageInfoResponse} from "../../interfaces/iMessageInfoResponse";
import {FormsModule} from "@angular/forms";
import {StudentsService} from "../../services/students.service";
import {ITeacherInfoInterface} from "../../interfaces/iTeacherInfoInterface";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    ChatElementComponent,
    MessageComponent,
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent{

  chatsService = inject(ChatsService);
  authService = inject(AuthService);
  studentsService = inject(StudentsService);
  chats: IChatInfoResponse [] = [];
  messages: IMessageInfoResponse [] = [];
  userTeachers: ITeacherInfoInterface[] = [];

  userId: number | null = 0;
  actualChatId: number = 0;
  actualChatUserId: number = 0;
  actualChatImage: string = "";
  actualChatName: string = "";
  actualChatLastNames: string = "";
  message: string = "";
  isContratable: boolean = false;

  ngOnInit(): void {
    this.scrollToTop();
    this.getUserId();
    this.getChats();
    if(this.authService.getTokenPayload()?.role === 3) this.getUserTeachers();
  }

  getUserTeachers(): void {
    const studentId = this.authService.getId();
    this.studentsService.getStudentTeachers(studentId,1,4)
      .then(response => this.userTeachers = response.data)
      .catch( () => Swal.fire('Error', 'An error occurred while fetching the teachers.', 'error'))
  }

  getChats():void {
    this.chatsService.getChats(this.authService.getToken())
      .then((response) => this.chats = response.data)
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  }

  getMessages(chatId: number): void{
    this.chatsService.getChatMessages(this.authService.getToken(), chatId)
      .then((response) => {
        this.messages = response.data;
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  }

  getUserId(): void{
    const token = this.authService.getTokenPayload();
    if(token) this.userId = token.id;
  }

  sendMessage(): void {
    this.chatsService.sendMessage(this.authService.getToken(), this.actualChatId, this.message, this.userId)
      .then(() => this.getMessages(this.actualChatId))
      .catch((error) => Swal.fire('Error', error.message, 'error'));
    this.message = "";
  }

  setActualChat(chatId: number, actualChatUserId:number, name: string, lastNames: string, image:string): void {
    this.actualChatId = chatId;
    this.actualChatName = name;
    this.actualChatLastNames = lastNames;
    this.actualChatImage = image;
    this.actualChatUserId = actualChatUserId;
    this.getMessages(chatId);
    this.checkContratable();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  checkContratable(): void {
    const token = this.authService.getTokenPayload();
    if(token?.role === 3){
      this.isContratable = true;
      this.userTeachers.forEach((teacher) => {
        if(teacher.id === this.actualChatUserId) this.isContratable = false;
      });
    }
  }

  rentTeacher(){
    const tokenId = this.authService.getTokenPayload()?.id;
    this.chatsService.rentTeacher(tokenId, this.actualChatUserId)
      .then(() => Swal.fire({
        title: 'El profesor ha sido contratado',
        text: 'Disfruta de tus clases',
        icon: 'success',
        background: "#740001",
        color: "#D4A017"
      }))
      .catch((error) => Swal.fire({
        title: 'Hubo un error al contratar al profesor',
        text: 'Inténtalo más tarde',
        icon: 'error',
        background: "#740001",
        color: "#D4A017"
      }));
  }
}
