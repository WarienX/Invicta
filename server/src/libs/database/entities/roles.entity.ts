import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity( { name: 'roles' } )
export class RoleEntity extends BaseEntity {
    @Column( {
        nullable: false,
        type: 'varchar',
    } )
    name: string;

    @Column( {
        nullable: false,
        type: 'bigint',
    } )
    monthly_salary: number;

    @Column({
        nullable: true,
        type: 'bigint'
    })
    productive_hours: number;

    @Column({
        nullable: true,
        type: 'bigint'
    })
    cost_per_hour: number;
}