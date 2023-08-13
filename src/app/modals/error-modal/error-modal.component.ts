import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements AfterViewInit {
  @Input() errorMessage = '';
  @ViewChild('myModal') myModalElement!: ElementRef;
  myModal: bootstrap.Modal | undefined;
  _show = false;
  @Output() closed: EventEmitter<any> = new EventEmitter()

  get show(): boolean {
    return this._show;
  }

  @Input() set show(value: boolean) {
    this._show = value;
    if (this.show) {
      this.myModal?.show();
    }
  }
  
  ngAfterViewInit(): void {
    this.myModal = new bootstrap.Modal(this.myModalElement.nativeElement);
    this.myModal.show();
    this.myModalElement.nativeElement.addEventListener('hidden.bs.modal', (event: any) => {
      this.closed.emit();
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
