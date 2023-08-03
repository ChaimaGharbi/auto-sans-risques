import {Injectable, InternalServerErrorException, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';
import {createProxyMiddleware, fixRequestBody} from 'http-proxy-middleware';
import {routes} from "./config";


@Injectable()
export class ReverseProxyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        try {
            const target = this.getTarget(req.url)

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

    private getTarget(url) {
        let config

        const route = url.split('/')[1];

        for (const key in routes) {
            if (routes[key].includes(route)) {
                config = process.env[key];
                break;
            }
        }
        if (!config) {
            throw new InternalServerErrorException("Unhandled Route");
        }
        return config
    }
}