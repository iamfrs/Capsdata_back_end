import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: Number | null | undefined;

  @Column()
  Full_name: string;

  @Column({ unique: true })
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @Column()
  @IsNotEmpty({ message: "Password is required" })
  password: string;

  @Column({ unique: true })
  @Matches(/^[0-9]{10}$/, { message: "Phone number must be exactly 10 digits" })
  phone: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  api_key: string;

  @Column()
  img: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;
}
