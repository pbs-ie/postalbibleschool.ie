import { Config } from "ziggy-js";
const Ziggy: Config = {
    url: "http://127.0.0.1:8000",
    port: 8000,
    defaults: {},
    routes: {
        "ignition.healthCheck": {
            uri: "_ignition/health-check",
            methods: ["GET", "HEAD"],
        },
        "ignition.executeSolution": {
            uri: "_ignition/execute-solution",
            methods: ["POST"],
        },
        "ignition.updateConfig": {
            uri: "_ignition/update-config",
            methods: ["POST"],
        },
        contactus: { uri: "contactus", methods: ["GET", "HEAD"] },
        "contactus.store": { uri: "contactus", methods: ["POST"] },
        "request.group": { uri: "request/group", methods: ["GET", "HEAD"] },
        "request.group.store": { uri: "request/group", methods: ["POST"] },
        "request.individual": {
            uri: "request/individual",
            methods: ["GET", "HEAD"],
        },
        "request.individual.store": {
            uri: "request/individual",
            methods: ["POST"],
        },
        courses: { uri: "courses", methods: ["GET", "HEAD"] },
        "events.prizegivings": {
            uri: "events/prizegivings",
            methods: ["GET", "HEAD"],
        },
        "events.shed": { uri: "events/shed", methods: ["GET", "HEAD"] },
        "events.camp": { uri: "events/camp", methods: ["GET", "HEAD"] },
        "events.step": { uri: "events/step", methods: ["GET", "HEAD"] },
        "events.step.past": {
            uri: "events/step/past",
            methods: ["GET", "HEAD"],
        },
        "events.step.signup": {
            uri: "events/step/signup",
            methods: ["GET", "HEAD"],
        },
        "events.step.schedule": {
            uri: "events/step/schedule",
            methods: ["GET", "HEAD"],
        },
        about: { uri: "about", methods: ["GET", "HEAD"] },
        "assembly.index": { uri: "assembly", methods: ["GET", "HEAD"] },
        "assembly.show": { uri: "assembly/{series}", methods: ["GET", "HEAD"] },
        "assembly.image": {
            uri: "assembly/image/{imageId}",
            methods: ["GET", "HEAD"],
        },
        dashboard: { uri: "dashboard", methods: ["GET", "HEAD"] },
        "profile.edit": { uri: "profile", methods: ["GET", "HEAD"] },
        "profile.update": { uri: "profile", methods: ["PATCH"] },
        "profile.destroy": { uri: "profile", methods: ["DELETE"] },
        register: { uri: "register", methods: ["GET", "HEAD"] },
        login: { uri: "login", methods: ["GET", "HEAD"] },
        "password.request": {
            uri: "forgot-password",
            methods: ["GET", "HEAD"],
        },
        "password.email": { uri: "forgot-password", methods: ["POST"] },
        "password.reset": {
            uri: "reset-password/{token}",
            methods: ["GET", "HEAD"],
        },
        "password.store": { uri: "reset-password", methods: ["POST"] },
        "verification.notice": {
            uri: "verify-email",
            methods: ["GET", "HEAD"],
        },
        "verification.verify": {
            uri: "verify-email/{id}/{hash}",
            methods: ["GET", "HEAD"],
        },
        "verification.send": {
            uri: "email/verification-notification",
            methods: ["POST"],
        },
        "password.confirm": {
            uri: "confirm-password",
            methods: ["GET", "HEAD"],
        },
        "password.update": { uri: "password", methods: ["PUT"] },
        logout: { uri: "logout", methods: ["POST"] },
    },
};

if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
