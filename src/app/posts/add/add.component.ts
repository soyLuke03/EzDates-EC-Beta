import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Trend } from '../../interfaces/trend.interface';
import { TrendService } from '../../trends/trend.service';
import { PostService } from '../posts.service';
import { ConversionUtils } from 'turbocommons-ts';
import { ActivatedRoute, Router } from '@angular/router';

// import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['../../posts/posts.component.css']
})
export class AddComponent implements OnInit {


  myForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    file: ['', [Validators.required]],
    fileSource: [null, [Validators.required]],
    trends: ['']
  })

  json: any = {
    title: '',
    description: ''
  }

  trendList!:Trend[];

  constructor(private fb: FormBuilder, private pS:PostService, private acRoute:ActivatedRoute, private tS:TrendService, private router:Router) { }


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

    this.tS.getTrends().subscribe({
      next: resp => this.trendList = resp
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


  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file:File = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  /**
  * Método cuando se envía el formulario correctamente
  */
    save = (e: { preventDefault: () => void; }) => {

      this.json.title = this.myForm.get('title')?.value;
      this.json.description = this.myForm.get('description')?.value;
      let trends = this.myForm.get('trends')?.value
      let newTrends:string = ""

      for (const trend of trends) {
        newTrends += trend.replace("#","").trim()
      }
      if(newTrends.startsWith(',')){
        newTrends = newTrends.replace(',','')
      }
      
      
      this.pS.postPost(this.json, newTrends, this.username, this.myForm.controls['fileSource'].value)
      .subscribe({
        next: resp => 
        Swal.fire({
          title: "Saved successfully",
          text: "Your post have been saved",
          background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        
          color: 'white',
          confirmButtonColor: 'black',
          confirmButtonText: 'OK',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload()
        }}),
        error: (error) => {          
          Swal.fire({
            title: "An error has appeared",
            text: "The post cannot be saved. Try again later or contact with an admin",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        
            color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          }) 
        }
      })
      this.myForm.reset()
      this.router.navigate([['/posts/list']]);
    }


}
