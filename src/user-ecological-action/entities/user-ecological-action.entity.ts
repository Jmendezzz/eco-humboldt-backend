import { EcologicalAction } from "src/ecological-action/entities/ecological-action.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("user-ecological-actions")
export class UserEcologicalAction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => EcologicalAction)
    action: EcologicalAction;

    @Column()
    earnedPoints: number;

    @Column()
    status: 'PENDING' | 'VALIDATED';

    @Column({ nullable: true })
    validationToken: string;

    @Column({ type: 'timestamp', nullable: true })
    validatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}
