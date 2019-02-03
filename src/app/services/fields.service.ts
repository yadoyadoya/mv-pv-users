import { Injectable } from "@angular/core";
import { Fields } from "../models/fields";

import { Accounts } from "../assets/accounts";
import { Autres } from "../assets/autres";
import { Bureaux } from "../assets/bureaux";
import { Civilites } from "../assets/civilites";
import { Destinations } from "../assets/destinations";
import { Functions } from "../assets/functions";
import { Managers } from "../assets/managers";
import { Orgas } from "../assets/orgas";
import { Roles } from "../assets/roles";
import { Services } from "../assets/services";
import { Teams } from "../assets/teams";
import { UserFields } from "../assets/user-fields";
import { UserTemplates } from "../assets/user-templates";

@Injectable()

export class FieldsService {

  public fieldsToSend = {
    data: {
      accounts: Accounts,
      autres: Autres,
      bureaux: Bureaux,
      civilites: Civilites,
      codeSON: "",
      codeTourplan: "",
      codevad: "",
      destinations: Destinations,
      functions: Functions,
      groupes: "",
      inactiveEmployee: "",
      inactiveStatus: "",
      inbound: "",
      leadsMax: "",
      leadsMin: "",
      managers: Managers,
      orgas: Orgas,
      outbound: "",
      phoneExtension: "",
      phoneNumber: "",
      roles: Roles,
      selectedBureau: "",
      selectedFunction: "",
      selectedManager: "",
      selectedOrganisation: "",
      services: Services,
      teams: Teams,
      title: "",
      userFields: UserFields,
      userTemplates: UserTemplates,
      userValue: "",
    },
  };

  public fields: Fields = new Fields(this.fieldsToSend);

  constructor() {
    //
  }

  public getData(): Fields {
    return this.fields;
  }
}
