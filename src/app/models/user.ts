import { Destination } from "./destination";
import { Role } from "./role";
import { Team } from "./team";

export class User {

    public type: string = "users";
    public id: string = "";
    public userName: string = "";
    public salutation: string = "Mrs.";
    public lastName: string = "";
    public firstName: string = "";
    public phoneMobile: string = "";
    public phoneWork: string = "";
    public phoneFax: string = "";
    public phoneAsterisk: string = "";
    public email: string = "";
    public status: string = "Active";
    public employeeStatus: string = "Active";
    public title: string = "";
    public managerId: string = "";
    public department: string = "";
    public officeId: string = "";
    public teams: Team[] = [];
    public tourplanID: string = "";
    public swClickToCall: boolean = false;
    public swCallNotification: boolean = false;
    public codeSonGalileo: string = "";

    public swPhoneNumber: string = "";
    public swExtension: string = "";
    public swTelephony: boolean = false;
    public inheritsPreferencesFrom: string = "";
    public roles: Role[] = [];
    public functionId: string = "";
    public destinations: Destination[] = [];
    public ggOrganisationId: string = "";
    public ggGroups: string = "";
    public isAdmin: boolean = false;
    public apiPortalUser: boolean = false;
    public assignationNotification: boolean = false;
    public userGroup: boolean = false;
    public defaultTeams: number = 1;
    public leadsMin: number = 15;
    public leadsMax: number = 45;

    public constructor(data: any) {
        this.type = data.type || this.type;
        this.id = data.id || this.id;
        this.userName = data.userName || this.userName;
        this.salutation = data.salutation || this.salutation;
        this.lastName = data.lastName || this.lastName;
        this.firstName = data.firstName || this.firstName;
        this.phoneMobile = data.phoneMobile || this.phoneMobile;
        this.phoneWork = data.phoneWork || this.phoneWork;
        this.phoneFax = data.phoneFax || this.phoneFax;
        this.phoneAsterisk = data.phoneAsterisk || this.phoneAsterisk;
        this.email = data.email || this.email;
        this.status = data.status || this.status;
        this.employeeStatus = data.employeeStatus || this.employeeStatus;
        this.title = data.title || this.title;
        this.managerId = data.managerId || this.managerId;
        this.department = data.department || this.department;
        this.officeId = data.officeId || this.officeId;
        this.teams = data.teams || this.teams;
        this.tourplanID = data.tourplanID || this.tourplanID;
        this.swClickToCall = data.swClickToCall || this.swClickToCall;
        this.swCallNotification = data.swCallNotification || this.swCallNotification;
        this.codeSonGalileo = data.codeSonGalileo || this.codeSonGalileo;

        this.swPhoneNumber = data.swPhoneNumber || this.swPhoneNumber;
        this.swExtension = data.swExtension || this.swExtension;
        this.swTelephony = data.swTelephony || this.swTelephony;
        this.inheritsPreferencesFrom = data.inheritsPreferencesFrom || this.inheritsPreferencesFrom;
        this.roles = data.roles || this.roles;
        this.functionId = data.functionId || this.functionId;
        this.destinations = data.destinations || this.destinations;
        this.ggOrganisationId = data.ggOrganisationId || this.ggOrganisationId;
        this.ggGroups = data.ggGroups || this.ggGroups;
        this.isAdmin = data.isAdmin || this.isAdmin;
        this.apiPortalUser = data.apiPortalUser || this.apiPortalUser;
        this.assignationNotification = data.assignationNotification || this.assignationNotification;
        this.userGroup = data.userGroup || this.userGroup;
        this.defaultTeams = data.defaultTeams || this.defaultTeams;
        this.leadsMin = data.leadsMin || this.leadsMin;
        this.leadsMax = data.leadsMax || this.leadsMax;
    }
}
