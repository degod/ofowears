import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams, Platform, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from "@ionic-native/file-path";
import { File } from "@ionic-native/file";
import { DatabaseProvider } from '../../providers/database/database';
import { WebsiteProvider } from "../../providers/website/website";
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var cordova: any;

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-products',
	templateUrl: 'products.html',
})
export class ProductsPage {
	pName: any;
	pCategory: any;
	pShort: any;
	pLong: any;
	pAddInfo: any;
	pPrice: any;
	pBargain: any;
	submittedInfo = false;
	imageFileName1: any;
	imageFileName2: any;
	imageFileName3: any;
	myphoto: any;
	sku: any;
	loading: any;

	constructor(public navCtrl: NavController, public menu: MenuController,
				public db: DatabaseProvider, public web: WebsiteProvider,
				private transfer: FileTransfer, private camera: Camera, 
				private file: File, private filePath: FilePath,
                public navParams: NavParams, public loadingCtrl: LoadingController, 
                public platform: Platform, public toastCtrl: ToastController) {
        this.menu.enable(false);
	}

	presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'middle'
		});
		
		toast.present();
	}

  	swipeDirect(e){
  		if(e.direction == '4'){
  			this.menu.open();
  		}else if(e.direction == '2'){ 
	    	// this.navCtrl.setRoot("MenuPage", { data: [{ title: 'Courier Services', pageName: 'TabsPage', tabComponent: 'CourierPage', index: 1, icon: 'ios-cube' }]});
  		}
  	}

	getImage(whc) {
		const options: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			saveToPhotoAlbum: false,
			targetWidth: 300,
			targetHeight: 300
		}
		this.camera.getPicture(options).then((imageData) => {
			this.myphoto = 'data:image/jpeg;base64,' + imageData;
			if(whc == 1){
				this.imageFileName1 = this.myphoto;
			}else if(whc == 2){
				this.imageFileName2 = this.myphoto;
			}else if(whc == 3){
				this.imageFileName3 = this.myphoto;
			}
			// alert(imagePath);
		    this.upload(whc, this.myphoto);
		}, (err) => {
			alert(err);
		});
	}

	upload(whc, pic){
		this.loading = this.loadingCtrl.create({
			content: 'Uploading image...'
		});
		this.loading.present();

		const fileTransfer: FileTransferObject = this.transfer.create();
		let options = {
			fileKey: 'file',
			fileName: pic,
		    chunkedMode: false,
		    mimeType: "image/jpeg",
		    headers: {}
		}
		let endpoint = "addProdImg.php";
		fileTransfer.upload(pic, this.web.siteaddress+'admin/includes/'+endpoint+'?whc='+whc+'&sku='+this.sku, options)
		.then((res: any = {response: {status: "", statusCode: ""}}) => {
			this.loading.dismissAll();
			// let data = res.response;
			// if(res.response['status']=='success' && res.response['statusCode']=='00'){
			alert("Image Uploaded");
			// }else{
			// 	alert(res);
			// }
		}, (err) => {
			this.loading.dismissAll();
			alert(JSON.stringify(err));
			// alert("Upload failed");
		});
	}

    // Create a new name for the image
    private createFileName() {
        var d = new Date(),
            n = d.getTime(), 
			newFileName = n + ".jpg";
        return newFileName;
    }

	// Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
    	var pic = "";
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
	            return newFileName;
	        }, error => {}
        );
        return newFileName;
    }

	submitInfo(){
		if(this.pName!="" && this.pCategory!="" && this.pShort!="" && this.pLong!="" && this.pPrice!=""){
			this.loading = this.loadingCtrl.create({
				content: 'Adding Product...'
			});
			this.loading.present();
			this.web.addProdInfo(this.pName, this.pCategory, this.pShort, this.pLong, this.pAddInfo, this.pPrice, this.pBargain).then(
				(res2: any = {status:"",statusCode:"",message:{data:"",sku:""}}) => {
					this.loading.dismissAll();
					// console.log("submitInfo Res:", res2);
					if(res2.status=="success" && res2.statusCode=="00"){
						this.presentToast("Product added Successfully!");
						this.sku = res2.message.sku;
						this.submittedInfo = true;
					}else{
						this.presentToast("Product was not added!");
					}
				}, err => {
					this.loading.dismissAll();
					console.log("submitInfo Err:", err);
					this.presentToast("An error occured!");
				}
			);
		}else{
			this.presentToast("Some field(s) might be empty");
		}
	}
}
