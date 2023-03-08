import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { PostService } from '../posts.service';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['../../posts/posts.component.css']
})
export class DeleteComponent implements OnInit {

  post!: Post;

  myForm: FormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.maxLength(200)]],
    description: [null, [Validators.required, Validators.maxLength(200)]],
    imgURL: [null, [Validators.required]]
  })


  constructor(private router:Router, private fb: FormBuilder, private pS:PostService, private acRoute:ActivatedRoute) { }
  
  ngOnInit(): void {
    let idPost = this.acRoute.snapshot.params['id'];
    this.pS.getPost(idPost)
    .subscribe({
      next: resp => this.post = resp,
      error: (error) => console.log("ERROR on loading post")
    })
  }

  /**
  * Método cuando se envía el formulario correctamente
  */
    save = (e: { preventDefault: () => void; }) => {
      this.myForm.reset()


      let idPost = this.acRoute.snapshot.params['id'];
      this.pS.deletePost(idPost).subscribe({
        next: resp => 
        Swal.fire({
          title: "Log in",
          text: "Please wait a second",
          background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',      
          color: 'white',
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
            text: "The post cannot be removed. Try again later or contact with an admin",
            background: 'linear-gradient(200deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.9284664549413515) 70%)',        color: 'white',
            confirmButtonColor: 'black',
            confirmButtonText: 'OK'
          }) 
        })
        
        this.router.navigate([['/posts/list']]);
        
      }

}
