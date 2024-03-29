import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/game.interface';
import { GamesService } from '../games.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../games/games.component.css']
})
export class ListComponent implements OnInit {

  constructor(private gameService:GamesService, private fb: FormBuilder) { }

  gameList:string[] = []

  ngOnInit(): void {
    this.gameService.getGames()
    .subscribe({
      next: (resp) => {
        for (const game of resp) {
          this.gameList.unshift(game.name)
        }        
      }
    })
  }

  myForm: FormGroup = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(200)]]
  })


  deleteGame(name:string){
    this.gameService.deleteGame(name)
    .subscribe({
      next: resp => {
        this.gameList.splice(this.gameList.indexOf(resp.name),1)
      }
    })
  }

  updateGame(name:string, game:Game){
    this.gameService.updateGame(name, game)
    .subscribe({
      next: resp => {}
    })
  }

      /**
  * Método cuando se envía el formulario correctamente
  */
      save = (e: { preventDefault: () => void; }) => {
        
        this.gameService.postGame(this.myForm.value).subscribe({
          next: resp => {
          Swal.fire({
            title: "Saved successfully",
            text: "Your game has been saved",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK',
            allowOutsideClick: false
          })
          this.gameList.unshift(this.myForm.controls['name'].value)
          this.myForm.reset()
        },
          error: (error) =>
            Swal.fire({
              title: "An error has appeared",
              text: "The game cannot be saved. Try again later or contact with an admin",
              background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
              confirmButtonColor: 'black',
              confirmButtonText: 'OK'
            }) 
        })
        
        
      }
  
}
