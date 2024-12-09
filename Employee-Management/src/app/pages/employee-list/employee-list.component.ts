import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../../services/employee.service';
import { Employee } from '../../models/employee.models';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchText = '';
  selectedName = '';
  selectedCompany = '';
  selectedDesignation = '';
  selectedEmail = '';
  showPopup = false;
  showDeletePopup = false;
  popupContent = '';
  employeeToDeleteIndex: number | null = null;
  editEmployeeData: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  get uniqueNames() {
    return [...new Set(this.employees.map(employee => employee.name))];
  }

  get uniqueCompanies() {
    return [...new Set(this.employees.map(employee => employee.company))];
  }

  get uniqueDesignations() {
    return [...new Set(this.employees.map(employee => employee.designation))];
  }

  get uniqueEmails() {
    return [...new Set(this.employees.map(employee => employee.email))];
  }

  confirmDelete(index: number): void {
    this.employeeToDeleteIndex = index;
    this.popupContent = 'Are you sure you want to delete this employee?';
    this.showDeletePopup = true;
  }

  onDeleteConfirmed(): void {
    if (this.employeeToDeleteIndex !== null) {
      this.employeeService.deleteEmployee(this.employeeToDeleteIndex);
      this.employeeToDeleteIndex = null;
    }
    this.showDeletePopup = false;
  }

  onPopupClose(): void {
    this.showPopup = false;
    this.showDeletePopup = false;
    this.employeeToDeleteIndex = null;
  }

  openEditPopup(employee: Employee): void {
    this.editEmployeeData = employee;
    this.editEmployeeData.isEdit = true;
    this.showPopup = true;
  }

  openAddPopup(): void {
    this.editEmployeeData = null;
    this.showPopup = true;
  }
}
