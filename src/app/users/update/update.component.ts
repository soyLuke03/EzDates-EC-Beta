import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { ConversionUtils } from 'turbocommons-ts';
import { User } from '../../interfaces/user.interface';

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


  user!:User;
  ngOnInit(): void {
    let username = this.aCRoute.snapshot.params['id'];
    this.uS.getUser(username)
    .subscribe({
      next: resp => this.defaultValues(resp),
      error: (error) => console.log("ERROR on loading user")
    })
  }

  defaultValues(resp:any) {
    this.user = resp;

    this.myForm.controls['username'].setValue(this.user.username)
    this.myForm.controls['email'].setValue(this.user.email)
    this.myForm.controls['name'].setValue(this.user.name)
    this.myForm.controls['surname'].setValue(this.user.surname)
    this.myForm.controls['password'].setValue(this.user.password)

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
      return this.myForm.controls['password'].value == this.myForm.controls['password2'].value
    }

  /**
  * Método cuando se envía el formulario correctamente
  */
  save = (e: { preventDefault: () => void; }) => {
    if(this.equalsPasswords()){
      
      let username = this.aCRoute.snapshot.params['id'];
      console.log(username);
      

      this.uS.putUser(this.myForm.value,username,this.myForm.controls['email'].value).subscribe({
        next: resp => 
          Swal.fire({
            title: "Updated",
            text: "Your account has been updated",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          }),
          error: (error) =>
            Swal.fire({
              title: "An error has appeared",
              text: "The account cannot be updated. Try again later or contact with an admin",
              background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
              confirmButtonColor: 'black',
              confirmButtonText: 'OK'
            })
      })
      
      // console.log(this.myForm.controls['password'].value);
      
      this.myForm.reset()
      this.errorPasswords=""

      this.router.navigate(['logs/login'])
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
