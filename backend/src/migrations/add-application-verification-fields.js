const { sequelize } = require("../config/database");

async function addApplicationVerificationFields() {
  try {
    console.log("Adding verification fields to applications table...");

    // Add new columns to the applications table
    await sequelize.query(`
      ALTER TABLE applications 
      ADD COLUMN IF NOT EXISTS isVerified BOOLEAN DEFAULT FALSE COMMENT 'Whether the applicant has been verified as legitimate',
      ADD COLUMN IF NOT EXISTS verificationToken VARCHAR(255) NULL COMMENT 'Token for email verification',
      ADD COLUMN IF NOT EXISTS emailVerified BOOLEAN DEFAULT FALSE COMMENT 'Whether the applicant email has been verified',
      ADD COLUMN IF NOT EXISTS ipAddress VARCHAR(45) NULL COMMENT 'IP address of the applicant for fraud detection',
      ADD COLUMN IF NOT EXISTS userAgent TEXT NULL COMMENT 'Browser user agent for application tracking',
      ADD COLUMN IF NOT EXISTS riskScore INTEGER DEFAULT 0 COMMENT 'Risk assessment score (0-100, higher = more suspicious)',
      ADD COLUMN IF NOT EXISTS flagged BOOLEAN DEFAULT FALSE COMMENT 'Whether this application has been flagged as suspicious'
    `);

    console.log("✅ Verification fields added successfully");

    // Add indexes for the new fields (run separately for MariaDB compatibility)
    const indexes = [
      "CREATE INDEX IF NOT EXISTS idx_applications_isVerified ON applications(isVerified)",
      "CREATE INDEX IF NOT EXISTS idx_applications_emailVerified ON applications(emailVerified)",
      "CREATE INDEX IF NOT EXISTS idx_applications_riskScore ON applications(riskScore)",
      "CREATE INDEX IF NOT EXISTS idx_applications_flagged ON applications(flagged)",
      "CREATE INDEX IF NOT EXISTS idx_applications_verificationToken ON applications(verificationToken)",
    ];

    for (const indexSql of indexes) {
      try {
        await sequelize.query(indexSql);
        console.log(
          `✅ Created index: ${indexSql.split("idx_")[1].split(" ")[0]}`
        );
      } catch (error) {
        if (
          error.message.includes("Duplicate key name") ||
          error.message.includes("already exists")
        ) {
          console.log(
            `ℹ️ Index already exists: ${
              indexSql.split("idx_")[1].split(" ")[0]
            }`
          );
        } else {
          console.error(`❌ Error creating index: ${indexSql}`, error.message);
        }
      }
    }

    console.log("✅ Indexes added for verification fields");
  } catch (error) {
    console.error("❌ Error adding verification fields:", error);
    throw error;
  }
}

module.exports = addApplicationVerificationFields;
