import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';

type ClaimRow = { key: string; value: string };

@Component({
  selector: 'app-view-claims',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-claims.component.html',
  styles: [`
    .claims-viewport { min-height: 60vh; }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
    .word-wrap { word-break: break-word; overflow-wrap: anywhere; }
  `]
})
export class ViewClaimsComponent implements OnInit {
  loading = false;
  error = '';
  rawToken = '';

  claimRows: ClaimRow[] = [];
  summaryRows: ClaimRow[] = [];
  roleRows: ClaimRow[] = [];

  constructor(private kc: KeycloakService) { }

  async ngOnInit(): Promise<void> {
    await this.reload();
  }

  async reload(): Promise<void> {
    this.loading = true;
    this.error = '';
    this.claimRows = [];
    this.summaryRows = [];
    this.roleRows = [];
    this.rawToken = '';

    try {
      const isAuth = await this.kc.isLoggedIn();
      if (!isAuth) {
        this.error = 'You are not logged in.';
        return;
      }

      // Refresh if expiring soon
      await this.kc.updateToken(60);

      // Access token string
      const token = await this.kc.getToken();
      this.rawToken = token ?? '';

      if (!token) {
        this.error = 'No access token available.';
        return;
      }

      // Decode payload
      const payload = this.decodeJwtPayload(token);

      // Build UI rows
      this.summaryRows = this.buildSummaryRows(payload);
      this.roleRows = this.buildRoleRows(payload);
      this.claimRows = this.buildAllRows(payload);
    } catch (e) {
      console.error(e);
      this.error = 'Failed to decode token.';
    } finally {
      this.loading = false;
    }
  }

  copyToken(): void {
    if (!this.rawToken) return;
    navigator.clipboard?.writeText(this.rawToken).catch(() => { });
  }

  // ---- helpers ----
  private decodeJwtPayload(jwt: string): any {
    const parts = jwt.split('.');
    if (parts.length !== 3) throw new Error('Invalid JWT');
    const json = this.base64UrlDecode(parts[1]);
    return JSON.parse(json);
  }

  private base64UrlDecode(seg: string): string {
    const pad = seg.length % 4 === 2 ? '==' : seg.length % 4 === 3 ? '=' : seg.length % 4 === 1 ? '===' : '';
    const b64 = seg.replace(/-/g, '+').replace(/_/g, '/') + pad;
    return decodeURIComponent(
      Array.prototype.map.call(atob(b64), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
  }

  private asStr(v: any): string {
    if (v == null) return '';
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return String(v);
    try { return JSON.stringify(v, null, 2); } catch { return String(v); }
  }

  private secToLocal(sec?: number): string {
    if (!sec && sec !== 0) return '';
    const d = new Date(sec * 1000);
    return isNaN(d.getTime()) ? String(sec) : d.toLocaleString();
  }

  private buildSummaryRows(p: any): ClaimRow[] {
    const rows: ClaimRow[] = [];
    rows.push({ key: 'sub', value: this.asStr(p?.sub) });
    rows.push({ key: 'preferred_username', value: this.asStr(p?.preferred_username) });
    rows.push({ key: 'email', value: this.asStr(p?.email) });
    rows.push({ key: 'aud', value: this.asStr(p?.aud) });
    rows.push({ key: 'iss', value: this.asStr(p?.iss) });
    rows.push({ key: 'iat (issued)', value: this.secToLocal(p?.iat) });
    rows.push({ key: 'exp (expires)', value: this.secToLocal(p?.exp) });
    return rows.filter(r => r.value);
  }

  private buildRoleRows(p: any): ClaimRow[] {
    const rows: ClaimRow[] = [];
    const realmRoles = p?.realm_access?.roles ?? [];
    if (Array.isArray(realmRoles) && realmRoles.length) {
      rows.push({ key: 'Realm roles', value: realmRoles.join(', ') });
    }
    const resourceAccess = p?.resource_access ?? {};
    Object.keys(resourceAccess).forEach(clientId => {
      const roles = resourceAccess[clientId]?.roles ?? [];
      if (Array.isArray(roles) && roles.length) {
        rows.push({ key: `Client ${clientId}`, value: roles.join(', ') });
      }
    });
    return rows;
  }

  private buildAllRows(p: any): ClaimRow[] {
    const rows: ClaimRow[] = [];
    Object.keys(p).sort().forEach(k => {
      const v = p[k];
      if (k === 'realm_access' || k === 'resource_access') {
        rows.push({ key: k, value: this.asStr(v) });
      } else if (k === 'iat' || k === 'exp' || k === 'auth_time') {
        rows.push({ key: k, value: `${p[k]} (${this.secToLocal(p[k])})` });
      } else {
        rows.push({ key: k, value: this.asStr(v) });
      }
    });
    return rows;
  }
}
