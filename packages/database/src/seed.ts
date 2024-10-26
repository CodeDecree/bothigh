import { prisma } from "./client";
import type { User, Bot } from "@prisma/client";

const DEFAULT_USERS = [
  {
    email: "tim@apple.com",
    contact: "1234567890",
    isVerified: true,
  },
] as Array<Partial<User>>;

const DEFAULT_BOTS = [
  {
    name: "SalesAssistant",
    description: "A bot that assists with sales inquiries.",
    config: { language: "English", responses: "default" },
  },
  {
    name: "SupportBot",
    description: "A bot to handle customer support.",
    config: { workingHours: "9am-5pm", responses: "custom" },
  },
] as Array<Omit<Bot, "id" | "userId" | "createdAt" | "updatedAt">>;

(async () => {
  try {
    // Upsert the users
    const createdUsers = await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: { email: user.email! },
          update: { ...user },
          create: { ...user },
        })
      )
    );

    console.log("Users seeded:", createdUsers);

    // Upsert the bots for each created user
    await Promise.all(
      createdUsers.map((user) =>
        DEFAULT_BOTS.map((bot) =>
          prisma.bot.upsert({
            where: { name: bot.name }, // Ensure bot names are unique across the database
            update: { ...bot },
            create: { ...bot, userId: user.id }, // Link bot to the user
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
