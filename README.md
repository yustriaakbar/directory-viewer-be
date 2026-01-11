# monorepo

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

Database

Konfigurasi dan skema database berada di folder root project.

Di dalam folder tersebut terdapat file database yang berisi kumpulan query SQL yang digunakan untuk:

Membuat tabel (DDL)

Melakukan seeding data awal (initial data)

File ini tidak dijalankan secara otomatis oleh aplikasi, sehingga perlu dijalankan secara manual menggunakan database client (PostgreSQL).
