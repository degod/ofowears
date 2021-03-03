import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CustomAlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-custom-alert',
  templateUrl: 'custom-alert.html',
})
export class CustomAlertPage {
	modalMsg = "Added to wishlist!";
	modalImg = "";
	modalPage = false;

    constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {
		this.modalImg = "";
		this.modalImg = params.get('modalImg');
		this.modalMsg = params.get('modalMsg');
		if(params.get('modalPage') != undefined && params.get('modalPage') != null){
			this.modalPage = true;
		}
    }

	dismiss(){
		console.log(this.modalPage);
		let data = { 'foo': '' };
		this.viewCtrl.dismiss(data);
	}

	home(){
		console.log(this.modalPage);
		this.navCtrl.setRoot('HomePage');
	}
}
