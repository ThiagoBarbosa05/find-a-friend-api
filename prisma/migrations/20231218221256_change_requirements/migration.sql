/*
  Warnings:

  - You are about to drop the column `requirement` on the `pets` table. All the data in the column will be lost.
  - Added the required column `requirements` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "requirement",
ADD COLUMN     "requirements" TEXT NOT NULL;
