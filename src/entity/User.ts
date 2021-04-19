import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("Users")
export class User extends BaseEntity {
	@Field(() => String)
	@ObjectIdColumn()
	id: ObjectID;

	@Field()
	@Column({ unique: true })
	username: string;

	@Field()
	@Column({ unique: true })
	email: string;

	@Field()
	@Column()
	registrationDate: Date;

	@Column()
	password: string;

	@Column()
	tokenVersion: number;
}
