import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from './interfaces/employee';
import { RouteReuseStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = "https://localhost:44338";
  http = inject(HttpClient)
  constructor() { }

  getAllEmployee(){
   return this.http.get<IEmployee[]>(this.apiUrl+"/api/Employees");
  }

  createEmployee(employee:IEmployee)
  {
    return this.http.post(this.apiUrl+"/api/Employees", employee);
  }
  getEmployee(employeeId:number)
  {
    return this.http.get<IEmployee>(this.apiUrl + '/api/Employees/'+employeeId);
  }
  updateEmployee(employeeId:number,employee:IEmployee)
  {
    return this.http.put<IEmployee>(this.apiUrl + '/api/Employees/'+employeeId,employee);
  }
  deleteEmployee(employeeId:number)
  {
    return this.http.delete(this.apiUrl + '/api/Employees/'+employeeId);
  }
}