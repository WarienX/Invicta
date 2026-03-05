import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ClientEntity, RoleEntity } from ".";

@Entity( { name: 'time_entries' } )
export class TimeEntity extends BaseEntity {
    @Column( {
        nullable: false,
        type: 'bigint',
    } )
    client_id: number;

    @ManyToOne(() => ClientEntity, client => client.id)
    @JoinColumn({ name: 'client_id' })
    clientData: ClientEntity;

    @Column( {
        nullable: false,
        type: 'bigint',
    } )
    role_id: number;

    @ManyToOne(() => RoleEntity, role => role.id)
    @JoinColumn({ name: 'role_id' })
    roleData: RoleEntity;

    @Column({
        nullable: false,
        type: 'bigint'
    })
    total_hours: number;

    @Column({
        nullable: false,
        type: 'varchar'
    })
    entry_date: string;
}