import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';

import { CustomAlertPage } from '../custom-alert/custom-alert';
import { DatabaseProvider } from '../../providers/database/database';
import { WebsiteProvider } from "../../providers/website/website";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
	ROOT: any = "";
	states = ["Abia","Adamawa","Akwa-Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross-River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara","FCT Abuja"];
	countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
	loading: any;
	cart: any = [];
	cartX = [];
	cartTotal = 0;
	payChoice: any = "0";
	country = "Nigeria";
	state = "Diaspora";
	city = "";
	landmark = "";
	fullname = "";
	email = "";
	phone = "";


	constructor(public navCtrl: NavController, public navParams: NavParams,
				public db: DatabaseProvider, public web: WebsiteProvider, 
				private alertCtrl: AlertController, public modalCtrl: ModalController, 
				public loadingCtrl: LoadingController, private iab: InAppBrowser) {
		this.ROOT = this.web.siteaddress;
		this.db.fetch("cart").then(
			res => {
				if(res != null){
					for(var i=0; i<Object.keys(res).length; i++){
						this.cart[i] = res[i];
					}
					// this.cart = Array.from(res);
					// this.cart = Object["values"](res);
					// console.log(res);
					// console.log(this.cart);
				}
				this.subTotal();
			},
			err => {}
		);
	}
	
	presentConfirm(c) {
		var message = 'Do you really wish to place this order worth '+this.formatNaira(this.cartTotal)+'?';
		if(c != "1")
			message = 'Do you really wish to pay for this order worth '+this.formatNaira(this.cartTotal)+' from your bank account?<h6>NOTE: You will be charged 3% ('+this.formatNaira(this.cartTotal*0.03)+') as bank charges.</h6>';
		let alert = this.alertCtrl.create({
			title: 'Confirm Topup',
			message: message,
			buttons: [{
				text: 'No',
				role: 'cancel',
				handler: () => {
					console.log('Canceling transaction...');
				}
			},{
				text: 'Yes',
				handler: () => {
					if(c == "1")
						this.placeOrder();
					else
						this.payWithCard();
				}
			}]
		});
		alert.present();
	}

	confirmOrder(c){
		// console.log("Confirming Order...");
		this.presentConfirm(c);
	}

	placeOrder(){
		this.loading = this.loadingCtrl.create({
			content: 'Placing order...'
		});
		this.loading.present();
        // setTimeout(() => {
        //     this.loading.dismissAll();
        // }, 5000);
		this.web.placeOrder(this.country, this.state, this.city, this.landmark, this.fullname, this.email, this.phone, this.cartX).then(
			res2 => {
				this.loading.dismissAll();
				console.log("PlaceOrder Res:", res2);
				let img = "success.gif";
				let msg = "Order Placed Successfully!";
				this.navCtrl.setRoot(CustomAlertPage, {modalImg: img,modalMsg: msg, modalPage: 'HomePage'});
			}, err => {
				console.log("PlaceOrder Err:", err);
				this.loading.dismissAll();
				let img = "failed.png";
				let msg = "Error making placement. Please contact the admin with a screenshot of this!";
				this.navCtrl.setRoot(CustomAlertPage, {modalImg: img,modalMsg: msg, modalPage: 'HomePage'});
			}
		);
	}

	payWithCard(){
		this.loading = this.loadingCtrl.create({
			content: 'Launching Paystack...'
		});
		this.loading.present();
        // setTimeout(() => {
        //     this.loading.dismissAll();
        // }, 5000);
		const browser = this.iab.create(this.ROOT+'payWithCard.php?amount='+this.cartTotal+'&email='+this.email, '_blank', { hardwareback: 'no', location: 'yes'});
		browser.on("loadstart").subscribe((res: InAppBrowserEvent) => {
				if(res.url.startsWith("https://forthesharp.com/naira.com/")){
					browser.close();
					var resp = decodeURIComponent(res.url.split("resp=")[1]);
					if(resp[0] == "0"){
						this.loading.dismissAll();
						this.loading = this.loadingCtrl.create({
							content: 'Placing order...'
						});		
						this.loading.present();
						this.web.placeOrder(this.country, this.state, this.city, this.landmark, this.fullname, this.email, this.phone, this.cartX).then(
							res2 => {
								this.loading.dismissAll();
								this.db.clear("cart");
								//=== Save HISTORY
								this.db.fetch("history").then(
									res => {
										let history = [];
										if(res != null){
											// history = res;
											for(var i=0; i<Object.keys(res).length; i++){
												history[i] = res[i];
											}
										}
										history[history.length] = this.cartX;
										this.db.store("history", history).then(
											res => {
												// this.visitCart();
												let img = "success.gif";
												let msg = "Order Placed Successfully!";
												this.navCtrl.setRoot(CustomAlertPage, {modalImg: img,modalMsg: msg, modalPage: 'HomePage'});
											},
											err => {}
										);
									},
									err => {}
								);
							}, err => {
								this.loading.dismissAll();
								let img = "failed.png";
								let msg = "Error making placement. Please contact the admin with a screenshot of this!";
								this.navCtrl.setRoot(CustomAlertPage, {modalImg: img,modalMsg: msg, modalPage: 'HomePage'});
							}
						);
					}else{
						this.loading.dismissAll();
						let img = "failed.png";
						let msg = "Payment unsuccessful. Try again later!";
						this.openCustomAlert(img, msg);
					}
				}
			}, err => {
				this.loading.dismissAll();
				let img = "failed.png";
				let msg = "Error connecting to server";
				this.openCustomAlert(img, msg);
			}
		);
	}

	deleteProd(prod){
		let newArr = [];
		var j = 0;
		for(var i=0; i<this.cart.length; i++){
			if(prod.p_sku != this.cart[i].p_sku){
				newArr[j] = this.cart[i];
				j++;
			}
		}
		this.cart = newArr;
		this.db.store("cart", this.cart).then(
			res => {
				this.openCustomAlert("success.gif", "Product dumped back to shop.");
				this.subTotal();
			},
			err => {
				this.openCustomAlert("failed.png", "Failed to dump product!");
			}
		);
	}

	subTotal(){
		this.cartTotal = 0;
		for(var i=0; i<this.cart.length; i++){
			this.cartTotal = this.cartTotal + (this.cart[i].p_bargain * this.cart[i].p_qty);
			this.cartX[i] = [this.cart[i].p_img_a.split("/")[1], this.cart[i].p_sku, this.cart[i].p_name, this.cart[i].p_qty, this.cart[i].p_bargain];
		}
	}
	
    openCustomAlert(img, msg) {
        let modal = this.modalCtrl.create(CustomAlertPage, {modalImg: img,modalMsg: msg});
        modal.present();
        modal.onDidDismiss(data => {
        });
    }
	
	formatNaira(str) {
		var n = Number.parseFloat(str+"");
		if(!str || isNaN(n) || n < 0) return 0;
		return "₦"+n.toFixed(2);
	}

	home(){
		this.navCtrl.setRoot('HomePage');
	}

	product(arr){
		this.navCtrl.setRoot('ProductdetailPage', {param: arr});
	}
}
