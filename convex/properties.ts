import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createProperty = mutation({
  args: {
    name: v.string(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    zipCode: v.string(),
    propertyType: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("properties", {
      name: args.name,
      address: args.address,
      city: args.city,
      state: args.state,
      zipCode: args.zipCode,
      propertyType: args.propertyType,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const getPropertyById = query({
  args: { propertyId: v.id("properties") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.propertyId);
  },
});

export const getAllProperties = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("properties").collect();
  },
});

export const searchProperties = query({
  args: { searchText: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("properties")
      .withSearchIndex("search_address", (q) => q.search("address", args.searchText))
      .collect();
  },
});

export const updateProperty = mutation({
  args: {
    propertyId: v.id("properties"),
    name: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    zipCode: v.optional(v.string()),
    propertyType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { propertyId, ...updates } = args;
    const updateData = Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined)
    );

    await ctx.db.patch(propertyId, {
      ...updateData,
      updatedAt: Date.now(),
    });

    return propertyId;
  },
});

export const deleteProperty = mutation({
  args: { propertyId: v.id("properties") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.propertyId);
    return args.propertyId;
  },
});
