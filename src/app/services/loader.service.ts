import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  private loaderSource = new BehaviorSubject(false);

  loader$ = this.loaderSource.asObservable();

  isLoading(flag: boolean) {
    this.loaderSource.next(flag);
  }
}
