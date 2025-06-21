session laravel+angular
download laravel 
*setup laravel
install composer.exe
*download one time command (if you work with laravel for first time)
composer global require laravel/installer
*crate new project
composer create-project --prefer-dist laravel/laravel:11.0.1 your-project-name

-prepare api in laravel
*replace .env data with your parameters
*php artisan install:api
after install api there command tell you to use "Laravel\Sanctum\HasApiTokens" 
so copy it to use it in laravel file later
- in db folder you can see there is new megration add in preson acess token 
- in model folder you can add it at the top of user file and add HasApiTokens 
inside the class of user model 
* prepare MVC
-create MVC for catogory "php artisan make:model Product -mcr"
- add the following column for catogory table
 $table->id();
            $table->string('name');
            $table->string('discription');
            $table->integer('price');
            $table->timestamps();
- in modle you need to add fillable
protected $fillable = [
        'name',
        'discription',
        'price',
    ];

-in controller write
  $request->validate([
            'name' => 'required|string|max:255',
            'discription' => 'required|string|max:1000',
            'price' => 'required|numeric|min:0',
        ]);
       $product= Product::create([
            'name' => $request->name,
            'discription' => $request->discription,
            'price' => $request->price,
        ]);
       return response()->json([
        'message' => 'Product created successfully'/,
        'data'=>new ProductResource($product),
        ], 200); 
- to show all api related to product in termnal type
 php artisan route:list

- create resource api
"php artisan make:resource ProductResource"
and write
  return [
           'product_id' => $this->id,
           'product_name' => $this->name,
           'product_description' => $this->discription,
           'product_price' => $this->price,
            'product_created_at' => $this->created_at,
        ];


- to show one spesfic data based on id do the next
$validator=Validator::make(
             $request->all(),[
            'name' => 'required|string|max:255',
            'discription' => 'required|string|max:255 ',
            'price' => 'required|numeric|min:0',
        ]);
       if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->messages(),
            ], 422);
        }else{
        $product->update([
             'name' => $request->name,
             'discription' => $request->discription,
             'price' => $request->price,
         ]);
        }
        
        // Create the product
       return response()->json([
        'message' => 'Product updated successfully',
        'data'=>new ProductResource($product),
        ], 200); 


-delete item
  $product->delete();
        return response()->json([
            'message' => 'Product deleted successfully',
        ], 200);

- to handle not found item in bootstrap/app.php write the code of api in 
following link
https://laravel.com/docs/11.x/errors



# Ddownload angular 
*setup angular 
install node.js
*download one time command (if you work with angular for first time)
npm install -g @angular/cli
* create new project
ng new my-new-app

route in angular create by default and the route is found in file name
app.routes.ts
route containe 2parameters find in following:

```
{
      path:'products',
      component:ProductsComponent 
    }

```

in app.component.ts there you can declare  template component and can import important action such as route, form modual, common module
```
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import {GeminiChatService} from './services/gemini-chat.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'post_front_end';
 
}
```

create module post so we can add component
```
ng generate module post                 

```
create component post
```
// intials index
ng generate component post/index 

// intial create
ng generate component post/create       
// intial edit 
ng generate component post/edit 
```
download post service 
```
 ng generate service post/post
 ````

 post service

 ```
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Post } from './post';
  
@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  private apiURL = "http://127.0.0.1:8000/api/posts";
    
  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private httpClient: HttpClient) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  

  // create post
  create(post:Post): Observable<any> {
  
    return this.httpClient.post(this.apiURL, JSON.stringify(post), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  // update post
   find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  update(id:number, post:Post): Observable<any> {
  
    return this.httpClient.put(this.apiURL + '/' + id, JSON.stringify(post), this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }

  // delete
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
 ```

 to read all data in index 
  
index.component.ts
```
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

```

index.component.html
```
<div class="container">
    <h1>Angular 19 CRUD Example - ItSolutionStuff.com</h1>
    
    <a href="#" routerLink="/post/create/" class="btn btn-success">Create New Post</a>
      
    <table class="table table-striped">
        <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>discription</th>
                <th width="250px">Action</th>
              </tr>
        </thead>
        <tbody>
              <tr *ngFor="let post of posts">
                <td>{{ post.post_name }}</td>
                <td>{{ post.post_title }}</td>
                <td>{{ post.post_description }}</td>
                <td>
                  <!-- <a href="#" [routerLink]="['/post/', post.post_id, 'view']" class="btn btn-info">View</a>-->
                  <a href="#" [routerLink]="['/post/', post.post_id, 'edit']" class="btn btn-primary">Edit</a> 
                  
                  <button type="button" (click)="deletePost(post.post_id)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
        </tbody>
    </table>
 </div>

```

in app.config.ts you should update so it can take the HTTP request
```
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
     provideHttpClient(),
     provideZoneChangeDetection({ eventCoalescing: true }), 
     provideRouter(routes)
    
    ]
};

```

in create component
create.component.ts
```
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
  
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
  
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  
  form!: FormGroup;
      
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private router: Router
  ) { }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      name: new FormControl('', Validators.required),
      discription: new FormControl('', Validators.required),

    });
  }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res:any) => {
         console.log('Post created successfully!');
         this.router.navigateByUrl('post/index');
    })
  }
  
}
```

create.component.html
```
<div class="container">
  <h1>Create New Post</h1>

  <a href="#" routerLink="/post/index" class="btn btn-primary">Back</a>

  <form [formGroup]="form" (ngSubmit)="submit()">
    <div class="form-group">
      <label for="title">Title:</label>
      <input
        formControlName="title"
        id="title"
        type="text"
        class="form-control"
      />
      <div *ngIf="f['title'].touched && f['title'].invalid" class="alert alert-danger">
        <div *ngIf="f['title'].errors && f['title'].errors['required']">
          Title is required.
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="name">name</label>
      <textarea
        formControlName="name"
        id="name"
        class="form-control"
      ></textarea>
      <div *ngIf="f['name'].touched && f['name'].invalid" class="alert alert-danger">
        <div *ngIf="f['name'].errors && f['name'].errors['required']">
          name is required.
        </div>
      </div>
    </div>

     <div class="form-group">
      <label for="discription">discription</label>
      <textarea
        formControlName="discription"
        id="discription"
        class="form-control"
      ></textarea>
      <div *ngIf="f['discription'].touched && f['discription'].invalid" class="alert alert-danger">
        <div *ngIf="f['discription'].errors && f['discription'].errors['required']">
          discription is required.
        </div>
      </div>
    </div>

    <button class="btn btn-primary" type="submit" [disabled]="!form.valid">
      Submit
    </button>
  </form>
