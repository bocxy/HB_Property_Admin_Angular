import { Component,ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpService } from 'src/app/services/http.service';
import { IdPassService } from 'src/app/services/id-pass.service';
import { ModeService } from 'src/app/services/mode.service';


export interface UnitData {
  typename: string;
  sno: number;
  unitid: number;
  allotmenttype: string;
  category:string;
}


@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css']
})
export class MasterDataComponent {



  pageSize = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  schemeId:any
  allUnitDataSource = new MatTableDataSource<any>([]);
  unitData!: UnitData[];
  unitTableColumns: string[] = ['n_ID', 'v_UNIT_NO', 'v_UNIT_AC_NO', 'v_BLOCK_NO', 'v_FLOOR_NO','v_UNIT_ALLOTTED_STATUS', 'ACTION'];
  id!:any;


  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private loader: NgxUiLoaderService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private modeService: ModeService,
    private router: Router,
    private idPassService: IdPassService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.schemeId = +params.get('id')!;
      this.getAllSchemesData(this.schemeId);
    });
}

getAllSchemesData(id: any) {

  this.http.getUnitOfScheme(id).subscribe(
    (response) => {
      console.log('Response:', response);
      if (response && Array.isArray(response.data)) {
        this.allUnitDataSource.data = response.data.map((element: any, index: number) => ({
          ...element,
          serialNumber: index + 1,
        }));
      } else {
        console.error('Invalid response format or missing data array.');
      }
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.allUnitDataSource.filter = filterValue.trim().toLowerCase();
}

  showCreateUnit() {
    this.modeService.createUnit = true;
    this.modeService.editUnit = false;
    this.modeService.viewUnit = false;
    this.router.navigate(['/property/home/unit', this.schemeId]);
  }

  showEditUnit(n_ID: number) {
    this.modeService.createUnit = false;
    this.modeService.editUnit = true;
    this.modeService.viewUnit = false;
    this.idPassService.setN_ID(n_ID);
    this.router.navigate(['/property/home/unit', this.schemeId]);
  }

  showViewUnit(n_ID: number) {
    this.modeService.createUnit = false;
    this.modeService.editUnit = false;
    this.modeService.viewUnit = true;
    this.idPassService.setN_ID(n_ID);
    this.router.navigate(['/property/home/unit', this.schemeId]);
  }

  }








