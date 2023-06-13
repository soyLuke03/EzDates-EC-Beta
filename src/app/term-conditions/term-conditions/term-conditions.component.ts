import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-term-conditions',
  templateUrl: './term-conditions.component.html',
  styleUrls: ['./term-conditions.component.css']
})
export class TermConditionsComponent implements OnInit {

  constructor(private acRoute:ActivatedRoute) { }
  lang:string = "ESP"

  ngOnInit(): void {

    this.acRoute.paramMap.subscribe((params:ParamMap) => {
      if(params.get('lang')!=null){
        this.lang = params.get('lang')!
        
      }
    })

  }

}
