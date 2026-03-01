// [DP:Factory] Factory Pattern
// Encapsulates drag icon creation using Renderer2 for safe DOM manipulation
// Provides reusable icon creation logic
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ConstantsService } from '../../../core/services/constants.service';

export interface DragIconConfig {
  iconClass: string;
  fontSize: string;
  color: string;
  offsetTop: string;
  imageOffsetX: number;
  imageOffsetY: number;
}

@Injectable({
  providedIn: 'root'
})
export class DragIconFactory {
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private constants: ConstantsService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createDragIcon(event: DragEvent): void {
    const config = this.constants.dragIcon;
    const dragIcon = this.buildDragIcon(config);
    
    this.renderer.appendChild(document.body, dragIcon);
    event.dataTransfer?.setDragImage(dragIcon, config.imageOffsetX, config.imageOffsetY);
    
    setTimeout(() => {
      this.renderer.removeChild(document.body, dragIcon);
    }, this.constants.timing.dragIconCleanup);
  }

  private buildDragIcon(config: DragIconConfig): HTMLElement {
    const container = this.renderer.createElement('div');
    const icon = this.renderer.createElement('i');
    
    const classes = config.iconClass.split(' ');
    classes.forEach(cls => this.renderer.addClass(icon, cls));
    this.renderer.setStyle(icon, 'font-size', config.fontSize);
    this.renderer.setStyle(icon, 'color', config.color);
    this.renderer.setStyle(container, 'position', 'absolute');
    this.renderer.setStyle(container, 'top', config.offsetTop);
    
    this.renderer.appendChild(container, icon);
    return container;
  }
}
