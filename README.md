<h1 align="center">
  <b>MyBlog API</b><br>
</h1>

**MyBlog API** adalah sebuah RESTful API yang dirancang untuk memungkinkan user membuat dan mengelola blog secara efisien.
API ini mengelola dua resource utama, yaitu **User** dan **Blog**, yang saling terintegrasi dengan sistem keamanan berbasis **JWT Authentication**.
Project ini dikembangkan sebagai bagian dari technical challenge program magang Backend Developer di **DOT Indonesia**.

---

## 📌 Overview
Fitur utama yang tersedia dalam API ini meliputi:
* **Authentication**: Register dan Login untuk mendapatkan akses token (JWT).
* **Profile Management**: User dapat melihat, memperbarui, dan menghapus profil mereka sendiri.
* **Blog Management**: Operasi CRUD (Create, Read, Update, Delete) lengkap untuk konten blog.

---

## 👥 Actors
* **User**: Pengguna terautentikasi yang memiliki hak akses penuh terhadap data miliknya sendiri.

---

## ⚙️ Functional Requirements

### 🔐 Auth
* User dapat melakukan registrasi akun baru.
* User dapat login untuk mendapatkan token akses.

### 👤 User
* User dapat melihat detail profil miliknya.
* User dapat memperbarui informasi profil.
* User dapat menghapus akun miliknya.

### ✍️ Blog
* User dapat membuat blog baru.
* User dapat melihat daftar semua blog.
* User dapat melihat detail blog secara spesifik.
* User dapat memperbarui isi blog miliknya.
* User dapat menghapus blog miliknya.

---

## 🗄️ Data Requirements

| Entity | Fields |
| :--- | :--- |
| **User** | `id`, `name`, `email`, `password`, `created_at`, `updated_at` |
| **Blog** | `id`, `title`, `content`, `author_id`, `created_at`, `updated_at` |

---

## 🚀 Tech Stack
* **Framework**: NestJS (TypeScript) ⚡
* **Database**: MySQL 💾
* **ORM**: Prisma ORM ◭
* **Security**: JWT Authentication
* **Documentation**: Swagger UI
* **Testing**: Jest (e2e testing)

---

## 📂 Folder Structure

```text
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── guards/
│   │   └── jwt.strategy.ts
│   └── dto/
│       ├── register.dto.ts
│       └── login.dto.ts
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.repository.ts
│   ├── users.module.ts
│   └── dto/
│       └── update-user.dto.ts
├── blogs/
│   ├── blogs.controller.ts
│   ├── blogs.service.ts
│   ├── blogs.repository.ts
│   ├── blogs.module.ts
│   └── dto/
│       ├── create-blog.dto.ts
│       └── update-blog.dto.ts
├── common/
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── decorators/
│   │   └── current-user.decorator.ts
│   └── filters/
│       └── http-exception.filter.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── app.module.ts
└── main.ts
```

---

## 🔐 Environment Variables

Sebelum menjalankan aplikasi, buatlah file `.env` pada root directory dan masukkan konfigurasi berikut:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/myblog_db"

# JWT Configuration
JWT_SECRET="your_jwt_secret_key_here"
JWT_EXPIRATION_TIME="3600s"
```

---

## 📥 Installation & Setup

Ikuti langkah-langkah di bawah ini untuk menyiapkan lingkungan pengembangan di perangkat Anda:

### 1. Clone Repository
Gunakan perintah berikut untuk menyalin repositori ini ke komputer lokal:
```bash
git clone https://github.com/muktiabdii/myblog-api
cd myblog-api
```

### 2. Install Dependencies
Instal semua library yang dibutuhkan menggunakan npm:

```bash
npm install
```

### 3. Database Migration
Jalankan perintah Prisma untuk membuat tabel-tabel di database Anda:

```bash
# Generate client
npx prisma generate

# Jalankan migrasi database
npx prisma migrate dev
```

### 4. Run Project
Nyalakan server dalam mode pengembangan (watch mode):

```bash
# Development mode
npm run start:dev
```

---

## 📮 API Endpoints

### 🔐 Auth
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Mendaftarkan user baru |
| `POST` | `/api/auth/login` | Login dan mendapatkan token akses |

### 👤 User
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/users/me` | Mendapatkan detail profil saya |
| `PATCH` | `/api/users/me` | Memperbarui data profil saya |
| `DELETE` | `/api/users/me` | Menghapus akun saya |

### ✍️ Blog
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/blogs` | Membuat postingan blog baru |
| `GET` | `/api/blogs` | Melihat daftar semua blog |
| `GET` | `/api/blogs/{id}` | Melihat detail blog secara spesifik |
| `PATCH` | `/api/blogs/{id}` | Mengupdate blog (khusus milik sendiri) |
| `DELETE` | `/api/blogs/{id}` | Menghapus blog (khusus milik sendiri) |

---

## 📦 API Response Format

### ✅ Success Response
```json
{
  "status": "success",
  "message": "Descriptive message",
  "data": {}
}
```

### ❌ Error Response
```json
{
  "status": "error",
  "message": "Clear error message",
}
```

---

## 📖 Additional Info

* **Authentication**: Sertakan header `Authorization: Bearer <your_jwt_token>` untuk setiap request ke endpoint yang terproteksi. 🔐
* **API Documentation**: Dokumentasi interaktif (Swagger UI) dapat diakses melalui: http://localhost:3000/docs 📄
* **Testing**: Untuk memastikan kualitas kode, jalankan end-to-end (e2e) test dengan perintah:
    ```bash
    npm run test:e2e
    ```

---

## 👤 Author

**Mukti Abdi Syukur**
* *Backend Developer (Internship Applicant)* 👨‍💻
