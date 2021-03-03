import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { WebsiteProvider } from "../../providers/website/website";

/**
 * Generated class for the AdminloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adminlogin',
  templateUrl: 'adminlogin.html',
})
export class AdminloginPage {
	loading: any;
	name: any;

	constructor(public navCtrl: NavController, public menu: MenuController, 
				public navParams: NavParams, public loadingCtrl: LoadingController, 
				public toastCtrl: ToastController, public db: DatabaseProvider, 
				public web: WebsiteProvider) {
        this.menu.enable(false);
	}

	presentToast(status, msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'middle'
		});
		
		toast.present();
	}

	back(){
        this.menu.enable(true);
		this.navCtrl.setRoot("HomePage");
	}

	login(){
		if(this.name != undefined && this.name != ""){
			this.loading = this.loadingCtrl.create({
				content: 'Verifying, please wait...'
			});
			this.loading.present();

			let res = {
				status: null,
				message: null
			}
			this.web.adminLogin(this.name).then(
				(res: any = {status: "", message: {}}) => {
					this.loading.dismissAll();
					// console.log("Success:", res);
					if(res.status != undefined && res.status == "success"){
						this.navCtrl.push("AdminPage");
					}else{
						this.presentToast("Failed", res.message.data? res.message.data: undefined);
					}
				},
				err => {
					this.loading.dismissAll();
					console.log("Got Err:", err);
					this.presentToast("Failed", "Connection error.");
				}
			);
		}
	}
}
