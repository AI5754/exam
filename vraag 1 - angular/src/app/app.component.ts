import { Component } from "@angular/core";
import { SessionStorageServiceService } from "./session-storage-service.service";
import { Data } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "eightball";
  //curAnswer = "";
  //curQuestion;
  naam;
  calorien;
  ingredienten;
  tijd;
  recepten: Array<Data> = [];

  constructor(private sessionStorageService: SessionStorageServiceService) {
    this.recepten = this.sessionStorageService.getAll();
  }

  getRecept(red) {
    return (
      "naam: " +
      red.key +
      "    ingrediënten: " +
      red.value.ingredienten +
      "    caloriën: " +
      red.value.calorien +
      "    tijd: " +
      red.value.tijd
    );
  }

  giveAnswer() {
    let found = this.sessionStorageService.getValue(
      this.naam,
      this.calorien,
      this.ingredienten,
      this.tijd
    );
    if (found) {
      console.log("old");
    } else {
      console.log("new");
      //let randomInd = this.randomInt(0, this.possibleAnswers.length - 1);
      //this.curAnswer = this.possibleAnswers[randomInd];
      this.sessionStorageService.setValue(
        this.naam,
        this.calorien,
        this.ingredienten,
        this.tijd
      );
    }

    this.recepten = this.sessionStorageService.getAll();
    console.log(this.recepten);
  }
  /*
  randomInt(min, max) {
    console.log(Math.floor(Math.random() * (max - min + 1)) + min);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }*/
}
