import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
empForm:FormGroup;

  job:String[]=[
  'Manager',
  'Analyste',
  'Developper',
  'programmer',
  'Consultant BI'
  ];

  constructor(private _fb:FormBuilder, 
    private _empservice:EmployeeService,
    private _dialogRef:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreservice:CoreService
    ) { 
    this.empForm=this._fb.group({
      fullName:'',
      email:'',
      gender:'',
      job:'',
      phone:'',

    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  onSubmitForm(){

    if(this.empForm.valid){
      if (this.data) {
        this._empservice
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
             
              this._coreservice.openSnackBar('employee updated ')
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });

      } else{
      this._empservice.addEmployee(this.empForm.value).subscribe({
        next:(val:any) => {
         
          this._coreservice.openSnackBar('employee added succefully ')
          this._dialogRef.close(true);

        },
        error:(err:any)=>{
          console.error(err);
        }
      });
    }
  }}

}
