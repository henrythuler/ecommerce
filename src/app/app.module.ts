import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductComponent } from './components/product/product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path: "products/:id", component: ProductComponent},
  {path: "search/:keyword", component: ProductsListComponent},
  {path: "category", component: ProductsListComponent},
  {path: "products", component: ProductsListComponent},
  {path: "category/:id/:name", component: ProductsListComponent},
  {path: "category", component: ProductsListComponent},
  {path: "cart", component: CartComponent},
  {path: "", redirectTo: "/products", pathMatch: "full"},
  {path: "**", redirectTo: "/products", pathMatch: "full"}
]

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    MenuComponent,
    SearchComponent,
    ProductComponent,
    CartStatusComponent,
    CartComponent
  ],
  imports: [
    NgbModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule {}