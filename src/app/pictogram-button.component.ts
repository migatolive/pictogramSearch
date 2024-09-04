import { Component, Input, OnInit } from '@angular/core';
import { ArasaacService } from './services/arasaac.service';
import { TextToSpeechService } from './services/speech.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-pictogram-button',
  templateUrl: './pictogram-button.component.html',
  styleUrls: ['./pictogram-button.component.scss']
})
export class PictogramButtonComponent implements OnInit {
  @Input() image: string = '';
  imageSrc: string | null = null;

  constructor(
    private arasaacService: ArasaacService,
    private textToSpeechService: TextToSpeechService
  ) {}

  ngOnInit() {
    this.loadPictogram();
  }

  async loadPictogram() {
    if (this.image.trim() === '') {
      this.imageSrc = null;
      return;
    }
    try {
      const id = await firstValueFrom(this.arasaacService.getPictogramId(this.image));
      console.log('Pictogram ID:', id); // Log the ID
      if (id !== undefined) {
        this.imageSrc = await firstValueFrom(this.arasaacService.getPictogramImage(id));
      } else {
        console.error('No pictogram ID returned');
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  }

  speak() {
    this.textToSpeechService.speak(this.image);
  }
}
