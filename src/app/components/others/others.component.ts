import { Component, OnInit } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { FieldsService } from "../../services/fields.service";

import { Fields } from "../../models/fields";

@Component({
  selector: "mv-others",
  templateUrl: "./others.component.html",
  viewProviders: [
  {
    provide: ControlContainer,
    useExisting: NgForm,
  },
  ],
})

export class OthersComponent implements OnInit {
  public fields;

  constructor(private fieldsService: FieldsService) {
    //
  }

  public ngOnInit(): void {
    this.fields = this.fieldsService.getData();
  }

  public trackByFn(index, item) {
    const self = this;

    return item.id; // or index
  }

}
