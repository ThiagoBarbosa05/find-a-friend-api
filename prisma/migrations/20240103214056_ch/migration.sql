/*
  Warnings:

  - Changed the type of `age_range` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `energy` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `independence_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `environment` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "age_range",
ADD COLUMN     "age_range" "Age" NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" "Size" NOT NULL,
DROP COLUMN "energy",
ADD COLUMN     "energy" "Energy" NOT NULL,
DROP COLUMN "independence_level",
ADD COLUMN     "independence_level" "Independence" NOT NULL,
DROP COLUMN "environment",
ADD COLUMN     "environment" "Environment" NOT NULL;
