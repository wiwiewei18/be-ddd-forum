import * as express from "express";
import { BaseController } from "../../../../shared/infra/http/models/baseController";

export class CreateUserController extends BaseController {
  private useCase;

  constructor(useCase: any) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: any, res: express.Response): Promise<any> {
    return this.todo(res);
  }
}
