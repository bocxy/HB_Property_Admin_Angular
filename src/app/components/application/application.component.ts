import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/services/http.service';


export interface SchemesData {
  slno: number;
  division: string;
  schemecode: string;
  schemename: string;
  totalunits: string;
  ACTION: string;
}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent {

  allApplicationDataSource!: MatTableDataSource<any>;
  schemesTableColumns: string[] = ['slno', 'scheme_code', 'scheme', 'splace', 'district', 'unit_type', 'type','ACTION'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: HttpService) { }



  ngOnInit(): void {

    this.fetchDataFromAPI();
  }

  fetchDataFromAPI() {

    this.apiService.getAllSchemeAppl().subscribe((response: any) => {
      if (response && response.status === 1 && response.data) {

        this.allApplicationDataSource = new MatTableDataSource(response.data);
        this.allApplicationDataSource.paginator = this.paginator;
        this.allApplicationDataSource.sort = this.sort;
      }
    });
  }


 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allApplicationDataSource.filter = filterValue.trim().toLowerCase();

    if (this.allApplicationDataSource.paginator) {
      this.allApplicationDataSource.paginator.firstPage();
    }
  }




}
