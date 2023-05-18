import { Component, OnInit } from '@angular/core';
import { LogsService } from '../logs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['../../logs/logs.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private lS:LogsService, private aCRoute:ActivatedRoute) { }

  error:string = ""

  ngOnInit(): void {
    let code = this.aCRoute.snapshot.queryParams['code']
    let user = this.aCRoute.snapshot.queryParams['user']
    console.log(code, user);
    if(code != null && user != null){
      this.lS.verify(user, code).subscribe({
        next: resp => console.log(resp),
        error: (error) => console.log(error)
      })
      this.error=""
    }
    else{
      this.error="1"
    }


  }

}
