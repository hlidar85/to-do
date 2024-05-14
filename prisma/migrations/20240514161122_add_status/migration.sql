-- CreateTable
CREATE TABLE "Status" (
    "status" TEXT NOT NULL PRIMARY KEY
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ToDo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "toDo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusId" TEXT NOT NULL DEFAULT 'OPEN',
    CONSTRAINT "ToDo_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("status") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ToDo" ("createdAt", "id", "statusId", "toDo") SELECT "createdAt", "id", "statusId", "toDo" FROM "ToDo";
DROP TABLE "ToDo";
ALTER TABLE "new_ToDo" RENAME TO "ToDo";
PRAGMA foreign_key_check("ToDo");
PRAGMA foreign_keys=ON;
