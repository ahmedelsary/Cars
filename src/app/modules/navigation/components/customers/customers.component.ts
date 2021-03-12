
import { CustomerService } from 'src/app/shared/customer.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Customer } from 'src/app/models/customer';
import { CustomersDataSource,} from './customers-datasource';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements AfterViewInit, OnInit {
  constructor(private customerService:CustomerService){}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Customer>;
  dataSource: CustomersDataSource;
vM:string[]=[
 "BRZ",
  "Impreza",
  "WRX",
  "Legacy",
  "Forester",
  "Crosstrek",
  "Outback",
  "Ascent"

]


  displayedColumns = ['id',
  'customerName',
  'salesRepresentativeId',
  'salesRepresentativeName',
  'address',

    'telephone',
  'dateofVisit',
  'vehicleModel',
  'heardFrom',
  'purchase',



];

  ngOnInit() {
    this.dataSource = new CustomersDataSource(this.customerService);

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
