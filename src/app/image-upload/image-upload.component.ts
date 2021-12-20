import { FileHandle } from './../file-handle';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent implements OnInit {
  uploadedFiles: FileHandle[] = [];

  count: number = 0;

  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit(): void {}

  filesDropped(files: FileHandle[]) {
    if (files.length > 0) {
      files.forEach((element) => {
        this.uploadedFiles.push(element);
      });
    }
  }

  addAttachment(i: number, files: any) {
    const file = files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    this.uploadedFiles[i] = {
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

  onDelete(i: number) {
    this.uploadedFiles.splice(i,1);
  }
}
