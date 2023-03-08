import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TrendService } from '../trend.service';
import { Trend } from '../../interfaces/trend.interface';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['../../trends/trends.component.css']
})
export class DeleteComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.maxLength(200)]],
    description: [null, [Validators.required, Validators.maxLength(200)]],
    imgURL: [null, [Validators.required]]
  })

  constructor(private aCRoute:ActivatedRoute, private tS:TrendService, private fb: FormBuilder, private route:Router) { }

  trend!:Trend;

  ngOnInit(): void {
    let id = this.aCRoute.snapshot.params['id'];
    this.tS.getTrend(id).subscribe({
      next: resp => this.trend = resp
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

  /**
  * Método cuando se envía el formulario correctamente
  */
    save = (e: { preventDefault: () => void; }) => {
      
      this.tS.deleteTrend(this.trend.name).subscribe({
        next: resp => 
        Swal.fire({
          title: "Removed",
          text: "Your trend have been removed",
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
            text: "The trend cannot be removed. Try again later or contact with an admin",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          }) 
      })
      
      // console.log("Añadido con éxito")
      this.myForm.reset()
      this.route.navigate(['/trends/list/']);

 
    }

}
