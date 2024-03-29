import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { User } from '../../interfaces/user.interface';
import { ConversionUtils } from 'turbocommons-ts';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['../../users/users.component.css']
})
export class DeleteComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.maxLength(200)]],
    description: [null, [Validators.required, Validators.maxLength(200)]],
    imgURL: [null, [Validators.required]]
  })

  user!:User[];

  token = localStorage.getItem('token')!;
  payload!:string;
  usernameToken!: string;
  role!: string;

  constructor(private router:Router, private fb: FormBuilder, private uS:UserService, private aCRoute:ActivatedRoute) { }

  ngOnInit(): void {

    if(this.token){
      this.token = localStorage.getItem('token')!;
      this.payload = ConversionUtils.base64ToString(this.token.split(".")[1])
      this.usernameToken = this.payload.split('"')[3];
      this.role = this.payload.split('"')[9];
    }

    let username = this.aCRoute.snapshot.params['id'];
    this.uS.getUser(username)
    .subscribe({
      next: resp => this.user = resp,
      error: (error) => console.log()
    })
  }

  /**
  * Método cuando se envía el formulario correctamente
  */
    save = (e: { preventDefault: () => void; }) => {
      
      this.uS.deleteUser(this.user[0].username).subscribe({
        next: resp => 
        {Swal.fire({
          title: "Removed",
          text: "Account removed",
          background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
          confirmButtonColor: 'black',
          confirmButtonText: 'OK'
        })
        if(this.user[0].username==this.usernameToken){
            localStorage.removeItem('token')
            this.router.navigate(['/logs/login'])
          }
          else{
            this.router.navigate(['/users/list'])
          }
        },
        error: (error) =>
          Swal.fire({
            title: "An error has appeared",
            text: "The account cannot be removed. Try again later or contact with an admin",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          })
      })
      this.myForm.reset()
      
    }

}
