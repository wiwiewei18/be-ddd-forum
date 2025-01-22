import * as express from "express";
import { BaseController } from "../../../../shared/infra/http/models/baseController";
import { TextUtils } from "../../../../shared/utils/testUtils";
import { CreateUserDTO } from "./createUserDTO";

export class CreateUserController extends BaseController {
  private useCase;

  constructor(useCase: any) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: any, res: express.Response): Promise<any> {
    let dto: CreateUserDTO = req.body as CreateUserDTO;

    dto = {
      username: TextUtils.sanitize(dto.username),
      email: TextUtils.sanitize(dto.email),
      password: dto.password,
    };

    try {
      const result = this.useCase.execute(dto);

      return this.todo(res);
    } catch (err) {
      return this.fail(res, err as Error);
    }
  }
}
