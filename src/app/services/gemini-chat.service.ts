import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiChatService {
  private messageHistory: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  async generateText(prompt: string) {
    this.messageHistory.next({
      from: 'user',
      message: prompt
    });

    try {
      // In this environment, directly use fetch with an empty API key.
      // The Canvas environment will inject the actual API key at runtime.
      const apiKey = "AIzaSyBHy7Kwya_QkODr7JAyT12qypNhaqQblos"; // Leave this as an empty string
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const payload = {
        contents: [
          { role: "user", parts: [{ text: prompt }] }
          // For chat history, you would include previous messages here,
          // ensuring they are in the correct 'role' format (user/model).
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      let botResponseText = '❌ Failed to get a response from Gemini.';
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        botResponseText = result.candidates[0].content.parts[0].text;
      } else {
        console.error('Unexpected API response structure:', result);
        // Provide more detailed error info if available in the API response
        if (result.error && result.error.message) {
          botResponseText = `❌ API Error: ${result.error.message}`;
        }
      }

      this.messageHistory.next({
        from: 'bot',
        message: botResponseText
      });
    } catch (error) {
      console.error('Gemini API Fetch Error:', error);
      this.messageHistory.next({
        from: 'bot',
        message: '❌ Failed to connect to Gemini API. Please check your network or API setup.'
      });
    }
  }

  public getMessageHistory(): Observable<any> {
    return this.messageHistory.asObservable();
  }
}
