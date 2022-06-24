import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  @Input() link;
  YTKey: string;
  isYoutube: boolean;
  //TODO: move to consts file
  YTEmbedPrefix: string = 'https://www.youtube.com/embed/'
  embedSrc: string;
  constructor() { }

  ngOnInit(): void {
    if(this.checkIsYoutube(this.link)) {
      this.embedSrc = this.YTEmbedPrefix + this.extractYoutubeVideoKey(this.link);
      console.log(this.embedSrc);
    }
  }

  private checkIsYoutube(link: string): boolean {
    return this.isYoutube = link.includes('youtube.com');
  }

  private extractYoutubeVideoKey(link: string): string {
    return link.split('?v=')[1];
  }

}
