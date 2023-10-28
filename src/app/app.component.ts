import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-app';
  displayedColumns: string[] = [
    'id',
    'fullName',
      'email',
      'gender',
      'job',
      'phone',
      'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog, private _empservice:EmployeeService,
    private _coreservice:CoreService ,
    ){}

  openAddEditEmpForm(){
   const dialogRef = this._dialog.open(EmpAddEditComponent);
   dialogRef.afterClosed().subscribe({
     next :(val) =>{
       if(val){
         this.getEmployeesList();
       }
     }
   })
  }

  ngOnInit():void{
    this.getEmployeesList();
  }

  getEmployeesList(){
    this._empservice.getEmployeeList().subscribe({
      next:(res) => {
       this.dataSource=new MatTableDataSource(res);
       this.dataSource.sort=this.sort;
       this.dataSource.paginator=this.paginator;
      },
      error:console.log,
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:number){
    const dialogRef = this._dialog.open(DialogComponent, {
      height:'200px',
      data:
      ['Delete employee','Are you sure to delete this employee?']
    });

    dialogRef.afterClosed().subscribe({
      next:(result:boolean) => {
        if(result){
          this._empservice.deleteEmployee(id).subscribe({
            next:(res) => {
            this._coreservice.openSnackBar('Employee deleted','Done');
            this.getEmployeesList();
      
            },
            error:console.log,
          });
        }
      }
      });
  }
  

  
  openEditForm(data:any){
    const dialogRef =this._dialog.open(EmpAddEditComponent , {
     data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeesList();
        }
      },
    });
  }


  openDialog() {
    this._dialog.open(DialogComponent, {
      width:'40%'
      
    });
  }
}
