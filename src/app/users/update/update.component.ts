import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { User } from '../../interfaces/user.interface';
import { ConversionUtils } from 'turbocommons-ts';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['../../users/users.component.css']
})



export class UpdateComponent implements OnInit {
  
  errorPasswords:string = "";

  myForm: FormGroup = this.fb.group({
    username: [null, [Validators.required,Validators.maxLength(199)]],
    name: [null,Validators.maxLength(199)],
    email: [null],
    surname: [null, [Validators.required,Validators.maxLength(199)]],
    password: [null, [Validators.required,Validators.maxLength(199),Validators.minLength(8)]],
    password2: [null, [Validators.required,Validators.maxLength(199),Validators.minLength(8)]]
  })
  constructor(private fb: FormBuilder, private router: Router, private uS:UserService, private aCRoute: ActivatedRoute) { }


  user:User|null = null;

  token = localStorage.getItem('token')!;
  payload!:string;
  usernameToken!: string;
  role!: string;

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
      next: resp => {
        this.user = resp[0];
    
        this.myForm.controls['username'].setValue(resp[0].username)
        this.myForm.controls['email'].setValue(resp[0].email)
        this.myForm.controls['name'].setValue(resp[0].name)
        this.myForm.controls['surname'].setValue(resp[0].surname)
        this.myForm.controls['password'].setValue("")
      },
      error: (error) => {}
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



    equalsPasswords(){
      return this.myForm.controls['password'].value == this.myForm.controls['password2'].value && this.myForm.controls['password2'].dirty || !this.myForm.controls['password2'].dirty
    }

  /**
  * Método cuando se envía el formulario correctamente
  */
  save = (e: { preventDefault: () => void; }) => {
    if(this.equalsPasswords()){
      
      let username = this.aCRoute.snapshot.params['id'];
      let formulario:any = {
        username: this.myForm.controls['username'].value,
        email: this.myForm.controls['email'].value,
        name: this.myForm.controls['name'].value,
        surname: this.myForm.controls['surname'].value,
        password: this.myForm.controls['password'].value,
        enabled: true
      }
      

      this.uS.putUser(formulario,username,this.myForm.controls['email'].value).subscribe({
        next: resp => 
          {
            Swal.fire({
            title: "Updated",
            text: "Your account has been updated",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        
            color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK',
            allowOutsideClick: false
          })
          if(username==this.usernameToken){
            localStorage.removeItem('token')
            this.router.navigate(['/logs/login'])
          }        
          else{
            this.router.navigate(['/users/list'])
          }
        }
          ,
          error: (error) =>
            Swal.fire({
              title: "An error has appeared",
              text: "The account cannot be updated. Try again later or contact with an admin",
              background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        
              color: 'white',
              confirmButtonColor: 'black',
              confirmButtonText: 'OK'
            })
      })
      
      this.myForm.reset()
      this.errorPasswords=""
    }
    if(!this.equalsPasswords()){
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
        confirmButtonColor: 'black',
        confirmButtonText: 'OK'
      })
      this.errorPasswords="Password do not match"
    }
    



  }
}
