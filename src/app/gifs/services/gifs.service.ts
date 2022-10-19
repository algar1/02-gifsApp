import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "9oK7TnOR9S5umSB5HJUNlUSjJjlJyl3o";
  private serviceUrl : string ="https://api.giphy.com/v1/gifs";
  private _historial: string[] = [];

  public resultados:Gif[]=[];

  get historial(){
    return [...this._historial];
  }

  constructor(private _http: HttpClient){
    //Dos formas de hacer el mismo proceso pero en varias lineas o en una 
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query:string = ''){
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem("historial",JSON.stringify(this._historial));
    }
    
    console.log(this._historial);

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=9oK7TnOR9S5umSB5HJUNlUSjJjlJyl3o&q=dragon ball z&limit=10')
    // .then(resp=>{
    //   resp.json().then(data=>{
    //     console.log(data)
    //   })
    // })

    const params = new HttpParams().set("api_key",this.apiKey).set("limit","10").set("q",query);

    this._http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params:params})
    .subscribe((resp:any) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem("resultados",JSON.stringify(this.resultados));
    })

  }
}
