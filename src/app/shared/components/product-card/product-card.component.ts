import { Component, Input } from '@angular/core';
import { Product } from '../../../core/services/product.service';
import { ConstantsService } from '../../../core/services/constants.service';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  isDragging = false;

  constructor(private constants: ConstantsService) {}

  onDragStart(event: DragEvent): void {
    event.dataTransfer?.setData('productSku', this.product.sku);
    this.isDragging = true;
    
    const config = this.constants.dragIcon;
    const dragIcon = document.createElement('div');
    dragIcon.innerHTML = `<i class="${config.iconClass}" style="font-size: ${config.fontSize}; color: ${config.color};"></i>`;
    dragIcon.style.position = 'absolute';
    dragIcon.style.top = config.offsetTop;
    document.body.appendChild(dragIcon);
    event.dataTransfer?.setDragImage(dragIcon, config.imageOffsetX, config.imageOffsetY);
    
    setTimeout(() => document.body.removeChild(dragIcon), this.constants.timing.dragIconCleanup);
  }

  onDragEnd(): void {
    this.isDragging = false;
  }
}
