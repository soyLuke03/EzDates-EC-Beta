import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrendService } from '../trend.service';
import { Trend } from '../../interfaces/trend.interface';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['../../trends/trends.component.css']
})
export class TrendComponent implements OnInit {

  constructor(private aCRoute:ActivatedRoute, private tS:TrendService) { }

  trend!:Trend;

  ngOnInit(): void {
    let id = this.aCRoute.snapshot.params['id'];
    this.tS.getTrend(id).subscribe({
      next: resp => this.trend = resp
    })
  }

}
