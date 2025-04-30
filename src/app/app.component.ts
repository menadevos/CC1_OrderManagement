import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';

interface OrderLineWithProduct {
  _id: string;
  quantity: number;
  orderId: string;
  productId: string;
  productLibelle: string;
  productPu: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clients: any[] = [];
  selectedClient: any = null;
  products: any[] = [];
  orderLines: OrderLineWithProduct[] = [];
  currentDate: string = new Date().toLocaleDateString();
  orderId: string | null = null;
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.isLoading = true;
    this.apiService.getClients().subscribe({
      next: (clients) => {
        console.log('Clients:', clients);
        this.clients = clients;
        if (clients.length > 0) {
          this.selectedClient = clients[0];
          this.createOrder();
        } else {
          this.errorMessage = 'No clients found';
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
        this.errorMessage = 'Failed to load clients';
        this.isLoading = false;
      }
    });

    this.apiService.getProducts().subscribe({
      next: (products) => {
        console.log('Products:', products);
        this.products = products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
      }
    });
  }

  createOrder() {
    if (this.selectedClient && !this.orderId) {
      const order = { date: new Date(), clientId: this.selectedClient._id };
      this.apiService.createOrder(order).subscribe({
        next: (newOrder) => {
          console.log('Created Order:', newOrder);
          this.orderId = newOrder._id;
          this.initializeOrderLines();
        },
        error: (err) => {
          console.error('Error creating order:', err);
          this.errorMessage = 'Failed to create order';
          this.isLoading = false;
        }
      });
    }
  }

  initializeOrderLines() {
    if (this.orderId && this.products.length > 0) {
      const orderLinePromises = this.products.map(product => {
        const existingLine = this.orderLines.find(line => line.productId === product._id && line.orderId === this.orderId);
        if (!existingLine) {
          const orderLine = { quantity: 0, orderId: this.orderId, productId: product._id };
          return this.apiService.createOrderLine(orderLine).toPromise().then(newLine => {
            console.log('Created OrderLine:', newLine);
            return {
              ...newLine,
              productLibelle: product.libelle,
              productPu: product.pu
            };
          });
        }
        return Promise.resolve(null);
      });

      Promise.all(orderLinePromises).then(newLines => {
        const createdLines = newLines.filter(line => line !== null) as OrderLineWithProduct[];
        this.orderLines.push(...createdLines);
        this.fetchOrderLines();
      }).catch(err => {
        console.error('Error creating order lines:', err);
        this.errorMessage = 'Failed to create order lines';
        this.isLoading = false;
      });
    } else {
      this.fetchOrderLines();
    }
  }

  fetchOrderLines() {
    if (this.orderId) {
      this.apiService.getOrderLines().subscribe({
        next: (orderLines) => {
          console.log('OrderLines:', orderLines);
          this.updateOrderLines(orderLines);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching order lines:', err);
          this.errorMessage = 'Failed to load order lines';
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  updateOrderLines(orderLines: any[]) {
    this.orderLines = orderLines
      .filter(line => line.orderId === this.orderId)
      .map(line => ({
        ...line,
        productLibelle: this.products.find(p => p._id === line.productId._id)?.libelle || 'Unknown',
        productPu: this.products.find(p => p._id === line.productId._id)?.pu || 0
      }));
    console.log('Updated OrderLines:', this.orderLines);
  }

  selectClient(client: any) {
    this.selectedClient = client;
    this.orderId = null;
    this.orderLines = [];
    this.isLoading = true;
    this.createOrder();
  }

  increaseQuantity(orderLine: OrderLineWithProduct) {
    const updatedLine = { quantity: orderLine.quantity + 1 };
    this.apiService.updateOrderLine(orderLine._id, updatedLine).subscribe({
      next: (updated) => {
        console.log('Updated OrderLine:', updated);
        orderLine.quantity = updated.quantity;
        this.updateOrderLines([...this.orderLines]);
      },
      error: (err) => {
        console.error('Error updating quantity:', err);
        this.errorMessage = 'Failed to update quantity';
      }
    });
  }

  decreaseQuantity(orderLine: OrderLineWithProduct) {
    if (orderLine.quantity > 0) {
      const updatedLine = { quantity: orderLine.quantity - 1 };
      this.apiService.updateOrderLine(orderLine._id, updatedLine).subscribe({
        next: (updated) => {
          console.log('Updated OrderLine:', updated);
          orderLine.quantity = updated.quantity;
          this.updateOrderLines([...this.orderLines]);
        },
        error: (err) => {
          console.error('Error updating quantity:', err);
          this.errorMessage = 'Failed to update quantity';
        }
      });
    }
  }

  calculateTTC(quantity: number, pu: number): number {
    return quantity * pu;
  }

  calculateTotal(): number {
    const total = this.orderLines.reduce((sum, line) => sum + this.calculateTTC(line.quantity, line.productPu), 0);
    console.log('Total:', total);
    return total;
  }
}
