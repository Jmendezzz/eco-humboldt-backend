import { EcologicalAction } from "src/ecological-action/entities/ecological-action.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("ecological-action-qrs")
export class EcologicalActionQr {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => EcologicalAction)
    action: EcologicalAction;

    @Column({ unique: true })
    token: string;

    @CreateDateColumn()
    createdAt: Date;
}
