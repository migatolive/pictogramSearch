import { Component } from '@angular/core';
import { ArasaacService } from './services/arasaac.service';
import { TextToSpeechService } from './services/speech.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchText: string = '';
  imageSrc: string | null = null;

  constructor(
    private arasaacService: ArasaacService,
    private textToSpeechService: TextToSpeechService
  ) {}

  async handleSearch() {
    if (this.searchText.trim() === '') {
      this.imageSrc = null;
      return;
    }
    try {
      const id = await firstValueFrom(this.arasaacService.getPictogramId(this.searchText));
      console.log('Pictogram ID:', id); // Log the ID
      if (id !== undefined) {
        this.imageSrc = await firstValueFrom(this.arasaacService.getPictogramImage(id));
        this.textToSpeechService.speak(this.searchText);
      } else {
        console.error('No pictogram ID returned');
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  }
}
