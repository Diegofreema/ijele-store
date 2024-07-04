import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  boolean,
  bigint,
  pgEnum,
  numeric,
  date,
} from 'drizzle-orm/pg-core';
export const userEnum = pgEnum('memberType', [
  'regular',
  'honorary-board-membership',
  'honorary-president',
  'life',
  'annual',
]);

export const statusEnum = pgEnum('order_status', [
  'pending',
  'completed',
  'canceled',
]);

export const resultEnum = pgEnum('RESULT', [
  'win',
  'loss',
  'abandoned',
  'upcoming',
  'live',
  'postponed',
]);

export const videoEnum = pgEnum('VIDEO_TYPE', [
  'first team',
  'academy',
  'press conference',
]);

export const dutyEnum = pgEnum('DUTY', [
  'captain',
  'assistant captain',
  'head coach',
  'assistant coach',
  'technical coach',
  'goalkeeper coach',
  'set piece coach',
  'regular',
]);

export const roleEnum = pgEnum('ROLE', [
  'forward',
  'midfielder',
  'defender',
  'goalkeeper',
  'coach',
]);
export const productTable = pgTable('products', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  name: text('product_name').notNull(),
  description: text('description').notNull(),
  price: numeric('price').notNull(),
  imagePath: text('image_url').notNull(),
  numberInStock: numeric('number_in_stock').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  category: text('category').notNull(),
});

export const usersTable = pgTable('users', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  middleName: text('middle_name'),
  title: text('title'),
  salutation: text('salutation'),
  imageUrl: text('img_url'),
  email: text('email').notNull().unique(),
  user_id: uuid('user_id').notNull().default('uuid_generate_v4()'),
  verified: boolean('verified').default(false),
  type: userEnum('type').default('regular'),
  dateOfBirth: text('dateOfBirth'),
  gender: text('gender').notNull(),
  userId: text('userId'),
  duration: text('duration'),
  phoneNumber: text('phoneNumber'),
  password: text('password').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const imagesTable = pgTable('images', {
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  id: bigint('id', { mode: 'number' }).primaryKey(),
  imageUrl: text('image_url').notNull(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => usersTable.user_id, {
      onDelete: 'cascade',
    }),
  orderDate: timestamp('order_date').defaultNow().notNull(),
  status: statusEnum('status').default('pending'),
  totalAmount: integer('total_amount').notNull().default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const loanedIn = pgTable('loaned_in', {
  clubId: bigint('club_id', { mode: 'number' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  from: text('from'),
  id: bigint('id', { mode: 'number' }).notNull().primaryKey(),
  playerId: bigint('player_id', { mode: 'number' }),
  to: text('to'),
  wagePaidByExternalClub: bigint('wage_paidby_external_club', {
    mode: 'number',
  }),
  wagePaidByIjele: bigint('wage_paidby_ijele', { mode: 'number' }),
});

export const loanedOut = pgTable('loaned_out', {
  clubId: bigint('club_id', { mode: 'number' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  from: text('from'),
  id: bigint('id', { mode: 'number' }).notNull().primaryKey(),
  playerId: bigint('player_id', { mode: 'number' }),
  to: text('to'),
  wagePaidByExternalClub: bigint('wage_paidby_external_club', {
    mode: 'number',
  }),
  wagePaidByIjele: bigint('wage_paidby_ijele', { mode: 'number' }),
});

export const menTable = pgTable('men', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  age: text('age').notNull(),
  bio: text('bio'),
  contractEndDate: text('contract_end_date').notNull(),
  contractStartDate: text('contract_start_date').notNull(),
  contractType: text('contract_type'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  firstName: text('first_name').notNull(),
  height: text('height').notNull(),
  imageUrl: text('image_url').notNull(),
  injured: boolean('injured').default(false),
  jerseyNumber: numeric('jersey_number').notNull(),
  lastName: text('last_name').notNull(),
  leave: boolean('leave').default(false),
  lga: text('lga').notNull(),
  loanAway: boolean('loan_away').default(false),
  loanHome: boolean('loan_home').default(false),
  middleName: text('middle_name'),
  nationality: text('nationality').notNull(),
  skillDescriptions: text('skill_descriptions'),
  stateOfOrigin: text('state_of_origin').notNull(),
  suspended: boolean('suspended').default(false),
  wagePerWeek: numeric('wage_per_week').notNull(),
  weight: text('weight').notNull(),
  position: roleEnum('position'),
  role: dutyEnum('role'),
});

export const matches = pgTable('matches', {
  attendance: numeric('attendance'),
  awayScore: numeric('away_score').notNull(),
  awayTeam: text('away_team'),
  awayTeamImage: text('away_team_image').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  dateOfMatch: text('date_of_match').notNull(),
  homeScore: numeric('home_score').notNull(),
  homeTeam: text('home_team').notNull(),
  homeTeamImage: text('home_team_img').notNull(),
  id: bigint('id', { mode: 'number' }).notNull(),
  kickOff: text('kick_off').notNull(),
  league: text('league').notNull(),
  refName: text('ref_name'),
  venue: text('venue').notNull(),
  matchResult: resultEnum('result').default('upcoming'),
});

export const news = pgTable('news', {
  authorName: text('author_name'),
  category: text('category'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  id: bigint('id', { mode: 'number' }).primaryKey(),
  imageUrl: text('image_url'),
  news: text('news').notNull(),
  title: text('title').notNull(),
});

export const playerStats = pgTable('players_statistics', {
  appearance: numeric('appearance'),
  assists: numeric('assists'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  goals: numeric('goals'),
  id: bigint('id', { mode: 'number' }).primaryKey(),
  name: text('name'),
  playerId: bigint('player_id', { mode: 'number' })
    .notNull()
    .references(() => menTable.id, { onDelete: 'cascade' }),
  redCards: numeric('red_cards'),
  year: text('year'),
  yellowCards: numeric('yellow_cards'),
});

export const videoTable = pgTable('videos', {
  caption: text('caption'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  id: bigint('id', { mode: 'number' }).primaryKey(),
  type: videoEnum('type'),
});

export const cartTable = pgTable('cart', {
  id: bigint('id', { mode: 'number' }).primaryKey().unique(),
  userId: text('userId').references(() => usersTable.user_id, {
    onDelete: 'cascade',
  }),
  productId: bigint('productId', { mode: 'number' }).references(
    () => productTable.id,
    { onDelete: 'cascade' }
  ),
});
export const favoriteTable = pgTable('favorite', {
  id: bigint('id', { mode: 'number' }).primaryKey().unique(),
  userId: text('userId').references(() => usersTable.user_id, {
    onDelete: 'cascade',
  }),
  productId: bigint('productId', { mode: 'number' }).references(
    () => productTable.id,
    { onDelete: 'cascade' }
  ),
});

// export const postsTable = pgTable('posts_table', {
//   id: serial('id').primaryKey(),
//   title: text('title').notNull(),
//   content: text('content').notNull(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at')
//     .notNull()
//     .$onUpdate(() => new Date()),
// });
export type SelectProduct = typeof productTable.$inferSelect;
export type SelectCart = typeof cartTable.$inferSelect;
export type InsertCart = typeof cartTable.$inferInsert;
export type SelectFavorite = typeof favoriteTable.$inferSelect;

export type SelectMen = typeof menTable.$inferSelect;
export type SelectOrder = typeof orders.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
