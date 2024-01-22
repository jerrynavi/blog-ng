import { Component, OnInit } from '@angular/core';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  constructor(private readonly markdownService: MarkdownService) {}

  ngOnInit(): void {
    this.markdownService.renderer.hr = () => `<div class="my-8"></div>`;
  }
}
