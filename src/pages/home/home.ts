import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { DomSanitizer } from "@angular/platform-browser";

import { DatabaseProvider } from '../../providers/database/database';
import { WebsiteProvider } from "../../providers/website/website";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
	@ViewChild('slides') slides: Slides;
	products = [{
		category: "None",
		brand: "None",
		quantity: "None",
		amount: "None",
		image: "assets/imgs/loading2.gif",
	}];
	unisex: any = [];
	boys: any = [];
	girls: any = [];
	ROOT: any = "";
	sliderImgs = [];
	sliderLoad: boolean = true;
	cartLen = 0;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
				public db: DatabaseProvider, public web: WebsiteProvider, 
				private _sanitizer: DomSanitizer) {
		this.fetchSliderImgs();
		this.fetchUnisex();
		this.fetchBoys();
		this.fetchGirls();
		// this.db.clear("cart");
	}

	fetchSliderImgs(){
		this.db.fetch("cart").then(
			res => {
				if(res != null)
					this.cartLen = Object.keys(res).length;
			},
			err => {}
		);
		this.web.getSlider().then(
			res2 => {
				if(res2 != ""){
					let resp = {
						statusCode: null,
						status: null,
						message: null
					};
					resp = JSON.parse(res2+"");
					if(resp.statusCode == "00"){
						this.ROOT = this.web.siteaddress;
						this.sliderLoad = false;
						this.sliderImgs = this.shuffle(resp.message.data);
					}
					setTimeout(()=>{
						this.fetchSliderImgs();
					}, 60000);
				}
			},err2 => {
				console.log(err2);
			}
		);
	}

	fetchUnisex(){
		this.web.getProducts("'Unisex'").then(
			res2 => {
				if(res2 != ""){
					let resp = {
						statusCode: null,
						status: null,
						message: null
					};
					resp = JSON.parse(res2+"");
					if(resp.statusCode == "00"){
						this.ROOT = this.web.siteaddress;
						this.unisex = this.shuffle(resp.message.data);
						// console.log(this.wears);
					}
					setTimeout(()=>{
						this.fetchUnisex();
					}, 60000);
				}
			},err2 => {
				console.log(err2);
			}
		);
	}

	fetchBoys(){
		this.web.getProducts("'Baby Boys'").then(
			res2 => {
				if(res2 != ""){
					let resp = {
						statusCode: null,
						status: null,
						message: null
					};
					resp = JSON.parse(res2+"");
					if(resp.statusCode == "00"){
						this.ROOT = this.web.siteaddress;
						this.boys = this.shuffle(resp.message.data);
						// console.log(this.wears);
					}
					setTimeout(()=>{
						this.fetchBoys();
					}, 60000);
				}
			},err2 => {
				console.log(err2);
			}
		);
	}

	fetchGirls(){
		this.web.getProducts("'Baby Girls'").then(
			res2 => {
				if(res2 != ""){
					let resp = {
						statusCode: null,
						status: null,
						message: null
					};
					resp = JSON.parse(res2+"");
					if(resp.statusCode == "00"){
						this.ROOT = this.web.siteaddress;
						this.girls = this.shuffle(resp.message.data);
						// console.log(this.accessories);
					}
					setTimeout(()=>{
						this.fetchGirls();
					}, 60000);
				}
			},err2 => {
				console.log(err2);
			}
		);
	}
	
	ionViewDidEnter() {
		if(this.sliderImgs && this.sliderImgs.length){
			this.slides.autoplayDisableOnInteraction = false;
			this.slides.startAutoplay();
		}
	}
	
	ionViewWillLeave(){
		if(this.sliderImgs && this.sliderImgs.length){
    		this.slides.stopAutoplay();
		}
  	}

	trimArray(arraY, sizE){
		let newArr = [];
		
		for(var i = 0; i < sizE; i++){
			newArr[i] = arraY[i];
		}
		return newArr;
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

    sanitize(ROOR, url) {
        return this._sanitizer.bypassSecurityTrustStyle(ROOR+url);
    }

    details(arr) {
        this.navCtrl.push('ProductdetailPage', {param: arr});
    }

    visitCart() {
        this.navCtrl.push('CartPage');
    }

  	shuffle(arra1) {
	    let ctr = arra1.length;
	    let temp;
	    let index;
	    while (ctr > 0) {
	        index = Math.floor(Math.random() * ctr);
	        ctr--;
	        temp = arra1[ctr];
	        arra1[ctr] = arra1[index];
	        arra1[index] = temp;
	    }
	    return arra1;
	}
}
