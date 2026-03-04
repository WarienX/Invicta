import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity( { name: 'clients' } )
export class ClientEntity extends BaseEntity {
    @Column( {
        nullable: false,
        type: 'varchar',
    } )
    name: string;
    
}