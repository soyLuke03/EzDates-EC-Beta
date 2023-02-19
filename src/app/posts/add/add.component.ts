import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PostService } from '../posts.service';
import { ConversionUtils } from 'turbocommons-ts';
import { Router, ActivatedRoute } from '@angular/router';

// import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['../../posts/posts.component.css']
})
export class AddComponent implements OnInit {


  myForm: FormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.maxLength(200)]],
    description: [null, [Validators.required, Validators.maxLength(200)]],
    file: [null, [Validators.required]]
  })

  constructor(private fb: FormBuilder, private pS:PostService, private acRoute:ActivatedRoute) { }


  token = localStorage.getItem('token')!;
  payload!:string;
  username!: string;

  ngOnInit(): void {
    if(this.token){
      this.token = localStorage.getItem('token')!;
      this.payload = ConversionUtils.base64ToString(this.token.split(".")[1])
      this.username = this.payload.split('"')[3];
    }
    else{
      this.username = "Anonimous"
    }
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

  /**
  * Método cuando se envía el formulario correctamente
  */
    save = (e: { preventDefault: () => void; }) => {

      this.pS.postPost(this.myForm.value,this.username,this.myForm.controls['file'].value).subscribe({
        next: resp => 
        Swal.fire({
          title: "Saved successfully",
          text: "Your post have been saved",
          background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
          confirmButtonColor: 'black',
          confirmButtonText: 'OK'
        }),
        error: (error) =>
          Swal.fire({
            title: "An error has appeared",
            text: "The post cannot be saved. Try again later or contact with an admin",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          }) 
      })
      this.myForm.reset()
      

      Swal.fire({
        title: "Submitted",
        text: "Your post has been submitted",
        background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
        confirmButtonColor: 'black',
        confirmButtonText: 'OK'
      })
    }


}
