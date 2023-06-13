import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConversionUtils } from 'turbocommons-ts';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from 'src/app/interfaces/game.interface';
import { Interest } from 'src/app/interfaces/interest.interface';
import { Profile } from 'src/app/interfaces/profile.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../users.component.css']
})
export class ProfileComponent implements OnInit {

  errorPasswords:string = "";
  games:Game[] = []
  interests:Interest[] = []

  myGames:string[] = []
  myInterests:string[] = []

  profile!:Profile

  myForm: FormGroup = this.fb.group({
    bio: ['', Validators.maxLength(200)],
    gender: ['', [Validators.required]],
    image: [null, [Validators.required]],
    imageSource: [null, [Validators.required]]
  })

  json: any = {
    username: '',
    bio: '',
    gender: 1
  }


  
  constructor(private fb: FormBuilder, private router: Router, private uS:UserService) { }


  token = localStorage.getItem('token')!;
  payload!:string;
  username!: string;

  ngOnInit(): void {
    if(this.token){
      this.token = localStorage.getItem('token')!;
      this.payload = ConversionUtils.base64ToString(this.token.split(".")[1])
      this.username = this.payload.split('"')[3];
    }

    this.uS.getProfile(this.username)
    .subscribe({
      next: resp => {
        this.profile = resp
      }
    })

    this.uS.getProfile(this.username)
    .subscribe({
      next: resp => {
        
        for (let game of resp.game_list){
          this.myGames.unshift(game.game.name)
          
        }
        
      }
    })

    this.uS.getProfile(this.username)
    .subscribe({
      next: resp => {
        for(let interest of resp.interest_list){
          this.myInterests.unshift(interest.interest.name)
        }
        
      }
    })

    this.uS.getGames()
    .subscribe({
      next: (resp) => {
        this.games = resp
        
      }
    })

    this.uS.getInterests()
    .subscribe({
      next: resp => {
        this.interests = resp
      }
    })

  }



  /**
   * Método para validar que los campos no estén vacíos
   * @param campo 
   * @returns 
   */
    notValid(campo: string): boolean{
      return this.myForm?.controls[campo]?.invalid &&
        this.myForm?.controls[campo]?.touched
    }

    onFileChange(event:any) {
      if (event.target.files.length > 0) {
        const image:File = event.target.files[0];
        this.myForm.patchValue({
          imageSource: image
        });
      }
    }

  /**
  * Método cuando se envía el formulario correctamente
  */
  save = (e: { preventDefault: () => void; }) => {

    this.json.username = this.username
    this.json.gender = this.myForm.get('gender')?.value;
    this.json.bio = this.myForm.get('bio')?.value;
    this.uS.postProfile(this.json, this.myForm.controls['imageSource'].value)
    .subscribe({
      next: resp => {
        Swal.fire({
          title: "Profile saved",
          text: "Your profile has been saved succesfully. You may choose 'Games' and 'Interests' to your list",
          background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',      
          color: 'white',
          confirmButtonColor: 'black',
          confirmButtonText: 'OK',
          allowOutsideClick: true
        })
      }
    })
      this.myForm.reset()
    }


    addGame(gameId:number){
      this.uS.addNewGame(this.username,gameId)
      .subscribe({
        next: resp => {
          this.myGames.unshift(resp.name),
          Swal.fire({
            title: "Game added",
            text: "",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',      
            color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK',
            timer: 800,
            timerProgressBar: true,
          })
        }
      })
    }
    delGame(gameId:number){
      this.uS.delGame(this.username,gameId)
      .subscribe({
        next: resp => {
          this.myGames.splice(this.myGames.indexOf(resp.name),1)
          Swal.fire({
            title: "Game deleted",
            text: "",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',      
            color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK',
            timer: 800,
            timerProgressBar: true,
          })
        }
      })
    }

    addInterest(interestId:number){
        this.uS.addNewInterest(this.username,interestId)
        .subscribe({
          next: resp => {
            this.myInterests.unshift(resp.name)
            Swal.fire({
              title: "Interest added",
              text: "",
              background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',      
              color: 'white',
              confirmButtonColor: 'black',
              confirmButtonText: 'OK',
              timer: 800,
              timerProgressBar: true,
            })
          },
          error(err) {
            
          },
        })
    }
    delInterest(interestId:number){
        this.uS.delInterest(this.username,interestId)
        .subscribe({
          next: resp => {
            this.myInterests.splice(this.myInterests.indexOf(resp.name),1)
            Swal.fire({
              title: "Interest deleted",
              text: "",
              background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',      
              color: 'white',
              confirmButtonColor: 'black',
              confirmButtonText: 'OK',
              timer: 800,
              timerProgressBar: true,
            })
          },
        })
    }
    
  }



