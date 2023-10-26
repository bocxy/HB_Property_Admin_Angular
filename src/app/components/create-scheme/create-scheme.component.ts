import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';
import { ModeService } from 'src/app/services/mode.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IdPassService } from 'src/app/services/id-pass.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-create-scheme',
  templateUrl: './create-scheme.component.html',
  styleUrls: ['./create-scheme.component.css'],
  providers: [DatePipe]
})
export class CreateSchemeComponent implements OnInit {

  isLinear = false;
  schemeFormGroup!: FormGroup;
  unitFormGroup!: FormGroup;
  schemeData: any;
  id!: number;
  schemeDataById: any;
  private subscription!: Subscription;
  schemeDataForm!: FormGroup;
  unitDataForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dialog: MatDialog,
    public modeService: ModeService,
    private route: ActivatedRoute,
    private router: Router,
    private idPassService: IdPassService,
    private datePipe: DatePipe,
    private loader: NgxUiLoaderService,
  ) {
  }

  ngOnInit() {
    if (!this.modeService.createScheme && !this.modeService.editScheme && !this.modeService.viewScheme) {
      this.router.navigate(['/property/home/view-scheme']);
    }


    this.schemeFormGroup = this.formBuilder.group({

      v_SCHEME_CODE: ['', Validators.required],
      v_DIVISION: ['', Validators.required],
      v_CIRCLE:"Chennai",
      v_CITY_RURAL:"City",
      v_SCHEME_NAME: ['', Validators.required],
      v_SCHEME_TYPE:['',Validators.required],
      v_UNIT_TYPE: ['',Validators.required],
      n_TOTAL_UNITS:['',Validators.required],
      v_SPLACE:['',Validators.required],
      v_DISTRICT:['',Validators.required],
      v_RESERVATION_STATUS:['',Validators.required],
      v_FROM_DATE:['',Validators.required],
      v_TO_DATE:['',Validators.required],
      v_PROJECT_STATUS:['',Validators.required],
      v_MODE_OF_ALLOCATION:['',Validators.required],
      v_CUT_OFF_DATE: ['', Validators.required],
      n_SELLING_PRICE:['', Validators.required],
      n_RATE_OF_SCHEME_INTEREST: ['', Validators.required],
      v_REPAYMENT_PERIOD: ['', Validators.required],
      v_SELLING_EXTENT: ['', Validators.required],
      v_PLINTH_AREA : ['', Validators.required],
      v_UDS_AREA:['', Validators.required],
      v_TENTATIVE_LAND:['', Validators.required],
      v_FINAL_LAND:['', Validators.required],
      n_TENTATIVE_LAND_COST: ['', Validators.required],
      n_FINAL_LAND_COST: ['', Validators.required],
      v_FINAL_CUTOFF_DATE: ['', Validators.required],
      n_PROFIT_ON_LAND: ['', Validators.required],
      v_REMARKS:['', Validators.required],
      v_START_FROM:['', Validators.required]

    });

    this.unitFormGroup = this.formBuilder.group({
      n_TOTAL_ALLOTTED_UNITS: [''],
      n_TOTAL_UNSOLD_UNITS:[''],
      n_TOTAL_ALLOTTED_UNITS_FOR_OUTRIGHT: [''],
      n_TOTAL_ALLOTTED_UNITS_FOR_HIRE_PURCHASE: [''],
      n_TOTAL_ALLOTTED_UNITS_FOR_SFS: [''],
      n_TOTAL_ARREARS_EMI: [''],
      n_TOTAL_CURRENT_EMI: [''],
      n_TOTAL_BALANCE_EMI: [''],
      n_TOTAL_LIVE_CASES_FOR_HIRE: [''],
      n_FULL_COST_PAID:[''],
      n_TOTAL_NO_OF_SALE_DEED_ISSUED: [''],
      n_TOTAL_RIPPED_UNIT: [''],
    });


    this.id = this.idPassService.getN_ID();
    if(this.id != null){
    this.fetchDataById();
    }
    this.schemeDataForm = this.formBuilder.group({

      v_SCHEME_CODE: new FormControl(),
      v_DIVISION: new FormControl(),
      v_SCHEME_NAME: new FormControl(),
      v_SCHEME_TYPE:new FormControl(),
      v_UNIT_TYPE: new FormControl(),
      n_TOTAL_UNITS:new FormControl(),
      v_SPLACE:new FormControl(),
      v_DISTRICT:new FormControl(),
      v_RESERVATION_STATUS:new FormControl(),
      v_FROM_DATE:new FormControl(),
      v_TO_DATE:new FormControl(),
      v_PROJECT_STATUS:new FormControl(),
      v_MODE_OF_ALLOCATION:new FormControl(),
      v_CUT_OFF_DATE: new FormControl(),
      n_SELLING_PRICE:new FormControl(),
      n_RATE_OF_SCHEME_INTEREST: new FormControl(),
      v_REPAYMENT_PERIOD: new FormControl(),
      v_SELLING_EXTENT: new FormControl(),
      v_PLINTH_AREA : new FormControl(),
      v_UDS_AREA:new FormControl(),
      v_TENTATIVE_LAND:new FormControl(),
      v_FINAL_LAND:new FormControl(),
      n_TENTATIVE_LAND_COST: new FormControl(),
      n_FINAL_LAND_COST: new FormControl(),
      v_FINAL_CUTOFF_DATE: new FormControl(),
      n_PROFIT_ON_LAND: new FormControl(),
      v_START_FROM:new FormControl(),
      v_REMARKS:new FormControl()

    });

    this.unitDataForm = this.formBuilder.group({

      n_TOTAL_ALLOTTED_UNITS: new FormControl(),
      n_TOTAL_UNSOLD_UNITS:new FormControl(),
      n_TOTAL_ALLOTTED_UNITS_FOR_OUTRIGHT: new FormControl(),
      n_TOTAL_ALLOTTED_UNITS_FOR_HIRE_PURCHASE: new FormControl(),
      n_TOTAL_ALLOTTED_UNITS_FOR_SFS: new FormControl(),
      n_TOTAL_ARREARS_EMI: new FormControl(),
      n_TOTAL_CURRENT_EMI: new FormControl(),
      n_TOTAL_BALANCE_EMI: new FormControl(),
      n_TOTAL_LIVE_CASES_FOR_HIRE: new FormControl(),
      n_FULL_COST_PAID:new FormControl(),
      n_TOTAL_NO_OF_SALE_DEED_ISSUED: new FormControl(),
      n_TOTAL_RIPPED_UNIT: new FormControl(),

    });

  }



  onSubmit() {

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: {
          message: 'Are you sure you want to create this scheme?',
          confirmBackgroundColor: 'green',
          cancelBackgroundColor: 'red',
          confirmTextColor: 'white',
          cancelTextColor: 'white',
          confirmText: 'Yes',
          cancelText: 'No'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.loader.start();
          const schemeData = {
            ...this.schemeFormGroup.value,
            ...this.unitFormGroup.value,
          };
          this.http.createSchemeData([schemeData]).subscribe(
            (response) => {
              this.loader.stop();
              console.log('Successfully created scheme data:', response);
              this.dialog.open(DialogMsgComponent, {
                data: {
                  isSuccess: true,
                  message: 'Scheme data created successfully!',
                  routerLink: '/property/home/view-scheme'
                }
              });
            },
            (error) => {
              this.loader.stop();
              console.error('Error creating scheme data:', error);
              this.openDialog(false, 'Error creating scheme data. Please try again later.');
            }
          );
        }
      });

  }

  onUpdate(id: number) {
    const schemeData = {
      n_ID: id,
      ...this.schemeDataForm.value,
      ...this.unitDataForm.value,
    };
    this.http.editSchemeData(schemeData).subscribe(
      (response) => {

        console.log('Successfully updated scheme data:', response);
        this.openDialog(true, 'Scheme data updated successfully!');
      },
      (error) => {

        console.error('Error in updating scheme data:', error);
        this.openDialog(false, 'Error in updating scheme data. Please try again later.');
      }
    );
  }

  onDelete(id: number) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure you want to delete this scheme data?',
        confirmBackgroundColor: 'red',
        cancelBackgroundColor: 'white',
        confirmTextColor: 'white',
        cancelTextColor: 'black',
        confirmText: 'Yes',
        cancelText: 'No'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loader.start();
        this.deleteScheme(id);
      }
    });
  }

  deleteScheme(id: number) {
    this.http.deleteSchemeDataById(id).subscribe(
      (response) => {
        this.loader.stop();
        this.openDialog(true, 'Scheme data deleted successfully!');
      },
      (error) => {
        this.loader.stop();
        this.openDialog(false, 'Error in deleting scheme data. Please try again later.');
      }
    );
  }

  openDialog(isSuccess: boolean, message: string) {
    const dialogRef = this.dialog.open(DialogMsgComponent, {
      width: '400px', // Set the desired width of the dialog
      data: { isSuccess, message } // Pass the isSuccess flag and the message to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      // Do something when the dialog is closed (optional)
    });
  }

  getSchemeData(id: any) {
    this.http.getSchemeDataById(id).subscribe(
      (response) => {
        this.schemeData = response.data;
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  fetchDataById() {
    this.subscription = this.http.getSchemeDataById(this.id)
      .subscribe((response) => {
        const data = response.data;
        console.log(data.v_SCHEME_CODE)
        this.schemeDataForm.patchValue({

      v_SCHEME_CODE: data.v_SCHEME_CODE,
      v_DIVISION: data.v_DIVISION,
      v_SCHEME_NAME: data.v_SCHEME_NAME,
      v_SCHEME_TYPE:data.v_SCHEME_TYPE,
      v_UNIT_TYPE: data.v_UNIT_TYPE,
      n_TOTAL_UNITS:data.n_TOTAL_UNITS,
      v_SPLACE:data.v_SPLACE,
      v_DISTRICT:data.v_DISTRICT,
      v_RESERVATION_STATUS:data.v_RESERVATION_STATUS,
      v_FROM_DATE:data.v_FROM_DATE,
      v_TO_DATE:data.v_TO_DATE,
      v_PROJECT_STATUS:data.v_PROJECT_STATUS,
      v_MODE_OF_ALLOCATION:data.v_MODE_OF_ALLOCATION,
      v_CUT_OFF_DATE: data.v_CUT_OFF_DATE,
      n_SELLING_PRICE:data.n_SELLING_PRICE,
      n_RATE_OF_SCHEME_INTEREST: data.n_RATE_OF_SCHEME_INTEREST,
      v_REPAYMENT_PERIOD: data.v_REPAYMENT_PERIOD,
      v_SELLING_EXTENT: data.v_SELLING_EXTENT,
      v_PLINTH_AREA : data.v_PLINTH_AREA,
      v_UDS_AREA:data.v_UDS_AREA,
      v_TENTATIVE_LAND:data.v_TENTATIVE_LAND,
      v_FINAL_LAND:data.v_FINAL_LAND,
      n_TENTATIVE_LAND_COST: data.n_TENTATIVE_LAND_COST,
      n_FINAL_LAND_COST: data.n_FINAL_LAND_COST,
      v_FINAL_CUTOFF_DATE: data.v_FINAL_CUTOFF_DATE,
      n_PROFIT_ON_LAND: data.n_PROFIT_ON_LAND,
      v_START_FROM:data.v_START_FROM,
      v_REMARKS:data.v_REMARKS
    });
        this.unitDataForm.patchValue({

          n_TOTAL_ALLOTTED_UNITS: data.n_TOTAL_ALLOTTED_UNITS,
          n_TOTAL_UNSOLD_UNITS:data.n_TOTAL_UNSOLD_UNITS,
          n_TOTAL_ALLOTTED_UNITS_FOR_OUTRIGHT: data.n_TOTAL_ALLOTTED_UNITS_FOR_OUTRIGHT,
          n_TOTAL_ALLOTTED_UNITS_FOR_HIRE_PURCHASE: data.n_TOTAL_ALLOTTED_UNITS_FOR_HIRE_PURCHASE,
          n_TOTAL_ALLOTTED_UNITS_FOR_SFS: data.n_TOTAL_ALLOTTED_UNITS_FOR_SFS,
          n_TOTAL_ARREARS_EMI: data.n_TOTAL_ARREARS_EMI,
          n_TOTAL_CURRENT_EMI: data.n_TOTAL_CURRENT_EMI,
          n_TOTAL_BALANCE_EMI: data.n_TOTAL_BALANCE_EMI,
          n_TOTAL_LIVE_CASES_FOR_HIRE: data.n_TOTAL_LIVE_CASES_FOR_HIRE,
          n_FULL_COST_PAID: data.n_FULL_COST_PAID,
          n_TOTAL_NO_OF_SALE_DEED_ISSUED: data.n_TOTAL_NO_OF_SALE_DEED_ISSUED,
          n_TOTAL_RIPPED_UNIT: data.n_TOTAL_RIPPED_UNIT
          });
      });
  }

  ngOnDestroy() {
    // Unsubscribe from the subscription to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
