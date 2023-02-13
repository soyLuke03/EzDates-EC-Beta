import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
// import { Router } from '@angular/router';

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
    imgURL: [null, [Validators.required]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
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
      this.myForm.reset()
      console.log("Añadido con éxito")

      Swal.fire({
        title: "Submitted",
        text: "Your post has been submitted",
        background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
        confirmButtonColor: 'black',
        confirmButtonText: 'OK'
      })
    }


}
