import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
    console.log("get-user.decorator.ts")
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});
