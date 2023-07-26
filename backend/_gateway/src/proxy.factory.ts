import {options, routes} from "./config";
import {Injectable} from "@nestjs/common";

const {createProxyMiddleware} = require('http-proxy-middleware');

@Injectable()
export class Proxy {

    private instances: {} = {}

    constructor() {
        Object.keys(options).forEach((key) => {
            const config = options[key]
            this.instances[config.host] = createProxyMiddleware({
                target: `http://${config.host}:${config.port}`,
                changeOrigin: true,
            });
        });
    }

    runProxy(req, res, next) {
        const config = this.getConfig(req.url)
        this.instances[config.host](req, res, next);
    }

    private getConfig(url) {
        let config = options["admin"]

        const route = url.split('/')[1];

        for (const key in routes) {
            if (routes[key].includes(route)) {
                config = options[key];
                break;
            }
        }
        console.log(url)
        console.log(config)
        return config
    }
}