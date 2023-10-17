import jsonData from '../../../../assets/data/pages/help-card.json';
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticket-detalle',
  templateUrl: './ticket-detalle.component.html',
  styleUrls: ['./ticket-detalle.component.css']
})
export class TicketDetalleComponent {
//assets/data/pages/help-card.json
jsonData = jsonData;ticketUsers: any[];
localStorageKey = 'ticket_users';

@ViewChild('scrollContainer', { static: false }) scrollContainer: ElementRef;

constructor(private http: HttpClient) { }

ngOnInit() {
  const storedData = localStorage.getItem(this.localStorageKey);
  if (storedData) {
    this.ticketUsers = JSON.parse(storedData);
  } else {
    this.http.get<any>('assets/data/pages/ticket-user.json').subscribe(data => {
      this.ticketUsers = data.ticketUsers;
    });
  }
}

ngAfterViewChecked() {
  this.scrollToBottom();
}

scrollToBottom(): void {
  try {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  } catch (err) {
    // Handle error, if any.
  }
}

saveDataToLocalStorage() {
  localStorage.setItem(this.localStorageKey, JSON.stringify(this.ticketUsers));
}

sendMessage(message: string) {
  if (message.trim() === '') {
    return; // Don't add empty messages
  }

  const newMessage = {
    avatar: 'assets/images/avatars/thumbs.png', // Replace with the URL of the user's avatar
    name: 'Md. Rafiq', // Replace with the sender's name
    messagePreview: message,
    timestamp: new Date().toLocaleString(),
    isUnread: true, // Assuming new messages are always unread
  };

  this.ticketUsers.push(newMessage);
  this.saveDataToLocalStorage();
  // Optionally, you can clear the input field after sending the message
  // newMessageInput.value = '';
}
}