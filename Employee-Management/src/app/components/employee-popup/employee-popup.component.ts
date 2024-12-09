import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee, DESIGNATIONS , AVATARS} from '../../models/employee.models';
import {EmployeeService} from './../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-popup',
  templateUrl: './employee-popup.component.html',
  styleUrls: ['./employee-popup.component.css']
})
export class EmployeePopupComponent {
  @Input() employee: Employee | null = null;
  @Output() close = new EventEmitter<void>();

  designations = DESIGNATIONS;
  avatars = AVATARS;

  form!: FormGroup;
  formData: Employee = {
    name: '',
    company: '',
    email: '',
    contact: '',
    designation: '',
    profilePicture: ''
  };
  constructor(private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}
  ngOnChanges(): void {
    if (this.employee) {
      this.formData = { ...this.employee };
      this.form = this.fb.group({
        name: [ this.formData.name , [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
        company: [this.formData.company, [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Za-z]+$/)]],
        email: [{ value: this.formData.email, disabled: this.employee.isEdit ? true : false }, [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
        contact: [this.formData.contact, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        designation: [this.formData.designation , Validators.required]
      });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
        company: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Za-z]+$/)]],
        email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
        contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        designation: ['', Validators.required]
      });
    }
  }
  ngOnInit() {
  }

  save(): void {
    if (this.form.valid) {
      let employeeData = {
        ...this.form.getRawValue(),
        profilePicture : this.formData.profilePicture
      }
      if(this.formData.isEdit) {
        this.employeeService.editEmployee(employeeData);
      } else {
        this.employeeService.addEmployee(employeeData);
      }
    this.close.emit();
    }
  }

  cancel(): void {
    this.close.emit();
  }
}
