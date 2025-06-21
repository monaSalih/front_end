import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';


@Component({
   selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent  {
  
  posts: Post[] = [];
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public postService: PostService) { }
  /**
   * Write code on Method
   *
   * @return response()
   */
      ngOnInit(): void {
    this.postService.getAll().subscribe((response) => {
      this.posts = response.data; // ✅ Fix: extract the array
       console.log('API response:', this.posts);
    });    
  }

  deletePost(id:number){
    this.postService.delete(id).subscribe(res => {
         this.posts = this.posts.filter(item => item.post_id !== id);
         console.log('Post deleted successfully!');
    })
  }
}
