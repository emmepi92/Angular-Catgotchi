import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges {
  @Input() openModal: boolean = false;
  @ViewChild('modal') modal!: ElementRef;
  @Output() restartGame = new EventEmitter();
  @Output() showButtonRestart = new EventEmitter();

  ngOnChanges(): void {
    if (this.openModal) {
      this.modal.nativeElement.click();
    }    
  }

  restart() {
    this.restartGame.emit()
  }

  closeModal() {
    this.showButtonRestart.emit();
  }

}
