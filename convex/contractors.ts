import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createContractor = mutation({
  args: {
    name: v.string(),
    company: v.string(),
    specialty: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    rating: v.number(),
    isRecommended: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contractors", {
      name: args.name,
      company: args.company,
      specialty: args.specialty,
      email: args.email,
      phone: args.phone,
      rating: args.rating,
      isRecommended: args.isRecommended ?? false,
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const getContractorById = query({
  args: { contractorId: v.id("contractors") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.contractorId);
  },
});

export const getContractorsBySpecialty = query({
  args: { specialty: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contractors")
      .withIndex("by_specialty", (q) => q.eq("specialty", args.specialty))
      .collect();
  },
});

export const getActiveContractors = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contractors")
      .withIndex("by_active", (q) => q.eq("active", true))
      .collect();
  },
});

export const searchContractors = query({
  args: { searchText: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contractors")
      .withSearchIndex("search_contractors", (q) => q.search("name", args.searchText))
      .collect();
  },
});

export const updateContractor = mutation({
  args: {
    contractorId: v.id("contractors"),
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    specialty: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    rating: v.optional(v.number()),
    isRecommended: v.optional(v.boolean()),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { contractorId, ...updates } = args;
    const updateData = Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined)
    );

    await ctx.db.patch(contractorId, {
      ...updateData,
      updatedAt: Date.now(),
    });

    return contractorId;
  },
});

export const deleteContractor = mutation({
  args: { contractorId: v.id("contractors") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.contractorId);
    return args.contractorId;
  },
});
