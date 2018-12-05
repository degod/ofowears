import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../website.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	slider = [];
	boys: any;
	girls: any;
	unisex: any;
	all: any;
	recommended1: any;
	recommended2: any;
	ROOT: any;
    public loading = false;
    categories: any;

	constructor(private web: WebsiteService, private spinner: NgxSpinnerService,
				private router: Router) { 
		this.getSlider();
		this.fetchAll();
		this.fetchBoys();
		this.fetchGirls();
		this.fetchUnisex();
		this.recommend();
		this.categories = [
	    	{
	    		title: "Baby Boys",
	    		id: "boys",
	    		content: []
	    	},
	    	{
	    		title: "Baby Girls",
	    		id: "girls",
	    		content: []
	    	},
	    	{
	    		title: "Unisex",
	    		id: "unisex",
	    		content: []
	    	}
	    ];
	}

	ngOnInit() {
		this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
	}

	getSlider(){
		this.spinner.show();
		this.web.getSlider().subscribe((res: any = {status: "", message: {data: []}}) => {
	            // console.log(JSON.parse(res));
				this.slider = JSON.parse(res+"");
				this.slider = this.slider['message'].data;
				// console.log(this.slider);
				this.spinner.hide();
	        },
	        err => {
	            console.log(err.message);
				this.spinner.hide();
	        }
	    );
	}

	recommend(){
		this.web.getProducts("'ALL'").subscribe(
			(res2: any = {status: "", message: {data: []}})  => {
				if(res2 != ""){
					let resp = {
						statusCode: null,
						status: null,
						message: null
					};
					resp = JSON.parse(res2+"");
					if(resp.statusCode == "00"){
						this.recommended1 = this.arrayLimit(this.shuffle(resp.message.data), 3);
						this.recommended2 = this.arrayLimit(this.shuffle(resp.message.data), 3);
					}else{
						setTimeout(()=>{
							this.recommend();
						}, 60000);
					}
				}
			},err2 => {
				console.log(err2);
			}
		);
	}

	fetchAll(){
		this.spinner.show();
		this.web.getProducts("'ALL'").subscribe(
			(res2: any = {status: "", message: {data: []}})  => {
				if(res2 != ""){
					this.spinner.hide();
					let resp = {
						statusCode: null,
						status: null,
						message: null
					};
					resp = JSON.parse(res2+"");
					if(resp.statusCode == "00"){
						this.ROOT = this.web.siteaddress;
						this.all = this.shuffle(this.arrayLimit(resp.message.data, 12));
						// console.log(this.all);
					}else{
						setTimeout(()=>{
							this.fetchAll();
						}, 60000);
					}
				}
			},err2 => {
				console.log(err2);
			}
		);
	}

	fetchBoys(){
		this.web.getProducts("'Baby Boys'").subscribe(
			(res2: any = {status: "", message: {data: []}})  => {
				if(res2 != ""){
					let resp = {
						statusCode: null,
						status: null,
						message: null
					};
					resp = JSON.parse(res2+"");
					if(resp.statusCode == "00"){
						this.ROOT = this.web.siteaddress;
						this.boys = this.shuffle(this.arrayLimit(resp.message.data,4));
						this.categories[0].content = this.boys;
					}else{
						setTimeout(()=>{
							this.fetchBoys();
						}, 60000);
					}
				}
			},err2 => {
				console.log(err2);
			}
		);
	}

	fetchGirls(){
		this.web.getProducts("'Baby Girls'").subscribe(
			(res2: any = {status: "", message: {data: []}})  => {
				if(res2 != ""){
					let resp = {
						statusCode: null,
						status: null,
						message: null
					};
					resp = JSON.parse(res2+"");
					if(resp.statusCode == "00"){
						this.ROOT = this.web.siteaddress;
						this.girls = this.shuffle(this.arrayLimit(resp.message.data, 4));
						this.categories[1].content = this.girls;
					}else{
						setTimeout(()=>{
							this.fetchGirls();
						}, 60000);
					}
				}
			},err2 => {
				console.log(err2);
			}
		);
	}

	fetchUnisex(){
		this.spinner.show();
		this.web.getProducts("'Unisex'").subscribe(
			(res2: any = {status: "", message: {data: []}})  => {
				if(res2 != ""){
					let resp = {
						statusCode: null,
						status: null,
						message: null
					};
					resp = JSON.parse(res2+"");
					if(resp.statusCode == "00"){
						this.ROOT = this.web.siteaddress;
						this.unisex = this.shuffle(this.arrayLimit(resp.message.data, 4));
						this.categories[2].content = this.unisex;
					}else{
						setTimeout(()=>{
							this.fetchUnisex();
						}, 60000);
					}
				}
			},err2 => {
				console.log(err2);
			}
		);
	}

	imgUrl(url){
		return this.web.siteaddress+url;
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
	
	formatNaira(str) {
		var n = Number.parseFloat(str+"");
		if(!str || isNaN(n) || n < 0) return 0;
		return "₦"+n.toFixed(2);
	}

	arrayLimit(arr, len){
		let temp = [];
		if(arr.length > len){
			for(var i=0; i<len; i++){
				temp[temp.length] = arr[i];
			}
			return temp;
		}else{
			return arr;
		}
	}
}
