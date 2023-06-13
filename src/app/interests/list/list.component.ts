import { Component, OnInit } from '@angular/core';
import { Interest } from 'src/app/interfaces/interest.interface';
import { InterestService } from '../interest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../interests/interests.component.css']
})
export class ListComponent implements OnInit {

  constructor(private interestService:InterestService, private fb: FormBuilder) { }
  
  interestList:string[] = []
  
  ngOnInit(): void {
    this.interestService.getInterest()
    .subscribe({
      next: (resp) => {
        for (const interest of resp) {
          this.interestList.unshift(interest.name)
        }        
      }
    })
  }

  myForm: FormGroup = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(200)]]
  })

  deleteInterest(name:string){
    this.interestService.deleteInterest(name)
    .subscribe({
      next: resp => {
        this.interestList.splice(this.interestList.indexOf(resp.name),1)
      }
    })
  }

  updateInterest(name:string, interest:Interest){
    this.interestService.updateInterest(name, interest)
    .subscribe({
      next: resp => {}
    })
  }

    /**
  * Método cuando se envía el formulario correctamente
  */
    save = (e: { preventDefault: () => void; }) => {

      
      // console.log(this.myForm.value);
      
      this.interestService.postInterest(this.myForm.value).subscribe({
        next: resp =>{ 
        Swal.fire({
          title: "Saved successfully",
          text: "Your interest has been saved",
          background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
          confirmButtonColor: 'black',
          confirmButtonText: 'OK',
          allowOutsideClick: false
        })
        this.interestList.unshift(this.myForm.controls['name'].value)
        this.myForm.reset()
      },
        error: (error) =>
          Swal.fire({
            title: "An error has appeared",
            text: "The interest cannot be saved. Try again later or contact with an admin",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          }) 
      })
      
    }

}
