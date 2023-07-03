import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UserSalfGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        if (String(req.user.id) !== req.params.id) {
            throw new UnauthorizedException({
                message: 'You are not allowed!',
            });
        }
        return true;
    }
}
