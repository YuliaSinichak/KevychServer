/*
  Warnings:

  - You are about to drop the column `arrivalTime` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `departureTime` on the `Route` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Route" DROP COLUMN "arrivalTime",
DROP COLUMN "departureTime";
