import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HomeService {

    constructor() {
        this.loadScript('../assets/vendor/jquery/jquery-3.2.1.min.js');
        this.loadScript('../assets/js/add-cart.js');
        this.loadScript('../assets/vendor/animsition/js/animsition.min.js');
        this.loadScript('../assets/vendor/bootstrap/js/popper.js');
        this.loadScript('../assets/vendor/bootstrap/js/bootstrap.min.js');
        this.loadScript('../assets/vendor/select2/select2.min.js');
        this.loadScript('../assets/js/select2.js');

        this.loadScript('../assets/vendor/slick/slick.min.js');
        this.loadScript('../assets/js/slick-custom.js');
        this.loadScript('../assets/vendor/countdowntime/countdowntime.js');
        this.loadScript('../assets/vendor/lightbox2/js/lightbox.min.js');
        this.loadScript('../assets/vendor/sweetalert/sweetalert.min.js');
        this.loadScript('../assets/js/main.js');
    }

    public loadScript(url: string) {
        const body = <HTMLDivElement>document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
    }
}