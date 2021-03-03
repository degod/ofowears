import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DomSanitizer } from "@angular/platform-browser";
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CustomAlertPage } from '../custom-alert/custom-alert';

import { DatabaseProvider } from '../../providers/database/database';
import { WebsiteProvider } from "../../providers/website/website";

/**
 * Generated class for the ProductdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
})
export class ProductdetailPage {
	ROOT: any = "";
	details = {
		p_img_a: null,
		p_qty: 1
	};
	display: any;
	quantity = 1;
	shownGroup = null;
	cartLen = 0;

  	constructor(public navCtrl: NavController, public navParams: NavParams,
				public db: DatabaseProvider, public web: WebsiteProvider, 
				private _sanitizer: DomSanitizer, private photoViewer: PhotoViewer, 
				public modalCtrl: ModalController) {
		this.ROOT = this.web.siteaddress;
  		this.details = navParams.get("param");
  		// console.log(this.ROOT+this.details.p_img_a);
  		if(this.details.p_img_a == undefined || this.details.p_img_a == null){
  			navCtrl.setRoot("HomePage");
  		}else{
  			this.display = this.ROOT+this.details.p_img_a;
  			if(this.details.p_qty != undefined)
  				this.quantity = this.details.p_qty;
  		}
		this.db.fetch("cart").then(
			res => {
				if(res != null)
					this.cartLen = Object.keys(res).length;
			},
			err => {}
		);
  	}

  	zoomDisplay(url){
  		this.photoViewer.show(url, "", { share: false });
  	}

  	removeQty(){
  		if(this.quantity > 1){
  			this.quantity = this.quantity - 1;
  		}
  	}

  	addQty(){
  		if(this.quantity < 101){
  			this.quantity = this.quantity + 1;
  		}
  	}

  	toggleGroup(group) {
	    if (this.isGroupShown(group)) {
	        this.shownGroup = null;
	    } else {
	        this.shownGroup = group;
	    }
	}

	isGroupShown(group) {
	    return this.shownGroup === group;
	}

  	changeDisplay(url){
  		this.display = url;
  	}
	
	formatNaira(str) {
		var n = Number.parseFloat(str+"");
		if(!str || isNaN(n) || n < 0) return 0;
		return "₦"+n.toFixed(2);
	}

    sanitize(ROOR, url) {
        return this._sanitizer.bypassSecurityTrustStyle(ROOR+url);
    }
	
    openCustomAlert(img, msg) {
        let modal = this.modalCtrl.create(CustomAlertPage, {modalImg: img,modalMsg: msg});
        modal.present();
        modal.onDidDismiss(data => {
        });
    }

    nl2br(text: string) {
		return text.replace(/(\r\n|\n\r|\r|\n)/gm, "<br>");
	}

	add2cart(prod){
		let cart = {};
		// let res: any = {};
		this.db.fetch("cart").then(
			res => {
				if(res != null)
					cart = res;
				if(Object.keys(cart).length > 0){
					let newArr = {};
					var j = 0;
					for(var i=0; i<Object.keys(cart).length; i++){
						if(prod.p_sku != cart[i].p_sku){
							newArr[j] = cart[i];
							j++;
						}
					}
					cart = newArr;
				}
				prod['p_qty'] = this.quantity;
				cart[Object.keys(cart).length] = prod;
				this.db.store("cart", cart).then(
					res => {
						this.openCustomAlert("success.gif?token="+Math.random, prod.p_name+" added to wishlist!");
						this.db.fetch("cart").then(
							res => {
								if(res != null)
									this.cartLen = Object.keys(res).length;
							},err => {}
						);
					},
					err => {
						this.openCustomAlert("failed.png", "Failed to add to wishlist!");
					}
				);
			},err => {}
		);
	}

	proceed2cart(prod){
		let cart = {};
		this.db.fetch("cart").then(
			res => {
				if(res != null)
					cart = res;
				if(Object.keys(cart).length > 0){
					let newArr = {};
					var j = 0;
					for(var i=0; i<Object.keys(cart).length; i++){
						if(prod.p_sku != cart[i].p_sku){
							newArr[j] = cart[i];
							j++;
						}
					}
					cart = newArr;
				}
				prod['p_qty'] = this.quantity;
				cart[Object.keys(cart).length] = prod;
				this.db.store("cart", cart).then(
					res => {
						this.visitCart();
					},
					err => {
						this.openCustomAlert("failed.png", "Failed to add to wishlist!");
					}
				);
			},err => {}
		);
	}

    visitCart() {
        this.navCtrl.push('CartPage');
    }
}
