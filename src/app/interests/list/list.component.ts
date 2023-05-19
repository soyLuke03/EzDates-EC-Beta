import { Component, OnInit } from '@angular/core';
import { Interest } from 'src/app/interfaces/interest.interface';
import { InterestService } from '../interest.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../interests/interests.component.css']
})
export class ListComponent implements OnInit {

  constructor(private interestService:InterestService) { }
  
  interestList:Interest[] = []
  
  ngOnInit(): void {
    this.interestService.getInterest()
    .subscribe({
      next: (resp) => {
        this.interestList = resp        
      }
    })
  }

  deleteInterest(name:string){
    this.interestService.deleteInterest(name)
    .subscribe({
      next: resp => {}
    })
  }

  updateInterest(name:string, interest:Interest){
    this.interestService.updateInterest(name, interest)
    .subscribe({
      next: resp => {}
    })
  }

}
