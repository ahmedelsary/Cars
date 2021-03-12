import { Customer } from '../../../../models/customer';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent {

  customer:Customer;
  userDetails:any;

  visitForm = this.fb.group({

    customerName:[null, Validators.required],
    address:[null, Validators.required],
    telephone:[null, Validators.required],
    dateofVisit:[Date.now(),Validators.required],
    vehicleModel:[null, Validators.required],
    heardFrom:[ 'Web'],
    other:[null],


  });


  ads = [

    {name: 'Web', value: 'Web'},
    {name: 'Newspaper', value:'Newspaper'},
  ];

  constructor(private fb: FormBuilder , private customerService:CustomerService) {}

  onSubmit(data) {

   // {"id":"3a07a471-ae3b-4709-95cc-a347531d5cc8","fullName":"Ahmed Sayed","email":"ahmed@mail.com","userName":"ahmed","userClaims":[{"type":"http://schemas.microsoft.com/ws/2008/06/identity/claims/role","value":"Adminstrator"}]}

    this.userDetails = JSON.parse( localStorage.getItem('userDetails'));


   // alert(JSON.stringify(this.userDetails));
//alert(JSON.stringify(data));
    this.customer =new Customer();
    this.customer.customerName=data.customerName;
    this.customer.salesRepresentativeId=this.userDetails.id
    this.customer.salesRepresentativeName=this.userDetails.fullName,
    this.customer.address=data.address
    this.customer.telephone=data.telephone
    this.customer.dateofVisit=data.dateofVisit
    this.customer.vehicleModel=data.vehicleModel
    this.customer.heardFrom =data.other==null?data.heardFrom:data.other;
    this.customer.purchase=false;
    console.log(JSON.stringify(this.customer));
    this.customerService.AddCustomer(this.customer).subscribe(

      res=>{alert("sucess")},
      err=>{alert(JSON.stringify(err))}
    );
   this.visitForm.reset({

    customerName:"",
    address:"",
    telephone:"",
    dateofVisit:Date.now(),
    vehicleModel:0,
    heardFrom:'Web',
    other:null,


  });
  }
}
