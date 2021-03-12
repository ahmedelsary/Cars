import { CustomerService } from 'src/app/shared/customer.service';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Customer } from 'src/app/models/customer';


export class CustomersDataSource extends DataSource<Customer> {
  data: Customer[] ;
  paginator: MatPaginator;
  sort: MatSort;

  constructor(public customerService: CustomerService) {
    super();
    this.customerService.GetCustomers().subscribe(
      (res:any)=>{this.data=res}
    );
  }


  connect(): Observable<Customer[]> {

    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }


  disconnect() {}

  private getPagedData(data: Customer[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }


  private getSortedData(data: Customer[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';

      switch (this.sort.active) {
        case 'salesRepresentativeId': return compare(a.salesRepresentativeId, b.salesRepresentativeId, isAsc);
        case 'salesRepresentativeName': return compare(a.salesRepresentativeName, b.salesRepresentativeName, isAsc);
        case 'address': return compare(a.address, b.address, isAsc);
        case 'telephone': return compare(a.telephone, b.telephone, isAsc);
        case 'heardFrom': return compare(a.heardFrom, b.heardFrom, isAsc);

        case 'customerName': return compare(a.customerName, b.customerName, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);




        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
