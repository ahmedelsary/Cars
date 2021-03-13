import { element } from 'protractor';
import { CustomerService } from 'src/app/shared/customer.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Label, SingleDataSet } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
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
  public pieChartLabels1: Label[] = [];
  public pieChartData1: SingleDataSet = [];


  public pieChartLabels2: Label[] = [];
  public pieChartData2: SingleDataSet = [];


  public pieChartLabels3: Label[] = [];
  public pieChartData3: SingleDataSet = [];


  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Number of vehicles were customer heard from', cols: 1, rows: 2, chart: 1, },
          { title: 'Number of vehicles were sold by the seller', cols: 1, rows: 2, chart: 2, },
          { title: 'Number of vehicles Model were sold ', cols: 1, rows: 2, chart: 3, },

        ];
      }

      return [
        { title: 'Number of vehicles were customer heard from', cols: 1, rows: 2, chart: 1, },
        { title: 'Number of vehicles were sold by the seller', cols: 1, rows: 2, chart: 2, },
        { title: 'Number of vehicles Model were sold ', cols: 2, rows: 4, chart: 3, },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {


    this.customerService.HeardFromReport().subscribe(

      (res: any) => {


        res.forEach(element => {

          this.pieChartLabels1.push(element.Lables)
          this.pieChartData1.push(element.Data)


        });
      },
      err => { alert("error") }
    );


    this.customerService.SalesRepresentativeNameReport().subscribe(

      (res: any) => {


        res.forEach(element => {

          this.pieChartLabels2.push(element.Lables)
          this.pieChartData2.push(element.Data)


        });
      },
      err => { alert("error") }
    );




    this.customerService.VehicleModelReport().subscribe(

      (res: any) => {


        res.forEach(element => {

          this.pieChartLabels3.push(this.vM[element.Lables])
          this.pieChartData3.push(element.Data)


        });
      },
      err => { alert("error") }
    );





  }
}
