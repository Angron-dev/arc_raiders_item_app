<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('MainPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/items', [ItemController::class, 'list'])->name('items.list');
Route::get('/items/{itemID}', [ItemController::class, 'getItemById'])->name('items.single');
Route::get('/item_rarity', [SiteController::class, 'getAllRarity'])->name('rarity.all');
Route::get('/found_in', [SiteController::class, 'getAllFoundIn'])->name('found_in.all');
Route::get('/item_types', [SiteController::class, 'getAllItemTypes'])->name('item_type.all');

require __DIR__.'/auth.php';
