import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../games/games.component.css']
})
export class ListComponent implements OnInit {

  constructor(private gameService:GamesService) { }

  gameList:Game[] = []

  ngOnInit(): void {
    this.gameService.getGames()
    .subscribe({
      next: (resp) => {
        this.gameList = resp        
      }
    })
  }


  deleteGame(name:string){
    this.gameService.deleteGame(name)
    .subscribe({
      next: resp => {}
    })
  }

  updateGame(name:string, game:Game){
    this.gameService.updateGame(name, game)
    .subscribe({
      next: resp => {}
    })
  }

  
}
