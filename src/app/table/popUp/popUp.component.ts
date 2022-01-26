import { FormGroup, FormControl } from '@angular/forms';
import { Component , OnInit, Input, Output} from "@angular/core";

@Component ({
    selector: 'app-popUp',
    templateUrl: './popup.component.html',
    styleUrls : ['./popup.component.css']
})

export class PopUp implements OnInit {
    @Input() parentData;
    isPopup= true;

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
        console.log(this.parentData)
        let id = this.parentData.orderId;
        this.newForm.get('orderId').setValue(id)

        let date = this.parentData.orderDate;
        let newDate = date.toISOString().slice(0, 10).split('-');
        this.newForm.get('orderDate').setValue(`${newDate[2]}-${newDate[1]}-${newDate[0]}`);

        let name = this.parentData.partyName;
        this.newForm.get('partyName').setValue(name);

        let place = this.parentData.station;
        this.newForm.get('station').setValue(place);

        let number = this.parentData.Mobile;
        this.newForm.get('Mobile').setValue(number);
    }
    
    save() {
        this.ngOnInit;
    }

    cancel() {
        this.newForm.get('orderId').setValue(null);
        this.newForm.get('orderDate').setValue(null);
        this.newForm.get('partyName').setValue(null);
        this.newForm.get('station').setValue(null);
        this.newForm.get('Mobile').setValue(null);
    }

    constructor() {}
    
}