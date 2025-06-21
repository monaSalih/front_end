# Laravel + Angular Session: Building a RESTful API with Laravel

This guide outlines the steps to set up a Laravel backend for a product management API, including installing Laravel, preparing the API, creating resources, and connecting with Angular.

---

## ✨ Laravel Setup

### ✍️ Step 1: Install Laravel via Composer

> **Note:** Install [Composer](https://getcomposer.org/) if you haven't already.

```bash
# One-time global installation
composer global require laravel/installer

# Create a new Laravel project (version 11)
composer create-project --prefer-dist laravel/laravel:11.0.1 your-project-name
```

---

## 🛠️ Prepare Laravel API

### 1. Configure `.env`

Update the database credentials in your `.env` file to match your MySQL setup.

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db
DB_USERNAME=root
DB_PASSWORD=
```

### 2. Install Laravel API tools

```bash
php artisan install:api
```

> This installs Sanctum and sets up a personal access token system.

### 3. Sanctum Setup in User Model

In `app/Models/User.php`:

```php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
```

---

## 🔧 Create Product API

### Step 1: Create Model, Migration, Controller

```bash
php artisan make:model Product -mcr
```

### Step 2: Define Table Structure

Edit `database/migrations/xxxx_create_products_table.php`:

```php
$table->id();
$table->string('name');
$table->string('discription');
$table->integer('price');
$table->timestamps();
```

### Step 3: Define Fillable in Model

In `app/Models/Product.php`:

```php
protected $fillable = [
    'name',
    'discription',
    'price',
];
```

### Step 4: Create Product (Store)

In `ProductController.php`:

```php
$request->validate([
    'name' => 'required|string|max:255',
    'discription' => 'required|string|max:1000',
    'price' => 'required|numeric|min:0',
]);

$product = Product::create($request->all());

return response()->json([
    'message' => 'Product created successfully',
    'data' => new ProductResource($product),
], 200);
```

---

## 🔍 View API Routes

```bash
php artisan route:list
```

---

## 📝 Create API Resource

```bash
php artisan make:resource ProductResource
```

In `app/Http/Resources/ProductResource.php`:

```php
return [
    'product_id' => $this->id,
    'product_name' => $this->name,
    'product_description' => $this->discription,
    'product_price' => $this->price,
    'product_created_at' => $this->created_at,
];
```

---

## ✎ Update Product by ID

```php
$validator = Validator::make($request->all(), [
    'name' => 'required|string|max:255',
    'discription' => 'required|string|max:255',
    'price' => 'required|numeric|min:0',
]);

if ($validator->fails()) {
    return response()->json([
        'message' => 'Validation failed',
        'errors' => $validator->messages(),
    ], 422);
}

$product->update($request->only(['name', 'discription', 'price']));

return response()->json([
    'message' => 'Product updated successfully',
    'data' => new ProductResource($product),
], 200);
```

---

## ❌ Delete Product

```php
$product->delete();

return response()->json([
    'message' => 'Product deleted successfully',
], 200);
```



