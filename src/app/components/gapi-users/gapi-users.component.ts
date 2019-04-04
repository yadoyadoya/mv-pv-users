import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GapiAuthenticatorService } from "../../services/gapi.service";

@Component({
    selector: "mv-gapi-users",
    styleUrls: ["./gapi-users.component.css"],
    templateUrl: "./gapi-users.component.html",
})

export class GapiUsersComponent implements OnInit {
    public apiLoaded: boolean = false;
    public apiReady: boolean = false;
    public apiFailed: boolean = false;
    public userLoggedIn: string = "Logged out";
    public users;
    public userToGet: string;
    public currentUser = {
        emails: null,
        familyName: null,
        fullName: null,
        givenName: null,
        id: null,
        orgas: null,
        password: null,
        primaryEmail: null,
        primaryEmailSuffix: "planetveo.com",
    };
    public errorMessage: string = null;
    public orgas;
    public successMessage = null;

    constructor(
        private gapiService: GapiAuthenticatorService,
        private route: ActivatedRoute,
    ) {
        //
    }

    public ngOnInit(): void {
        this.route.data
            .subscribe((data) => this.orgas = data.fields.orgas);

        this.gapiService.loadClient()
            .then((result) => {
                this.apiLoaded = true;

                return this.gapiService.initClient();
            },
                (err) => {
                    this.apiFailed = true;
                },
            )
            .then((res) => {
                this.apiReady = true;
                this.gapiService.initAuthClient()
                    .then(
                        (result: any) => {
                            if (this.isSignedIn()) {
                                this.userLoggedIn = result.currentUser.get().w3.ig;
                            }
                        },
                        (err) => console.log("init auth client error", err),
                    );
            });
    }

    public listUsers(): void {
        this.gapiService.listUsers()
            .then((res) => this.users = res.result.users);
    }

    public signIn() {
        this.gapiService.signIn()
            .then(() => this.gapiService.initAuthClient()
                .then(
                    (result: any) => this.userLoggedIn = result.currentUser.get().w3.ig,
                    (err) => console.log("init auth client error", err),
                ));
    }

    public signOut() {
        this.gapiService.signOut()
            .then(() => this.gapiService.initAuthClient()
                .then(
                    (result: any) => {
                        if (!this.isSignedIn()) {
                            this.userLoggedIn = "Logged out";
                        }
                    },
                    (err) => console.log("init auth client error", err),
                ));
    }

    public isSignedIn(): boolean {
        return this.gapiService.isSignedIn()
            .get;
    }

    public getUser(email) {
        this.successMessage = null;
        this.userToGet = null;
        this.currentUser = {
            emails: null,
            familyName: null,
            fullName: null,
            givenName: null,
            id: null,
            orgas: null,
            password: null,
            primaryEmail: null,
            primaryEmailSuffix: "planetveo.com",
        };
        this.errorMessage = null;
        this.gapiService.getUser(email)
            .then((res) => {
                console.log(res);
                this.currentUser.emails = res["result"].emails;
                this.currentUser.familyName = res["result"].name.familyName;
                this.currentUser.fullName = res["result"].name.fullName;
                this.currentUser.givenName = res["result"].name.givenName;
                this.currentUser.id = res["result"].customerId;
                this.currentUser.orgas = res["result"].orgUnitPath;
                this.currentUser.primaryEmail = res["result"].primaryEmail;
                console.log(this.currentUser.emails);
            },
                (err) => {
                    console.error(err);
                    this.errorMessage = err["result"].error.message;
                },
            );
    }

    public postUser(user) {
        this.errorMessage = null;
        this.gapiService.postUser(user)
            .then((res) => {
                this.currentUser = null;
                this.getUser(res["result"].id);
                this.successMessage = "User created !";
                console.log("res ", res);
            },
                (err) => this.errorMessage = err["result"].error.message,
            );
    }

    public trackByFn(index, item) {
        const self = this;

        return index; // or item.id
    }

    public refreshEmail() {
        const email = this.currentUser.primaryEmail;
        const emailPrefix = email.lastIndexOf("@") === -1 ? email : email.substring(0, email.lastIndexOf("@"));

        this.currentUser.primaryEmail = `${emailPrefix}@${this.currentUser.primaryEmailSuffix}`;
    }

    // private setUser(res) {
    //     this.currentUser = {
    //         emails: res["result"].,
    //         familyName: res["result"].name.familyName,
    //         fullName: res["result"].name.fullName,
    //         givenName: res["result"].name.givenName,
    //         id: res["result"].id,
    //         orgas: res["result"].orgUnitPath,
    //         password: null,
    //         primaryEmail: res["result"].primaryEmail,
    //         primaryEmailSuffix: res["result"].replace(/.*@/, ""),
    //     };
    // }
}
