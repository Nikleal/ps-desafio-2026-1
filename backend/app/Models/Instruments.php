<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Instruments extends Model
{
    /** @use HasFactory<\Database\Factories\InstrumentsFactory> */
    use HasFactory,HasUlids;

    protected $fillable = [
        'name',
        'brand',
        'price',
        'year',
        'image',
        'amount',
        'category_id'
    ];

    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'id');   
    }

    protected static function booted(){
        self::deleted(function (Instruments $instrument){
            try{
                $image_name = explode('instruments/', $instrument['image']);
                Storage::disk('public')->delete('instruments/'.$image_name[1]);
            }catch(Throwable){}
        });
    }
}
