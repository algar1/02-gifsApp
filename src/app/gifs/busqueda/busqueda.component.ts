import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;  //El simbolo de admiración en este caso es para decirle que nunca va a ser nulo

  constructor(private gifsService:GifsService){}

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length == 0){
      return;
    }
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }
}
