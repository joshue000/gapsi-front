import { Component, Input } from '@angular/core';
import { Product } from '../../../core/services/product.service';
import { DragIconFactory } from './drag-icon.factory';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  isDragging = false;

  constructor(private dragIconFactory: DragIconFactory) {}

  onDragStart(event: DragEvent): void {
    event.dataTransfer?.setData('productSku', this.product.sku);
    this.isDragging = true;
    this.dragIconFactory.createDragIcon(event);
  }

  onDragEnd(): void {
    this.isDragging = false;
  }
}
