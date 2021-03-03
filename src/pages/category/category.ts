import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';
import { WebsiteProvider } from "../../providers/website/website";

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
	ROOT: any;
	products = [{
		category: "None",
		brand: "None",
		quantity: "None",
		amount: "None",
		image: "assets/imgs/loading2.gif",
	}];
	categories = ["'Unisex'","'Baby Boys'","'Baby Girls'"];
	index: any;
	category: any;
	cartLen: any;

	constructor(public navCtrl: NavController, public params: NavParams, 
				public db: DatabaseProvider, public web: WebsiteProvider) {
		this.category = params.get('category');
		this.index = params.get('index');
		this.fetchCategory(this.category);
	}

	fetchCategory(category){
		this.db.fetch("cart").then(
			res => {
				if(res != null)
					this.cartLen = Object.keys(res).length;
			},
			err => {}
		);
		this.web.getProducts(this.categories[this.index]).then(
			res2 => {
				if(res2 != ""){
					let resp = {
						statusCode: null,
						message: null
					};
					resp = JSON.parse(res2+"");
					if(resp.statusCode == "00"){
						this.ROOT = this.web.siteaddress;
						this.products = resp.message.data;
					}
					setTimeout(()=>{
						this.fetchCategory(category);
					}, 60000);
				}
			},err2 => {
				console.log(err2);
			}
		);
	}

	ellipsis(str, length, ending) {
		if (length == null) {
			length = 100;
		}
		if (ending == null) {
			ending = '...';
		}
		if (str.length > length) {
			return str.substring(0, length - ending.length) + ending;
		} else {
			return str;
		}
	}
	
	formatNaira(str) {
		var n = Number.parseFloat(str+"");
		if(!str || isNaN(n) || n < 0) return 0;
		return "₦"+n.toFixed(2);
	}

    details(arr) {
        this.navCtrl.push('ProductdetailPage', {param: arr});
    }

    visitCart() {
        this.navCtrl.push('CartPage');
    }
}
