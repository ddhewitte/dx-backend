-- AlterTable
ALTER TABLE "Karyawan" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deleted_at" TIMESTAMP(3);
