import { Pipe, PipeTransform } from '@angular/core';
import {ApplicationFileModel} from "../api-models/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";

@Pipe({
  name: 'secureImage'
})
export class SecureImagePipe implements PipeTransform{
  constructor(private httpClient: HttpClient) {
  }

  async transform(file: ApplicationFileModel | null): Promise<string> {
    // console.log(file)
    if (!file || !this.isImage(file)) {
      return new Promise(resolve => {
        resolve('/assets/person.jpg');
      });
    }

    const imageBlob = await this.getSecureFile(file).toPromise();
    const reader = new FileReader();
    return new Promise(resolve => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageBlob);
    });
  }

  isImage(file: ApplicationFileModel): boolean {
    return file.contentType.startsWith('image/');
  }

  getSecureFile(file: ApplicationFileModel): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}file/${file.id}`, {responseType: 'blob'});
  }
}
