export class Alert {
    id: string;
    message: string;
    alertType: string;

    constructor(id: string, message: string, alertType: string) {
        this.id = id;
        this.message = message;
        this.alertType = alertType;
    }
}
