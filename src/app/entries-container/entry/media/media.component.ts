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
  YTPreviewImgPrefix: string = 'http://i.ytimg.com/vi/'
  YTPreviewImgSuffix: string = '/sddefault.jpg'
  embedSrc: string;
  previewImgSrc: string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.link);
    if(this.checkIsYoutube(this.link)) {
      let ytKey = this.extractYoutubeVideoKey(this.link)
      this.embedSrc = this.YTEmbedPrefix + ytKey;
      this.previewImgSrc = this.YTPreviewImgPrefix + ytKey + this.YTPreviewImgSuffix;
      console.log(this.embedSrc);
    }
  }

  private checkIsYoutube(link: string): boolean {
    return this.isYoutube = link.includes('youtube.com');
  }

  private extractYoutubeVideoKey(link: string): string {
    return link.split('?v=')[1];
  }

  doIFrame() {
    let iframe = document.createElement('iframe');
    iframe.className = 'youtube-iframe';
    iframe.setAttribute(
      'src', this.embedSrc + '?autoplay=1&rel=0'
    )
    iframe.setAttribute('width', '150px');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '1');
    iframe.setAttribute('modestbranding', '1');
    iframe.setAttribute('controls', '0');
    iframe.setAttribute('rel', '0');
    iframe.setAttribute(
      'allow',
      'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
    );
    var div = document.getElementById(this.YTKey);
    div.replaceChild(iframe, div.firstChild);
  }

}
