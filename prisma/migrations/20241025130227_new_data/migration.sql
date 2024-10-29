/*
  Warnings:

  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tripId" INTEGER NOT NULL,
    "activity" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "estimatedCost" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Event_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("activity", "createdAt", "estimatedCost", "id", "location", "startTime", "tripId", "updatedAt") SELECT "activity", "createdAt", "estimatedCost", "id", "location", "startTime", "tripId", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;