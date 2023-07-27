import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';
import {createProxyMiddleware, fixRequestBody} from 'http-proxy-middleware';
import {options, routes} from "./config";


@Injectable()
export class ReverseProxyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        try {
            const config = this.getConfig(req.url)
            const target = `http://${config.host}:${config.port}`

            const proxy = createProxyMiddleware({
                target,
                changeOrigin: true,
                onProxyReq: fixRequestBody
            });
            proxy(req, res, next);
        } catch (e) {
            console.log(e)
            res.status(500).send({message: "Internal server error"})
        }
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