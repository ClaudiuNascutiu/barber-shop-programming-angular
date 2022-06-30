import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timestamp } from 'rxjs';
import { AppointmentDTO } from 'src/app/appointment/appointmentDTO/appointmentDTO';
import { AppointmentCreateDTO } from 'src/app/appointment/appointmentDTO/createAppointmentDTO';
import { HairdresserDTO } from 'src/app/hairdresser/hairdresserDTO/hairdresserDTO';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  httpClient: HttpClient;

  constructor(client: HttpClient, private userService: UserService) {
    this.httpClient = client;
  }

  createAppointment(createAppointmentDTO: AppointmentCreateDTO): Observable<any> {
    return this.httpClient.post("api/appointment", createAppointmentDTO);
  }

  getAvailableSlots(hairdresserId: number, day: Date): Observable<any> {
    let queryParams = new HttpParams();
    queryParams.append("id", hairdresserId)
    queryParams.append("day", day.toString())
    return this.httpClient.get("api/appointment/available-slots", { params: queryParams })
  }

  getAllAppointmentsByClientId(): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        id: this.userService.getUser()?.id
      }
    });
    return this.httpClient.get("api/appointment/client", { params: params })
  }

  getAllAppointmentsByHairdresserId(): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        id: this.userService.getUser()?.id
      }
    });
    return this.httpClient.get("api/appointment/hairdresser", {params:params});
  }

  deleteAllAppointmentByClientId(): Observable<any> {
    let params = new HttpParams({
      fromObject: {
        id: this.userService.getUser()?.id
      }
    });
    return this.httpClient.delete("/api/appointment/deleteAll", { params: params })
  }

  deleteAppointmentById(appointment: AppointmentDTO): Observable<any>{
    const url = '/api/appointment/${appointment.id}'
    return this.httpClient.delete(url)
  }

}
