import { db } from "../src/db";
import { settings, categories, reviews } from "../src/db/schema";

async function main() {
  console.log("Seeding default settings...");

  await db
    .insert(settings)
    .values({ key: "delivery_fee", value: "150" })
    .onConflictDoUpdate({ target: settings.key, set: { value: "150" } });

  await db
    .insert(settings)
    .values({ key: "slider_duration", value: "5" })
    .onConflictDoUpdate({ target: settings.key, set: { value: "5" } });

  await db
    .insert(settings)
    .values({ key: "whatsapp_number", value: "923001234567" })
    .onConflictDoNothing();

  const defaultSettings = await db.select().from(settings);
  console.log("Default settings:", defaultSettings);

  const defaultCategories = [
    "General",
    "Pain Relief",
    "Vitamins",
    "Antibiotics",
    "Skincare",
    "Baby Care",
    "First Aid",
    "Cough & Cold",
    "Diabetes Care",
    "Digestive Health",
  ];

  for (const name of defaultCategories) {
    await db
      .insert(categories)
      .values({ name })
      .onConflictDoNothing();
  }
  console.log(`Seeded ${defaultCategories.length} default categories`);

  console.log("Seeding default reviews...");

  const defaultReviews = [
    {
      id: "00000000-0000-4000-8000-000000000001",
      name: "Dr. Fatima Khan",
      role: "Hospital Administrator",
      rating: 5,
      text: "Arcure Pharma has been our trusted supplier for over 3 years. Their quality and reliability are unmatched.",
      order: 1,
    },
    {
      id: "00000000-0000-4000-8000-000000000002",
      name: "Ahmed Raza",
      role: "Loyal Customer",
      rating: 5,
      text: "Fast delivery, genuine products and excellent customer service. I would not shop anywhere else.",
      order: 2,
    },
    {
      id: "00000000-0000-4000-8000-000000000003",
      name: "Sara Malik",
      role: "Pharmacy Owner",
      rating: 4,
      text: "Professional team with a wide range of products. Their prices are competitive and delivery is always on time.",
      order: 3,
    },
    {
      id: "00000000-0000-4000-8000-000000000004",
      name: "Muhammad Usman",
      role: "Clinic Manager",
      rating: 5,
      text: "We order monthly stock for our clinic and every single order arrives perfectly packed with complete documentation.",
      order: 4,
    },
    {
      id: "00000000-0000-4000-8000-000000000005",
      name: "Ayesha Siddiqui",
      role: "Regular Customer",
      rating: 5,
      text: "Their medicines are always genuine with proper expiry dates. The WhatsApp ordering is super convenient.",
      order: 5,
    },
    {
      id: "00000000-0000-4000-8000-000000000006",
      name: "Bilal Hussain",
      role: "Retail Pharmacist",
      rating: 4,
      text: "Great wholesale rates and honest dealing. The team keeps you updated about stock availability regularly.",
      order: 6,
    },
    {
      id: "00000000-0000-4000-8000-000000000007",
      name: "Hira Shah",
      role: "First-time Customer",
      rating: 5,
      text: "Ordered late at night and received my medicines the very next morning. Amazing service and friendly staff!",
      order: 7,
    },
    {
      id: "00000000-0000-4000-8000-000000000008",
      name: "Kamran Ali",
      role: "Distributor Partner",
      rating: 5,
      text: "Working with Arcure Pharma for two years now. Honest pricing, consistent supply and a team that actually listens.",
      order: 8,
    },
    {
      id: "00000000-0000-4000-8000-000000000009",
      name: "Zainab Tariq",
      role: "Mother of Two",
      rating: 5,
      text: "Ordered baby care essentials and vitamins. Everything arrived well-packed, genuine and exactly on schedule. Highly recommended!",
      order: 9,
    },
    {
      id: "00000000-0000-4000-8000-00000000000a",
      name: "Danish Iqbal",
      role: "Hospital Procurement",
      rating: 4,
      text: "Their bulk ordering process is smooth and paperwork is always complete A dependable partner for institutional supplies.",
      order: 10,
    },
  ];

  for (const review of defaultReviews) {
    await db.insert(reviews).values(review).onConflictDoNothing();
  }
  console.log(`Seeded ${defaultReviews.length} default reviews`);

  console.log("Done. Set DATABASE_URL in .env.local first.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
