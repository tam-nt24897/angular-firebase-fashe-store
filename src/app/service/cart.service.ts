import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  loadAPI: Promise<any>;
  constructor() {
    this.loadAPI = new Promise((resolve) => {
      // Load Scripts
      this.loadScript('../assets/vendor/jquery/jquery-3.2.1.min.js');
      // this.loadScript('../assets/js/add-cart.js');
      this.loadScript('../assets/vendor/animsition/js/animsition.min.js');
      this.loadScript('../assets/vendor/bootstrap/js/popper.js');
      this.loadScript('../assets/vendor/bootstrap/js/bootstrap.min.js');
      this.loadScript('../assets/vendor/select2/select2.min.js');
      this.loadScript('../assets/js/select2-product-detail.js');
      this.loadScript('../assets/vendor/daterangepicker/moment.min.js');
      this.loadScript('../assets/vendor/daterangepicker/daterangepicker.js');

      this.loadScript('../assets/vendor/slick/slick.min.js');
      this.loadScript('../assets/js/slick-custom.js');
      this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
      this.loadScript('../assets/vendor/noui/nouislider.min.js');
      this.loadScript('../assets/js/nouislider.js');
      this.loadScript('../assets/js/main.js');
      resolve(true);
    });
  }

  public loadScript(url: string) {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
        isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = [url];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }

    }
  }
}
