import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  puerto:string = "http://localhost:3000"
  // puerto:string = "https://scary-lock-production.up.railway.app"
  socket:any;
  server = io(this.puerto, {transports: ['websocket']});

  constructor() { 
    this.socket = this.server
  }

  listen() {
    return new Observable((Subscriber) => {
      //Cuando 'text-event'
      this.socket.on('text-event', (data:any) => {
        Subscriber.next(data);
      })
    })
  }

  emit(data:any){
    //Emite 'send-message'
    if(data.text!=null && data.text != ''){
      // console.log(data);
      
      this.socket.emit('send-message', data);
    }
  }


}
