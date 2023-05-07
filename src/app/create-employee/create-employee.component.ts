import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  myForm: FormGroup;

  employee: Employee = new Employee();
  employee_ck: Employee[] | undefined;
  kt: boolean | undefined;
  index: number | undefined;

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      emailId: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {

  }
  saveEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe(data => {
      console.log(data);
      this.goToEmployeeList();

    },
      error => {
        console.error(error)
      });
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  openSuccessSnackBar() {
    this.snackBar.open('Thành công!', 'Đóng', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['snackbar-success']
    });
  }

  openFailSnackBar() {
    this.snackBar.open('Thất bại!', 'Đóng', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['snackbar-fail']
    });
  }
  onSubmit() {
    console.log(this.employee);
    console.log(this.kt);
    if (this.employee.firstName === '' || this.employee.lastName === '' || this.employee.emailId === '') {
      this.openFailSnackBar();
    }
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employee_ck = data;
    })

    this.index = this.employee_ck?.findIndex(
      employee => employee.firstName === this.employee.firstName
        && employee.lastName === this.employee.lastName);

    if (this.index == undefined || this.index !== -1) {
      this.kt = true;
    } else {
      this.kt = false;
    }

    if (this.kt == true) {
      this.openSuccessSnackBar();
    } else {
      this.openFailSnackBar();
    }

    this.saveEmployee();
  }

}
