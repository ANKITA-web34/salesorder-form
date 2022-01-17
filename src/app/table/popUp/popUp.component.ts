import { Component , OnInit, Inject} from "@angular/core";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component ({
    selector: 'app-popUp',
    templateUrl: './popup.component.html',
    styleUrls : ['./popup.component.css']
})

export class PopUp implements OnInit {
    ngOnInit() {}
    constructor(@Inject(MAT_DIALOG_DATA) public data: PopUp) {}
    
}