import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { WebsiteProvider } from "../../providers/website/website";
/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

	constructor(public navCtrl: NavController, public menu: MenuController, 
				public navParams: NavParams, public loadingCtrl: LoadingController, 
				public toastCtrl: ToastController, public db: DatabaseProvider, 
				public web: WebsiteProvider) {
        this.menu.enable(false);
	}

	presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'bottom'
		});
		
		toast.present();
	}
}
