import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createIssue = mutation({
  args: {
    propertyId: v.id("properties"),
    title: v.string(),
    description: v.string(),
    issueType: v.string(),
    priority: v.string(),
    reportedBy: v.string(),
    unitNumber: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const issueId = await ctx.db.insert("issues", {
      propertyId: args.propertyId,
      title: args.title,
      description: args.description,
      issueType: args.issueType,
      priority: args.priority,
      status: "open",
      reportedBy: args.reportedBy,
      unitNumber: args.unitNumber,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Add initial activity entry
    await ctx.db.insert("activities", {
      issueId,
      type: "created",
      description: `Issue created: ${args.title}`,
      performedBy: args.reportedBy,
      createdAt: Date.now(),
    });

    return issueId;
  },
});

export const getIssueById = query({
  args: { issueId: v.id("issues") },
  handler: async (ctx, args) => {
    const issue = await ctx.db.get(args.issueId);
    if (!issue) return null;

    return issue;
  },
});

export const getIssuesByProperty = query({
  args: { propertyId: v.id("properties") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("issues")
      .withIndex("by_property", (q) => q.eq("propertyId", args.propertyId))
      .collect();
  },
});

export const getIssuesByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("issues")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

export const updateIssueStatus = mutation({
  args: {
    issueId: v.id("issues"),
    status: v.string(),
    performedBy: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.issueId, {
      status: args.status,
      updatedAt: Date.now(),
    });

    // Add activity entry
    await ctx.db.insert("activities", {
      issueId: args.issueId,
      type: "status_changed",
      description: `Status changed to ${args.status}`,
      performedBy: args.performedBy,
      createdAt: Date.now(),
    });

    return args.issueId;
  },
});

export const assignContractor = mutation({
  args: {
    issueId: v.id("issues"),
    contractorId: v.id("contractors"),
    performedBy: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.issueId, {
      assignedContractorId: args.contractorId,
      updatedAt: Date.now(),
    });

    // Get contractor info for activity
    const contractor = await ctx.db.get(args.contractorId);

    // Add activity entry
    await ctx.db.insert("activities", {
      issueId: args.issueId,
      type: "contractor_assigned",
      description: `Contractor assigned: ${contractor?.company || "Unknown"}`,
      performedBy: args.performedBy,
      createdAt: Date.now(),
    });

    return args.issueId;
  },
});
