import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  readonly BaseURI = 'http://localhost:11893/api';

  constructor( private http: HttpClient) { }
  AddCustomer(customer:Customer){
    return this.http.post(this.BaseURI + '/Customers', customer);
  }

  GetCustomers(){
    return this.http.get(this.BaseURI + '/Customers');
  }

  GetCustomersByUID(userId:string){
    return this.http.get(this.BaseURI + '/Customers/CustomersByUID/'+userId);
  }

  CustomersPurchase( customers:Customer[]){

    console.log(JSON.stringify(customers));
    return this.http.put(this.BaseURI + '/Customers/CustomersPurchase',customers);
  }


  HeardFromReport(){
    return this.http.get(this.BaseURI + '/Reports/HeardFrom');
  }
///api/Reports/SalesRepresentativeName

SalesRepresentativeNameReport(){
  return this.http.get(this.BaseURI + '/Reports/SalesRepresentativeName');
}
///api/Reports/VehicleModel

VehicleModelReport(){
  return this.http.get(this.BaseURI + '/Reports/VehicleModel');
}

}
