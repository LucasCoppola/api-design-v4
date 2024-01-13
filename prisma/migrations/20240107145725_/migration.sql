/*
  Warnings:

  - A unique constraint covering the columns `[id,ownerId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_id_ownerId_key" ON "Product"("id", "ownerId");
