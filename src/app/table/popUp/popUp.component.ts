import { FormGroup, FormControl } from '@angular/forms';
import { Component , OnInit, Input, Output, EventEmitter} from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

@Component ({
    selector: 'app-popUp',
    templateUrl: './popup.component.html',
    styleUrls : ['./popup.component.css']
})

export class PopUp implements OnInit {
    parentData;

    constructor(private activeRoute: ActivatedRoute, private router: Router) {
        this.activeRoute.queryParams.subscribe((qp) => {
            this.parentData =  this.activeRoute.snapshot.params;
        });
    }

    newForm = new FormGroup({
        orderId : new FormControl(),
        orderDate : new FormControl(),
        partyName : new FormControl(),
        station : new FormControl(),
        status : new FormControl(),
        Mobile : new FormControl(),
        action : new FormControl(),
    });

    orderId = this.newForm.get('orderId').value;
    orderDate = this.newForm.get('orderDate').value;
    partyName = this.newForm.get('partyName').value;
    station = this.newForm.get('station').value;
    Mobile = this.newForm.get('Mobile').value;
    
  
    ngOnInit() {
        let id = this.parentData['orderId'];
        this.newForm.get('orderId').setValue(id)

        let date = this.parentData["orderDate"];
        let newDate = new Date(date).toISOString().slice(0, 10).split('-');
        this.newForm.get('orderDate').setValue(`${newDate[2]}-${newDate[1]}-${newDate[0]}`);

        let name = this.parentData["partyName"];
        this.newForm.get('partyName').setValue(name);

        let place = this.parentData["station"];
        this.newForm.get('station').setValue(place);

        let number = this.parentData["Mobile"];
        this.newForm.get('Mobile').setValue(number);
    }    

    cancel() {
        this.router.navigate(['table']);
    }
    
    
}