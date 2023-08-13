import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Theme } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class LightDarkModeService {
  private renderer: Renderer2;
  public selectedTheme: Theme = 'Default';

  // Can't use Renderer2 in service without injecting RendererFactory2
  constructor(rendererFactory: RendererFactory2) {
      this.renderer = rendererFactory.createRenderer(null, null);
  }

  switchToLightMode(isDefault?: boolean) {
    this.renderer.setAttribute(document.querySelector('html'), 'data-bs-theme', 'light');
    isDefault ? this.selectedTheme = 'Default' : this.selectedTheme = 'Light';
  }
  
  switchToDarkMode(isDefault?: boolean) {
    this.renderer.setAttribute(document.querySelector('html'), 'data-bs-theme', 'dark');
    isDefault ? this.selectedTheme = 'Default' : this.selectedTheme = 'Dark';
  }

  useSystemDefault() {
    const useDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (useDarkMode) this.switchToDarkMode(true);
    else this.switchToLightMode(true);
  }
}
