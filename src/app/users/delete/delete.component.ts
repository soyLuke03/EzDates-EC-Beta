import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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


  constructor(private router:Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  /**
  * Método cuando se envía el formulario correctamente
  */
    save = (e: { preventDefault: () => void; }) => {
      this.myForm.reset()
      console.log("Eliminado con éxito")
      Swal.fire({
        title: "User removed",
        text: "The user has been removed",
        background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
        confirmButtonColor: 'black',
        confirmButtonText: 'OK'
      })
      
      this.router.navigate([['/users/list']]);
      
    }

}
