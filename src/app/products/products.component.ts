import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../website.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    category: any;
    structure = {
    	"boys": "Baby Boys",
    	"girls": "Baby Girls",
    	"unisex": "Unisex",
    	"all": "ALL"
    }
    all: any;
    offset: any;
    loading = false;

	constructor(private web: WebsiteService, private spinner: NgxSpinnerService,
				private route: ActivatedRoute, private router: Router) { 
	}

	ngOnInit() {
		this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
		this.route.params.subscribe(routeParams => {
			this.category = routeParams.category;
			this.offset = routeParams.skip;
			if(this.category == "" || this.category == undefined)
				this.category = "all";
			if(this.offset == "" || this.offset == undefined)
				this.offset = 0;
			this.fetchAll(this.structure[this.category], this.offset);
            window.scrollTo(0, 0);
		});
	}

	fetchAll(cat, skip){
		this.spinner.show();
		this.web.getCategoryAll("'"+cat+"'", skip).subscribe(
			(res2: any = {status: "", message: {data: []}})  => {
				if(res2 != ""){
					this.spinner.hide();
					this.loading = true;
					let resp = {
						statusCode: null,
						status: null,
						message: null
					};
					resp = JSON.parse(res2+"");
					if(resp.statusCode == "00"){
						this.all = resp.message.data;
						// console.log(this.all);
					}else{
						setTimeout(()=>{
							this.fetchAll(cat, skip);
						}, 60000);
					}
				}
			},err2 => {
				console.log(err2);
			}
		);
	}

	changeAct(skip){
		console.log("It got here...");
		this.router.navigate(['/products', this.category, skip]);
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
