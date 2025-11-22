import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Properties table
  properties: defineTable({
    name: v.string(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    zipCode: v.string(),
    propertyType: v.string(), // apartment, house, commercial, etc.
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_address", ["address"])
    .searchIndex("search_address", {
      searchField: "address",
    }),

  // Issues table
  issues: defineTable({
    propertyId: v.id("properties"),
    unitNumber: v.optional(v.string()),
    title: v.string(),
    description: v.string(),
    status: v.string(), // open, in_progress, resolved, closed
    priority: v.string(), // low, medium, high, critical
    issueType: v.string(), // plumbing, electrical, hvac, general, pests, other
    estimatedCost: v.optional(v.string()),
    assignedContractorId: v.optional(v.id("contractors")),
    reportedBy: v.string(), // tenant name or ID
    createdAt: v.number(),
    updatedAt: v.number(),
    resolvedAt: v.optional(v.number()),
  })
    .index("by_property", ["propertyId"])
    .index("by_status", ["status"])
    .index("by_priority", ["priority"])
    .index("by_contractor", ["assignedContractorId"])
    .searchIndex("search_issues", {
      searchField: "title",
    }),

  // Contractors table
  contractors: defineTable({
    name: v.string(),
    company: v.string(),
    specialty: v.string(), // plumbing, electrical, hvac, general, pests, etc.
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    rating: v.number(), // 0-5
    isRecommended: v.optional(v.boolean()),
    active: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_specialty", ["specialty"])
    .index("by_active", ["active"])
    .searchIndex("search_contractors", {
      searchField: "name",
    }),

  // Communications/Messages table
  communications: defineTable({
    issueId: v.id("issues"),
    sender: v.string(), // name of sender
    senderType: v.string(), // tenant, staff, contractor, system
    message: v.string(),
    isAIDraft: v.optional(v.boolean()),
    createdAt: v.number(),
  })
    .index("by_issue", ["issueId"])
    .index("by_created_at", ["createdAt"]),

  // Photos/Visuals table
  photos: defineTable({
    issueId: v.id("issues"),
    storageId: v.optional(v.string()),
    caption: v.optional(v.string()),
    uploadedBy: v.string(),
    createdAt: v.number(),
  })
    .index("by_issue", ["issueId"]),

  // Voice notes table
  voiceNotes: defineTable({
    issueId: v.id("issues"),
    storageId: v.optional(v.string()),
    duration: v.number(), // in seconds
    uploadedBy: v.string(),
    createdAt: v.number(),
  })
    .index("by_issue", ["issueId"]),

  // Activity/Timeline table
  activities: defineTable({
    issueId: v.id("issues"),
    type: v.string(), // created, status_changed, priority_changed, contractor_assigned, comment_added, etc.
    description: v.string(),
    metadata: v.optional(v.any()),
    performedBy: v.string(),
    createdAt: v.number(),
  })
    .index("by_issue", ["issueId"])
    .index("by_type", ["type"]),
});
