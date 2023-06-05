import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userChat = {
    user: '',
    text: ''
  }

  myMessages:any;
  

  constructor(private activated:ActivatedRoute, private webService:WebsocketService) { }

  ngOnInit(): void {
    this.activated.paramMap.subscribe((params:ParamMap) => {

      //Actualiza la ruta en función del usuario
      if(params.get('id')!=null){
        this.userChat.user = params.get('id')!
      }
      else{
        this.userChat.user = "NO USER FOUND"
      }
      
    })

    //Escucha el evento "Text-event" y muestra los mensajes 
    this.webService.listen().subscribe(
      (data) => {
        this.myMessages = data;
      }
    )
 
  }
  
  //Emite el mensaje del usuario
  myMessage() {
    this.webService.emit(this.userChat);
    this.userChat.text = ''
  }


}

