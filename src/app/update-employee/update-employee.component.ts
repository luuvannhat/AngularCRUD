import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  myForm: FormGroup;
  id!: number;
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
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
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data.data;
    }, error => console.log(error));
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
    try {
      this.openSuccessSnackBar();
      this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => {
        this.goToEmployeeList();
      });

    } catch (error) {
      this.openFailSnackBar();
    }
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
