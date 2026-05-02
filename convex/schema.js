import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()),

    plan: v.union(v.literal("free"), v.literal("pro")),

    // usage tracking for plan limits
    projectsUsed: v.number(), // current project count
    exportsThisMonth: v.number(), //monthly export limit tracking

    createdAt: v.number(),
    lastActiveAt: v.number(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"])
    .searchIndex("search_name", { searchField: "name" }) //user search
    .searchIndex("search_email", { searchField: "email" }),

  projects: defineTable({
    // basic project info
    title: v.string(),
    userId: v.id("users"), // foreign key belonging to users table's id

    // canvas dimensions and state
    canvasState: v.any(), // fabric.js canvas json (objects, layer, etc...)
    width: v.number(), // canvas width in px
    height: v.number(), // canvas height in px

    // image pipeline - tracks image transformations
    originalImageUrl: v.optional(v.string()), // initial uploaded image
    currentImageUrl: v.optional(v.string()), /// current processed image
    thumbnailUrl: v.optional(v.string()), // HW - small preview for dashboard

    // imagekit transformation state
    activeTranformation: v.optional(v.string()), // current imagekit URL params

    // AI features state - tracks what AI processing has been applied
    backgroundRemoved: v.optional(v.boolean()), // has background been removed

    // organization
    folderId: v.optional(v.id("folders")), //optional folder organization

    // timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_updated", ["userId", "updatedAt"])
    .index("by_folder", ["folderId"]), // projects in folder

  folders: defineTable({
    name: v.string(),
    userId: v.id("users"), // foreign key from users table's id
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});

/**
 PLAN LIMITS EXAMPLE
 - free: 3 projs, 20 exports/month, basic features only
 - pro: unlimited projects/exports, all ai features
 */
