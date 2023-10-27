import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { IdPassService } from 'src/app/services/id-pass.service';
import { ModeService } from 'src/app/services/mode.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.css']
})
export class CreateUnitComponent {

  UnitFormGroup!: FormGroup;
  sfsFormGroup!: FormGroup;
  UnitDataFormGroup!: FormGroup;
  sfsDataFormGroup!: FormGroup;
  PropertyDataFormGroup!: FormGroup;
  AllotteeDataFormGroup!: FormGroup;
  schemeId: any
  id!: number;
  private subscription!: Subscription;
  selectedTab: string = 'Unit';
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private http: HttpService, public modeService: ModeService, private router: Router, private idPassService: IdPassService, private dialog: MatDialog, private loader: NgxUiLoaderService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.schemeId = +params.get('id')!;
    });

    if (!this.modeService.createUnit && !this.modeService.editUnit && !this.modeService.viewUnit) {
      this.router.navigate(['/property/home/master-data', this.schemeId]);
    }

    this.UnitFormGroup = this.formBuilder.group({
      v_UNIT_AC_NO: [''],
      division: [''],
      scheme_name: [''],
      Type: [''],
      unit_type: [''],
      v_UNIT_NO: [''],
      v_BLOCK_NO: [''],
      v_FLOOR_NO: [''],
      gdq: [''],
      v_RESERVATION_CATEGORY: [''],
      v_PRIORITY: [''],
      v_UNIT_ALLOTTED_STATUS: [''],
      Mode_of_Allotment: [''],
      v_CATEGORY: [''],
      v_DATE_OF_ALLOTMENT: [''],
      v_UNIT_COST: [''],
      v_FREEZED_DATE: [''],
      v_INITIAL_DEPOSIT: [''],
      v_EMI: [''],
      v_EMI_START_DATE: [''],
      v_UNIT_READY_DATE: [''],
      v_ID_DUE_DATE_HP: [''],
      v_SF_LOAN_SG: [''],
      v_AB_ISSUED_DATE: [''],
      v_LOAN_SANC_DATE: [''],
      v_UNIT_HANDING_OVER: [''],
      v_PLOT_HANDING_OVER: [''],
      v_ACTUAL_EXTENT: [''],
      v_ROAD_FACING: [''],
      v_CORNER_PLOT_STATUS: [''],
      v_DOOR_FACING: [''],
      v_LIVE_STATUS: [''],
      v_RIPED_STATUS: [''],
      v_FC_PAID_STATUS: [''],
      v_DRAFT_DEED_ISSUED_ON: [''],
      v_FC_PAID_BUT_SALE_DEED_NOT_ISSUED: [''],
      v_RIPED_BUT_COST_NOT_FULLY_PAID: [''],
      v_SALE_DEED_STATUS: [''],
      v_SALE_DEED_DATE: [''],
    });

    this.sfsFormGroup = this.formBuilder.group({
      v_UNIT_AC_NO: [''],
      division: [''],
      scheme_name: [''],
      Type: [''],
      unit_type: [''],
      v_1ST_AMOUNT_DUE: [''],
      v_1ST_AMOUNT_DUE_DATE: [''],
      v_2ST_AMOUNT_DUE: [''],
      v_2ND_AMOUNT_DUE_DATE: [''],
      v_3RD_AMOUNT_DUE: [''],
      v_3RD_AMOUNT_DUE_DATE: [''],
      v_4TH_AMOUNT_DUE: [''],
      v_4TH_AMOUNT_DUE_DATE: [''],
      v_5TH_AMOUNT_DUE: [''],
      v_5TH_AMOUNT_DUE_DATE: [''],
      v_6TH_AMOUNT_DUE: [''],
      v_6TH_AMOUNT_DUE_DATE: [''],
      v_7TH_AMOUNT_DUE: [''],
      v_7TH_AMOUNT_DUE_DATE: [''],
      v_8TH_AMOUNT_DUE: [''],
      v_8TH_AMOUNT_DUE_DATE: [''],
      v_9TH_AMOUNT_DUE: [''],
      v_9TH_AMOUNT_DUE_DATE: [''],
      v_10TH_AMOUNT_DUE: [''],
      v_10TH_AMOUNT_DUE_DATE: [''],
      v_11TH_AMOUNT_DUE: [''],
      v_11TH_AMOUNT_DUE_DATE: [''],
      v_12TH_AMOUNT_DUE: [''],
      v_12TH_AMOUNT_DUE_DATE: [''],
      v_13TH_AMOUNT_DUE: [''],
      v_13TH_AMOUNT_DUE_DATE: ['']
    });

    this.UnitDataFormGroup = this.formBuilder.group({
      v_UNIT_AC_NO: [''],
      division: [''],
      scheme_name: [''],
      Type: [''],
      unit_type: [''],
      v_UNIT_NO: [''],
      v_BLOCK_NO: [''],
      v_FLOOR_NO: [''],
      gdq: ['No'],
      v_RESERVATION_CATEGORY: [''],
      v_PRIORITY: [''],
      v_UNIT_ALLOTTED_STATUS: ['No'],
      Mode_of_Allotment: [''],
      v_CATEGORY: [''],
      v_DATE_OF_ALLOTMENT: [''],
      v_UNIT_COST: [''],
      v_FREEZED_DATE: ['No'],
      v_INITIAL_DEPOSIT: [{ value: '', disabled: true },],
      v_EMI: [{ value: '', disabled: true }],
      v_EMI_START_DATE: [{ value: '', disabled: true }],
      v_UNIT_READY_DATE: [''],
      v_ID_DUE_DATE_HP: [{ value: '', disabled: true }],
      v_SF_LOAN_SG: ['No'],
      v_AB_ISSUED_DATE: [''],
      v_LOAN_SANC_DATE: [''],
      v_UNIT_HANDING_OVER: [''],
      v_PLOT_HANDING_OVER: [''],
      v_ACTUAL_EXTENT: [''],
      v_ROAD_FACING: [{ value: '', disabled: true }],
      v_CORNER_PLOT_STATUS: ['No'],
      v_DOOR_FACING: [''],
      v_LIVE_STATUS: ['No'],
      v_RIPED_STATUS: ['No'],
      v_FC_PAID_STATUS: ['No'],
      v_DRAFT_DEED_ISSUED_ON: [''],
      v_FC_PAID_BUT_SALE_DEED_NOT_ISSUED: [''],
      v_RIPED_BUT_COST_NOT_FULLY_PAID: [''],
      v_SALE_DEED_STATUS: ['No'],
      v_SALE_DEED_DATE: [''],
    });

    this.sfsDataFormGroup = this.formBuilder.group({
      v_UNIT_AC_NO: [''],
      division: [''],
      scheme_name: [''],
      Type: [''],
      unit_type: [''],
      v_1ST_AMOUNT_DUE: [''],
      v_1ST_AMOUNT_DUE_DATE: [''],
      v_2ST_AMOUNT_DUE: [''],
      v_2ND_AMOUNT_DUE_DATE: [''],
      v_3RD_AMOUNT_DUE: [''],
      v_3RD_AMOUNT_DUE_DATE: [''],
      v_4TH_AMOUNT_DUE: [''],
      v_4TH_AMOUNT_DUE_DATE: [''],
      v_5TH_AMOUNT_DUE: [''],
      v_5TH_AMOUNT_DUE_DATE: [''],
      v_6TH_AMOUNT_DUE: [''],
      v_6TH_AMOUNT_DUE_DATE: [''],
      v_7TH_AMOUNT_DUE: [''],
      v_7TH_AMOUNT_DUE_DATE: [''],
      v_8TH_AMOUNT_DUE: [''],
      v_8TH_AMOUNT_DUE_DATE: [''],
      v_9TH_AMOUNT_DUE: [''],
      v_9TH_AMOUNT_DUE_DATE: [''],
      v_10TH_AMOUNT_DUE: [''],
      v_10TH_AMOUNT_DUE_DATE: [''],
      v_11TH_AMOUNT_DUE: [''],
      v_11TH_AMOUNT_DUE_DATE: [''],
      v_12TH_AMOUNT_DUE: [''],
      v_12TH_AMOUNT_DUE_DATE: [''],
      v_13TH_AMOUNT_DUE: [''],
      v_13TH_AMOUNT_DUE_DATE: ['']
    });

    this.fetchSchemeData();

    this.id = this.idPassService.getN_ID();
    if (this.id != null) {
      this.fetchDataById();
    }

  }



  fetchSchemeData() {
    this.subscription = this.http.getSchemeDataById(this.schemeId)
      .subscribe((response) => {
        const data = response.data;

        this.UnitFormGroup.patchValue({
          division: data.v_DIVISION,
          scheme_name: data.v_SCHEME_NAME,
          Type: data.v_SCHEME_TYPE,
          unit_type: data.v_UNIT_TYPE,
          Mode_of_Allotment: data.v_MODE_OF_ALLOCATION,
        });
        this.UnitFormGroup.get('Mode_of_Allotment')!.setValue(data.v_MODE_OF_ALLOCATION);
        const modeOfAllotmentother = data.v_MODE_OF_ALLOCATION;
        if (modeOfAllotmentother === 'HP') {
          this.enableFormControls();
        } else {

          this.disableFormControls();
        }
        this.UnitFormGroup.get('Mode_of_Allotment')!.setValue(data.v_MODE_OF_ALLOCATION);
        const modeOfAllotmentsfs = data.v_MODE_OF_ALLOCATION;
        if (modeOfAllotmentsfs === 'SFS') {
          this.disableFormControlsID_due_date();

        } else {
          this.enableFormControlsID_due_date();

        }

        this.UnitFormGroup.get('unit_type')!.setValue(data.v_UNIT_TYPE);
        const typenameother = data.v_UNIT_TYPE;
        if (typenameother === 'Flat') {
          this.disableFormControlsRoadfacing();
        } else {
          this.enableFormControlsRoadfacing();
        }
        this.sfsFormGroup.patchValue({
          division: data.v_DIVISION,
          scheme_name: data.v_SCHEME_NAME,
          Type: data.v_SCHEME_TYPE,
          unit_type: data.v_UNIT_TYPE,
        });
        this.UnitDataFormGroup.patchValue({
          division: data.v_DIVISION,
          scheme_name: data.v_SCHEME_NAME,
          Type: data.v_SCHEME_TYPE,
          unit_type: data.v_UNIT_TYPE,
          Mode_of_Allotment: data.v_MODE_OF_ALLOCATION,
        });

        this.UnitDataFormGroup.get('Mode_of_Allotment')!.setValue(data.v_MODE_OF_ALLOCATION);
        const modeOfAllotment = data.v_MODE_OF_ALLOCATION;
        if (modeOfAllotment === 'HP') {
          this.enableFormControls();
        } else {
          this.disableFormControls();
        }

        this.UnitFormGroup.get('Mode_of_Allotment')!.setValue(data.v_MODE_OF_ALLOCATION);
        const modeOfAllotmentsfsother = data.v_MODE_OF_ALLOCATION;
        if (modeOfAllotmentsfsother === 'SFS') {
          this.disableFormControlsID_due_date();

        } else {
          this.enableFormControlsID_due_date();

        }

        this.UnitDataFormGroup.get('unit_type')!.setValue(data.v_UNIT_TYPE);
        const typename = data.v_UNIT_TYPE;
        if (typename === 'Flat') {
          this.disableFormControlsRoadfacing();
        } else {
          this.enableFormControlsRoadfacing();
        }

        this.sfsDataFormGroup.patchValue({
          division: data.v_DIVISION,
          scheme_name: data.v_SCHEME_NAME,
          Type: data.v_SCHEME_TYPE,
          unit_type: data.v_UNIT_TYPE,

        });

      });
  }

  enableFormControls() {
    this.UnitDataFormGroup.get('v_INITIAL_DEPOSIT')!.enable();
    this.UnitDataFormGroup.get('v_EMI')!.enable();
    this.UnitDataFormGroup.get('v_EMI_START_DATE')!.enable();
    this.UnitFormGroup.get('v_INITIAL_DEPOSIT')!.enable();
    this.UnitFormGroup.get('v_EMI')!.enable();
    this.UnitFormGroup.get('v_EMI_START_DATE')!.enable();
  }

  disableFormControls() {
    this.UnitDataFormGroup.get('v_INITIAL_DEPOSIT')!.disable();
    this.UnitDataFormGroup.get('v_EMI')!.disable();
    this.UnitDataFormGroup.get('v_EMI_START_DATE')!.disable();
    this.UnitFormGroup.get('v_INITIAL_DEPOSIT')!.disable();
    this.UnitFormGroup.get('v_EMI')!.disable();
    this.UnitFormGroup.get('v_EMI_START_DATE')!.disable();
  }

  enableFormControlsRoadfacing() {
    this.UnitDataFormGroup.get('v_ROAD_FACING')!.enable();
    this.UnitFormGroup.get('v_ROAD_FACING')!.enable();
  }

  disableFormControlsRoadfacing() {
    this.UnitDataFormGroup.get('v_ROAD_FACING')!.disable();
    this.UnitFormGroup.get('v_ROAD_FACING')!.disable();
  }

  enableFormControlsID_due_date() {
    this.UnitDataFormGroup.get('v_ID_DUE_DATE_HP')!.enable();
    this.UnitFormGroup.get('v_ID_DUE_DATE_HP')!.enable();
  }

  disableFormControlsID_due_date() {
    this.UnitDataFormGroup.get('v_ID_DUE_DATE_HP')!.disable();
    this.UnitFormGroup.get('v_ID_DUE_DATE_HP')!.disable();
  }

  onSubmit() {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure you want to create this Unit?',
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
        const unitData = {
          ...this.sfsDataFormGroup.value,
          ...this.UnitDataFormGroup.value,
          n_SCHEME_ID: this.schemeId,
        };
        console.log(unitData)
        this.http.createUnitData(unitData).subscribe(
          (response) => {
            this.loader.stop();
            console.log('Successfully created unit data:', response);
            this.dialog.open(DialogMsgComponent, {
              data: {
                isSuccess: true,
                message: 'Unit data created successfully!',
                routerLink: '/property/home/view-scheme'
              }
            });
          },
          (error) => {
            this.loader.stop();
            console.error('Error creating unit data:', error);
            this.openDialog(false, 'Error creating unit data. Please try again later.');
          }
        );
      }
    });

  }

  onUpdate() {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure you want to update this Unit?',
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
        const unitData = {
          ...this.UnitFormGroup.value,
          ...this.sfsFormGroup.value,
          n_SCHEME_ID: this.schemeId,
          n_ID: this.id
        };
        console.log(unitData)
        this.http.createUnitData(unitData).subscribe(
          (response) => {
            this.loader.stop();
            console.log('Successfully updated unit data:', response);
            this.dialog.open(DialogMsgComponent, {
              data: {
                isSuccess: true,
                message: 'Unit data updated successfully!',
                routerLink: '/property/home/view-scheme'
              }
            });
          },
          (error) => {
            this.loader.stop();
            console.error('Error creating unit data:', error);
            this.openDialog(false, 'Error creating unit data. Please try again later.');
          }
        );
      }
    });

  }

  fetchDataById() {
    this.subscription = this.http.viewUnitData(this.id)
      .subscribe((response) => {
        const data = response.data;

        this.UnitFormGroup.patchValue({
          v_UNIT_AC_NO: data.v_UNIT_AC_NO,
          v_UNIT_NO: data.v_UNIT_NO,
          v_BLOCK_NO: data.v_BLOCK_NO,
          v_FLOOR_NO: data.v_FLOOR_NO,
          gdq: data.gdq,
          v_RESERVATION_CATEGORY: data.v_RESERVATION_CATEGORY,
          v_PRIORITY: data.v_PRIORITY,
          v_UNIT_ALLOTTED_STATUS: data.v_UNIT_ALLOTTED_STATUS,
          v_CATEGORY: data.v_CATEGORY,
          v_DATE_OF_ALLOTMENT: data.v_DATE_OF_ALLOTMENT,
          v_UNIT_COST: data.v_UNIT_COST,
          v_FREEZED_DATE: data.v_FREEZED_DATE,
          v_INITIAL_DEPOSIT: data.v_INITIAL_DEPOSIT,
          v_EMI: data.v_EMI,
          v_EMI_START_DATE: data.v_EMI_START_DATE,
          v_UNIT_READY_DATE: data.v_UNIT_READY_DATE,
          v_ID_DUE_DATE_HP: data.v_ID_DUE_DATE_HP,
          v_SF_LOAN_SG: data.v_SF_LOAN_SG,
          v_AB_ISSUED_DATE: data.v_AB_ISSUED_DATE,
          v_LOAN_SANC_DATE: data.v_LOAN_SANC_DATE,
          v_UNIT_HANDING_OVER: data.v_UNIT_HANDING_OVER,
          v_PLOT_HANDING_OVER: data.v_PLOT_HANDING_OVER,
          v_ACTUAL_EXTENT: data.v_ACTUAL_EXTENT,
          v_ROAD_FACING: data.v_ROAD_FACING,
          v_CORNER_PLOT_STATUS: data.v_CORNER_PLOT_STATUS,
          v_DOOR_FACING: data.v_DOOR_FACING,
          v_LIVE_STATUS: data.v_LIVE_STATUS,
          v_RIPED_STATUS: data.v_RIPED_STATUS,
          v_FC_PAID_STATUS: data.v_FC_PAID_STATUS,
          v_DRAFT_DEED_ISSUED_ON: data.v_DRAFT_DEED_ISSUED_ON,
          v_FC_PAID_BUT_SALE_DEED_NOT_ISSUED: data.v_FC_PAID_BUT_SALE_DEED_NOT_ISSUED,
          v_RIPED_BUT_COST_NOT_FULLY_PAID: data.v_RIPED_BUT_COST_NOT_FULLY_PAID,
          v_SALE_DEED_STATUS: data.v_SALE_DEED_STATUS,
          v_SALE_DEED_DATE: data.v_SALE_DEED_DATE

        });
        this.sfsFormGroup.patchValue({
          v_UNIT_AC_NO: data.v_UNIT_AC_NO,
          v_1ST_AMOUNT_DUE: data.v_1ST_AMOUNT_DUE,
          v_1ST_AMOUNT_DUE_DATE: data.v_1ST_AMOUNT_DUE_DATE,
          v_2ST_AMOUNT_DUE: data.v_2ST_AMOUNT_DUE,
          v_2ND_AMOUNT_DUE_DATE: data.v_2ND_AMOUNT_DUE_DATE,
          v_3RD_AMOUNT_DUE: data.v_3RD_AMOUNT_DUE,
          v_3RD_AMOUNT_DUE_DATE: data.v_3RD_AMOUNT_DUE_DATE,
          v_4TH_AMOUNT_DUE: data.v_4TH_AMOUNT_DUE,
          v_4TH_AMOUNT_DUE_DATE: data.v_4TH_AMOUNT_DUE_DATE,
          v_5TH_AMOUNT_DUE: data.v_5TH_AMOUNT_DUE,
          v_5TH_AMOUNT_DUE_DATE: data.v_5TH_AMOUNT_DUE_DATE,
          v_6TH_AMOUNT_DUE: data.v_6TH_AMOUNT_DUE,
          v_6TH_AMOUNT_DUE_DATE: data.v_7TH_AMOUNT_DUE,
          v_7TH_AMOUNT_DUE: data.v_7TH_AMOUNT_DUE,
          v_7TH_AMOUNT_DUE_DATE: data.v_7TH_AMOUNT_DUE_DATE,
          v_8TH_AMOUNT_DUE: data.v_8TH_AMOUNT_DUE,
          v_8TH_AMOUNT_DUE_DATE: data.v_8TH_AMOUNT_DUE_DATE,
          v_9TH_AMOUNT_DUE: data.v_9TH_AMOUNT_DUE,
          v_9TH_AMOUNT_DUE_DATE: data.v_9TH_AMOUNT_DUE_DATE,
          v_10TH_AMOUNT_DUE: data.v_10TH_AMOUNT_DUE,
          v_10TH_AMOUNT_DUE_DATE: data.v_10TH_AMOUNT_DUE_DATE,
          v_11TH_AMOUNT_DUE: data.v_11TH_AMOUNT_DUE,
          v_11TH_AMOUNT_DUE_DATE: data.v_11TH_AMOUNT_DUE_DATE,
          v_12TH_AMOUNT_DUE: data.v_12TH_AMOUNT_DUE,
          v_12TH_AMOUNT_DUE_DATE: data.v_12TH_AMOUNT_DUE_DATE,
          v_13TH_AMOUNT_DUE: data.v_13TH_AMOUNT_DUE,
          v_13TH_AMOUNT_DUE_DATE: data.v_13TH_AMOUNT_DUE_DATE
        });
      });
  }

  openDialog(isSuccess: boolean, message: string) {
    const dialogRef = this.dialog.open(DialogMsgComponent, {
      width: '400px',
      data: { isSuccess, message }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}