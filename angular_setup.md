# Angular Setup: Frontend Integration for Laravel API

This guide walks you through setting up Angular to work with a Laravel RESTful API for full-stack development. Includes routing, services, and component generation.

---

## ⚙️ Install Angular CLI

### ✅ Step 1: Install Node.js

Download and install from the [official Node.js site](https://nodejs.org/).

### ✅ Step 2: Install Angular CLI Globally

```bash
npm install -g @angular/cli
```

### ✅ Step 3: Create a New Angular Project

```bash
ng new my-new-app
```

---

## 🌐 Angular Routing

Angular creates routing automatically using the `app.routes.ts` file. Here's an example of a basic route configuration:

```ts
{
  path: 'products',
  component: ProductsComponent
}
```

---

## 🧩 App Component Setup

The `app.component.ts` file is the root of your Angular app. Below is an example with essential imports:

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { GeminiChatService } from './services/gemini-chat.service';

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

---

## 📦 Create Post Module & Components

### 🧱 Generate Post Module

```bash
ng generate module post
```

### 📦 Generate Post Components

```bash
ng generate component post/index    # Index Component
ng generate component post/create   # Create Component
ng generate component post/edit     # Edit Component
```

---

## 🔌 Create Post Service

### ⚙️ Generate Service File

```bash
ng generate service post/post
```

### ✨ Post Service Code

```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "http://127.0.0.1:8000/api/posts";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // Get all posts
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL)
      .pipe(catchError(this.errorHandler));
  }

  // Create new post
  create(post: Post): Observable<any> {
    return this.httpClient.post(this.apiURL, JSON.stringify(post), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Find post by ID
  find(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  // Update post
  update(id: number, post: Post): Observable<any> {
    return this.httpClient.put(`${this.apiURL}/${id}`, JSON.stringify(post), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Delete post
  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Error handling
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
```

---

## 📸 Angular API Integration Diagram



*Above: Angular service connects to Laravel API endpoints, enabling CRUD operations from UI.*

# Angular Setup: Frontend Integration for Laravel API

This guide walks you through setting up Angular to work with a Laravel RESTful API for full-stack development. Includes routing, services, and component generation.

---

## ⚙️ Install Angular CLI

### ✅ Step 1: Install Node.js

Download and install from the [official Node.js site](https://nodejs.org/).

### ✅ Step 2: Install Angular CLI Globally

```bash
npm install -g @angular/cli
```

### ✅ Step 3: Create a New Angular Project

```bash
ng new my-new-app
```

---

## 🌐 Angular Routing

Angular creates routing automatically using the `app.routes.ts` file. Here's an example of a basic route configuration:

```ts
{
  path: 'products',
  component: ProductsComponent
}
```

---

## 🧩 App Component Setup

The `app.component.ts` file is the root of your Angular app. Below is an example with essential imports:

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { GeminiChatService } from './services/gemini-chat.service';

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

---

## 📦 Create Post Module & Components

### 🧱 Generate Post Module

```bash
ng generate module post
```

### 📦 Generate Post Components

```bash
ng generate component post/index    # Index Component
ng generate component post/create   # Create Component
ng generate component post/edit     # Edit Component
```

---

## 🔌 Create Post Service

### ⚙️ Generate Service File

```bash
ng generate service post/post
```

### ✨ Post Service Code

```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "http://127.0.0.1:8000/api/posts";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL).pipe(catchError(this.errorHandler));
  }

  create(post: Post): Observable<any> {
    return this.httpClient.post(this.apiURL, JSON.stringify(post), this.httpOptions).pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/${id}`).pipe(catchError(this.errorHandler));
  }

  update(id: number, post: Post): Observable<any> {
    return this.httpClient.put(`${this.apiURL}/${id}`, JSON.stringify(post), this.httpOptions).pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}/${id}`, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
```

---

## 🧪 Read, Create, Edit Posts Example

### ✅ `index.component.ts`

```ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class IndexComponent {
  posts: Post[] = [];

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((response) => {
      this.posts = response.data;
      console.log('API response:', this.posts);
    });
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe(res => {
      this.posts = this.posts.filter(item => item.post_id !== id);
      console.log('Post deleted successfully!');
    });
  }
}
```

### ✅ `index.component.html`

```html
<div class="container">
  <h1>Blog Websit & Chatbot </h1>

  <a routerLink="/post/create" class="btn btn-success">Create New Post</a>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Description</th>
        <th width="250px">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let post of posts">
        <td>{{ post.post_name }}</td>
        <td>{{ post.post_title }}</td>
        <td>{{ post.post_description }}</td>
        <td>
          <a [routerLink]="['/post', post.post_id, 'edit']" class="btn btn-primary">Edit</a>
          <button type="button" (click)="deletePost(post.post_id)" class="btn btn-danger">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 🧠 Chatbot Integration (Gemini API)

### 📦 Install Gemini SDK

```bash
npm install @google/generative-ai
```

### 🧱 Create Chatbot Component & Service

```bash
ng generate component chatbot
ng generate service services/gemini-chat
```

### ✨ Chatbot Component Code

```ts
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

### ✅ Chatbot HTML

```html
<ng-container *ngFor="let item of chatHistory">
  <div class="messages" [ngClass]="{ question: item?.from === 'user', answer: item?.from === 'bot' }">
    <span class="responses" [innerHTML]="formatText(item?.message)"></span>
  </div>
</ng-container>

<footer>
  <input type="text" id="message-input" (keyup.enter)="sendData()" placeholder="Ask Gemini" [(ngModel)]="prompt" [disabled]="loading" autocomplete="off" />
  <button id="send-button" (click)="sendData()" [disabled]="loading">Send</button>
</footer>
```

### 🔧 Gemini Chat Service

```ts
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
    this.generativeAI = new GoogleGenerativeAI('YOUR_API_KEY');
  }

  async generateText(prompt: string) {
    const model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });
    this.messageHistory.next({ from: 'user', message: prompt });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    this.messageHistory.next({ from: 'bot', message: text });
  }

  public getMessageHistory(): Observable<any> {
    return this.messageHistory.asObservable();
  }
}
```

---


## 📸 Angular API Integration Diagram

*Above: Angular service connects to Laravel API endpoints, enabling CRUD operations from UI.*

