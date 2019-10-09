import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Fields } from "../../models/fields";
import { Office } from "../../models/office";
import { SugarUser } from "../../models/sugar-user";
import { User } from "../../models/user";
import { ParserService } from "../../services/parser.service";
import { UserPopulaterService } from "../../services/user-populater.service";
import { ICommonProperties, ISugarUserConfig } from "./../../interfaces/sugar-user";

@Component({
    selector: "mv-import",
    styleUrls: ["./import.component.css"],
    templateUrl: "./import.component.html",
})

export class ImportComponent implements OnInit {
    public numberOfFields = 22;
    public users: User[] = [];
    public usersData;
    public managers: User[] = [];
    public message: string = "";
    public offices: Office[] = [];

    // tslint:disable:max-line-length
    public csv = '"Mme","Cindy","Guerineau","","New","Ventes","","Golden Dragons","","cguerineau@marcovasco.fr","01 76 64 72 87","1287","cg11215!","4193eb55-9bc2-08c8-5f3c-582cec03d96f","cguerineau","0","0","Active","0","Active","15","45","Mlle","Coralie","Viarnes","","New","Ventes","","Golden Dragons","","cviarnes@marcovasco.fr","01 56 67 01 00","2100","cv19833!","4193eb55-9bc2-08c8-5f3c-582cec03d96f","cviarnes","0","0","Active","0","Active","15","45","Mme","Nejma","Mebarki","","New","Ventes","","Golden Dragons","","nmebarki@marcovasco.fr","01 76 64 72 92","1292","nm62684!","","nmebarki","0","0","Active","0","Active","15","45","Mlle","Fanny","Marh-Zhoock","","New","Ventes","","Golden Dragons","","farhzhoock@marcovasco.fr","01 56 67 00 88","2088","fm48032!","4193eb55-9bc2-08c8-5f3c-582cec03d96f","farhzhoock","0","0","Active","0","Active","15","45"';
    // tslint:enable:max-line-length

    constructor(
        private parserService: ParserService,
        private populater: UserPopulaterService,
        private route: ActivatedRoute,
    ) {
        //
    }

    public ngOnInit(): void {
        this.route.data.subscribe((data) => {
            this.managers = data.managers;

            const fields = new Fields(data.fields);
            fields.offices.forEach((office) => this.offices.push(new Office(office)));
        });
    }

    public parse(d) {
        this.users = [];
        const raw = this.parserService.getData(d);
        if (raw.length % this.numberOfFields !== 0) {
            this.message = `Wrong number of values. Each user should have ${this.numberOfFields} values`;

            return;
        }

        this.usersData = this.chunkArray(raw, this.numberOfFields);

        this.usersData.forEach((user) => {
            const myObj = {} as ISugarUserConfig;
            const [
                salutation,
                firstName,
                lastName,
                id,
                title,
                department,
                officeId,
                teamId,
                tourplanID,
                email,
                phoneWork,
                phoneAsterisk,
                password,
                managerId,
                userName,
                isAdmin,
                apiPortalUser,
                status,
                assignationNotification,
                employeeStatus,
                leadsMin,
                leadsMax,
            ] = [...user];

            myObj.salutation = salutation;
            myObj.id = id;
            myObj.title = title;
            myObj.department = department;
            myObj.officeId = officeId;
            myObj.tourplanID = tourplanID;
            myObj.phoneWork = phoneWork;
            myObj.phoneAsterisk = phoneAsterisk;
            myObj.managerId = managerId;
            myObj.isAdmin = isAdmin === "1" ? true : false;
            myObj.apiPortalUser = apiPortalUser === "1" ? true : false;
            myObj.status = status;
            myObj.assignationNotification = assignationNotification === "1" ? true : false;
            myObj.employeeStatus = employeeStatus;
            myObj.leadsMin = leadsMin;
            myObj.leadsMax = leadsMax;
            myObj.teams = [teamId];

            const common = {
                email,
                firstName,
                lastName,
                password,
                userName,
            } as ICommonProperties;
            const myUser = new User(common);

            myUser.sugarCurrentUser = new SugarUser(common, myObj);
            this.populater.populateUserProperties(myUser);
            this.populateManager(myUser);
            this.populateOfficeFromTeam(myUser);
            this.users.push(myUser);
        });
    }

    public chunkArray(myArray, chunkSize) {
        const results = [];
        while (myArray.length) {
            results.push(myArray.splice(0, chunkSize));
        }

        return results;
    }

    public populateManager(user: User) {
        if (user.sugarCurrentUser.managerId === "") {
            user.sugarCurrentUser.managerId =
                this.findManagerByTeam(user.sugarCurrentUser.teams[0]).sugarCurrentUser.id;
        }
    }

    public displayManagerName(id): string {
        const manager = this.findManagerById(id);

        return manager != null ? `${manager.common.firstName} ${manager.common.lastName}` : "";
    }

    public displayOfficeNameFromId(officeId): string {
        const myOffice = this.offices.find((office) => office.value === officeId);

        return myOffice != null ? myOffice.label : "";
    }

    public trackByFn(id) {
        return id;
    }

    private findManagerByTeam(teamId): User {
        return this.managers.find((user) => user.sugarCurrentUser.teams[0] === teamId);
    }

    private findManagerById(managerId): User {
        return this.managers.find((user) => user.sugarCurrentUser.id === managerId);
    }

    private populateOfficeFromTeam(user: User): void {
        if (user.sugarCurrentUser.officeId === "") {
            if (user.sugarCurrentUser.teams.length === 0 || user.sugarCurrentUser.teams[0] === "") {
                user.sugarCurrentUser.officeId = "";
            } else {
                const myOffice = this.offices.find((office) => office.label.includes(user.sugarCurrentUser.teams[0]));
                user.sugarCurrentUser.officeId = myOffice != null ? myOffice.value : "";
            }
        }
    }
}
