import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.models';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private localStorageKey = 'employeeData';
  private employeeSubject: BehaviorSubject<any[]>;
  constructor() {
    const data = localStorage.getItem(this.localStorageKey);
    const employees = data ? JSON.parse(data) : [];
    this.employeeSubject = new BehaviorSubject<any[]>(employees);
  }

  getEmployees(): Observable<any[]> {
    return this.employeeSubject.asObservable();
  }

  addEmployee(employee: Employee): void {
    const employees = [...this.employeeSubject.value, employee];
    this.updateLocalStorage(employees);
  }

  editEmployee(updatedEmployee: Employee): void {
    const employees = [...this.employeeSubject.value];
    const index = employees.findIndex(emp => emp.email === updatedEmployee.email);
  
    if (index !== -1) {
      employees[index] = updatedEmployee;
      this.updateLocalStorage(employees);
    } else {
      console.error('Employee not found');
    }
  }

  deleteEmployee(index: number): void {
    const employees = [...this.employeeSubject.value];
    employees.splice(index, 1);
    this.updateLocalStorage(employees);
  }

  private updateLocalStorage(employees: Employee[]): void {
    this.employeeSubject.next(employees);
    localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
  }
}