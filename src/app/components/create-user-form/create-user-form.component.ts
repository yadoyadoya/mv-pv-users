import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { FieldsService } from "../../services/fields.service";
import { ParserService } from "../../services/parser.service";
import { SugarService } from "../../services/sugar.service";
import { SwitchVoxService } from "../../services/switchvox.service";

import { Destination } from "../../models/destination";
import { Fields } from "../../models/fields";
import { Team } from "../../models/team";
import { User } from "../../models/user";

@Component({
  selector: "mv-app-create-user-form",
  templateUrl: "./create-user-form.component.html",
})

export class CreateUserFormComponent implements OnInit {
  public fields: Fields;
  public errorMsg;
  public passwordExists = false;
  public usersFromSugar: User[] = [];
  public usernameTaken;
  public currentUser: User;
  public teams: Team[] = [];
  public destinations: Destination[] = [];
  public managers: User[] = [];
  // tslint:disable-next-line:max-line-length
  public body = `{"data":[{"codeSonGalileo":"","departments":["departments-Backoffice","departments-Backoffice Billet"],"destinations":["4e12eefb-5dbb-f913-d80b-4c2ab8202809","6f9aedb6-6d68-b4f3-0270-4cc10e363077"],"email":"mfeuillet@marcovasco.fr","employeeStatus":true,"firstName":"Mathilde","functionId":"","inheritsPreferencesFrom":"user_default","isAdmin":false,"lastName":"Feuillet","leadsMax":45,"leadsMin":15,"managerId":"","officeId":"","phoneAsterisk":"phoneAsterisk","phoneFax":"phoneFax","phoneMobile":"phoneMobile","phoneWork":"phoneWork","roles":["128e2eae-322a-8a0d-e9f0-4cf35b5bfe5b","25218251-3011-b347-5d4f-4bfced4de2cc"],"salutation":"Mrs.","status":true,"teams":["0ec63f44-aa38-11e7-924f-005056911f09","1046f88d-3d37-10d5-7760-506023561b57"],"title":"","tourplanID":"MFEUIL","userName":"mfeuillet"}]}`;

  constructor(
              private fieldsService: FieldsService,
              private switchvoxService: SwitchVoxService,
              private parserService: ParserService,
              private route: ActivatedRoute,
              private sugar: SugarService,
              ) {
    //
  }

  public ngOnInit(): void {
    this.route.data
    .subscribe((data) => {
      if (data.user != null) {
        this.currentUser = new User(data.user);
      }

      this.managers = data.managers;
      data.users.forEach((user) => this.usersFromSugar.push(new User(user)));
      data.teams.forEach((team) => this.teams.push(new Team(team)));
      data.destinations.forEach((dest) => this.destinations.push(new Destination(dest)));
      this.fields = new Fields(data.fields);
    });

  }

  public onParentChange({e, id}) {
    // const myField = this.fields.others.find((field) => field.id === id);
    // myField.checked = e;
  }

  public onSubmit(form) {
    // form doesn't get updated after updating currentUser :'(
    this.sugar.postDataToSugar(this.body)
    .subscribe(
               (res) => {
                 this.currentUser = new User(res.data[0]);
               },
               (error) => this.errorMsg = error.statusText,
               );
  }

  public trackByFn(index, item) {
    const self = this;

    return item.id; // or index
  }

  public eraseFields(fields) {
    fields.forEach((field) => field = "");
  }

  public unCheck(array) {
    array.forEach((x) => x.checked = false);
  }

  private unCheckArrays(arrays) {
    arrays.forEach((array) => this.unCheck(array));
  }

  private resetSugar() {
    this.fields.inactiveStatus = false,
    this.fields.inactiveEmployee = false,
    this.fields.leadsMin = 15;
    this.fields.leadsMax = 45;
    this.fields.userValue = "user_default_xx";
    this.fields.selectedManager = null,
    this.eraseFields([
                     this.fields.codeSON,
                     this.fields.codeTourplan,
                     this.fields.codevad,
                     this.fields.groupes,
                     this.fields.inbound,
                     this.fields.outbound,
                     this.fields.phoneExtension,
                     this.fields.phoneNumber,
                     this.fields.selectedFunction,
                     this.fields.selectedOffice,
                     this.fields.selectedOrganisation,
                     this.fields.title,
                     ]);
    this.unCheckArrays([
                       this.fields.roles,
                       this.fields.services,
                       this.fields.others,
                       this.fields.teams,
                       this.fields.destinations,
                       this.fields.orgas,
                       ]);
  }

}
