import { Injectable } from "@angular/core";
import { Data } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class SessionStorageServiceService {
  constructor() {}

  getValue(naam, calorien, ingredienten, tijd) {
    return localStorage.getItem(naam);
  }

  getAll() {
    var alles: Array<Data> = [];
    for (let ind = 0; ind < localStorage.length; ind++) {
      let key = localStorage.key(ind);
      let value: Data;
      value = { key: key, value: JSON.parse(localStorage.getItem(key)) };

      alles.push(value);
    }

    return alles.sort();
  }

  setValue(naam, calorien, ingredienten, tijd) {
    localStorage.setItem(
      naam,
      JSON.stringify({
        calorien: calorien,
        ingredienten: ingredienten,
        tijd: tijd
      })
    );
  }
}
