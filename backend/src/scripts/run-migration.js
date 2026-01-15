const addApplicationVerificationFields = require("../migrations/add-application-verification-fields");

async function runMigration() {
  try {
    console.log("🚀 Starting migration for application verification fields...");
    await addApplicationVerificationFields();
    console.log("✅ Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigration();
