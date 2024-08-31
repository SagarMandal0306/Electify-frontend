import { inject, Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";


@Injectable({
    providedIn:'root'
})
export class Authorization{
   cookieService:CookieService=inject(CookieService);

    setCookies(ctoken:any,cname:string){
        this.cookieService.set(cname,ctoken,1/24,'/');
    }
    getCookies(cname:string){
       return this.cookieService.get(cname);
        
    }
    deleteCookies(cname:string){
        this.cookieService.delete(cname);
    }

    checkCookies(cname:string){
        return this.cookieService.check(cname);
    }
}