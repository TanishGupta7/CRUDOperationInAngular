import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,MatFormFieldModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
     formBuilder = inject(FormBuilder);
     httpService = inject(HttpService);
     router = inject(Router);
     //injected active route
     route = inject(ActivatedRoute);
     //injected toastr
     toastr = inject(ToastrService);

     employeeForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      phone: ['',[]],
      age: [0 ,[Validators.required]],
      salary: [0 ,[Validators.required]]
     });
     employeeId!:number;

     //Set a flag isEdit to show values in case of Update..!!!
     isEdit = false;
    ngOnInit(){
        this.employeeId = this.route.snapshot.params['id'];
       if(this.employeeId)
        {
          this.isEdit = true;
          this.httpService.getEmployee(this.employeeId).subscribe(result=>{
            console.log(result);
            this.employeeForm.patchValue(result);
            this.employeeForm.controls.email.disable();
          })
        }
    }
     save()
     {
        console.clear();
        const employee : IEmployee={
          name : this.employeeForm.value.name!,
          email : this.employeeForm.value.email!,
          phone : this.employeeForm.value.phone!,
          age : this.employeeForm.value.age!,
          salary : this.employeeForm.value.salary!,
        };
        if(this.isEdit)
          {
            this.httpService.updateEmployee(this.employeeId,employee).subscribe(()=>{
            console.log("SUCCESS!!");
            this.toastr.success("Record Updated successfully..!!");
            this.router.navigateByUrl("/employee-list");
            });
          }
          else
          {
            console.log(this.employeeForm.value);
            this.httpService.createEmployee(employee).subscribe(()=>{
            console.log("SUCCESS!!");
            this.toastr.success("User Added successfully..!!");
            this.router.navigateByUrl("/employee-list");
            });
          }
     }
}

