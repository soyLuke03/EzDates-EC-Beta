import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { PostService } from '../posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../interfaces/post.interface';
import { Trend } from '../../interfaces/trend.interface';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['../../posts/posts.component.css']
})
export class UpdateComponent implements OnInit {

  post!: Post;
  trends: Trend[] = []
  showTrends: string = "";
  
  myForm: FormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.maxLength(200)]],
    description: [null, [Validators.required, Validators.maxLength(200)]],
    imgurl: [null],
    date: [null],
    trends: [null]
  })

  constructor(private router:Router,private fb: FormBuilder, private pS:PostService, private acRoute:ActivatedRoute) { }

  ngOnInit(): void {
    let idPost = this.acRoute.snapshot.params['id'];
    this.pS.getPost(idPost)
    .subscribe({
      next: resp => this.defaultValues(resp),
      error: (error) => console.log("ERROR on loading post")
    })

  }

  defaultValues = (resp:any) => {
    this.post = resp;

    this.myForm.controls['title'].setValue(this.post.title)
    this.myForm.controls['description'].setValue(this.post.description)
    // console.log(this.post.imgurl);
    
    if(!this.post.imgurl){
      this.myForm.controls['imgurl'].setValue("https://res.cloudinary.com/dzr2fkubk/image/upload/v1674463603/404NotFound_lu44pl.png")
    }
    else{
      this.myForm.controls['imgurl'].setValue(this.post.imgurl.toString())
    }
    this.myForm.controls['date'].setValue(this.post.date)
    
    this.trends = this.post.trendsList
    for (const trend of this.trends) {
      this.showTrends += trend.trend.name + ","
    }
    this.myForm.controls['trends'].setValue(this.showTrends)
    
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

        let id = this.acRoute.snapshot.params['id'];
        let user = this.post.user.username;

        this.pS.putPost(this.myForm.value,id,user).subscribe({
          next: resp => 
          Swal.fire({
            title: "Updated",
            text: "Your post have been updated",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          }),
          error: (error) =>
            Swal.fire({
              title: "An error has appeared",
              text: "The post cannot be updated. Try again later or contact with an admin",
              background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
              confirmButtonColor: 'black',
              confirmButtonText: 'OK'
            }) 
        })
        this.myForm.reset()


      
      this.router.navigate([['/posts/post']]);
    }

}
