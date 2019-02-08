import { Component, OnInit } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { FieldsService } from "../../services/fields.service";

import { Fields } from "../../models/fields";

@Component({
  selector: "mv-teams",
  styleUrls: ["./teams.component.css"],
  templateUrl: "./teams.component.html",
  viewProviders: [
  {
    provide: ControlContainer,
    useExisting: NgForm,
  },
  ],
})

export class TeamsComponent implements OnInit {
  public fields: Fields;

  constructor(private fieldsService: FieldsService) {
    //
  }

  public ngOnInit(): void {
    this.fieldsService.getData()
    .then((res) => this.fields = new Fields(res[0]));
  }

  public trackByFn(index, item) {
    const self = this;

    return item.id; // or index
  }

}
