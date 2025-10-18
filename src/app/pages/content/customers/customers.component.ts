// src/app/pages/content/customers-grid/customers.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersService, Customer } from 'src/app/services/customers.service';
import { HttpClientModule } from '@angular/common/http';   // 👈 add

interface MeResponse {
  name?: string;
  email?: string;
  username?: string;
  claims?: any;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, HttpClientModule],               // 👈 add
  templateUrl: './customers.component.html',
  styles: [`
    .table-wrap { min-height: 60vh; }
    .badge-dot { width: .5rem; height: .5rem; border-radius: 50%; display: inline-block; margin-right: .4rem; }
  `]
})
export class CustomersComponent implements OnInit {
  loading = false;
  error = '';
  customers: Customer[] = [];
  me?: MeResponse;

  constructor(private api: CustomersService) { }

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  async reload(): Promise<void> {
    this.loading = true;
    this.error = '';

    try {
      // Give TS concrete types for the two promises
      const custsPromise = this.api.getCustomers() as Promise<Customer[]>;
      //const mePromise = this.api.getMe() as Promise<MeResponse>;

      // const [custs, me] = await Promise.allSettled([custsPromise, mePromise]);
      const [custs] = await Promise.allSettled([custsPromise]);

      if (custs.status === 'fulfilled') {
        this.customers = custs.value;
      } else {
        throw custs.reason;
      }

      // if (me.status === 'fulfilled') {
      //   // Narrow to our interface so properties are known
      //   const v = me.value as MeResponse;
      //   this.me = { name: v.name, email: v.email, username: v.username };
      // } else {
      //   // /api/me might be protected; that's fine—just omit the header blurb
      //   this.me = undefined;
      // }
    } catch (e) {
      console.error(e);
      this.error = 'Failed to load customers.';
    } finally {
      this.loading = false;
    }
  }

  fmtDate(iso: string): string {
    const d = new Date(iso + 'T00:00:00');
    return isNaN(d.getTime()) ? iso : d.toLocaleDateString();
  }
}
