import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
	// { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
 //  	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'product/:sku', component: ProductDetailsComponent },
	{ path: 'products/:category/:skip', component: ProductsComponent },
	{ path: 'products/:category', component: ProductsComponent },
	{ path: 'products', component: ProductsComponent },
	{ path: 'home', component: HomeComponent },
	{ path: '', component: HomeComponent },

	{ path: '404', component: NotfoundComponent },
	{ path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
