import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent {

  allApplicationsDataSource!: MatTableDataSource<any>;

  schemesTableColumns: string[] = ['n_ID', 'applicationNo', 'applicantName', 'date', 'reservationOrNonReservation', 'amountPaid', 'status','ACTION'];


  constructor(private apiService: HttpService,private route : ActivatedRoute) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.fetchDataFromAPI();
  }

  fetchDataFromAPI() {

    const scheme= this.route.snapshot.paramMap.get('scheme')!;
    console.log(scheme)
    this.apiService.getSchemeAppl(scheme).subscribe((response: any) => {
      if (response && response.status === 1 && response.data) {
        console.log(response.data)
        this.allApplicationsDataSource = new MatTableDataSource(response.data);
        this.allApplicationsDataSource.paginator = this.paginator;
        this.allApplicationsDataSource.sort = this.sort;
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allApplicationsDataSource.filter = filterValue.trim().toLowerCase();
    if (this.allApplicationsDataSource.paginator) {
      this.allApplicationsDataSource.paginator.firstPage();
    }
  }



}
