import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})


export class WeatherComponent implements OnInit {
  cityName = 'Tel Aviv';
  cities: any;
  LocalizedName: any;
  selectedCityKey = "215854";
  currentWeather: any;
  weatherCity: any;
  Weather: any;
  nextWeather: any;
  check: boolean = false;
  cityFavor: any;
  favorites: string[] = [];
  constructor(private http: HttpClient, private sharedDataService: GeneralService) { }

  ngOnInit(): void {
    this.selectedCity();
  }
  getCities() {
    return this.http.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete', { params: { apikey: 'b6cfUpFVNMhkZ6nVDR3hJD4FjSaKwe7V', q: this.cityName, language: 'en' } });
  }
  getCurrentWeather() {
    var url = 'http://dataservice.accuweather.com/currentconditions/v1/key';
    url = url.replace("key", this.selectedCityKey);
    return this.http.get(url, { params: { apikey: 'b6cfUpFVNMhkZ6nVDR3hJD4FjSaKwe7V', language: 'en' } })
  }
  getNextFiveDaysWeather() {
    var url2 = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/key';
    url2 = url2.replace("key", this.selectedCityKey);
    return this.http.get(url2, { params: { apikey: 'b6cfUpFVNMhkZ6nVDR3hJD4FjSaKwe7V', language: 'en' } })
  }

  autoComplete() {
    this.getCities().subscribe((_cities) => {
    this.cities=_cities;
    });
  }
  selectedCity() {
    this.getCurrentWeather().subscribe((_currentWeather) => {
      this.currentWeather = _currentWeather;
      this.Weather = "Partly cloudy";
      this.Weather = this.currentWeather[0].WeatherText;
      
      for (let i = 0; i < this.cities.length; i++) {
        if (this.cities[i].Key == this.selectedCityKey) {
          this.cityName = this.cities[i].LocalizedName;
        }
        console.log(this.cityName);
      }

    });
    this.getNextFiveDaysWeather().subscribe((_nextWeather) => {
      this.nextWeather = _nextWeather;
      this.nextWeather = this.nextWeather.DailyForecasts;
  
    });


  }

  addToFavorites() {
    if (this.check) {
      debugger;
      this.cityFavor = { key: this.selectedCityKey, name: this.cityName, weather: this.Weather }
        // send favorite to subscribers via observable subject
        this.sharedDataService.sendFavorite(this.cityFavor);
    }

  }

}
