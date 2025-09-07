import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Report {
  id: number;
  name: string;
  createdAt: string;   // ISO date strings for demo
  updatedAt: string;
  owner: string;
  form: string;
}

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private readonly mock: Report[] = [
    { id: 1, name: 'Monthly Sales 1', createdAt: '2025-07-01', updatedAt: '2025-09-01', owner: 'Alex', form: 'Sales Form' },
    { id: 2, name: 'Customer Feedback 2', createdAt: '2025-08-12', updatedAt: '2025-09-03', owner: 'Sam', form: 'Feedback Form' },
    { id: 3, name: 'Inventory Snapshot 3', createdAt: '2025-06-22', updatedAt: '2025-08-30', owner: 'Kim', form: 'Inventory Form' },
    { id: 4, name: 'Technician Hours 4', createdAt: '2025-07-15', updatedAt: '2025-08-28', owner: 'Lee', form: 'Timesheet' },
    { id: 5, name: 'Weekly Ops 5', createdAt: '2025-08-01', updatedAt: '2025-09-02', owner: 'Jordan', form: 'Ops Form' },
    { id: 6, name: 'Quarterly KPIs 6', createdAt: '2025-05-01', updatedAt: '2025-08-15', owner: 'Taylor', form: 'KPI Form' },
    { id: 7, name: 'Asset Health 7', createdAt: '2025-06-09', updatedAt: '2025-08-22', owner: 'Aisha', form: 'Assets' },
    { id: 8, name: 'Compliance Audit 8', createdAt: '2025-04-20', updatedAt: '2025-07-31', owner: 'Ravi', form: 'Audit' },
    { id: 9, name: 'Route Efficiency 9', createdAt: '2025-07-04', updatedAt: '2025-09-01', owner: 'Zee', form: 'Routes' },
    { id:10, name: 'Tickets Aging 10', createdAt: '2025-08-07', updatedAt: '2025-09-01', owner: 'Nora', form: 'Support' },
    // add more to test pagination
  ];

  list(): Observable<Report[]> {
    // simulate API delay
    return of(this.mock).pipe(delay(300));
    // In real app: return this.http.get<Report[]>('/api/reports');
  }
}
