import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, filter, debounceTime, switchMap } from 'rxjs/operators';
import { CountryService } from './country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public suggetions$: Observable<string[]>;

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    const searchBox = document.getElementById('search-box');

    this.suggetions$ = fromEvent(searchBox, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as any).value),
      filter(text => text.length > 2),
      debounceTime(500),
      switchMap((text) => this.countryService.getCountries(text))
    );
  }

}
