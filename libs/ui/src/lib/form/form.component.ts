import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Video } from '@video-manager/core-data';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'video-manager-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {

  form: FormGroup;

  @Input() selected: Video;
  @Output() saveVideo = new EventEmitter<Video>();
  @Output() deleteVideo = new EventEmitter<Video>();
  @Output() resett = new EventEmitter();

  constructor() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.selected ) {
      this.buildForm();
    }
  }

  submit() {
    if(this.form.valid) {
      this.saveVideo.emit({...this.selected, ...this.form.value});
      this.form.reset();
    }
  }

  buildForm() {
    if ( this.selected && this.selected.id ) {
      this.form = new FormGroup({
        title: new FormControl(this.selected.title),
        description: new FormControl(this.selected.description),
      });
    } else {
      this.form = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
      });
    }
  }

  onCancel() {
    this.form.reset();
    this.resett.emit();
  }

}
