import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IListResponseInterface} from "../interfaces/iListResponse.interface";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private httpClient = inject(HttpClient);
  private chatsUrl = `${environment.API_URL}/chats`;
  private messagesUrl = `${environment.API_URL}/messages`;
  private studentsUrl = `${environment.API_URL}/students`;

  getChats(token:string|null): Promise<IListResponseInterface>{
    const headers = { Authorization: `${token}` };
    return firstValueFrom(this.httpClient.get<IListResponseInterface>(`${this.chatsUrl}`, { headers }));
  }

  getChatMessages(token:string|null, chatId: number): Promise<IListResponseInterface>{
    const headers = { Authorization: `${token}` };
    return firstValueFrom(this.httpClient.get<IListResponseInterface>(`${this.messagesUrl}?chat_id=${chatId}`, { headers }));
  }

  sendMessage(token:string|null, chatId: number, content: string, userId: number|null): Promise<void>{
    const headers = { Authorization: `${token}` };
    const body = { chat_id: chatId, sender_id: userId, message: content };
    return firstValueFrom(this.httpClient.post<void>(`${this.messagesUrl}`, body, { headers }));
  }

  rentTeacher(studentId: number | undefined, teacherId: number) {
    const body = {teacher_id: teacherId, knowledge_branch_id: 1}
    return firstValueFrom(this.httpClient.post<void>(`${this.studentsUrl}/${studentId}/link-teacher`, body));
  }
}
