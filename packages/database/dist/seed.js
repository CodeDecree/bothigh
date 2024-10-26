"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// src/client.ts
var client_exports = {};
__export(client_exports, {
  prisma: () => prisma
});
var import_client = require("@prisma/client");
__reExport(client_exports, require("@prisma/client"));
var globalWithPrisma = global;
var prisma = globalWithPrisma.prisma || new import_client.PrismaClient();
if (process.env.NODE_ENV !== "production") globalWithPrisma.prisma = prisma;

// src/seed.ts
var DEFAULT_USERS = [
  {
    email: "tim@apple.com",
    contact: "1234567890",
    isVerified: true
  }
];
var DEFAULT_BOTS = [
  {
    name: "SalesAssistant",
    description: "A bot that assists with sales inquiries.",
    config: { language: "English", responses: "default" }
  },
  {
    name: "SupportBot",
    description: "A bot to handle customer support.",
    config: { workingHours: "9am-5pm", responses: "custom" }
  }
];
(async () => {
  try {
    const createdUsers = await Promise.all(
      DEFAULT_USERS.map(
        (user) => prisma.user.upsert({
          where: { email: user.email },
          update: { ...user },
          create: { ...user }
        })
      )
    );
    console.log("Users seeded:", createdUsers);
    await Promise.all(
      createdUsers.map(
        (user) => DEFAULT_BOTS.map(
          (bot) => prisma.bot.upsert({
            where: { name: bot.name },
            // Ensure bot names are unique across the database
            update: { ...bot },
            create: { ...bot, userId: user.id }
            // Link bot to the user
          })
        )
      )
    );
    console.log("Bots seeded.");
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
