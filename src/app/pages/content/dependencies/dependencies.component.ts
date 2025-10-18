import { Component } from '@angular/core';

@Component({
  selector: 'app-dependencies',
  standalone: true,
  imports: [], // add CommonModule here later if you start using *ngIf/*ngFor
  templateUrl: './dependencies.component.html',
  styleUrls: ['./dependencies.component.css']
})
export class DependenciesComponent { }