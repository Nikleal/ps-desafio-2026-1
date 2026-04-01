<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\InstrumentsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/category', CategoryController::class)->except(['index', 'show']);
    Route::apiResource('/instruments', InstrumentsController::class)->except(['index', 'show']);
});

Route::get('category',[CategoryController::class, 'index']);
Route::get('category/{id}',[CategoryController::class, 'show']);
Route::get('instruments',[InstrumentsController::class, 'index']);
Route::get('instruments/{id}',[InstrumentsController::class, 'show']);

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
