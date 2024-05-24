import { Request, Response } from "express";
import { BaseEntity, EntityTarget, Repository } from "typeorm";
import { getExpressAppInstance } from "../app-instance";

/**
 * Base controller class so that the repository for each entity be easily accessed.
 * 
 * @example
 * export default class UserController extends BaseController<User> {
 *     repository = await this.getRepository().find();
 *     ...
 * }
 */
export default abstract class BaseController<MODEL extends BaseEntity> {
    protected entityRepository: Repository<MODEL>;
    protected entity: MODEL;
    private dbManager;

    constructor(entity: MODEL) {
        this.entity = entity;
    }

    protected getRepository() {
        // if dbManager hasn't been created, then create it
        if (!this.dbManager) {
            this.dbManager = getExpressAppInstance()?.dbManager;
        }

        // if reposity hasn't get set, then set it
        if(!this.entityRepository) {
            this.entityRepository = this.dbManager
                .getDataSource()
                .getRepository(this.entity.constructor as EntityTarget<MODEL>);
        }
        return this.entityRepository;
    }

    // Create one for each response?
    public static responseOk(res: Response, data: any): void {
        res.status(200).json({ message: "Success", data });
    }
};