</div>
```

in edit component
edit.componet.ts
```
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
  
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
  
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  
  id!: number;
  post!: Post;
  form!: FormGroup;
      
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
  this.id = this.route.snapshot.params['postId'];

  this.form = new FormGroup({
    title: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    discription: new FormControl('', Validators.required),
  });

  this.postService.find(this.id).subscribe((res) => {
    const data = res.data;

    // Patch the form with data from API
    this.form.patchValue({
      title: data.post_title,
      name: data.post_name,
      discription: data.post_description
    });
  });
}
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log("this.form.value",this.form.value);
    this.postService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Post updated successfully!');
         this.router.navigateByUrl('post/index');
    })
  }
  
}
```

edit.component.html
```
<div class="container">
    <h1>Update Post</h1>
   
    <a href="#" routerLink="/post/index" class="btn btn-primary">Back</a>
          
    <form [formGroup]="form" (ngSubmit)="submit()">
    
        <div class="form-group">
            <label for="title">Title:</label>
            <input 
                formControlName="title"
                id="title" 
                type="text" 
                class="form-control">
            <div *ngIf="f['title'].touched 
            && f['title'].invalid" class="alert alert-danger">
                <div *ngIf="f['title'].errors 
                && f['title'].errors['required']">
                Title is required.
                </div>
            </div>
        </div>
           
        <div class="form-group">
      <label for="name">name</label>
      <textarea
        formControlName="name"
        id="name"
        class="form-control"
      ></textarea>
      <div *ngIf="f['name'].touched && f['name'].invalid" class="alert alert-danger">
        <div *ngIf="f['name'].errors && f['name'].errors['required']">
          name is required.
        </div>
      </div>
    </div>

     <div class="form-group">
      <label for="discription">discription</label>
      <textarea
        formControlName="discription"
        id="discription"
        class="form-control"
      ></textarea>
      <div *ngIf="f['discription'].touched && f['discription'].invalid" class="alert alert-danger">
        <div *ngIf="f['discription'].errors && f['discription'].errors['required']">
          discription is required.
        </div>
      </div>
    </div>
         
        <button class="btn btn-primary" type="submit" [disabled]="!form.valid">Update</button>
    </form>
</div>
```

to run the project you should run the following command in terminal 

```
ng serve
```


### create chatbot

install SDK 
```
 npm install @google/generative-ai       

 ```

 create chatbot component 
 ```
ng generate component chatbot
````
create services gemini-chat
```
 ng generate service services/gemini-chat
```
in chatbot component 

chatbot.component.ts
```
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiChatService } from '../services/gemini-chat.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  prompt: string = '';
  loading: boolean = false;
  chatHistory: any[] = [];

  geminiService = inject(GeminiChatService);

  constructor() {
    this.geminiService.getMessageHistory().subscribe((res) => {
      if (res) {
        this.chatHistory.push(res);
      }
    });
  }

  async sendData() {
    if (this.prompt && !this.loading) {
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
      await this.geminiService.generateText(data);
      this.loading = false;
    }
  }

  formatText(text: string) {
    return text.replaceAll('*', '');
  }
}

```
chatbot.componet.html

```

  <ng-container *ngFor="let item of chatHistory">
    <div
      class="messages"
      [ngClass]="{
        question: item?.from === 'user',
        answer: item?.from === 'bot'
      }"
    >
      <span
        class="responses"
        [innerHTML]="formatText(item?.message)"
      ></span>
    </div>
  </ng-container>

  <footer>
    <input
  type="text"
  id="message-input"
  (keyup.enter)="sendData()"
  placeholder="Ask Gemini"
  [(ngModel)]="prompt"
  [disabled]="loading"
  autocomplete="off"
/>

<button id="send-button" (click)="sendData()" [disabled]="loading">
  Send
</button>
  </footer>
```

in gemini-chat component

gemini-chat.service.ts

```
import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiChatService {
 private generativeAI: GoogleGenerativeAI;
  private messageHistory: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    // Remove API_KEY before adding you project to GitHub
    this.generativeAI = new GoogleGenerativeAI('AIzaSyBHy7Kwya_QkODr7JAyT12qypNhaqQblos');
  }

  async generateText(prompt: string) {
  const model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });// There seems to be a typo, 'gemini' is likely intended.
  this.messageHistory.next({
    from: 'user',
    message: prompt
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  this.messageHistory.next({
    from: 'bot',
    message: text
  });
}

public getMessageHistory(): Observable<any> {
  return this.messageHistory.asObservable();
}
}
```
