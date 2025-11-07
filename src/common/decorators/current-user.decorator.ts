import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from 'src/auth/strategies/jwt.strategy';

export const CurrentUser = createParamDecorator<
    keyof AuthenticatedUser | undefined,
    AuthenticatedUser | number | string | undefined
>((data, ctx: ExecutionContext): AuthenticatedUser | number | string | undefined => {
    const request = ctx.switchToHttp().getRequest<{ user?: AuthenticatedUser }>();
    const user = request.user;

    if (!user) {
        return undefined;
    }

    return data ? user[data] : user;
});
