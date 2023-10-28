import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/employees'; // Replace with your back-end API URL

  constructor(private http: HttpClient) { }


  getEmployeeList():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  getEmployeeById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: any):Observable<any>{
    return this.http.post(this.apiUrl,employee);
  }

  updateEmployee(id: number, updatedEmployee: any) {
    return this.http.put(`${this.apiUrl}/${id}`, updatedEmployee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}