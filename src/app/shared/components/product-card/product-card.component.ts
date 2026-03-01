import { Component, Input } from '@angular/core';
import { Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  isDragging = false;

  onDragStart(event: DragEvent): void {
    event.dataTransfer?.setData('productSku', this.product.sku);
    this.isDragging = true;
    
    const dragIcon = document.createElement('div');
    dragIcon.innerHTML = '<i class="fas fa-shopping-cart" style="font-size: 48px; color: #3b82f6;"></i>';
    dragIcon.style.position = 'absolute';
    dragIcon.style.top = '-1000px';
    document.body.appendChild(dragIcon);
    event.dataTransfer?.setDragImage(dragIcon, 24, 24);
    
    setTimeout(() => document.body.removeChild(dragIcon), 0);
  }

  onDragEnd(): void {
    this.isDragging = false;
  }
}
