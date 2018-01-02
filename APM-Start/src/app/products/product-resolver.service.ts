import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class ProductResolver implements Resolve<IProduct> {

    constructor(private productService: ProductService, private router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<IProduct> {
        let id = route.params['id'];
        // let id = route.paramMap.get('id');
        if (isNaN(+id)) {
            console.log(`Product id was not a number: ${id}`);
            this.router.navigate(['/products']);
            return Observable.of(null);
        }
        return this.productService.getProduct(+id)
            .map(product => {
                if (product) {
                    return product;
                }
                console.log(`Product was not found: ${id}`);
                this.router.navigate(['/products']);
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigate(['/products']);
                return Observable.of(null);
            });
    }
}
