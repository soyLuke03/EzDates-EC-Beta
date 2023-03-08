import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { TrendService } from '../trend.service';
import { Trend } from '../../interfaces/trend.interface';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['../../trends/trends.component.css']
})
export class UpdateComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(200)]]
  })
  trend!:Trend;
  
  constructor(private aCRoute:ActivatedRoute, private tS:TrendService, private fb: FormBuilder, private route:Router) {
    let id = this.aCRoute.snapshot.params['id'];
    this.tS.getTrend(id).subscribe({
      next: resp => this.trend = resp
    })
   }

  

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

      this.tS.putTrend(this.trend.name, this.myForm.value).subscribe({
        next: resp => 
        Swal.fire({
          title: "Updated",
          text: "Your trend have been updated",
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
            text: "The trend cannot be updated. Try again later or contact with an admin",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          }) 
      })

      this.myForm.reset()
      this.route.navigate(['/trends/list/']);
      // console.log("Añadido con éxito")

    }

}
