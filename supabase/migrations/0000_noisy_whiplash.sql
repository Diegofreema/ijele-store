DO $$ BEGIN
 CREATE TYPE "public"."DUTY" AS ENUM('captain', 'assistant captain', 'head coach', 'assistant coach', 'technical coach', 'goalkeeper coach', 'set piece coach', 'regular');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."RESULT" AS ENUM('win', 'loss', 'abandoned', 'upcoming', 'live', 'postponed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."ROLE" AS ENUM('forward', 'midfielder', 'defender', 'goalkeeper', 'coach');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."order_status" AS ENUM('pending', 'completed', 'canceled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."memberType" AS ENUM('regular', 'honorary-board-membership', 'honorary-president', 'life', 'annual');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."VIDEO_TYPE" AS ENUM('first team', 'academy', 'press conference');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"created_at" timestamp with time zone DEFAULT now(),
	"id" bigint PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "loaned_in" (
	"club_id" bigint,
	"created_at" timestamp with time zone DEFAULT now(),
	"from" text,
	"id" bigint PRIMARY KEY NOT NULL,
	"player_id" bigint,
	"to" text,
	"wage_paidby_external_club" bigint,
	"wage_paidby_ijele" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "loaned_out" (
	"club_id" bigint,
	"created_at" timestamp with time zone DEFAULT now(),
	"from" text,
	"id" bigint PRIMARY KEY NOT NULL,
	"player_id" bigint,
	"to" text,
	"wage_paidby_external_club" bigint,
	"wage_paidby_ijele" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "matches" (
	"attendance" numeric,
	"away_score" numeric NOT NULL,
	"away_team" text,
	"away_team_image" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"date_of_match" text NOT NULL,
	"home_score" numeric NOT NULL,
	"home_team" text NOT NULL,
	"home_team_img" text NOT NULL,
	"id" bigint NOT NULL,
	"kick_off" text NOT NULL,
	"league" text NOT NULL,
	"ref_name" text,
	"venue" text NOT NULL,
	"result" "RESULT" DEFAULT 'upcoming'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "men" (
	"id" bigint PRIMARY KEY NOT NULL,
	"age" text NOT NULL,
	"bio" text,
	"contract_end_date" text NOT NULL,
	"contract_start_date" text NOT NULL,
	"contract_type" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"first_name" text NOT NULL,
	"height" text NOT NULL,
	"image_url" text NOT NULL,
	"injured" boolean DEFAULT false,
	"jersey_number" numeric NOT NULL,
	"last_name" text NOT NULL,
	"leave" boolean DEFAULT false,
	"lga" text NOT NULL,
	"loan_away" boolean DEFAULT false,
	"loan_home" boolean DEFAULT false,
	"middle_name" text,
	"nationality" text NOT NULL,
	"skill_descriptions" text,
	"state_of_origin" text NOT NULL,
	"suspended" boolean DEFAULT false,
	"wage_per_week" numeric NOT NULL,
	"weight" text NOT NULL,
	"position" "ROLE",
	"role" "DUTY"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "news" (
	"author_name" text,
	"category" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"id" bigint PRIMARY KEY NOT NULL,
	"image_url" text,
	"news" text NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" uuid NOT NULL,
	"order_date" timestamp DEFAULT now() NOT NULL,
	"status" "order_status" DEFAULT 'pending',
	"total_amount" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players_statistics" (
	"appearance" numeric,
	"assists" numeric,
	"created_at" timestamp with time zone DEFAULT now(),
	"goals" numeric,
	"id" bigint PRIMARY KEY NOT NULL,
	"name" text,
	"player_id" bigint NOT NULL,
	"red_cards" numeric,
	"year" text,
	"yellow_cards" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" bigint PRIMARY KEY NOT NULL,
	"product_name" text NOT NULL,
	"description" text NOT NULL,
	"price" numeric NOT NULL,
	"image_url" text NOT NULL,
	"number_in_stock" numeric NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"category" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" bigint PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"middle_name" text,
	"title" text,
	"salutation" text,
	"img_url" text,
	"email" text NOT NULL,
	"user_id" uuid DEFAULT 'uuid_generate_v4()' NOT NULL,
	"verified" boolean DEFAULT false,
	"type" "memberType" DEFAULT 'regular',
	"dateOfBirth" text,
	"gender" text NOT NULL,
	"userId" text,
	"duration" text,
	"phoneNumber" text,
	"password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "videos" (
	"caption" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"id" bigint PRIMARY KEY NOT NULL,
	"type" "VIDEO_TYPE"
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_users_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "players_statistics" ADD CONSTRAINT "players_statistics_player_id_men_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."men"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
