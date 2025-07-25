-- CreateEnum
CREATE TYPE "Jabatan" AS ENUM ('STAFF', 'SUPERVISOR', 'MANAGER', 'DIREKSI');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('MASUK', 'PULANG');

-- CreateTable
CREATE TABLE "Karyawan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "foto" TEXT,
    "no_handphone" TEXT NOT NULL,
    "jabatan" "Jabatan" NOT NULL DEFAULT 'STAFF',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Karyawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absensi" (
    "id" SERIAL NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "karyawanId" INTEGER NOT NULL,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Karyawan_userId_key" ON "Karyawan"("userId");

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "Karyawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
