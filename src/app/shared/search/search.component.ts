import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() userEvento:EventEmitter<string> = new EventEmitter();
  userName:string = '';


  emitUsername() {
    this.userEvento.emit(this.userName);
    // console.log(this.userName);
    
    this.userName = ''; 
  }

}
