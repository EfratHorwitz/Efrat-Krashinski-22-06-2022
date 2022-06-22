import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { Weather } from '../weather.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnDestroy {
  favorites: any[] = [];
  subscription!: Subscription;

  constructor(private sharedDataService: GeneralService) {
    // subscribe to weather component messages
    debugger;
    this.subscription = this.sharedDataService.getFavorite().subscribe(_favorite => {
      debugger;
      if (_favorite) {
        if (this.favorites.includes(_favorite)) {
          this.favorites.slice(this.favorites.indexOf(_favorite), 1);
        }
        else {
          this.favorites.push(_favorite);
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
