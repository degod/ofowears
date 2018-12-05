import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../website.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
	sku: any;
	details: any;

	constructor(private web: WebsiteService, private spinner: NgxSpinnerService,
				private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
		this.route.params.subscribe(routeParams => {
			this.sku = routeParams.sku;
			if(this.sku == "" || this.sku == undefined)
				this.sku = "all";
			this.productDetails(this.sku);
            window.scrollTo(0, 0);
		});
	}

	productDetails(sku){
		this.web.getProduct("'"+sku+"'").subscribe(
			(res2: any = {status: "", message: {data: []}})  => {
				if(res2 != ""){
					let resp = {
						statusCode: null,
						status: null,
						message: null
					};
					resp = JSON.parse(res2+"");
					if(resp.statusCode == "00"){
						this.details = resp.message.data[0];
						console.log(this.details);
					}else{
						setTimeout(()=>{
							this.productDetails(sku);
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

    nl2br(text: string) {
		return text.replace(/(\r\n|\n\r|\r|\n)/gm, "<br>");
	}
}
