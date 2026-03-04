import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ClientEntity } from ".";

@Entity( { name: 'revenue' } )
export class RevenueEntity extends BaseEntity {
    @Column( {
        nullable: false,
        type: 'bigint',
    } )
    client_id: string;

    @ManyToOne(() => ClientEntity, client => client.id)
    @JoinColumn({ name: 'client_id' })
    clientData: ClientEntity;

    @Column({
        nullable: false,
        type: 'varchar'
    })
    month: string;

    @Column( {
        nullable: false,
        type: 'bigint',
    } )
    monthly_revenue: number;

    @Column({
        nullable: true,
        type: 'bigint'
    })
    estimated_hours: number;
}