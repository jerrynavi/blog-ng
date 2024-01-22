import { NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import matter from 'gray-matter';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';
import { Subscription, of, switchMap } from 'rxjs';

type PostInfo = {
  wordCount: number;
  readingTime: number;
  title: string;
  featurePhoto?: string;
};

@Component({
  selector: 'app-page-renderer',
  standalone: true,
  imports: [MarkdownComponent, NgOptimizedImage],
  templateUrl: './page-renderer.component.html',
  styleUrl: './page-renderer.component.scss',
})
export class PageRendererComponent implements OnInit, OnDestroy {
  readonly subs: Subscription[] = [];
  fullPath = '';
  content = '';

  postInfo: PostInfo = {
    readingTime: 0,
    wordCount: 0,
    title: '',
  };
  profilePhoto = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly markdownService: MarkdownService,
    private readonly titleService: Title,
  ) {}

  ngOnInit(): void {
    this.getFullPath();
  }

  getFullPath(): void {
    const sub = this.route.paramMap
      .pipe(switchMap((params) => of(params.get('slug'))))
      .subscribe({
        next: (slug) => {
          this.fullPath = `assets/blog/${slug}.md`;
          this.getMetadataAndLoadContent();
        },
      });
    this.subs.push(sub);
  }

  getMetadataAndLoadContent() {
    const sub = this.markdownService.getSource(this.fullPath).subscribe({
      next: (value) => {
        const { data, content } = matter(value);
        this.postInfo = {
          ...this.postInfo,
          title: data['title'],
          featurePhoto: data['featurePhoto'],
        };
        this.titleService.setTitle(this.postInfo.title);
        this.content = content;
      },
    });
    this.subs.push(sub);
  }

  calculateReadingTime() {
    const WORDS_PER_MINUTE = 200;
    // See https://regex101.com/r/q2Kqjg/6
    const regex = /\w+/g;
    const wordCount = this.content.match(regex)?.length || 0;
    const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE);

    this.postInfo = {
      ...this.postInfo,
      wordCount,
      readingTime,
    };
  }

  ngOnDestroy(): void {
    this.subs.map((s) => s?.unsubscribe());
  }
}
