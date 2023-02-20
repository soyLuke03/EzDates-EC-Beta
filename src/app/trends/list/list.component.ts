import { Component, OnInit } from '@angular/core';
import { TrendService } from '../trend.service';
import { Trend } from '../../interfaces/trend.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../trends/trends.component.css']
})
export class ListComponent implements OnInit {

  constructor(private tS:TrendService) { }
  trendList:Trend[] = [];

  ngOnInit(): void {
    this.tS.getTrends().subscribe({
      next: resp => this.trendList = resp
    })
  }

}
