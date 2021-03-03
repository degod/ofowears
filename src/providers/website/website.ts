import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
// import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

/*
  Generated class for the WebsiteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebsiteProvider {
	siteaddress2 = "http://forthesharp.com/ofo/apis/"; 
	siteaddress = "http://forthesharp.com/ofo/"; 
    // siteaddress2 = "http://192.168.1.103/";

    constructor(public http: Http) {
		// console.log('Hello WebsiteProvider Provider');
	}
	
	getSlider(){
		let url = this.siteaddress2 + "?option=getSlider";
		let data = JSON.stringify({
			"channel": "getSlider"
		});
		let headers = new Headers({
		  'Content-Type': 'application/json',
		  'Header-Key': 'OfoCron'
		});
		let options = new RequestOptions({ headers: headers });
		
		return new Promise((resolve, reject) => {
			this.http.post(url, data, options).timeout(30000).toPromise()
			.then(response => {
				if(response[0] != ''){
					resolve(response.json());
				}else{
					resolve(response);
				}
			}, error => {
				reject(error);
			});
		});
	}
	
	getProducts(LIKE){
		let url = this.siteaddress2 + "?option=getProducts";
		let data = JSON.stringify({
			"channel": "getProducts",
			"like": LIKE
		});
		let headers = new Headers({
		  'Content-Type': 'application/json',
		  'Header-Key': 'OfoCron'
		});
		let options = new RequestOptions({ headers: headers });
		
		return new Promise((resolve, reject) => {
			this.http.post(url, data, options).timeout(30000).toPromise()
			.then(response => {
				if(response[0] != ''){
					resolve(response.json());
				}else{
					resolve(response);
				}
			}, error => {
				reject(error);
			});
		});
	}
	
	placeOrder(country, state, city, landmark, fullname, email, phone, cart){
		let url = this.siteaddress2 + "?option=placeOrder";
		let data = JSON.stringify({
			"channel": "placeOrder",
			"country": country,
			"state": state,
			"city": city,
			"landmark": landmark,
			"fullname": fullname,
			"email": email,
			"phone": phone,
			"cart": cart
		});
		let headers = new Headers({
		  'Content-Type': 'application/json',
		  'Header-Key': 'OfoCron'
		});
		let options = new RequestOptions({ headers: headers });
		
		return new Promise((resolve, reject) => {
			this.http.post(url, data, options).timeout(30000).toPromise()
			.then(response => {
				if(response[0] != ''){
					resolve(response.json());
				}else{
					resolve(response);
				}
			}, error => {
				reject(error);
			});
		});
	}
	
	getCategory(LIKE){
		let url = this.siteaddress2 + "?option=getProducts";
		let data = JSON.stringify({
			"channel": "getProducts",
			"like": LIKE
		});
		let headers = new Headers({
		  'Content-Type': 'application/json',
		  'Header-Key': 'OfoCron'
		});
		let options = new RequestOptions({ headers: headers });
		
		return new Promise((resolve, reject) => {
			this.http.post(url, data, options).timeout(30000).toPromise()
			.then(response => {
				if(response[0] != ''){
					resolve(response.json());
				}else{
					resolve(response);
				}
			}, error => {
				reject(error);
			});
		});
	}
	
	adminLogin(LIKE){
		let url = this.siteaddress2 + "?option=adminLogin";
		let data = JSON.stringify({
			"channel": "adminLogin",
			"like": LIKE
		});
		let headers = new Headers({
		  'Content-Type': 'application/json',
		  'Header-Key': 'OfoCron'
		});
		let options = new RequestOptions({ headers: headers });
		
		return new Promise((resolve, reject) => {
			this.http.post(url, data, options).timeout(30000).toPromise()
			.then(response => {
				if(response[0] != ''){
					resolve(JSON.parse(response.json()));
				}else{
					resolve(response);
				}
			}, error => {
				reject(error);
			});
		});
	}
	
	addProdInfo(pName, pCategory, pShort, pLong, pAddInfo, pPrice, pBargain){
		let url = this.siteaddress + "admin/includes/addProdInfo.php";
		let data = JSON.stringify({
			"channel": "addProdInfo",
			"p_name": pName,
			"p_cat": pCategory,
			"p_s_desc": pShort,
			"p_l_desc": pLong,
			"p_add_info": pAddInfo,
			"p_price": pPrice,
			"p_bargain": pBargain
		});
		let headers = new Headers({
		  'Content-Type': 'application/json',
		  'Header-Key': 'OfoCron'
		});
		let options = new RequestOptions({ headers: headers });
		
		return new Promise((resolve, reject) => {
			this.http.post(url, data, options).timeout(30000).toPromise()
			.then(response => {
				// console.log("From Web:",response);
				if(response[0] != ''){
					resolve(response.json());
				}else{
					resolve(response);
				}
			}, error => {
				reject(error);
			});
		});
	}

	randomNumbers(length){
		var number = "";
		for(var i = 0; i < length; i++){
			number = number+""+Math.floor(Math.random() * 10);
		}
		return number;
	}
	
	formatNaira(str) {
		var n = Number.parseFloat(str+"");
		if(!str || isNaN(n) || n < 0) return 0;
		return n.toFixed(2);
	}
}
