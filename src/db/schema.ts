import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  timestamp,
  boolean,
  bigint,
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("Users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }),
  email: varchar("email", { length: 255 }),
  password: text("password"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
  is_active: boolean("is_active").default(true),
});

// UserThirdParty table
export const userThirdParty = pgTable("UserThirdParty", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  provider: varchar("provider", { length: 50 }),
  provider_user_id: varchar("provider_user_id", { length: 255 }),
  access_token: text("access_token"),
  refresh_token: text("refresh_token"),
  expires_at: timestamp("expires_at"),
  created_at: timestamp("created_at").defaultNow(),
});

// Post table
export const posts = pgTable("Post", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  title: varchar("title", { length: 255 }),
  content: text("content"),
  post_type_id: integer("post_type_id"),
  post_tag_id: integer("post_tag_id"),
  like_count: integer("like_count").default(0),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
  is_visible: boolean("is_visible").default(true),
});

// PostType table
export const postType = pgTable("PostType", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 10 }),
});

// PostTag table
export const postTag = pgTable("PostTag", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 10 }),
});

// Comment table
export const comments = pgTable("Comment", {
  id: serial("id").primaryKey(),
  post_id: integer("post_id").references(() => posts.id),
  user_id: integer("user_id").references(() => users.id),
  content: text("content"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});

// Attachment table
export const attachments = pgTable("Attachment", {
  id: serial("id").primaryKey(),
  file_name: varchar("file_name", { length: 255 }),
  file_path: varchar("file_path", { length: 255 }),
  file_type: varchar("file_type", { length: 50 }),
  file_size: bigint({ mode: 'bigint' }),
  user_id: integer("user_id").references(() => users.id),
  post_id: integer("post_id").references(() => posts.id),
  comment_id: integer("comment_id").references(() => comments.id),
  message_id: integer("message_id"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});

// PostOfferApply table
export const postOfferApply = pgTable("PostOfferApply", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  post_id: integer("post_id").references(() => posts.id),
  action_type: varchar("action_type", { length: 50 }),
  attach_id: integer("attach_id").references(() => attachments.id),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});

// Message table
export const messages = pgTable("Message", {
  id: serial("id").primaryKey(),
  chat_id: integer("chat_id"),
  sender_id: integer("sender_id").references(() => users.id),
  content: text("content"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});

// Chat table
export const chats = pgTable("Chat", {
  id: serial("id").primaryKey(),
  user1_id: integer("user1_id").references(() => users.id),
  user2_id: integer("user2_id").references(() => users.id),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
