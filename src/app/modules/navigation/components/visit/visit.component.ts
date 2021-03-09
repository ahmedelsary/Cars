import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent {
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

  constructor(private fb: FormBuilder) {}

  onSubmit(data) {
   alert(JSON.stringify(data));
   this.visitForm.reset({

    customerName:null,
    address:null,
    telephone:null,
    dateofVisit:Date.now(),
    vehicleModel:null,
    heardFrom:'Web',
    other:null,


  });
  }
}
