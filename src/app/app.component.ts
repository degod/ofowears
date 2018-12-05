import { Component } from '@angular/core';
// import { Router, RouterModule, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  	title = 'ofowears';
// 	showIndicator = true;

// 	constructor(private _router: Router){
// 		this._router.events.subscribe((routerEvent: Event) => {
// 			if(routerEvent instanceof NavigationStart)
// 				this.showIndicator = true;
// 			if(routerEvent instanceof NavigationEnd)
// 				this.showIndicator = false;
// 		});
// 	}
}
