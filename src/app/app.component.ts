import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'abra';
  favorites:any[]=[];
  favorite(data:{key:number,name:string,weather:string}){
    this.favorites.push({
      key: data.key,
      name:data.name,
      weather:data.weather
    })
  }
  // favorites:object[]=[];
  // onFavorAdded(data:{key:number,name:string,weather:string}){
  //   this.favorites.push({
  //     key:data.key,
  //     name:data.name,
  //     weather:data.weather
  //   })
  // }
}
