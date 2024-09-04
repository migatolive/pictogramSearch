import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  pictogramImages: string[] = [
    'comer',
    'beber',
    'baño',
    'ayuda',
    'si',
    'no',
    'jugar',
    'dolor',
    'dormir',
    'saludar',
    'medicina',
    'buscar'
  ];
}
