import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "HomePage";

  pages: Array<{title: string, component: any, category: string, index: number}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
              public splashScreen: SplashScreen, private config: Config) {
    this.initializeApp();
    
    this.config.set("scrollPadding", false);
    this.config.set("scrollAssist", false);
    this.config.set("autoFocusAssist", true);

    this.config.set("android", "scrollAssist", true );
    this.config.set("android", "autoFocusAssist", "delay");

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: "HomePage", category: "", index: 99 },
      { title: 'Unisex Wears', component: "CategoryPage", category: "Unisex", index: 0},
      { title: 'Baby Boys Wears', component: "CategoryPage", category: "Baby Boys", index: 1},
      { title: 'Baby Girls Wears', component: "CategoryPage", category: "Baby Girls", index: 2},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {category: page.category, index: page.index});
  }

  admin(){
    this.nav.setRoot("AdminloginPage");
  }
}
