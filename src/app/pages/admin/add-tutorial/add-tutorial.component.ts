import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = {
    id : '',
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
    };
    this.tutorialService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          alert("Tutorial saved.");
        },
        error => {
          console.log(error);
          alert("Save unsuccessful.");
        });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      id: '',
      title: '',
      description: '',
      published: false
    };
  }

  // Optional: if you want Cancel to clear the form and model
  cancel(form?: any): void {
    if (form?.reset) {
      form.reset(); // clears validation state
    }
    // Clear your model as needed
    this.tutorial = { title: '', description: '', published: false };
    // Or navigate away instead:
    // this.router.navigateByUrl('/tutorials');
  }

}
