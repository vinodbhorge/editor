import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiConfigService {
  private apiSlug: string = '/api';

  setApiSlug(slug: string) {
    if (!slug) {
      this.apiSlug = '/api';
      return;
    }
    this.apiSlug = slug;
  }

  getApiSlug(): string {
    const s = this.apiSlug || '/api';
    return s.endsWith('/') ? s : `${s}/`;
  }
}
