import { Component } from "@angular/core";
import { LoaderService } from "./services/loader.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public loader$: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    // this.loader$ = loaderService.loader$;
  }

  title = "app";
}
