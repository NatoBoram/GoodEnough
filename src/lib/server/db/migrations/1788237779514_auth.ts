import { sql, type Kysely } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
	await sql`
create table "users" (
	"id" uuid default pg_catalog.uuidv7() not null primary key,
	"name" text not null,
	"email" text not null unique,
	"email_verified" boolean default false not null,
	"image" text,
	"created_at" timestamptz default current_timestamp not null,
	"updated_at" timestamptz default current_timestamp not null,
	"role" text,
	"banned" boolean,
	"ban_reason" text,
	"ban_expires" timestamptz
);

create table "sessions" (
	"id" uuid default pg_catalog.uuidv7() not null primary key,
	"expires_at" timestamptz not null,
	"token" text not null unique,
	"created_at" timestamptz default current_timestamp not null,
	"updated_at" timestamptz default current_timestamp not null,
	"ip_address" text,
	"user_agent" text,
	"user_id" uuid not null references "users" ("id")
		on delete cascade,
	"impersonated_by" text
);

create table "accounts" (
	"id" uuid default pg_catalog.uuidv7() not null primary key,
	"issuer" text not null,
	"account_id" text not null,
	"provider_id" text not null,
	"user_id" uuid not null references "users" ("id")
		on delete cascade,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamptz,
	"refresh_token_expires_at" timestamptz,
	"scope" text,
	"password" text,
	"created_at" timestamptz default current_timestamp not null,
	"updated_at" timestamptz default current_timestamp not null
);

create table "verifications" (
	"id" uuid default pg_catalog.uuidv7() not null primary key,
	"identifier" text not null,
	"value" text not null,
	"expires_at" timestamptz not null,
	"created_at" timestamptz default current_timestamp not null,
	"updated_at" timestamptz default current_timestamp not null
);

create index "sessions_user_id_idx" on "sessions" ("user_id");

create index "accounts_user_id_idx" on "accounts" ("user_id");

create index "verifications_identifier_idx" on "verifications" ("identifier");

create unique index "accounts_issuer_account_id_uidx" on "accounts" ("issuer", "account_id");
`.execute(db)
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropIndex('accounts_issuer_account_id_uidx').execute()
	await db.schema.dropIndex('verifications_identifier_idx').execute()
	await db.schema.dropIndex('accounts_user_id_idx').execute()
	await db.schema.dropIndex('sessions_user_id_idx').execute()
	await db.schema.dropTable('verifications').execute()
	await db.schema.dropTable('accounts').execute()
	await db.schema.dropTable('sessions').execute()
	await db.schema.dropTable('users').execute()
}
