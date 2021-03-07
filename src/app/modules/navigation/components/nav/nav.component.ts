import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userDetails:any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
     private router: Router,
     private userService:UserService
     ) {}
 
  ngOnInit() {
    this.userService.userClaims().subscribe(
      res => {
        alert(JSON.stringify(res))
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
  }

 
  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
