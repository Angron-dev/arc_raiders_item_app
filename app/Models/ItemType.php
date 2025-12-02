<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemType extends Model
{
    protected $table = 'item_type';

    protected $fillable = [
        'item_type_name',
    ];
}
