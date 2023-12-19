/*
  Warnings:

  - The values [ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `organization_id` on the `adresses` table. All the data in the column will be lost.
  - You are about to drop the column `organization_id` on the `pets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `adresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `adresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ORG', 'USER');
ALTER TABLE "organizations" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "organizations" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "organizations" ALTER COLUMN "role" SET DEFAULT 'ORG';
COMMIT;

-- DropForeignKey
ALTER TABLE "adresses" DROP CONSTRAINT "adresses_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_organization_id_fkey";

-- DropIndex
DROP INDEX "adresses_organization_id_key";

-- AlterTable
ALTER TABLE "adresses" DROP COLUMN "organization_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "role" SET DEFAULT 'ORG';

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "organization_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "adresses_user_id_key" ON "adresses"("user_id");

-- AddForeignKey
ALTER TABLE "adresses" ADD CONSTRAINT "adresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
