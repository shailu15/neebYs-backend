/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "storeId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_key" ON "Inventory"("productId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
