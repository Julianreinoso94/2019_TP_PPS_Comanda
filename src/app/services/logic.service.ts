import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IData {
  login_titulo_login?: string
  // question?: string
  // img?: string
}

@Injectable({
  providedIn: 'root'
})
export class LogicService {
  private dataUrl: string = "../assets/i18n/en1.json"

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<IData[]>(this.dataUrl)
    
 }

}
