import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from '../../../../models/customer';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {

  notPurshased :Customer[] = [];
  purshased:Customer[] = [];

  constructor(private customerService:CustomerService,
    private cdRef: ChangeDetectorRef
    ){}
    ngAfterViewChecked() {
      this.cdRef.detectChanges();
   }
  ngOnInit() {

    this.customerService.GetCustomers().subscribe(
      (res:any)=>{

        //  alert(JSON.stringify(res));
        res.forEach(element => {
          if(element.purchase == false)
            this.notPurshased.push(element);
          else
            this.purshased.push(element);
        });

      },
      err => { alert ("Error happend!");}

    );

  }


  drop(event: CdkDragDrop<Customer[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem<Customer>(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }

    this.purshased.forEach(element => {
      element.purchase=true
    });
    this.customerService.CustomersPurchase(this.purshased).subscribe(
      (res:any)=>{

       // alert(JSON.stringify(res));

      },
      err => { alert ("Error happend!");}

    );

    this.notPurshased.forEach(element => {
      element.purchase=false
    });
    this.customerService.CustomersPurchase(this.notPurshased).subscribe(
      (res:any)=>{

      //  alert(JSON.stringify(res));

      },
      err => { alert ("Error happend!");}

    );

  }


}
