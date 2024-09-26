import { new_id } from '../../../utils/id/index.js';

import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const user_table = pgTable('user', {
	id: text('id')
		.$default(function () {
			return new_id('user');
		})
		.primaryKey()
});

export const session_table = pgTable('session', {
	id: text('id')
		.$defaultFn(function () {
			return new_id('session');
		})
		.primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user_table.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
