import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { Profile } from 'src/app/interfaces/profile.interface';
import { PostService } from 'src/app/posts/posts.service';
import { ConversionUtils } from 'turbocommons-ts';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../users.component.css']
})
export class ProfileComponent implements OnInit {

  errorPasswords:string = "";

  myForm: FormGroup = this.fb.group({
    bio: ['', Validators.maxLength(200)],
    gender: ['', [Validators.required]],
    image: [null],
    imageSource: [null]
  })

  json: any = {
    username: '',
    bio: '',
    gender: 1
  }


  
  constructor(private fb: FormBuilder, private router: Router, private uS:UserService) { }


  token = localStorage.getItem('token')!;
  payload!:string;
  username!: string;

  ngOnInit(): void {
    if(this.token){
      this.token = localStorage.getItem('token')!;
      this.payload = ConversionUtils.base64ToString(this.token.split(".")[1])
      this.username = this.payload.split('"')[3];
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

    onFileChange(event:any) {
      if (event.target.files.length > 0) {
        const image:File = event.target.files[0];
        this.myForm.patchValue({
          imageSource: image
        });
      }
    }

  /**
  * Método cuando se envía el formulario correctamente
  */
  save = (e: { preventDefault: () => void; }) => {

    this.json.username = this.username
    this.json.gender = this.myForm.get('gender')?.value;
    this.json.bio = this.myForm.get('bio')?.value;
    this.uS.postProfile(this.json, this.myForm.controls['imageSource'].value)
    .subscribe({
      next: resp => {}
    })

      this.myForm.reset()

      // this.router.navigate(['logs/login'])
    }
    



  }

