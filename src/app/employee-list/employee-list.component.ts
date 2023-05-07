import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] | undefined;

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    // this.employees = [{
    //   "id": 1,
    //   "firstName": "Luu Van",
    //   "lastName": "Nhat",
    //   "emailId": "vanluunhat@gmail.com"
    // },
    // {
    //   "id": 2,
    //   "firstName": "Vi Thuy",
    //   "lastName": "Duong",
    //   "emailId": "vithuyduong@gmail.com"
    // }];

    this.getEmployees();

  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  updateEmployee(id: number | undefined) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number | undefined) {
    if (confirm('Bạn có chắc chắn muốn xoá?')) {
      this.employeeService.deleteEmployee(id!).subscribe(data => {
        this.getEmployees();
      });
      this.toastr.success('Đã xoá!');
    }
  }

}
