import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class WebsiteService {
	siteaddress2 = "http://forthesharp.com/ofo/apis/"; 
	siteaddress = "http://forthesharp.com/ofo/"; 

	constructor(private http: HttpClient) { }

	getSlider(){
		let url = this.siteaddress2 + "?option=getSlider";
		let data = JSON.stringify({
			"channel": "getSlider"
		});
		let headers = new HttpHeaders();
		headers.append('Content-Type','application/json');
		headers.append('Header-Key','OfoCron');

		return this.http.post(url, data, {headers: headers});
	}

	getTagProducts(sku, tag){
		let url = this.siteaddress2 + "?option=getTagProducts";
		let data = JSON.stringify({
			"channel": "getTagProducts",
			"sku": sku,
			"tag": tag
		});
		let headers = new HttpHeaders();
		headers.append('Content-Type','application/json');
		headers.append('Header-Key','OfoCron');

		return this.http.post(url, data, {headers: headers});
	}

	getProduct(LIKE){
		let url = this.siteaddress2 + "?option=getProduct";
		let data = JSON.stringify({
			"channel": "getProduct",
			"like": LIKE
		});
		let headers = new HttpHeaders();
		headers.append('Content-Type','application/json');
		headers.append('Header-Key','OfoCron');

		return this.http.post(url, data, {headers: headers});
	}

	getProducts(LIKE){
		let url = this.siteaddress2 + "?option=getProducts";
		let data = JSON.stringify({
			"channel": "getProducts",
			"like": LIKE
		});
		let headers = new HttpHeaders();
		headers.append('Content-Type','application/json');
		headers.append('Header-Key','OfoCron');

		return this.http.post(url, data, {headers: headers});
	}

	getCategoryAll(LIKE, SKIP){
		let url = this.siteaddress2 + "?option=getCategoryAll";
		let data = JSON.stringify({
			"channel": "getCategoryAll",
			"like": LIKE,
			"skip": SKIP
		});
		let headers = new HttpHeaders();
		headers.append('Content-Type','application/json');
		headers.append('Header-Key','OfoCron');

		return this.http.post(url, data, {headers: headers});
	}
}
