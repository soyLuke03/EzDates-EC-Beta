import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TrendService } from '../trend.service';
import { ConversionUtils } from 'turbocommons-ts';
import { Router, ActivatedRoute } from '@angular/router';

// import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['../../trends/trends.component.css']
})
export class AddComponent implements OnInit {


  myForm: FormGroup = this.fb.group({
    trend: [],
    name: [null, [Validators.required, Validators.maxLength(200)]]
  })

  constructor(private fb: FormBuilder, private tS:TrendService, private acRoute:ActivatedRoute, private route:Router) { }

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

      
      
      this.tS.postTrend(this.myForm.controls['name'].value).subscribe({
        next: resp => 
        Swal.fire({
          title: "Saved successfully",
          text: "Your trend has been saved",
          background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
          confirmButtonColor: 'black',
          confirmButtonText: 'OK',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload()
        }}),
        error: (error) =>
          Swal.fire({
            title: "An error has appeared",
            text: "The trend cannot be saved. Try again later or contact with an admin",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          }) 
      })
      this.route.navigate(['trends/list'])
      this.myForm.reset()
      
    }


}
