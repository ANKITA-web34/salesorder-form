import { FileHandle } from './../file-handle';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragMove,
  moveItemInArray,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent implements OnInit {
  // uploadedFiles: FileHandle[] = [];

  count: number = 0;

  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit(): void {}

  public items: FileHandle[] = [];;

  @ViewChild('dropListContainer') dropListContainer?: ElementRef;

  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };

  /* For rearreng the images */

  dragEntered(event: CdkDragEnter<number>) {

    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;

    this.dragDropInfo = { dragIndex, dropIndex };

    const phContainer = dropList.element.nativeElement;
    const phElement = phContainer.querySelector('.cdk-drag-placeholder');

    if (phElement) {
      phContainer.removeChild(phElement);
      phContainer.parentElement?.insertBefore(phElement, phContainer);
      moveItemInArray(this.items, dragIndex, dropIndex);
    }
  }

  dragMoved(event: CdkDragMove<number>) {
    console.log(event);
    if (!this.dropListContainer || !this.dragDropInfo) return;

    const placeholderElement =
      this.dropListContainer.nativeElement.querySelector(
        '.cdk-drag-placeholder'
      );

    const receiverElement =
      this.dragDropInfo.dragIndex > this.dragDropInfo.dropIndex
        ? placeholderElement?.nextElementSibling
        : placeholderElement?.previousElementSibling;

    if (!receiverElement) {
      return;
    }

    receiverElement.style.display = 'none';
    this.dropListReceiverElement = receiverElement;
  }

  dragDropped(event: CdkDragDrop<number>) {
    if (!this.dropListReceiverElement) {
      return;
    }

    this.dropListReceiverElement.style.removeProperty('display');
    this.dropListReceiverElement = undefined;
    this.dragDropInfo = undefined;
  }
  

  /***************************************************************/
  /* For Drag and Drop Functionality */

  filesDropped(files: FileHandle[]) {
    if (files.length > 0) {
      files.forEach((element) => {
        this.items.push(element);
      });
    }
  }

  addAttachment(i: number, files: any) {
    const file = files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    this.items[i] = {
      file,
      url,
    };
  }

  handleClick(i: number) {    
    const uploadImg = document.getElementById('upload-file');
    uploadImg.click();

    uploadImg.addEventListener(
      'change',
      (e) => {
        ++this.count;
        const index = this.count === 2 ? i : -1;
        if (index > -1) {
          //@ts-ignore
          const files = e.target.files;
          this.addAttachment(i, files);
          this.count = 0;
        }
      },
      {
        once: true,
      }
    );
  }
  onDragContainerClick() {
    console.log("called on drag container")
    const uploadImg = document.getElementById('drag-file-upload');
    uploadImg.click();
  }

  onDelete(i: number) {
    this.items.splice(i,1);
  }
}
